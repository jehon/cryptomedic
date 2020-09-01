<pre>

<?php

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/Database.php");

define('PATCH_DB', 1);

global $myconfig;

if (!$myconfig['security']['key']) {
	http_response_code(500);
	die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['key']) {
	http_response_code(500);
	die("No correct pwd given");
}

try {
	http_response_code(500);
	$db = new \Jehon\Maintenance\Database(
		"mysql:dbname={$myconfig['database']['schema']};host={$myconfig['database']['host']}",
		$myconfig['database']['username'],
		$myconfig['database']['password']
	);

	echo "\n\nRunning versions\n";
	$db->runDirectory(__DIR__ . "/../../conf/database/versions/");

	echo "\n\nRunning always\n";
	$db->runDirectory(__DIR__ . "/../../conf/database/always/");

	echo "\n\nRecreate structure\n";
	$list = glob(__DIR__ . "/../api/v*");
	foreach($list as $v) {
		echo "Version $v\n<br>";
		$DBS = "$v/bare/database-structure.php";
		if (file_exists($DBS)) {
			echo "Importing $DBS<br>\n";
			require($DBS);
		} else {
			echo "No $DBS found<br>\n";
		}
	}

	http_response_code(200);
} catch (Exception $e) {
	echo "Upgrade failed: " . $e->getMessage();
	http_response_code(500);
}
