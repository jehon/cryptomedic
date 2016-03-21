<?php

global $myconfig;

$myconfig = [
  'database' => [
    'host'     => 'localhost',
    'schema'   => 'mydb',
    'username' => 'myuser',
    'password' => 'empty',
    'rootpwd'  => ''
  ],
  'maintenance' => [
    'code'     => '',
    'token'    => ''
  ],
  'debug'      => true,
  'random32'   => 'random script with 32 characters',
];

if (file_exists(__DIR__ . 'config-custom.php')) {
  require_once(__DIR__ . 'config-custom.php');
}

