<?php

require_once(__DIR__ . "/../vendor/autoload.php");

require(__DIR__ . "/../config.php");

\Jehon\Maintenance\TryCatch::run();
\Jehon\Maintenance\SessionProtect::run($maintenance["maintenance"]["code"], $maintenance["maintenance"]["token"]);

\Jehon\Maintenance\Database::run(
		$myconfig['database']['patches'],
		$myconfig['database']['database'], 
		$myconfig['database']['username'], 
		$myconfig['database']['password'], 
		$myconfig['database']['options']
		);
