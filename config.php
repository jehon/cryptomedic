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
    # A pointer to this folder
    'root'       => __DIR__,

    # Storage of persistent data (pdf, image, ...)
    'storage'    => __DIR__ . "/storage/",

    # Storage of temporary files
    'temporary'  => "/tmp/application/"
  ]
];

if (file_exists(__DIR__ . '/config-custom.php')) {
  # config-custom hold the configuration of the project
  require(__DIR__ . '/config-custom.php');
}

if (file_exists(__DIR__ . '/config-site.php')) {
  # config-custom hold the configuration of the site
  # This file will be protected by the prj-go-site.sh
  require(__DIR__ . '/config-site.php');
}

if (isset($argc)) {
  if ($argc == 2) {
    if ($argv[0] != "artisan") {
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
}
