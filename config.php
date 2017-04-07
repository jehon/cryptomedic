<?php

global $myconfig;
if (!defined("MY_ENVIRONMENT_PRODUCTION")) {
  define("MY_ENVIRONMENT_PRODUCTION", "production");
}

$myconfig = [
  'database' => [
    'host'       => 'localhost',
    'schema'     => preg_replace("/[^A-Za-z0-9_]/", '_', basename(dirname(__FILE__))),
    'username'   => 'myuser',
    'password'   => 'empty',
#    'rootuser'   => '',
#    'rootpwd'    => ''
  ],
  'security' => [
    'code'       => 'secure_code',
    'token'      => 'secure_token'
  ],
  'environment' => constant('MY_ENVIRONMENT_PRODUCTION'),
  'randomString' => str_pad("random script ", 256, "abcdefghijklmnopqrstuvwxyz"),
  'folders' => [
    # A pointer to this folder
    'root'       => __DIR__,

    # Storage of persistent data (pdf, image, ...)
    'storage'    => __DIR__ . "/live/storage/",

    # Storage of temporary files
    'temporary'  => __DIR__ . "/target/webTemp/"
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

function myShowConfigByPathForCmdLine($path) {
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
  if (is_array($array)) {
    # If we have an array, then display the various keys
    echo implode(array_keys($array), "\n"). "\n";
  } else {
    echo $array;
  }
}

if (isset($argc)) {
  if (($argc == 2) && (substr($argv[0], -strlen(basename(__FILE__))) == basename(__FILE__))) {
    myShowConfigByPathForCmdLine($argv[1]);
  }
}
