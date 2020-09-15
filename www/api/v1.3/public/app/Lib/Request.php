<?php

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
        return !! $_REQUEST[$name];
    }
}
