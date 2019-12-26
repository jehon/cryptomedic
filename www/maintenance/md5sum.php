<?php
namespace Jehon\Maintenance;

set_time_limit(5 * 60);

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/Database.php");

$root = dirname(dirname(__DIR__));

const F_LOCAL = "local";
const F_REMOTE = "remote";
$filter = $_REQUEST['filter'];
if (!$filter) {
	\http_response_code(400, "Should specify a filter");
	die('bye bye');
}
if (!in_array($filter, [ F_LOCAL, F_REMOTE])) {
	\http_response_code(400, "Invalid filter: $filter");
	die('bye bye');
}

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

foreach($list as $f) {
	$fn = substr($f, strlen($root));

	## 
	## Data to be protected
	##

	# Live folder
	if (startsWith($fn, "/live/")) { continue; }
	if (startsWith($fn, "/live-for-test/")) { continue; }

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
