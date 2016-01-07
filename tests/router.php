<?php
global $uri;
$uri = $_SERVER["REQUEST_URI"];
$uri = parse_url($uri, PHP_URL_PATH);

function mylog($msg) {
  global $uri;
  file_put_contents(__DIR__ . "/../tmp/router.log",
      $uri . ": " . $msg . "\n",
      FILE_APPEND);
}

function report($msg = true) {
  global $uri;
  if ($msg === true) {
    // mylog("ok");
    die();
  }
  mylog($msg);
  die();
}


if (substr($uri, 0, strlen("/cryptomedic")) != "/cryptomedic") {
  // Special files out of the path
  if ($uri == "/favicon.ico") {
    readfile(__DIR__ . "/../favicon.ico");
    return report();
  }

  return report("cryptomedic path not found");
}
$uri = preg_replace("%/cryptomedic/%", "/", $uri);

// Route the cryptomedic URIs:

if (substr($uri, 0, 6) == "/api/v") {
  preg_match("%^/api/v([^/]*)/%", $uri, $version);
  require __DIR__ . "/../" . $version[0] . "/public/index.php";
  return report();
}

// if (substr($uri, 0, 7) == "/cache/") {
//   require __DIR__ . "/../" . $uri;
//   return true;
// }

// Up to now, we can include app files in the build workspace
if (substr($uri, 0, 7) == "/build/") {
  if (!file_exists(__DIR__ . "/.." . $uri)) {
    mylog("Build -> App: $uri");
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
  return report();
}

return report("$file does not exists");
