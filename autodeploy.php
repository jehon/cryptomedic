<?php

require_once(__DIR__ . "/../secrets.php");

$deploy = array(
    'owner' => 'jehon',
    'repository' => 'cryptomedic',
    'DatabaseHistoryPath' => __DIR__ . "/database_scripts/",
    'DatabaseHistoryPathDev' => __DIR__ . "/database_scripts_dev/",
    'restoreDB' =>  array(
//    	"prod2acc" => "C:\Users\jehon\Documents\amd_chakaria.sql",
	"prod2acc" => "/home/jehon/amd_chakaria.sql",
    	"end2end_testing" => __DIR__ . "/test/e2e.sql"
    ),
    'emails' => getSecret("emailsNotifications")
);
