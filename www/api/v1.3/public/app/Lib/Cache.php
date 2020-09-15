<?php

namespace Cryptomedic\Lib;

global $myconfig;

define('MY_CACHE_FILE',  constant('MY_FOLDER_TMP') . 'cache.php');

class Cache {
    static function get() {
        self::load();
        return constant('MY_CACHED');        
    }

    static function load() {
        if (defined('MY_CACHED')) {
            return false;
        }

        if (!file_exists(constant('MY_CACHE_FILE'))) {
            self::generate();
        }

        require(constant('MY_CACHE_FILE'));
    }

    // $thread = new \Thread();
    static function generate() {
        /*
        * Initialize
        */

        global $myconfig;

        // // Remove previously generated file
        // unlink(constant('MY_CACHE_FILE'));

        /*
        * Various generators
        */

        global $databaseStructure;
        require(__DIR__ . '/cache-generators/database-structure.php');

        global $dataListings;
        require(__DIR__ . '/cache-generators/lists.php');

        /*
        * Write it to file
        */

        // Build up the generated variable
        $cached = [
            "generated_at" => date("Y-m-d H-i-s"),
            "dataStructure" => $databaseStructure,
            "dataListings" => $dataListings
        ];

        // Build up the exported text
        $export = 'define("MY_CACHED", ' . var_export($cached, true) . ');';

        // Write to file
        file_put_contents(constant('MY_CACHE_FILE'), "<?php \n $export") 
            || die("Could not save data to file " . constant('MY_CACHE_FILE'));
    }
} 
