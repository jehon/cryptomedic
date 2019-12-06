<?php

global $myconfig;

$myconfig['environment'] = 'latitude';
$myconfig['debug'] = true;

if ($_SERVER && array_key_exists('HTTP_HOST', $_SERVER)) {
    // Localhost has special rights...
    $serverName = explode(":", $_SERVER['HTTP_HOST'])[0];
    if ($serverName == "localhost") {
        $myconfig['environment'] = 'dev';
        $myconfig['bypass'] = true;
    }
}

if (array_key_exists("APP_ENV", $_ENV) && $_ENV["APP_ENV"] == "testing") {
    // Phpunit testing
    $myconfig['environment'] = 'phpunit';
    $myconfig['bypass'] = true;    
}

// if (! function_exists('storage_path')) {
// 	# Come out of www/api/v1.3/vendor/laravel/framework/src/Illuminate/Foundation/helpers.php
// 	function storage_path($path = '') {
// 		return "/tmp/laravel/" . ($path ? DIRECTORY_SEPARATOR.$path : $path);
//     }
// }
