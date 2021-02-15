<?php

global $myconfig;

$myconfig['environment'] = 'latitude';
$myconfig['debug'] = true;

if ($_SERVER && array_key_exists('HTTP_HOST', $_SERVER)) {
    // Localhost has special rights...
    $serverName = explode(":", $_SERVER['HTTP_HOST'])[0];
    if ($serverName == "localhost") {
        $myconfig['environment'] = 'dev';
    }
}

if (array_key_exists("APP_ENV", $_ENV) && $_ENV["APP_ENV"] == "testing") {
    // Phpunit testing
    $myconfig['environment'] = 'phpunit';
}

// if ($myconfig['environment'] == 'dev') {
//     // This match localhost, but not testing

//     // TODO: this is artificial waiting time
//     sleep(1);
// }
