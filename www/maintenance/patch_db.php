<pre>

<?php

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/../../bin/lib/Database.php");

global $myconfig;

if (!$myconfig['security']['admin']) {
  die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['admin']) {
  die("No correct pwd given");
}

$db = new \Jehon\Maintenance\Database(
    "mysql:dbname={$myconfig['database']['schema']};host={$myconfig['database']['host']}",
    $myconfig['database']['username'],
    $myconfig['database']['password']
  );

echo "Running versions\n";
$db->runDirectory(__DIR__ . "/../../conf/database/versions/");

echo "Running always\n";
$db->runDirectory(__DIR__ . "/../../conf/database/always/");
