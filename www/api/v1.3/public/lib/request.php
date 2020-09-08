<?php

namespace App\Cryptomedic\Lib\Request;

function requestHasParam($name) {
    if (!array_key_exists($name, $_REQUEST)) {
        return false;
    }
    return !! $_REQUEST[$name];
}

