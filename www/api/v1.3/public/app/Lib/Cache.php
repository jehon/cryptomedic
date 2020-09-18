<?php

namespace Cryptomedic\Lib;
use Cryptomedic\Lib\Database;
use Cryptomedic\Lib\Lists;

global $myconfig;

define('MY_CACHE_FILE',  constant('MY_FOLDER_TMP') . 'cache.php');

class Cache {
    static private $cache = null;

    static function get(): array {
        self::load();
        return self::$cache;
    }

    static function load(): bool {
        if (self::$cache) {
            return false;
        }

        if (!file_exists(constant('MY_CACHE_FILE'))) {
            return self::generate();
        }

        self::$cache = unserialize(file_get_contents(constant('MY_CACHE_FILE')));
        // require(constant('MY_CACHE_FILE'));

        return true;
    }

    // $thread = new \Thread();
    static function generate(): array {
        /*
        * Initialize
        */

        global $myconfig;

        // // Remove previously generated file
        // unlink(constant('MY_CACHE_FILE'));

        // Build up the generated variable
        $cached = [
            "generated_at" => date("Y-m-d H-i-s"),
            "dataStructure" => Database::generateStructureData(),
            "dataListings" => Lists::generateLists()
        ];

        /*
         * Write it to file
         */
        file_put_contents(constant('MY_CACHE_FILE'), serialize($cached))
            || die("Could not save data to file " . constant('MY_CACHE_FILE'));
        
        return $cached;
    }
} 


// flock($myfile,LOCK_SH);
// $read=file_get_contents('test.txt');
// fclose($myfile);
