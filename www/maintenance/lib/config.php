<?php

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/Database.php";

/* ***************** DEBUG ************** */
global $debug;

# verbosity: 1, 2, 3
$debug = isset($_REQUEST["debug"]) ? intval($_REQUEST["debug"]) : 0;

if ($debug > 0) {
    \Jehon\Maintenance\Database::debug(true);
}

/* ***************** myconfig ************** */

global $myconfig;

if (!$myconfig["security"]["key"]) {
    die("No security.admin configured");
}

/* ***************** functions ************** */

function fatalError($code, $msg)
{
    http_response_code($code);
    die($msg);
}

global $db;
$db = new \Jehon\Maintenance\Database(
    "mysql:dbname={$myconfig["database"]["schema"]};host={$myconfig["database"]["host"]}",
    $myconfig["database"]["username"],
    $myconfig["database"]["password"]
);
