<pre>
<?php

require_once(__DIR__ . '/../lib/data.php');
require_once(__DIR__ . '/../lib/request.php');

use App\Cryptomedic\Lib\Request;
use App\Cryptomedic\Lib\Cache;


if (Request\requestHasParam('force')) {
    Cache\generateCache();
}

Cache\loadCache();

print_r(constant('MY_CACHED'));

http_response_code(200);
