<?php

ob_start();
http_response_code(500);

try {
	echo "<pre>";

	require_once(__DIR__ . "/lib/config.php");
	require_once(__DIR__ . "/lib/protect.php");

	global $myconfig;
	global $db;

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
