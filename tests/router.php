<?php
$uri = $_SERVER["REQUEST_URI"];

if (substr($uri, 0, strlen("/cryptomedic")) != "/cryptomedic") {
  die("Not found");
}
$uri = preg_replace("%/cryptomedic/%", "/", $uri);

// Route the cryptomedic URIs:

if (substr($uri, 0, 6) == "/api/v") {
  preg_match("%^/api/v(.*)/%", $uri, $version);
  require __DIR__ . "/../" . $version[0] . "/public/index.php";
  return true;
}

if (substr($uri, 0, 7) == "/cache/") {
  $_REQUEST['target'] = preg_replace("%/cache/%", "", $uri);
  require __DIR__ . "/../cache/generator.php";
  return true;
}

if (substr($uri, 0, 14) == "/app/index.php") {
  require __DIR__ . "/../app/index.php";
  return true;
}

$file = __DIR__ . "/../" . $uri;
if (file_exists($file)) {
  $finfo = finfo_open(FILEINFO_MIME_TYPE);
  header("Content-type: " . finfo_file($finfo, $file));
  readfile($file);
  return true;
}

return false;
