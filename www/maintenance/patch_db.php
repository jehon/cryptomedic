<pre>

<?php

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/Database.php");

global $myconfig;

if (!$myconfig['security']['key']) {
	http_response_code(500);
	die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['key']) {
	http_response_code(500);
	die("No correct pwd given");
}

if (isset($_REQUEST['debug'])) {
	\Jehon\Maintenance\Database::debug(true);
}

try {
	http_response_code(500);
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

	echo "\n\nDone\n";
	http_response_code(200);
} catch (Exception $e) {
	echo "Upgrade failed: " . $e->getMessage();
	http_response_code(500);
}
