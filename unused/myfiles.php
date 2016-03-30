<?php

class MyFiles {
	static $excludes = [ ".htaccess " ];

	/**
      * Glob workaround for restricted hosting (glob is disabled)
      *
      */
  static function glob($glob, $recursive = false) {
  	$pattern = basename($glob);
  	$path = dirname($glob);
		if ($path == DIRECTORY_SEPARATOR) {
			return ".";
		}

  	$handle = opendir($path);
  	if ($handle === false) {
      return false;
    }
  	$list = array();

    while (false !== ($file = readdir($handle))) {
    	if ($file == ".") {
        continue;
      }
    	if ($file == "..") {
        continue;
      }
			if (in_array($file, static::$excludes)) {
				continue;
			}
      if (is_file(dirname($glob) . DIRECTORY_SEPARATOR . $file) && fnmatch($pattern, $file)) {
    		$list[] = $path . DIRECTORY_SEPARATOR . $file;
    	}
    	if (is_dir(dirname($glob) . DIRECTORY_SEPARATOR . $file) && $recursive) {
    		$res = static::glob(dirname($glob) . DIRECTORY_SEPARATOR . $file . DIRECTORY_SEPARATOR . basename($glob), $recursive);
    		$list = array_merge($list, $res);
    	}
    }
    closedir($handle);
    natsort($list);
    return $list;
  }
}
