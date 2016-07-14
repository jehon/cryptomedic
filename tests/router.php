<?php

define("PROXY_VERSION", "1.0");

function mylog($uri, $msg = "ok") {
  file_put_contents(__DIR__ . "/../tmp/router.log",
      $uri . ": " . $msg . "\n",
      FILE_APPEND);
}

function goWithUri($uri) {
  mylog($uri);
  $_SERVER["REQUEST_URI"] = $uri;
  require __DIR__ . "/../www/api/v" . constant("PROXY_VERSION") . "/public/index.php";
}

if ($argc < 2) {
  mylog("???", "Problem: no uri specified");
  die("Problem: no uri specified");
}

$uri = $argv[1];
$uri = parse_url($uri, PHP_URL_PATH);

// Treat templates addressed by local file names
define("PROXY_TEMPLATE_ROOT", dirname(__DIR__) . "/www/templates/");
// Source: /vagrant/www/templates/templates/writes/ricketconsult.php
// Target: /api/v1.0/templates/writes/ricketconsult.php
if (substr($uri, 0, strlen(constant("PROXY_TEMPLATE_ROOT"))) == constant("PROXY_TEMPLATE_ROOT")) {
  $uri = str_replace(constant("PROXY_TEMPLATE_ROOT"), "/api/v" . constant("PROXY_VERSION") . "/", $uri);
  return goWithUri($uri);
}

return mylog($uri, "$file does not exists");
