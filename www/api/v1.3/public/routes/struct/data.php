<?php

namespace Routes;

require_once(__DIR__ . '/../../app/bootstrap.php');

use Cryptomedic\Lib\Request;
use Cryptomedic\Lib\CacheManager;

if (Request::hasParam('force')) {
    CacheManager::generate();
}

if (!Request::hasParam('quiet')) {
    Request::replyWith(CacheManager::get());
}

http_response_code(200);
