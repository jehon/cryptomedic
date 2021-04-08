<?php

namespace Routes;

define("BR_FILE", __DIR__ . "../../../../../../build/browsers.json");

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

$supported = [];
foreach (json_decode(file_get_contents(constant("BR_FILE")), true)["browsers"] as $v) {
    $b = explode(" ", $v)[0];
    $v = explode(" ", $v)[1];
    if (!\array_key_exists($b, $supported)) {
        $supported[$b] = ["max" => 0];
    }
    $supported[$b]["max"] = max($supported[$b]["max"], $v);
    $supported[$b][] = $v;
};

// var_dump($supported);

$detected = [];

?>
<style>
    table,
    tr,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
    }
</style>

<table>
    <thead>
        <th>Browser name</th>
        <th>Browser version</th>
        <th>Browser version (full)</th>
        <th>OS</th>
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
        $bn = strtolower(explode(" ", $b['browser_name'])[0]);
        $bv = explode(".", $b['browser_version'])[0];

        if (!array_key_exists($bn, $detected)) {
            $detected[$bn] = [
                "min" => $bv,
                "max" => $bv,
                "min-last" => $b['last_login']
            ];
        } else {
            $detected[$bn]["max"] = max($detected[$bn]['max'], $bv);
            if ($bv < $detected[$bn]["min"]) {
                $detected[$bn]["min"] = min($detected[$bn]['min'], $bv);
                $detected[$bn]["min-last"] = $b['last_login'];
            } else if ($bv == $detected[$bn]["min"]) {
                $detected[$bn]["min-last"] = min($detected[$bn]['min-last'], $b['last_login']);
            }
        }

        echo "<tr>";
        echo "<td>${b['browser_name']}</td>";
        echo "<td>${bv}</td>";
        echo "<td>${b['browser_version']}</td>";
        echo "<td>${b['os']}</td>";
        echo "<td>" . substr($b['last_login'], 0, 7) . "</td>";
        echo "<td>${b['last_login_name']}</td>";
        echo "<td>${b['screen_width']}</td>";
        echo "<td>${b['screen_height']}</td>";
        foreach ($b as $k => $v) {
            if (substr($k, 0, 5) == 'feat_') {
                echo "<td>${v}</td>";
            }
        }
        $support = "not supported $bn - $bv";
        if (array_key_exists($bn, $supported)) {
            if (in_array($bv, $supported[$bn])) {
                $support = "yes";
            } else if (max($bv, $supported[$bn]["max"]) == $bv) {
                $support = "yes (newer)";
            } else {
                $support = "!! not supported version ($bv) !!";
            }
        } else {
            $support = "unknown $bn ($bv)";
        }
        echo "<td>$support</td>";

        // echo "<td>${b['browser_uuid']}</td>";
        echo "</tr>";
    }
    ?>
</table>

<h1>Summary</h1>
<table>
    <thead>
        <th>Browser</th>
        <th>Max version</th>
        <th>Min version</th>
        <th>Min version last usage</th>
    </thead>
    <?php
    foreach ($detected as $b => $d) {
        echo "<tr>";
        echo "<td>$b</td>";
        echo "<td>${d['max']}</td>";
        echo "<td>${d['min']}</td>";
        echo "<td>${d['min-last']}</td>";
        echo "</tr>";
    }
    print_r($detected);

    ?>
</table>
<?php
http_response_code(200);
