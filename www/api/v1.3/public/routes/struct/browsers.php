<?php

namespace Routes;

require_once(__DIR__ . '/../../app/bootstrap.php');

use Cryptomedic\Lib\Database;

$browsers = Database::selectAsArray("
        SELECT
            bf.*,
            bl.updated_at AS last_login, bl.lastuser AS last_login_name
        FROM browser_features AS bf
        LEFT OUTER JOIN browser_login AS bl ON bf.browser_uuid = bl.browser_uuid
        ORDER BY browser_name ASC, browser_version ASC, last_login ASC
    ", "id");

$k0 = array_keys($browsers)[0];

?>
<style>
    table,
    tr,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>

<table>
    <thead>
        <th>Browser name</th>
        <th>Browser version</th>
        <th>Last login</th>
        <th>Last login name</th>
        <th>Width</th>
        <th>Height</th>
        <?php
        foreach ($browsers[$k0] as $k => $v) {
            if (substr($k, 0, 5) == 'feat_') {
                echo "<th>$k</th>";
            }
        }
        ?>
    </thead>
    <?php
    foreach ($browsers as $b) {
        echo "<tr>";
        echo "<td>${b['browser_name']}</td>";
        echo "<td>${b['browser_version']}</td>";
        echo "<td>" . substr($b['last_login'], 0, 7) . "</td>";
        echo "<td>${b['last_login_name']}</td>";
        echo "<td>${b['screen_width']}</td>";
        echo "<td>${b['screen_height']}</td>";
        foreach ($b as $k => $v) {
            if (substr($k, 0, 5) == 'feat_') {
                echo "<td>${v}</td>";
            }
        }
        // echo "<td>${b['browser_uuid']}</td>";
        echo "</tr>";
    }
    ?>
</table>
<?php

http_response_code(200);
