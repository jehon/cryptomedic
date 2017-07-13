<?php


global $myconfig;

$myconfig['environment'] = 'dev';

if (file_exists(__DIR__ . "/../secrets.ini")) {
  $mysecrets = parse_ini_file(__DIR__ . "/../secrets.ini", true, INI_SCANNER_TYPED);

  $myconfig['database']['rootuser'] = $mysecrets['database']['rootuser'];
  $myconfig['database']['rootpwd']  = $mysecrets['database']['rootpwd'];

  $myconfig['deployment']['prod'] = [
    'ftp_host' => 'ftp.cryptomedic.org',
    'ftp_user' => $mysecrets['cryptomedic']['ftp']['username'],
    'ftp_pass' => $mysecrets['cryptomedic']['ftp']['password'],
    'packages' => [
      [
        'extra_cmd_line' => '--exclude www/api/v1.0/storage/framework/'
      ],
    ],
    'security_key' => $mysecrets['cryptomedic']['security_key']
  ];
}
