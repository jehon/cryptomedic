<?php
// @codeCoverageIgnoreStart

namespace Cryptomedic\Lib;

global $cachedRequest;
if (!isset($cachedRequest)) {
    $cachedRequest = $_REQUEST;
}

class Request {
    static function hasParam($name) {
        global $cachedRequest;
        if (!array_key_exists($name, $cachedRequest)) {
            return false;
        }
        return !!$_REQUEST[$name];
    }

    static function getParam($name) {
        if (self::hasParam($name)) {
            return $_REQUEST($name);
        }
        return "";
    }

    static function isParam($name) {
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

    static function replyWith($data) {
        header('Content-Type: application/json');
        echo json_encode($data);

        // if (self::getHeader('Accept')) {
        //     if (preg_match('/.*text/html.*/', self::getHeader('Accept'))) {
        //         echo "<pre>";
        //     }
        // }
    }
}
