<?php

global $myconfig;

$myconfig['environment'] = 'dev';

$myconfig['deployment']['prod'] = [
  'ftp_host' => 'ftp.cryptomedic.org',
  'packages' => [
    [
      'extra_cmd_line' => ''
    ],
  ]
];
