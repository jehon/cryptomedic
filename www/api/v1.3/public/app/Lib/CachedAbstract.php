<?php

namespace Cryptomedic\Lib;

define('MY_CACHE_FILE',  constant('MY_FOLDER_TMP') . 'cache.php');

/**
 * Configure a cache of the data.
 *
 * The cached data is initialized by cacheInit (called by the cache manager)
 *
 * The cached data is available as self::$cached
 *
 */

$cacheData = false;
abstract class CachedAbstract {
    /** @var array to store all data from the file - private! */
    private static $allCachedData = null;

    // /** @var array<CachedAbstract> to register for generating cache */
    // private static $cacheGenerators = [];

    static private function cacheLoadAll(): bool {
        if (self::$allCachedData) {
            return false;
        }

        if (!file_exists(constant('MY_CACHE_FILE'))) {
            self::cacheGenerateAll();
            return true;
        }

        // We have the cache file, let's load it
        self::$allCachedData = unserialize(file_get_contents(constant('MY_CACHE_FILE')));
        return true;
    }

    static public function cacheGenerateAll(): array {
        // Build up the generated variable
        self::$allCachedData = [
            "generated_at" => date("Y-m-d H-i-s")
        ];

        // TODO: this is a fixed list of caches
        self::$allCachedData[DatabaseStructure::cacheName()] = DatabaseStructure::cacheGenerate();
        self::$allCachedData[Lists::cacheName()] = Lists::cacheGenerate();

        file_put_contents(constant('MY_CACHE_FILE'), serialize(self::$allCachedData))
            || die("Could not save data to file " . constant('MY_CACHE_FILE'));

        return self::$allCachedData;
    }

    static public function cacheName(): string {
        return get_called_class();
    }

    //
    //
    // For subclass functions
    //
    //

    /**
     * Initialize to be able to generate cache
     */
    static public function init(): void {
        // self::$cacheGenerators[] = function () {
        //     self::cacheGenerate();
        // };
    }

    /**
     * Get data from the cache for the particular object
     */
    static protected function getCachedData(): array {
        self::cacheLoadAll();
        return self::$allCachedData[self::cacheName()];
    }

    /**
     * Force regenerate the cache
     */
    static public function cacheIsObsolete(): void {
        self::cacheGenerateAll();
    }

    /**
     * Should return the cached data
     */
    abstract static protected function cacheGenerate(): array;
}
