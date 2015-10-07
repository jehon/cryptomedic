<?php

	require_once(__DIR__ . "/../vendor/autoload.php");
	
	require(__DIR__ . "/../config.php");
	
	\Jehon\Maintenance\TryCatch::run();
	
	$db = new \Jehon\Maintenance\Database(
			$myconfig['database']['database'],
			$myconfig['database']['username'],
			$myconfig['database']['password'],
			$myconfig['database']['options']
	);
	
	\Jehon\Maintenance\BugReporting::run($db);
	