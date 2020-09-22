<?php

namespace Routes;

require_once(__DIR__ . '/../../app/bootstrap.php');

use Cryptomedic\Lib\Request;
use Cryptomedic\Lib\Cache;

if (Request::hasParam('force')) {
    Cache::generate();
}

if (!Request::hasParam('quiet')) {
    Request::replyWith(Cache::get());
}

http_response_code(200);
