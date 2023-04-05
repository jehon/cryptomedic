<?php
ob_start();
http_response_code(500);

try {
	echo "<pre>";

    echo "\nRunning...\n";

    require_once(__DIR__ . "/lib/config.php");
    require_once(__DIR__ . "/lib/protect.php");

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

    function ensureFolderEmpty($path) {
        echo "ensureFolderEmpty: $path\n"; 
        $target = __DIR__ . "/../" . $path;
        if (!is_dir($target)) {
            mkdir($target);
        } else {
            echo " - removing files in $target\n";
            deleteFileFromGlob($target . "/*");
        }
    }

    ensureFolderEmpty("api/bootstrap/cache/");
    ensureFolderEmpty("api/bootstrap/sessions/");
    ensureFolderEmpty("api/bootstrap/views/");
    ensureFolderEmpty("../tmp/webTemp/");

    echo "\nDone " . basename(__FILE__) . "\n";
    http_response_code(200);
    ob_end_flush();
} catch (Exception $e) {
    http_response_code(500);
    ob_end_flush();
    echo "Failed: " . $e->getMessage();
}
