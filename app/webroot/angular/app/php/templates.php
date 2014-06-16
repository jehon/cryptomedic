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
	if ($res->num_rows > 1) {
		$version = $res->fetch_array();
		if ($version["english"] != $key && $version["english"] != "")
			return $version["english"];
	}
	try {
		$struct = _parseKey($key);
		return $struct->name;
	} catch (Exception $e) {
		return $key;
	}
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
	if ($res === false) {
		throw new Exception("ParseKey: $key is not in the database");
	}
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
			$structure->myType = "datetime";
			break;
		case MYSQLI_TYPE_DATE:
			$structure->myType = "date";
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

function rawExpression($key, $type = null) {
	$struct = _parseKey($key);
	echo "currentFile()." . $struct->name;
}

function rawValue($key, $type = null) {
	$struct = _parseKey($key);
	echo "{{"; echo rawExpression($key, $type); echo "}}";
// 	echo "{{folder.files[page]." . $struct->name . "}}";
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
		case 'date':
			// See https://docs.angularjs.org/api/ng/filter/date
			echo "<span id='$key'>{{"; rawExpression($key, $type); echo " | date:'shortDate' }}</span>";
			break;
		case 'datetime':
			// See https://docs.angularjs.org/api/ng/filter/date
			echo "<span id='$key'>{{"; rawExpression($key, $type); echo " | date:'short' }}</span>";
			break;
			// TODO: clean presentation
		case 'text':
		case 'numeric':
		case 'float':
		case 'list':
			echo "<span id='$key'>"; echo rawValue($key, $type) ; echo "</span>";
			break;
		case 'boolean':
			echo "<span id='$key-true' ng-show='"; rawExpression($key, $type); echo "'><img src='img/boolean-true.gif'></span>"
					. "<span id='$key-true' ng-hide='"; rawExpression($key, $type); echo "'><img src='img/boolean-false.gif'></span>";
			break;
		case 'linkedList':
			echo "<span id='$key'>{{link("; rawExpression($key, $type); echo ")}}</span>";
			break;
		default:
			echo "$key input";
			break;
	}
}

function write($key, $allownull) {
	// TODO: write
	$struct = _parseKey($key);
	read($key);
}

function tr($key) {
	// echo "<tr>\n";
	echo "<tr ng-if='"; echo rawExpression($key); echo "'>\n";
	echo "	<td>"; label($key); echo "</td>\n";
	echo "	<td>"; value($key); echo "</td>\n";
	echo "</tr>\n";
}

class t {
	var $key = "";
	var $readonly = false;
	var $res = "";

	function __construct($key) {
		$this->key = $key;
		$data = explode(".", $this->key);
		if (count($data) != 2) {
			throw new Exception("Read: key is not a two parts: '$key'");
		}
		$this->model = $data[0];
		$this->field = $data[1];

		global $mysqli;
		global $model2controller;
		$res = $mysqli->query("SELECT " . $this->field . " FROM " . $model2controller[$this->model] . " LIMIT 1");
		if ($res === false) {
			throw new Exception("ParseKey: $key is not in the database");
		}
		$this->structures = $res->fetch_fields();
		$this->structure = $this->structures[0];
		
		$this->myFlags = array();
		$constants = get_defined_constants(true);
		foreach ($constants['mysqli'] as $c => $n) {
			if (preg_match('/MYSQLI_(.*)_FLAG$/', $c) && (($this->structure->flags & $n) > 0)) {
				$this->myFlags[$c] = 1;
			}
		}

		switch ($this->structure->type) {
			case MYSQLI_TYPE_TINY:
			case MYSQLI_TYPE_BIT:
				$this->myType = "boolean";
				break;
			case MYSQLI_TYPE_DECIMAL:
			case MYSQLI_TYPE_NEWDECIMAL:
			case MYSQLI_TYPE_SHORT:
			case MYSQLI_TYPE_LONG:
			case MYSQLI_TYPE_LONGLONG:
			case MYSQLI_TYPE_INT24:
				$this->myType = "numeric";
				break;
			case MYSQLI_TYPE_FLOAT:
			case MYSQLI_TYPE_DOUBLE:
				$this->myType = "float";
				break;
			case MYSQLI_TYPE_TIMESTAMP:
			case MYSQLI_TYPE_DATETIME:
				$this->myType = "datetime";
				break;
			case MYSQLI_TYPE_DATE:
				$this->myType = "date";
				break;
			case MYSQLI_TYPE_VAR_STRING:
			case MYSQLI_TYPE_STRING:
			case MYSQLI_TYPE_CHAR:
			case MYSQLI_TYPE_TINY_BLOB:
			case MYSQLI_TYPE_MEDIUM_BLOB:
			case MYSQLI_TYPE_LONG_BLOB:
			case MYSQLI_TYPE_BLOB:
				$this->myType = "text";
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
				var_dump($this->structure);
				$constants = get_defined_constants(true);
				foreach ($constants['mysqli'] as $c => $n)
				if (preg_match('/^MYSQLI_TYPE_(.*)/', $c, $m) && ($n == $this->structure->type))
					var_dump($c);
				//$types[$n] = $m[1];

				throw new Exception("Unhandled type for field $field");
		}
		global $model_listing;
		if (array_key_exists($this->key, $model_listing)) {
			$this->myType = "list";
			$this->listing = $model_listing[$key];
			if (array_key_exists('labels', $this->listing) && ($this->listing['labels'])) {
				$list = $this->listing;
				$this->myType = "linkedList";
				unset($list['labels']);
				$this->listing = [];
				foreach($list as $k => $v){
					$this->listing[$v] = _label($v);
				}
			}
		}

		$this->rawExpression = "currentFile()." . $this->structure->name;
		return $this;
	}

