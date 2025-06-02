<?php

use Jehon\Maintenance;

try {
    ob_start();
    http_response_code(418);
    $res = true;
    echo "<pre>\n";
    echo "## Check\n";

    echo "PHP Version: " . phpversion() . "\n";

    require_once __DIR__ . "/lib/config.php";
    require_once __DIR__ . "/lib/database.php";

    echo "MySQL Version: " .
        $db->pdo->getAttribute(PDO::ATTR_SERVER_VERSION) .
        "\n";
    $dbVersion = $db->getVersion();
    $fsVersion = Jehon\Maintenance\getVersionIn(
        $myconfig["database"]["versions"]
    );
    echo "\n";
    echo "- Structure version: $dbVersion\n";
    echo "- Filesystem version: $fsVersion\n";

    if ($dbVersion == $fsVersion) {
        echo "Version match\n";
    } else {
        echo "!! Version mismatch\n";
        throw new Error("Test failed");
    }

    echo "\n";
    http_response_code(200);
} catch (Throwable $e) {
    echo "Exception<br>\n";
    var_dump($e);
    http_response_code(500);
}

while (@ob_end_flush());
