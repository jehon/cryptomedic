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
  'developpement_environnement' => true,
  'random32'   => 'random script with 32 characters',
];

if (file_exists(__DIR__ . 'config-custom.php')) {
  require_once(__DIR__ . 'config-custom.php');
}

if ($argc == 2) {
  $path = $argv[1];
  global $myconfig;
  $array = $myconfig;

  $keys = explode('.', $path);
  foreach ($keys as $key) {
    if (isset($array[$key])) {
      $array = $array[$key];
    } else {
      throw new Exception("Path not found: " . $path);
    }
  }
  echo $array;
}
