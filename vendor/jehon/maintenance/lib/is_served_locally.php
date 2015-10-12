<?php

namespace Jehon\Maintenance\Lib;

require_once(__DIR__ . "/../vendor/autoload.php");

function isServedLocally() {
	return ($_SERVER['HTTP_HOST'] == "localhost");
}
