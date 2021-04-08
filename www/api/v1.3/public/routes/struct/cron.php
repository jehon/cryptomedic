<?php

namespace Routes;

require_once(__DIR__ . '/../../app/bootstrap.php');

use Cryptomedic\Lib\Database;

echo "<h3>Removing too old browser_features</h3>";
$n = Database::exec("
    DELETE FROM browser_features
    WHERE updated_at < curdate() - interval 6 month
    ");
echo "$n lines removed";

echo "<h3>Removing too old browser_login</h3>";
$n = Database::exec("
    DELETE FROM browser_login
    WHERE updated_at < curdate() - interval 6 month
    ");
echo "$n lines removed";

http_response_code(200);
