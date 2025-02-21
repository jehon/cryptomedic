<?php

ob_start();
http_response_code(500);

try {
  echo "<pre>";

  require_once __DIR__ . "/lib/config.php";
  require_once __DIR__ . "/lib/database.php";
  require_once __DIR__ . "/lib/protect.php";

  global $myconfig;
  global $db;

  echo "\nDetected version: ";
  echo $db->getVersion() . "\n";

  echo "\n\nRunning versions\n";
  $db->runDirectory($myconfig["database"]["versions"]);

  echo "\n\nDone " . basename(__FILE__) . "\n";
  http_response_code(200);
} catch (Exception $e) {
  echo "Upgrade failed: " . $e->getMessage();
}
