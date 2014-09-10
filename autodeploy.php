<?php

$config['deploys']['cryptomedic'] = array(
    'root' => __DIR__,
    'owner' => 'jehon',
    'repository' => 'cryptomedic',
    'DatabaseHistoryPath' => __DIR__ . "/database_scripts"
);

$config['deploys']['cryptomedic-test'] = $config['deploys']['cryptomedic'];
$config['deploys']['cryptomedic-test']['root'] = $config['deploys']['cryptomedic']['root'] . "-test";
