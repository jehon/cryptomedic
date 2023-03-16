<?php

require_once(__DIR__ . "./lib/config.php");
require_once(__DIR__ . "./lib/protect.php");

global $myconfig;

function deleteRecursively($filepath) {
    if (is_dir($filepath)) {
        if (substr($filepath, strlen($filepath) - 1, 1) != '/') {
            $filepath .= '/';
        }
        $files = glob($filepath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                deleteRecursively($file);
            } else {
                unlink($file);
            }
        }
    }
    rmdir($filepath);
}

function deleteFileFromGlob($glob) {
    $files = glob($glob);
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteRecursively($file);
        }

        if (is_file($file)) {
            echo "Removing $file\n";
            unlink($file);
        }
    }
}

try {
    http_response_code(500);
    ob_start();
    echo "\nRunning\n";

    if (! is_dir(__DIR__ . "/../api/bootstrap/cache/")) {
        mkdir(__DIR__ . "/../api/bootstrap/cache/");
    }

    deleteFileFromGlob(__DIR__ . "/../api/bootstrap/cache/*");

    if ($myconfig['dev']) {
        // Clean up local structure
        if (file_exists('/tmp/laravel')) {
            deleteFileFromGlob('/tmp/laravel/*');
        }
    }

    echo "\n\nDone " . basename(__FILE__) . "\n";
    http_response_code(200);
    ob_end_flush();
} catch (Exception $e) {
    http_response_code(500);
    ob_end_flush();
    echo "Failed: " . $e->getMessage();
}
