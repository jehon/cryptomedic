<?php

require_once(__DIR__ . "/../vendor/autoload.php");

require(__DIR__ . "/../config.php");

\Jehon\Maintenance\TryCatch::run();
\Jehon\Maintenance\SessionProtect::run(getGlobalConfig("maintenance.code"), getGlobalConfig("maintenance.token"));

\Jehon\Maintenance\Deploy::run(dirname(__DIR__), "jehon", "cryptomedic");
