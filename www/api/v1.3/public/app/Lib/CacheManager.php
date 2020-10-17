<?php

namespace Cryptomedic\Lib;

use Cryptomedic\Lib\Database;
use Cryptomedic\Lib\Lists;

define('MY_CACHE_FILE',  constant('MY_FOLDER_TMP') . 'cache.php');

class CacheManager {
    static private $cached = null;

    static function generate(): array {
        /*
        * Initialize
        */

        // Build up the generated variable
        $cached = [
            "generated_at" => date("Y-m-d H-i-s"),
            Database::cacheName() => Database::cacheGenerate(),
            Lists::cacheName() => Lists::cacheGenerate()
        ];

        /*
         * Write it to file
         */
        file_put_contents(constant('MY_CACHE_FILE'), serialize($cached))
            || die("Could not save data to file " . constant('MY_CACHE_FILE'));

        self::$cached = $cached;

        return $cached;
    }

    static function load(): bool {
        if (self::$cached) {
            return false;
        }

        if (!file_exists(constant('MY_CACHE_FILE'))) {
            self::$cached = self::generate();
            return true;
        }

        // We have the cache file, let's load it
        self::$cached = unserialize(file_get_contents(constant('MY_CACHE_FILE')));
        return true;
    }

    static function propagate(): void {
        self::load();

        Database::$cached = self::$cached[Database::cacheName()];
        Lists::$cached = self::$cached[Lists::cacheName()];
    }

    static function get(): array {
        self::load();
        return self::$cached;
    }
}


// flock($myfile,LOCK_SH);
// $read=file_get_contents('test.txt');
// fclose($myfile);
