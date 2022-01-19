<?php

global $myconfig;

$myconfig = [
  'test' => 'hello world',
  'in' => [
    'there' => 'hello universe'
  ],
  'database' => [
    'host'       => 'mysql',
    'schema'     => 'cryptomedic',
    'rootuser'   => 'root',
    'rootpwd'    => 'password',
    'username'   => 'root',
    'password'   => 'password',
  ],
  'security' => [
    'key'        => 'secret',
    'code'       => 'secure_code',
    'token'      => 'secure_token'
  ],
  'laravel' => [
    'key' => '12345678901234567890123456789012'
  ],
  'dev' => false,
  'debug' => false,
  'randomString' => str_pad("random script ", 256, "abcdefghijklmnopqrstuvwxyz"),
  'folders' => [
    # A pointer to this folder
    'root'       => __DIR__,

    # Storage of persistent data (pdf, image, ...)
    'storage'    => __DIR__ . "/live/storage/",

    # Storage of temporary files
    'temporary'  => __DIR__ . "/tmp/webTemp/"
  ]
];

echo "1\n";
var_dump($myconfig);
echo "1\n";

if (file_exists(__DIR__ . '/config-custom.php')) {
  # config-custom hold the configuration of the project
  require(__DIR__ . '/config-custom.php');
}

echo "2\n";
var_dump($myconfig);
echo "2\n";

if (file_exists(__DIR__ . '/config-site.php')) {
  # config-custom hold the configuration of the site
  # This file will be protected by the prj-go-site.sh
  require(__DIR__ . '/config-site.php');
}

echo "3\n";
var_dump($myconfig);
echo "3\n";

function myShowConfigByPathForCmdLine($path) {
  global $myconfig;
  $array = $myconfig;

  $keys = explode('.', $path);
  foreach ($keys as $key) {
    echo "Looking for $key\n";
    var_dump($array);

    if (isset($array[$key])) {
      $array = $array[$key];
    } else {
      echo "PATH NOT FOUND: $path\n";
      throw new Exception("Path not found: " . $path);
    }
  }
  echo "********* found **********\n";
  var_dump($array);
  if (is_array($array)) {
    # If we have an array, then display the various keys
    echo implode("\n", array_keys($array)) . "\n";
  } else {
    echo $array;
  }
}

if (isset($argc)) {
  if (($argc == 2) && (substr($argv[0], -strlen(basename(__FILE__))) == basename(__FILE__))) {
    myShowConfigByPathForCmdLine($argv[1]);
  }
}
