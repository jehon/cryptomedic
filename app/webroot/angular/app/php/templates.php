<?php

require_once "../../../../../../maintenance.php";
require_once(__DIR__ . "/../../../../Lib/cryptomedic.php");

global $mysqli;
$mysqli = new mysqli($config['database']['host'],
		$config['database']['login'],
		$config['database']['password'],
		$config['database']['schema']
);

if ($mysqli->connect_errno) {
	die("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

function _label($key) {
	global $mysqli;
	if (is_numeric($key)) {
		$sql = "SELECT * FROM `labels` WHERE `id` = '$key' or `reference` = '$key'";
	} else {
		$sql = "SELECT * FROM `labels` WHERE `reference` = '$key'";
	}
	$res = $mysqli->query($sql);
	if ($res === false) {
		echo $mysqli->errno . ":\n" . $mysqli->error . "\n";
		throw new Exception("Syntax error in labels");
	}
	if ($res->num_rows > 1) {
		echo $sql;
		throw new Exception("Too much labels for '$key'");
	}
	if ($res->num_rows == 0) {
		return $key;
	}
	$version = $res->fetch_array();
	if ($version["english"] == "") return $key;
	return $version["english"];
}

function _parseKey($key) {
	$data = explode(".", $key);
	if (count($data) != 2) {
		throw new Exception("Read: key is not a two parts: '$key'");
	}
	$model = $data[0];
	$field = $data[1];

	global $mysqli;
	global $model2controller;
	$res = $mysqli->query("SELECT $field FROM " . $model2controller[$model] . " LIMIT 1");
	$structures = $res->fetch_fields();
	$structure = $structures[0];

	$structure->myFlags = array();
	$constants = get_defined_constants(true);
	foreach ($constants['mysqli'] as $c => $n) {
		if (preg_match('/MYSQLI_(.*)_FLAG$/', $c) && (($structure->flags & $n) > 0)) {
			$structure->myFlags[$c] = 1;
		}
	}

	switch ($structure->type) {
		case MYSQLI_TYPE_TINY:
		case MYSQLI_TYPE_BIT:
			$structure->myType = "boolean";
			break;
		case MYSQLI_TYPE_DECIMAL:
		case MYSQLI_TYPE_NEWDECIMAL:
		case MYSQLI_TYPE_SHORT:
		case MYSQLI_TYPE_LONG:
		case MYSQLI_TYPE_LONGLONG:
		case MYSQLI_TYPE_INT24:
			$structure->myType = "numeric";
			break;
		case MYSQLI_TYPE_FLOAT:
		case MYSQLI_TYPE_DOUBLE:
			$structure->myType = "float";
			break;
		case MYSQLI_TYPE_TIMESTAMP:
		case MYSQLI_TYPE_DATETIME:
		case MYSQLI_TYPE_DATE:
			$structure->myType = "datetime";
			break;
		case MYSQLI_TYPE_VAR_STRING:
		case MYSQLI_TYPE_STRING:
		case MYSQLI_TYPE_CHAR:
		case MYSQLI_TYPE_TINY_BLOB:
		case MYSQLI_TYPE_MEDIUM_BLOB:
		case MYSQLI_TYPE_LONG_BLOB:
		case MYSQLI_TYPE_BLOB:
			$structure->myType = "text";
			break;
		case MYSQLI_TYPE_TIME:
		case MYSQLI_TYPE_YEAR:
		case MYSQLI_TYPE_NEWDATE:
		case MYSQLI_TYPE_INTERVAL:
		case MYSQLI_TYPE_ENUM:
		case MYSQLI_TYPE_SET:
		case MYSQLI_TYPE_GEOMETRY:
		default:
			// http://www.php.net/manual/en/mysqli.constants.php
			var_dump($structure);
			$constants = get_defined_constants(true);
			foreach ($constants['mysqli'] as $c => $n)
			if (preg_match('/^MYSQLI_TYPE_(.*)/', $c, $m) && ($n == $structure->type))
				var_dump($c);
			//$types[$n] = $m[1];

			throw new Exception("Unhandled type for field $field");
	}
	global $model_listing;
	if (array_key_exists($key, $model_listing)) {
		$structure->myType = "list";
		$structure->listing = $model_listing[$key];
		if (array_key_exists('labels', $structure->listing) && ($structure->listing['labels'])) {
			$list = $structure->listing;
			$structure->myType = "linkedList";
			unset($list['labels']);
			$structure->listing = [];
			foreach($list as $k => $v){
				$structure->listing[$v] = _label($v);
			}
		}
	}
	return $structure;
}

function label($key) {
	echo "<label for='$key'>" . _label($key) . "</label>\n";
}

function value($key) {
	if (array_key_exists('mode', $_REQUEST) && $_REQUEST['mode'] == "write") {
		return write($key);
	} else {
		return read($key);
	}
}

function read($key, $type = null) {
	$struct = _parseKey($key);
	if ($type == null) $type = $struct->myType; 
	switch($type) {
		case 'datetime':
			// TODO: clean presentation
		case 'text':
		case 'numeric':
		case 'float':
		case 'list':
			echo "<span id='$key'>{{" . $key . "}}</span>";
			break;
		case 'boolean':
			echo "<span id='$key-true' ng-show='" . $key. "'><img src='img/boolean-true.gif'></span>"
					. "<span id='$key-true' ng-hide='" . $key . "'><img src='img/boolean-false.gif'></span>";
			break;
		case 'linkedList':
			echo "<span id='$key'>{{link($key)}}</span>";
			break;
		default:
			echo "$key input";
	}
}

function write($key, $allownull) {
	// TODO: write
	$struct = _parseKey($key);
	read($key);
}
