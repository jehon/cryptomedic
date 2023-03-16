<?php
	ob_start();
	http_response_code(500);

	echo "<pre>";

require_once(__DIR__ . "/lib/config.php");

global $myconfig;

if (!$myconfig['security']['key']) {
	die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['key']) {
	die("No correct pwd given (" . basename(__FILE__) . ")");
}

try {
	$db = new \Jehon\Maintenance\Database(
		"mysql:dbname={$myconfig['database']['schema']};host={$myconfig['database']['host']}",
		$myconfig['database']['username'],
		$myconfig['database']['password']
	);
	echo "\nDetected version: ";
	echo $db->getVersion() . "\n";

	echo "\n\nRunning versions\n";
	$db->runDirectory(__DIR__ . "/../../conf/database/versions/");

	echo "\n\nRunning always\n";
	$db->runDirectory(__DIR__ . "/../../conf/database/always/");

	if ($myconfig['dev']) {
		echo "\n\nRunning dev-always\n";
		$db->runDirectory(__DIR__ . "/../../conf/database/dev-always/");
	}

    echo "\n\nDone " . basename(__FILE__) . "\n";
	http_response_code(200);
} catch (Exception $e) {
	echo "Upgrade failed: " . $e->getMessage();
}
