<?php
require_once(__DIR__ . "/../../amd_listings.php");

$labels = $server->getDatabase()->getTable("labels");

function unreferenceArray($table, $array) {
	foreach($array as $f => $v) {
		$array[$f] = unreference($table, $f, $v);
	}
	return $array;
}

function unreference($table, $field, $value) {
	global $labels;
	global $model_listing;
	if (array_key_exists("$table.$field", $model_listing)) {
		$res = $labels->rowGet($value);
		if ($res) {
			return $res["english"];
		}
	}
	return $value;
}
