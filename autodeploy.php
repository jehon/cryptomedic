<?php

require_once(__DIR__ . "/globalConfig.php");

$deploy = array(
    'owner' => 'jehon',
    'repository' => 'cryptomedic',
    'DatabaseHistoryPath' => __DIR__ . "/database_scripts/",
    'DatabaseHistoryPathDev' => __DIR__ . "/database_scripts/dev_only/",
    'restoreDB' =>  array(
    	//"end2end_testing" => __DIR__ . "/test/e2e.sql",
    	//"prod2acc" => "C:\Users\jehon\Documents\amd_chakaria.sql",
	"prod2acc" => "/home/jehon/amd_chakaria.sql"
    )
);
