<?php


$uri = $_SERVER["REQUEST_URI"];
$path = parse_url($uri,  PHP_URL_PATH);

if (substr($path, 0, 4) === "/api") {
  $v = explode("/", $path)[2];
  require_once("www/api/$v/server.php");
  return true;
}

if ($path == "") {
  $path = "/";
}

if (substr($path, -1, 1) == "/") {
  $path = $path . "index.html";
}

define("www", __DIR__ . "/www/");
$file = constant("www") . $path;
if (!file_exists($file)) {
  header("I say: Not found", 404);
  return true;
}

switch(pathinfo($file, PATHINFO_EXTENSION)) {
  case "js":
    header("Content-Type: text/javascript", true);
    break;
  case "css":
    header("Content-Type: text/css", true);
    break;
  case "html":
    header("Content-Type: text/html", true);
    break;
  default:
    header("Content-Type: " . mime_content_type($file));
    break;
}
header('Content-Length: ' . filesize($file));
readfile($file);

return true;
