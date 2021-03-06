<?php

namespace Jehon\Maintenance;

function fatalError($code, $msg) {
	http_response_code($code);
	die($msg);
}

set_time_limit(5 * 60);

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/Database.php");

define("PRJ_ROOT", dirname(dirname(__DIR__)));

const F_LOCAL = "local";
const F_REMOTE = "remote";

$debug = isset($_REQUEST['debug']);

$filter = $_REQUEST['filter'];
if (!$filter) {
	fatalError(400, "Should specify a filter");
}
if (!in_array($filter, [F_LOCAL, F_REMOTE])) {
	fatalError(400, "Invalid filter: $filter");
}

$filterFile = PRJ_ROOT . "/deploy-filter";
if (!file_exists($filterFile)) {
	fatalError(500, "Filter file not found: $filterFile");
}

$filters = array_map(
	# normalize for fnmatch
	function ($a) {
		$m = $a[1];
		# We use ::slash:: to keep the "/" meaning for raw folder separation to the end

		# Translate * and ** into regex
		$m = str_replace(
			[".", "?", "**", "*", "::doublestar::", "::point::"],
			["::point::", "(?<interrogation>.)", "::doublestar::", "(?<singlestart>[^::slash::]*)", "(?<doublestar>.*)", "\."],
			$m
		);
		if (strpos($m, "/") !== 0) {
			# Anchor anywhere
			$m = "(?<anchor>.*::slash::)$m";
		}
		$m = str_replace(["/", "::slash::"], "\/", $m);

		return [$a[0], $a[1], "/^$m\$/"];
	},
	array_map(
		# split to filter
		function ($a) {
			return [$a[0], trim(substr($a, 1))];
		},
		array_filter(
			file($filterFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES),
			# remove comments
			function ($a) {
				return $a[0] != "#" && strlen($a) > 0;
			}
		)
	)
);

if ($debug) {
	echo "\nRaw filters: \n";
	print_r($filters);
}

if ($filter == "remote") {
	$filters = array_filter(
		$filters,
		function ($a) {
			return $a[0] == "P";
		}
	);
	// } else {
	// 	$filters = array_filter($filters,
	// 		function($a) { return $a[0] != "P"; }
	// 	);
}

if ($debug) {
	echo "\nPost filter: \n";
	print_r($filters);
}

function getFiles($absPath) {
	global $filters, $debug;

	if ($handle = opendir($absPath)) {
		while (false !== ($f = readdir($handle))) {
			if ($f == "." || $f == "..") {
				continue;
			}
			$fabs = $absPath . DIRECTORY_SEPARATOR . $f;
			$frel = substr($fabs, strlen(PRJ_ROOT));

			if ($debug) {
				echo ("\nTEST $frel: ");
			}

			$keep = true;
			foreach ($filters as $filt) {
				$match = preg_match($filt[2], $frel);

				if ($debug) {
					echo " - " . $filt[1] . ' ? ' . ($match ? 'Y' : 'n');
				}

				if ($filt[0] == "P" && $match) {
					$keep = false;
				}
				if ($filt[0] == "-" && $match) {
					$keep = false;
				}
				if ($match) {
					break;
				}
			}
			if (!$keep) {
				if ($debug) {
					echo "SKIPPING";
				}
				continue;
			}
			if ($debug) {
				echo "\n";
			}

			if (is_dir($fabs)) {
				getfiles($fabs);
			} else {
				echo \hash_file('crc32b', $fabs) . ": " . $frel . "\n";
			}
		}
		closedir($handle);
	} else {
		fatalError(500, "Could not read: " . $absPath);
	}
}

getFiles(PRJ_ROOT . "/www");
getFiles(PRJ_ROOT . "/conf/database");

?>
# done