<?php

global $myconfig;

$myconfig['environment'] = 'dev';


if (file_exists(__DIR__ . "/../secrets.php")) {
  require_once(__DIR__ . "/../secrets.php");
  $myconfig['deployment']['prod'] = [
    'ftp_host' => 'ftp.cryptomedic.org',
    'ftp_user' => $mysecrets['cryptomedic.ftp.username'],
    'ftp_pass' => $mysecrets['cryptomedic.ftp.password'],
    'packages' => [
      [
        'extra_cmd_line' => '--exclude www/api/v1.0/storage/framework/'
      ],
    ],
  ]
];
