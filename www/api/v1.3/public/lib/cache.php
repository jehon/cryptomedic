<?php

namespace App\Cryptomedic\Lib\Cache;

global $myconfig;
require_once(__DIR__ . '/config.php');

define('MY_CACHE_FILE',  constant('MY_FOLDER_TMP') . 'cache.php');

function loadCache() {
    if (!file_exists(constant('MY_CACHE_FILE'))) {
        generateCache();
    }

    require(constant('MY_CACHE_FILE'));
}

// $thread = new \Thread();
function generateCache() {
    generateCacheNotProtected();
    // $thread->synchronized(generateCacheNotProtected);
}

function generateCacheNotProtected() {
    /*
    * Initialize
    */

    global $myconfig;
    require_once(__DIR__ . '/config.php');

    // // Remove previously generated file
    // unlink(constant('MY_CACHE_FILE'));

    /*
    * Various generators
    */

    global $databaseStructure;
    require(__DIR__ . '/cache-generators/database-structure.php');

    /*
    * Write it to file
    */

    // Build up the generated variable
    $cached = [
        "generated_at" => date("Y-m-d H-i-s"),
        "dataStructure" => $databaseStructure
    ];

    // Build up the exported text
    $export = 'define("MY_CACHED", ' . var_export($cached, true) . ');';

    // Write to file
    file_put_contents(constant('MY_CACHE_FILE'), "<?php \n $export") 
        || die("Could not save data to file " . constant('MY_CACHE_FILE'));
}

if (defined('PATCH_DB')) {
    generateCache();
}
