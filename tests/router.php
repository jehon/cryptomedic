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

if ($argc != 2) {
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

// Redirect to api
// if (substr($uri, 0, 6) == "/api/v") {
//   preg_match("%^/api/(v[^/]*)/%", $uri, $version);
//   // $version[0] is the matched part, it is too general
//   return goWithUri($uri);
// }

// $file = __DIR__ . "/../www" . $uri;
// if (file_exists($file)) {
//   switch(pathinfo($file, PATHINFO_EXTENSION)) {
//     case 'html':
//       header("Content-type: text/html");
//       break;
//     case 'css':
//       header("Content-type: text/css");
//       break;
//     case 'js':
//       header("Content-type: text/script");
//       break;
//     default:
//       header("Content-type: " . finfo_file(finfo_open(FILEINFO_MIME_TYPE), $file));
//   }
//   readfile($file);
//   return report();
// }

return report($uri, "$file does not exists");
