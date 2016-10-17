<?php

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/../bin/lib/Database.php");

global $myconfig;

if (!$myconfig['security']['admin']) {
  die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['admin']) {
  die("No correct pwd given");
}

$db = new \Jehon\Maintenance\Database(
    "mysql:dbname={$myconfig['database']['schema']};host={$myconfig['database']['host']}",
    $myconfig['database']['rootuser'],
    $myconfig['database']['rootpwd']
  );

$db->runDirectory(__DIR__ . "/../conf/database/versions/");
$db->runDirectory(__DIR__ . "/../conf/database/always/");
