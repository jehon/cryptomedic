<?php

require_once __DIR__ . "/../../config.php";

global $myconfig;

if (php_sapi_name() != "cli") {
  if (!$myconfig["security"]["key"]) {
    die("No security.admin configured");
  }

  if (!array_key_exists("pwd", $_REQUEST)) {
    die("Not allowed");
  }

  if ($_REQUEST["pwd"] != $myconfig["security"]["key"]) {
    die("Not allowed");
  }
}
