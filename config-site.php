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

if (file_exists(__DIR__ . "/../secrets.php")) {
    require(__DIR__ . "/../secrets.php");
    global $mysecrets;

    $myconfig['deployment']['prod'] = [
        'ftp_host' => 'ftp.cryptomedic.org',
        'ftp_user' => $mysecrets['cryptomedic.ftp.username'],
        'ftp_pass' => $mysecrets['cryptomedic.ftp.password'],
        // 'packages' => [
        //   [
        //     'extra_cmd_line' => '--exclude www/api/v1.0/storage/framework/'
        //   ],
        // ],
        'security_key' => $mysecrets['cryptomedic.security_key']
    ];
}
