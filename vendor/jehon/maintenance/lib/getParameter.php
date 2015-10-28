<?php
namespace Jehon\Maintenance\Lib;

use \Exception;

require_once(__DIR__ . "/../../../autoload.php");

global $maintenance;

function getParameter($name, $default = null) {
	if (array_key_exists($name, $_REQUEST)) {
		return $_REQUEST[$name];
	} else {
		if ($default === null) {
			throw new Exception("Could not get key $name");
		} else {
			return $default;
		}
	}
}
