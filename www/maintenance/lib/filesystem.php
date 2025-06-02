<?php

namespace Jehon\Maintenance;

/* ***************** DEBUG ************** */
global $debug;

function myglob($glob, $recursive = false)
{
    $pattern = basename($glob);
    $path = dirname($glob);
    if ($path == DIRECTORY_SEPARATOR) {
        return ["."];
    }

    if (!is_readable($path)) {
        throw new Exception("Path is not readable $path");
    }

    $handle = opendir($path);
    if ($handle === false) {
        return [];
    }
    $list = [];
    while (false !== ($file = readdir($handle))) {
        if ($file == ".") {
            continue;
        }
        if ($file == "..") {
            continue;
        }
        if (
            is_file(dirname($glob) . DIRECTORY_SEPARATOR . $file) &&
            fnmatch($pattern, $file)
        ) {
            $list[] = $path . DIRECTORY_SEPARATOR . $file;
        }
        if (
            is_dir(dirname($glob) . DIRECTORY_SEPARATOR . $file) &&
            $recursive
        ) {
            $res = myglob(
                dirname($glob) .
                    DIRECTORY_SEPARATOR .
                    $file .
                    DIRECTORY_SEPARATOR .
                    basename($glob),
                $recursive
            );
            $list = array_merge($list, $res);
        }
    }
    closedir($handle);
    natsort($list);
    return $list;
}

function getVersionIn($pathOrFile)
{
    if (is_dir($pathOrFile)) {
        $list = myglob($pathOrFile . "/[0-9]*.sql");
        natsort($list);
        return getVersionIn(array_pop($list));
    }

    $version = basename($pathOrFile, ".sql");
    if (preg_match("~^(\d+)~", basename($pathOrFile, ".sql"), $nn)) {
        if (count($nn) > 1) {
            return $nn[1];
        }
    }
    return "";
}
