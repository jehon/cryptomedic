<?php

$deploys['cryptomedic'] = array(
    'root' => __DIR__,
    'owner' => 'jehon',
    'repository' => 'cryptomedic',
    'DatabaseHistoryPath' => __DIR__ . "/database_scripts",
    'DatabaseDevPath' => __DIR__ . "/dev.sql"
);

require_once("appConfiguration.php");
$deploys['cryptomedic']['database'] = $config['database'];

$deploys['cryptomedic-test'] = $config['deploys']['cryptomedic'];
$deploys['cryptomedic-test']['root'] = $config['deploys']['cryptomedic']['root'] . "-test";
$deploys['cryptomedic-test']['restoreDB'] = "C:\Users\jehon\Downloads\amd_chakaria.sql";

if ($deploy_locally) unset($deploys['cryptomedic']);
