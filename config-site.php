<?php

global $myconfig;

$myconfig['dev'] = true;
$myconfig['debug'] = true;


if (array_key_exists("APP_ENV", $_ENV) && $_ENV["APP_ENV"] == "testing") {
    // Phpunit testing
    $myconfig['environment'] = 'phpunit';
}

// // this is an artificial waiting time
// sleep(3);
