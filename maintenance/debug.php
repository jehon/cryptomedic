<?php

	require_once(__DIR__ . "/../vendor/autoload.php");
	
	require(__DIR__ . "/../config.php");

	\Jehon\Maintenance\TryCatch::run();
	\Jehon\Maintenance\SessionProtect::run($maintenance["maintenance"]["code"], $maintenance["maintenance"]["token"]);
	
	\Jehon\Maintenance\Debug::run();
