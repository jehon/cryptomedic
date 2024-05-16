<?php

try {
    ob_start();
    http_response_code(500);
    $res = true;
    echo "<h1>Check</h1>";

    echo "PHP Version: " . phpversion() . "<br>\n";

    require_once __DIR__ . "/lib/config.php";

    echo "MySQL Version: " .
        $db->pdo->getAttribute(PDO::ATTR_SERVER_VERSION) .
        "<br>\n";
    echo "Structure version: " . $db->getVersion() . "<br>\n";

    echo "\n<br><br>";

    if ($res) {
        echo "Ok<br>\n";
        http_response_code(200);
    } else {
        echo "Failed<br>\n";
        http_response_code(503);
    }
} catch (e) {
    echo "Exception<br>\n";
    var_dump($e);
    http_response_code(503);
}
ob_flush();

// TODO: remove this

// $ip = "2001:41d0:404:200:0:0:0:2a3f";
$ip = "135.125.106.114";
$username = "test";
$password = "test";
if (in_array($_REQUEST, "ip")) {
    $ip = $_REQUEST["ip"];
}
if (in_array($_REQUEST, "username")) {
    $username = $_REQUEST["username"];
}
if (in_array($_REQUEST, "password")) {
    $password = $_REQUEST["password"];
}
$dsn = "mysql:host=$ip;dbname=" . $myconfig["database"]["schema"];
echo "DSN: $dsn<br>\n";

try {
    $pdo = new PDO($dsn, $username, $password);
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
