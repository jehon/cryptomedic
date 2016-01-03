<?php
$uri = $_SERVER["REQUEST_URI"];
$uri = parse_url($uri, PHP_URL_PATH);

if (substr($uri, 0, strlen("/cryptomedic")) != "/cryptomedic") {
  die("Not found");
}
$uri = preg_replace("%/cryptomedic/%", "/", $uri);

// Route the cryptomedic URIs:

if (substr($uri, 0, 6) == "/api/v") {
  preg_match("%^/api/v([^/]*)/%", $uri, $version);
  require __DIR__ . "/../" . $version[0] . "/public/index.php";
  return true;
}

if (substr($uri, 0, 7) == "/cache/") {
  // $_REQUEST['target'] = preg_replace("%/cache/%", "", $uri);
  require __DIR__ . "/../" . $uri;
  return true;
}

if (substr($uri, 0, 7) == "/build/") {
  if (!file_exists(__DIR__ . "/../" . $uri)) {
    $uri = str_replace("/build/", "/app/", $uri);
  }
}

$file = __DIR__ . "/../" . $uri;
if (file_exists($file)) {
  switch(pathinfo($file, PATHINFO_EXTENSION)) {
    case 'html':
      header("Content-type: text/html");
      break;
    case 'css':
      header("Content-type: text/css");
      break;
    case 'js':
      header("Content-type: text/script");
      break;
    default:
      header("Content-type: " . finfo_file(finfo_open(FILEINFO_MIME_TYPE), $file));
  }

  readfile($file);
  return true;
}

return false;
