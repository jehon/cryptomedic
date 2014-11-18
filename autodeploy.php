<?php

$deploy = array(
    'owner' => 'jehon',
    'repository' => 'cryptomedic',
    'DatabaseHistoryPath' => __DIR__ . "/config/database_scripts",
    'DatabaseDevSQL' => __DIR__ . "/dev.sql",
    'restoreDB' =>  array(
    	"prod2acc" => "C:\Users\jehon\Documents\amd_chakaria.sql",
    	"end2end_testing" => __DIR__ . "/configs/tests/e2e.sql"
    ),
    'emails' => array( "marielineet.jean@gmail.com" )
);
