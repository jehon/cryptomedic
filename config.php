<?php

global $myconfig;

define("CR_PRJ_ROOT", __DIR__);

$myconfig = [
  'database' => [
    'host'       => 'database',
    'schema'     => 'cryptomedic',
    'username'   => 'mysql_cryptomedic_username',
    'password'   => 'mysql_cryptomedic_password',
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

    # Storage of persistent data (pdf, image, ...)
    'backups'    => __DIR__ . "/live/backups/",

    # Storage of temporary files
    'temporary'  => __DIR__ . "/tmp/integration/webTemp/"
  ]
];

if (file_exists(__DIR__ . '/config-custom.php')) {
  # config-custom hold the configuration of the project
  require(__DIR__ . '/config-custom.php');
}

if (file_exists(__DIR__ . '/config-site.php')) {
  # This file will be protected by the prj-go-site.sh
  require(__DIR__ . '/config-site.php');
}

// if (isset($argc)) {
//   if (($argc == 2) && (substr($argv[0], -strlen(basename(__FILE__))) == basename(__FILE__))) {
//     myShowConfigByPathForCmdLine($argv[1]);
//   }
// }
