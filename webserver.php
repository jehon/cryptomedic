<?php


$uri = $_SERVER["REQUEST_URI"];
$path = parse_url($uri,  PHP_URL_PATH);

if (substr($path, 0, 4) === "/api") {
  require_once("www/api/v1.2/server.php");
  return true;
}


define("www", __DIR__ . "/www/");
$file = constant("www") . $path;
if (!file_exists($file)) {
  header("I say: Not found", 404);
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
