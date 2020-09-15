<?php

namespace Routes;

echo "<pre>";

require_once(__DIR__ . '/../../app/bootstrap.php');

use Cryptomedic\Lib\Request;
use Cryptomedic\Lib\Cache;

if (Request::hasParam('force')) {
    Cache::generate();
}

print_r(Cache::get());

http_response_code(200);
