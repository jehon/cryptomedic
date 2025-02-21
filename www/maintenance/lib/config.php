<?php

require_once __DIR__ . "/../../config.php";

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

$myconfig["database"]["versions"] = __DIR__ . "/../versions";
