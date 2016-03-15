<?php

require_once(__DIR__ . "/../vendor/autoload.php");

require_once(__DIR__ . "/../config.php");

\Jehon\Maintenance\TryCatch::run();
\Jehon\Maintenance\SessionProtect::run($myconfig["maintenance"]["code"], $myconfig["maintenance"]["token"]);

\Jehon\Maintenance\Deploy::run(dirname( __DIR__ ), "jehon", "cryptomedic");

echo "<h3>Custom: patch db</h3>";
\Jehon\Maintenance\Lib\stepByStep(function() {
  require_once(__DIR__ . "/patch_db.php");
});
