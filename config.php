<?php

global $myconfig;

$myconfig = [
  'database' => [
    'host'       => 'localhost',
    'schema'     => 'mydb',
    'username'   => 'myuser',
    'password'   => 'empty',
    'rootpwd'    => ''
  ],
  'security' => [
    'code'       => 'secure_code',
    'token'      => 'secure_token'
  ],
  'debug'        => true,
  'developpement_environnement' => true,
  'randomString' => str_pad("random script ", 256, "abcdefghijklmnopqrstuvwxyz"),
  'folders' => [
    'root'       => "/var/www/html",
    'live'       => "/var/www/live/",
    'cache'      => "/var/www/live/cache"
  ]
];

if (file_exists(__DIR__ . 'config-custom.php')) {
  require_once(__DIR__ . 'config-custom.php');
}

if (isset($argc)) {
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
}