	private function _label() {
		global $mysqli;
		if (is_numeric($this->key)) {
			$sql = "SELECT * FROM `labels` WHERE `id` = '$key' or `reference` = '". $this->key . "'";
		} else {
			$sql = "SELECT * FROM `labels` WHERE `reference` = '" . $this->key . "'";
		}
		$res = $mysqli->query($sql);
		if ($res === false) {
			throw new Exception("Syntax error in labels: " . $mysqli->errno . ":\n" . $mysqli->error . "\n");
		}
		if ($res->num_rows > 1) {
			throw new Exception("Too much labels for '$key': " . $sql);
		}
		if ($res->num_rows > 1) {
			$version = $res->fetch_array();
			if ($version["english"] != $key && $version["english"] != "")
				return $version["english"];
		}
		return $this->structure->name;
	}

	function label() {
		$this->res .= "<label for='" . $this->key . "'>" . $this->_label() . "</label>\n";
		return $this;
	}

	function rawValue() {
		$this->res .= "{{" . $this->rawExpression . "}}";
		return $this;
	}
	
	function read() {
		switch($this->myType) {
			case 'date':
				// See https://docs.angularjs.org/api/ng/filter/date
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'shortDate' }}</span>";
				break;
			case 'datetime':
				// See https://docs.angularjs.org/api/ng/filter/date
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'short' }}</span>";
				break;
				// TODO: clean presentation
			case 'text':
			case 'numeric':
			case 'float':
			case 'list':
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} }}</span>";
				break;
			case 'boolean':
				$this->res .= "<span id='{$this->key}' ng-show='{$this->rawExpression}'><img src='img/boolean-true.gif'></span>"
						. "<span id='{$this->key}' ng-hide='{$this->rawExpression}'><img src='img/boolean-false.gif'></span>";
				break;
			case 'linkedList':
				$this->res .= "<span id='{$this->key}'>{{link( {$this->rawExpression} )}}</span>";
				break;
			default:
				$this->res .= "{$this->key} input";
				break;
		}
		return $this;
	}

	function write($forceAllowNull = false) {
		// TODO: write
		$this->read($key);
		return $this;
	}

	function value() {
		// TODO: this
		if (array_key_exists('mode', $_REQUEST) && $_REQUEST['mode'] == "write") {
			return $this->write();
		} else {
			return $this->read();
		}
	}

	function readOnly() {
		$this->readOnly = true;
		return $this;
	}

	function tr() {
		$this->res .= "<tr ng-if='{$this->rawExpression}'>\n";
		$this->res .= "	<td>"; 
			$this->label(); 
			$this->res .= "</td>\n";
		$this->res .= "	<td>";
			$this->value();
			$this->res .="</td>\n";
		$this->res .= "</tr>\n";
		return $this;
	}

	function p() {
		echo $this->res;
	}
}