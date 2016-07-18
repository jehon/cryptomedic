#!/usr/bin/php

<?php
  system(__DIR__ . "/prj-db-backup.sh pre-reset");

  require_once(__DIR__ . "/../vendor/autoload.php");
  require_once(__DIR__ . "/../vendor/jehon/maintenance/lib/is_served_locally.php");

  require_once("/var/www/config.php");

  \Jehon\Maintenance\TryCatch::run();

  global $myconfig;

  $db = new \Jehon\Maintenance\Database(
      "mysql:host=" . $myconfig['database']['host'],
      'root',
      $myconfig['database']['rootpwd']
    );

  if (\Jehon\Maintenance\Lib\isServedLocally()) {
    $db->runPrepareSqlStatement("DROP SCHEMA IF EXISTS " . $myconfig['database']['schema']);
    $db->runPrepareSqlStatement("CREATE SCHEMA IF NOT EXISTS " . $myconfig['database']['schema']);
    $db->runPrepareSqlStatement("GRANT ALL PRIVILEGES ON " . $myconfig['database']['schema'] . ".* TO '" . $myconfig['database']['username'] . "'@'%' IDENTIFIED BY '" . $myconfig['database']['password'] . "'");
    $db->runPrepareSqlStatement("USE " . $myconfig['database']['schema']);

    $db->runOne(__DIR__ . "/../conf/database/dev/testing.sql");
  }

  $db->runOne(__DIR__ . "/../conf/database");
  $db->runOne(__DIR__ . "/../conf/database/always.sql");

  if (\Jehon\Maintenance\Lib\isServedLocally()) {
    $db->runOne(__DIR__ . "/../conf/database/dev");
  }
