<?php

require_once(__DIR__ . "/../vendor/autoload.php");
require_once(__DIR__ . "/../vendor/jehon/maintenance/lib/getParameter.php");

require(__DIR__ . "/../config.php");

use Jehon\Maintenance\Lib\getParameter;

\Jehon\Maintenance\TryCatch::run();
\Jehon\Maintenance\SessionProtect::run(getGlobalConfig("travis.upload"));

$file = \Jehon\Maintenance\SaveToFile::run(__DIR__ . "/../../travis/" . filter_input(INPUT_POST, "travis", FILTER_SANITIZE_STRING));

echo " => http://www.cryptomedic.org/travis/$file\n";
