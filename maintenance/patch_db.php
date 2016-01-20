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
	$db->runOne(__DIR__ . "/../conf/database_scripts/dev_only/reset.sql");
  $db->runOne(__DIR__ . "/../conf/database_scripts/dev_only/testing.sql");
	// $db->runOne("/home/jehon/amd_chakaria.sql");
}

$db->runOne(__DIR__ . "/../conf/database_scripts");
$db->runOne(__DIR__ . "/../conf/database_scripts/always.sql");

if (\Jehon\Maintenance\Lib\isServedLocally()) {
	$db->runOne(__DIR__ . "/../conf/database_scripts/dev_only");
}
