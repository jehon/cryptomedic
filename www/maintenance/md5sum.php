<?php
namespace Jehon\Maintenance;

function fatalError($code, $msg) {
	http_response_code($code);
	die($msg);
}

set_time_limit(5 * 60);

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/Database.php");

$root = dirname(dirname(__DIR__));

const F_LOCAL = "local";
const F_REMOTE = "remote";
$filter = $_REQUEST['filter'];
if (!$filter) {
	fatalError(400, "Should specify a filter");
}
if (!in_array($filter, [ F_LOCAL, F_REMOTE])) {
	fatalError(400, "Invalid filter: $filter");
}

$filterFile = "$root/deploy-filter";
if (!file_exists($filterFile)) {
	fatalError(500, "Filter file not found: $filterFile");
}

$filters = array_map(
	# normalize for fnmatch
	function($a) { 
		$m = $a[1];
		if (strpos($m, "/") !== false) {
			$m = str_replace("*", "[^\/]*", $m);
		} else {
			$m = str_replace("*", "[^\/]*", $m);
			$m = "^(.*\/|)(?<name>" . $m . ")(\/[^\/]+|)$";
		}
		return [ $a[0], $a[1], $m];
	},
	array_map(
		# split to filter
		function($a) { return [ $a[0], trim(substr($a, 1)) ]; },
		array_filter(
			file($filterFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES),
			# remove comments
			function($a) { return $a[0] != "#" && strlen($a) > 0; }
		)
	)
);
// echo "<pre>" . str_replace('<', '&lt;', print_r($filters, true)) . "</pre>";
// die();

$list = myglob($root ."/*", true);
sort($list);

function startsWith($haystack, $needle) {
	$length = strlen($needle);
	return (substr($haystack, 0, $length) === $needle);
}

function endsWith($haystack, $needle) {
	$length = strlen($needle);
	if ($length == 0) {
		return true;
	}

	return (substr($haystack, -$length) === $needle);
}

function contains($haystack, $needle) {
	return strpos($haystack, $needle) !== false;
}

echo "# <pre>crc32b:\n";

foreach($list as $f) {
	$fn = substr($f, strlen($root));

	## 
	## Data to be protected
	##

	# Live folder
	if (startsWith($fn, "/live/")) { continue; }

	# Live config
	if ($fn == "/config-site.php") { continue; }

	# Some live storage
	if (startsWith($fn, "/target/")) { continue; }

	# Storage of Laravel
	if (contains($fn, "/api/") && contains($fn, "/storage/")) { continue; }

	if ($filter == 'remote') { 
		##
		## Protect old version of api
		##
		// if (startsWith($fn, "/www/api/v1.2/")) { continue; }
	}

	if ($filter == 'local') { 
		
		## 
		## Data transcient (temporary)
		##
		if (contains($fn, "/tmp/")) { continue; }
		if (contains($fn, "/temp/")) { continue; }
		if (contains($fn, "/Temp/")) { continue; }
		if (endsWith($fn, ".log")) { continue; }
		
		## 
		## Data not necessary on production
		##
		if (startsWith($fn, "/live-for-test/")) { continue; }
		if (contains($fn, "/.git/")) { continue; }
		if (startsWith($fn, "/node_modules/")) { continue; }
		if (startsWith($fn, "/documentation/")) { continue; }
		if (contains($fn, "/tests/")) { continue; }
		if (contains($fn, "/test/")) { continue; }
		if (contains($fn, "/unused/")) { continue; }
		if (startsWith($fn, "/conf")) {
			if (contains($fn, "dev/")) { continue; }
			if (endsWith($fn, "/base.sql")) { continue; }
		}
		if (startsWith($fn, "/backup")) { continue; }
	}

	echo \hash_file('crc32b',$f) . ": " . $fn . "\n";
}

?>
# done
