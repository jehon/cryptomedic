<?php

namespace Jehon\Maintenance\Lib;

require_once(__DIR__ . "/../../../autoload.php");

function isServedLocally() {
  if (php_sapi_name() == "cli") {
    return true;
  }
	return ($_SERVER['HTTP_HOST'] == "localhost");
}
