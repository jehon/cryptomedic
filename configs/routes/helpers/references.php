<?php
require_once(__DIR__ . "/../../amd_listings.php");

$labels = $server->getDatabase()->getTable("labels");

function unreferenceObject($table, $array) {
	foreach($array as $f => $v) {
		$array[$f] = unreference($v, $table, $f);
	}
	return $array;
}

function unreference($value, $table = "", $field = "") {
	global $labels;
	if ($table != "") {
		global $model_listing;
		if (!array_key_exists("$table.$field", $model_listing)) {
			return $value;
		}		
	}
	$res = $labels->rowGet($value);
	if ($res) {
		return $res["english"];
	}
	return $value;
}

function buildLinkedList($list) {
	global $server;
	$labels = $server->getDatabase()->getTable("labels");

	$res = array();
	foreach($list as $k => $v){
		if (!is_numeric($v)) continue;
		$l = $labels->rowGet($v);
		if ($l["english"] != $v && $l["english"] != "") {
			$res[$v] = $l["english"];
		} else {
			$res[$v] = $v;
		}
	}
	return $res;

}
