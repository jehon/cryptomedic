<?php

require_once(__DIR__ . "/../vendor/autoload.php");

require(__DIR__ . "/../config.php");

\Jehon\Maintenance\TryCatch::run();
\Jehon\Maintenance\SessionProtect::run(getGlobalConfig("maintenance.code"), getGlobalConfig("maintenance.token"));

\Jehon\Maintenance\Logs::run([
	__DIR__ . "/../rest/storage/logs",
	"/var/log/apache2/",
	__DIR__ . "/../logs/"
]);
