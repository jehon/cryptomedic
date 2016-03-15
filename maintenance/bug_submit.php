<?php

	require_once(__DIR__ . "/../vendor/autoload.php");

	require(__DIR__ . "/../config.php");

	\Jehon\Maintenance\TryCatch::run();

	$db = new \Jehon\Maintenance\Database(
			$myconfig['database']['database'],
			$myconfig['database']['username'],
			$myconfig['database']['password'],
			[ PDO::MYSQL_ATTR_INIT_COMMAND  => "SET CHARACTER SET 'utf8'" ]
	);

	\Jehon\Maintenance\BugReporting::record($db, "http://www.cryptomedic.org/cryptomedic/maintenance/bug_view.php");

	// $client = new Github\Client();
	// // See https://github.com/KnpLabs/php-github-api/blob/master/doc/security.md
	// var_dump("authenticate");
	// $client->authenticate($myconfig['github']['token'], "", Github\Client::AUTH_HTTP_TOKEN);

	// var_dump("submit bug");
 //  $client->api('issue')->create('jehon', 'database_patch', array('title' => 'The issue title', 'body' => 'The issue body'));

	// var_dump("get list");
	// $issues = $client->api('issue')->all("jehon", "database_patch", array('state' => 'open'));
	// var_dump($issues);
