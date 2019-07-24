<?php
  //

  $myargs = $argv;
  $argv = [];
  $argc = 0;

  // require_once(__DIR__ . "/../vendor/autoload.php");
  require_once(__DIR__ . "/../config.php");
  require_once(__DIR__ . "/lib/Database.php");

  global $myconfig;

  $db = new \Jehon\Maintenance\Database(
      "mysql:host={$myconfig['database']['host']};dbname={$myconfig['database']['schema']}",
      $myconfig['database']['rootuser'],
      $myconfig['database']['rootpwd']
    );
try {
  if (count($myargs) > 1 && $myargs[1] > "") {
    $db->runFileOrDirectory($myargs[1]);
  } else {
    $db->runDirectory(__DIR__ . "/../conf/database/versions/");
    $db->runDirectory(__DIR__ . "/../conf/database/always/");
  }
} catch (Exception $e) {
	echo "Upgrade failed: " . $e->getMessage();
}
