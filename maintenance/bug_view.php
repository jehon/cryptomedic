<?php

	require_once(__DIR__ . "/../vendor/autoload.php");

	require(__DIR__ . "/../config.php");
  global $myconfig;

	\Jehon\Maintenance\TryCatch::run();

	$db = new \Jehon\Maintenance\Database(
			"mysql:host=" . $myconfig['database']['host'] . ";dbname=" . $myconfig['database']['schema'],
			$myconfig['database']['username'],
			$myconfig['database']['password'],
			[ PDO::MYSQL_ATTR_INIT_COMMAND  => "SET CHARACTER SET 'utf8'" ]
	);

	\Jehon\Maintenance\BugReporting::run($db);

