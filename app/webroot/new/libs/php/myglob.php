<?php

function myglob($glob) {
	// code snippet
	$path = dirname($glob);
	$pattern = basename($glob);

	$handle = opendir($path);
	if ($handle === false) return false;
	$list = array();

    while (false !== ($file = readdir($handle))) {
    	if ($file == ".") continue;
    	if ($file == "..") continue;
    	if (fnmatch($pattern, $file)) {
    		$list[] = $path . DIRECTORY_SEPARATOR . $file;
    	}
    }
    closedir($handle);
    natsort($list);
    return $list;
}

// function require_all($glob) {
//     $list = myglob($glob);
//     foreach($list as $f) {
//         require_once($f);
//     }
// }
