<?php

global $myconfig;

$myconfig['environment'] = 'dev';



$myconfig['deployment']['prod'] = [
  'ftp_host' => 'ftp.cryptomedic.org',
  'ftp_user' => $mysecrets['cryptomedic.ftp.username'],
  'ftp_pass' => $mysecrets['cryptomedic.ftp.password'],
  'packages' => [
    [
      'extra_cmd_line' => ''
    ],
  ]
];
