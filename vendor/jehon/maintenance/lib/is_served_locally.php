<?php

namespace Jehon\Maintenance\Lib;

require_once(__DIR__ . "/../../../autoload.php");

function isServedLocally() {
	return ($_SERVER['HTTP_HOST'] == "localhost");
}
