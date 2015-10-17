<?php
namespace Jehon\Maintenance\Lib;

use \Exception;

require_once(__DIR__ . "/../../../autoload.php");

global $maintenance;

// if (!is_array($maintenance)) {
// 	echo "\$Maintenance:\n";
// 	var_dump($maintenance);
// 	die("Maintenance is not an array");
// }

// use Dflydev\DotAccessData\Data;

function getParameter($name, $default = null) {
	// $data = new Data($_REQUEST);
	// $res = $data->get($name);

	if (array_key_exists($name, $_REQUEST)) {
		return $_REQUEST[$name];
	} else {
	// if ($res === null) {
		if ($default === null) {
			throw new Exception("Could not get key $name");
		} else {
			return $default;
		}
	}
}
