<?php

use Jehon\Maintenance;

try {
  ob_start();
  http_response_code(418);
  $res = true;
  echo "<h1>Check</h1>";

  echo "PHP Version: " . phpversion() . "<br>\n";

  require_once __DIR__ . "/lib/config.php";
  require_once __DIR__ . "/lib/database.php";

  echo "MySQL Version: " .
    $db->pdo->getAttribute(PDO::ATTR_SERVER_VERSION) .
    "<br>\n";
  $dbVersion = $db->getVersion();
  $fsVersion = Jehon\Maintenance\getVersionIn(
    $myconfig["database"]["versions"]
  );
  echo "<br>";
  echo "Structure version: $dbVersion<br>\n";
  echo "Filesystem version: $fsVersion<br>\n";

  if ($dbVersion == $fsVersion) {
    echo "Version match<br>";
  } else {
    echo "!! Version mismatch<br>";
    throw new Error("Test failed");
  }

  echo "\n<br>";
  http_response_code(200);
} catch (Throwable $e) {
  echo "Exception<br>\n";
  var_dump($e);
  http_response_code(500);
}

while (@ob_end_flush());
