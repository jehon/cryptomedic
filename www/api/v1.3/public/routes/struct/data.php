<?php

namespace Routes;

require_once(__DIR__ . '/../../app/bootstrap.php');

use Cryptomedic\Lib\Request;
use Cryptomedic\Lib\DatabaseStructure;
use Cryptomedic\Lib\CachedAbstract;

if (Request::hasParam('force')) {
    CachedAbstract::cacheGenerateAll();
}

if (!Request::hasParam('quiet')) {
    Request::replyWith(DatabaseStructure::getDatabaseStructure());
}

http_response_code(200);
