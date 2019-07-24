<pre>

<?php

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/Database.php");

global $myconfig;
ob_start();
http_response_code(500);

if (!$myconfig['security']['key']) {
	
  die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['key']) {
  die("No correct pwd given");
}

try {
	$db = new \Jehon\Maintenance\Database(
		"mysql:dbname={$myconfig['database']['schema']};host={$myconfig['database']['host']}",
		$myconfig['database']['username'],
		$myconfig['database']['password']
	);

	echo "\n\nRunning versions\n";
	$db->runDirectory(__DIR__ . "/../../conf/database/versions/");

	echo "\n\nRunning always\n";
	$db->runDirectory(__DIR__ . "/../../conf/database/always/");
	http_response_code(200);
} catch (Exception $e) {
	echo "Upgrade failed: " . $e->getMessage();
	http_response_code(500);
}
ob_flush();
