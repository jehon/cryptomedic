<?php

namespace Cryptomedic\Lib;

class StringsOps {
    static function startsWith(string $haystack, string $needle): bool {
        return substr_compare($haystack, $needle, 0, strlen($needle)) === 0;
    }

    static function endsWith(string $haystack, string $needle): bool {
        return substr_compare($haystack, $needle, -strlen($needle)) === 0;
    }
}
