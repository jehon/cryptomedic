<?php

define("PROXY_VERSION", "1.0");
define("PROXY_TEMPLATE_ROOT", __DIR__ . "/www/templates/");

function mylog($uri, $msg = "ok") {
  file_put_contents(__DIR__ . "/tmp/loader.log",
      $uri . ": " . $msg . "\n",
      FILE_APPEND);
}

function goWithUri($uri) {
  mylog($uri);
  readfile('http://localhost:10080/' . $uri);
}

if ($argc < 2) {
  mylog("???", "Problem: no uri specified");
  die("Problem: no uri specified");
}

$uri = $argv[$argc - 1];
$uri = parse_url($uri, PHP_URL_PATH);

// Source: /vagrant/www/templates/templates/writes_ricketconsult.php
// Target: /api/v1.0/templates/writes_ricketconsult.php
if (substr($uri, 0, strlen(constant("PROXY_TEMPLATE_ROOT"))) == constant("PROXY_TEMPLATE_ROOT")) {
  $uri = str_replace(constant("PROXY_TEMPLATE_ROOT"), "/api/v" . constant("PROXY_VERSION") . "/", $uri);
  goWithUri($uri);
  return 0;
}

mylog($uri, "$uri does not exists");
return 255;
