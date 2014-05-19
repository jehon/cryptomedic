<?php

require_once "../../../../../../maintenance.php";

global $mysqli;
$mysqli = new mysqli($config['database']['host'],
		$config['database']['login'],
		$config['database']['password'],
		$config['database']['schema']
);

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
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

function label($key) {
	echo "<label for='$key'>" . _label($key) . "</label>\n";
}

function value($key) {
	if ($_REQUEST['mode'] == "write") {
		return write($key);
	} else {
		return read($key);
	}
}

function read($key) {
	
}

function write($key, $allownull) {
	
}