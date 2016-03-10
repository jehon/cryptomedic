<?php

require_once(__DIR__ . "/../vendor/autoload.php");
require_once(__DIR__ . "/../vendor/jehon/maintenance/lib/is_served_locally.php");

require_once(__DIR__ . "/../config.php");

\Jehon\Maintenance\TryCatch::run();
\Jehon\Maintenance\SessionProtect::run(getGlobalConfig("maintenance.code"), getGlobalConfig("maintenance.token"));

global $myconfig;

$db = new \Jehon\Maintenance\Database(
		$myconfig['database']['database'],
		$myconfig['database']['username'],
		$myconfig['database']['password'],
		$myconfig['database']['options']
	);

echo "<pre>";

if (\Jehon\Maintenance\Lib\isServedLocally()) {
	$db->runOne(__DIR__ . "/../conf/database/dev/reset.sql");
  $db->runOne(__DIR__ . "/../conf/database/dev/testing.sql");
	// $db->runOne("/home/jehon/amd_chakaria.sql");
}

$db->runOne(__DIR__ . "/../conf/database");
$db->runOne(__DIR__ . "/../conf/database/always.sql");

if (\Jehon\Maintenance\Lib\isServedLocally()) {
	$db->runOne(__DIR__ . "/../conf/database/dev");
}
