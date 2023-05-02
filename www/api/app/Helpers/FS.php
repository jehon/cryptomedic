<?php namespace App\Helpers;

class FS {
  static function glob($glob, $recursive = false) {
    $pattern = basename($glob);
    $path = dirname($glob);
    if ($path == DIRECTORY_SEPARATOR) return array(".");

    if (!is_readable($path)) {
      throw new Exception("Path is not readable $path");
    }

    $handle = opendir($path);
    if ($handle === false) {
      return array();
    }
    $list = array();
    while (false !== ($file = readdir($handle))) {
      if ($file == ".") {
        continue;
      }
      if ($file == "..") {
        continue;
      }
      if (is_file(dirname($glob) . DIRECTORY_SEPARATOR . $file) && fnmatch($pattern, $file)) {
        $list[] = $path . DIRECTORY_SEPARATOR . $file;
      }
      if (is_dir(dirname($glob) . DIRECTORY_SEPARATOR . $file) && $recursive) {
        $res = myglob(dirname($glob) . DIRECTORY_SEPARATOR . $file . DIRECTORY_SEPARATOR . basename($glob), $recursive);
        $list = array_merge($list, $res);
      }
    }
    closedir($handle);
    natsort($list);
    return $list;
  }
}
