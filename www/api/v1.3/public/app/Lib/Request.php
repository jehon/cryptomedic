<?php
// @codeCoverageIgnoreStart

namespace Cryptomedic\Lib;

global $cachedRequest;
if (!isset($cachedRequest)) {
    $cachedRequest = $_REQUEST;
}

class Request {
    static function hasParam(string $name): bool {
        global $cachedRequest;
        if (!array_key_exists($name, $cachedRequest)) {
            return false;
        }
        return !!$_REQUEST[$name];
    }

    static function getParam(string $name): string {
        if (self::hasParam($name)) {
            return $_REQUEST($name);
        }
        return "";
    }

    /**
     * Return the value of the boolean parameter
     */
    static function isParam(string $name): bool {
        // if (!self::hasParam(($name))) {
        //     return false;
        // }
        $val = self::getParam($name);
        if ($val == "1" || strcasecmp($val, "true") == 0) {
            return true;
        }
        return false;
    }

    // static function getHeader($name) {
    //     return getallheaders()[$name];
    // }

    static function replyWith(array $data): void {
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
