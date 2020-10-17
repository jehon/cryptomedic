<?php

namespace Cryptomedic\Lib;

use Cryptomedic\Lib\CacheManager;

trait CachedTrait {
    abstract static function cacheName(): string;
    abstract static function cacheGenerate(): array;

    static function cacheInit(): void {
        if (!self::$cached) {
            CacheManager::load();
            CacheManager::propagate();
        }
    }

    static function cacheObsolete(): void {
        CacheManager::generate();
    }

    static $cached = null;
}
