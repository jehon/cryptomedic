<?php

/*

C:\wamp\www\amd\app\webroot\angular\app\partials

<tr>\n.*<td><\?php label\("(.*)"\);\?></td>\n.*<td><\?php value\("(.*)"\);.*\?></td>\n.*</tr>
<?php (new t("$1"))->tr()->p(); ?>\n

<\?php \(new t\("(.*)"\)\)->label\(\)->p\(\); \?>
<?php label("$1"); ?>

*/

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

function trace() {
	$trace = debug_backtrace();
	array_shift($trace);
	$list = array();
	if (count(func_get_args()) > 0) {
		$str = "";
		$str .= "Trace with ";
		$str .= implode(func_get_args(), ",");
		$list[] = $str;
	}
	foreach($trace as $i => $t) {
		$str = "";
		$str .= basename($t['file']) . ":" . $t['line'] 
			. (array_key_exists('function', $t) ? 
				"@" . (array_key_exists('class', $t) ? $t['class'] . "->" : "")
				. $t['function'] : "");
		if (array_key_exists('args', $t) && !in_array($t['function'], [ "require_once", "require", "include_once", "inluce" ])) {
			$str .= "[";
			foreach($t['args'] as $i => $v)  {
				if ($i != 0) $str .= ",";
				$str .= is_array($v) ? "Array" : $v;
			}
			$str .= "]";
		}
		$str = str_replace([ "\"", "'", "\\"], "_", $str);
		$list[] = $str;
	}
	echo "<script>console.log(JSON.parse('" . json_encode($list) . "')); </script>";
}

function label($key, $options = array()) {
	$options = array_merge([
		'echo' => true,
		'wrap' => true
	], $options);

	if ($options['echo']) {
		$str = label($key, array_merge($options, [ "echo" => false ]));
		echo $str;
		return $str;
	}

	if ($options['wrap']) {
		$str = label($key, array_merge($options, [ "wrap" => false]));
		$str = "<label for='{$key}'>$str</label>\n";
		return $str;
	}

	global $mysqli;
	$sql = "SELECT * FROM `labels` WHERE `reference` = '{$key}'";

	$res = $mysqli->query($sql);
	if ($res === false) {
		throw new Exception("Syntax error in labels: " . $mysqli->errno . ":\n" . $mysqli->error . "\n");
	}
	if ($res->num_rows > 1) {
		throw new Exception("Too much labels for '{$key}': " . $sql);
	}
	$str = "";
	if ($res->num_rows > 1) {
		$version = $res->fetch_array();
		if ($version["english"] != $key && $version["english"] != "")
			return $version["english"];
	}
	if (count(explode("-", $key)) > 1){
		return explode("-", $key)[1];
	}
	if (count(explode(".", $key)) > 1) {
		return explode(".", $key)[1];
	}
	return $key;
}

function catchFunction($name, $watch, $options = array()) {
	trace();
// 	$options = array_merge([
// 		'echo' => true,
// 		'format' => false
// 	], $options);
	
// 	if ($options['echo']) {
// 		echo catchFunction($name, $watch, array_merge($options, [ 'echo' => false ]));
// 	}

// 	return "<span catch-it ng-model='folder' tryit='$name'>"
// 		. "{{ result " 
// 		. ($options['format'] ? "| "  . $options['format'] : "")
// 		. "}}</span>\n";
}

class t {
	var $key;
	var $extra;
	var $readOnly = false;
	var $res = "";
	var $linked2DB = false;

	function __construct($key, $extra = array()) {
		$this->key = $key;
		$this->extra = $extra;
		$this->field = $key;
		$data = explode(".", $this->key);
		if (count($data) != 2) {
			$this->linked2DB = false;
			return ;
		}

		$this->linked2DB = true;
		$this->model = $data[0];
		$this->field = $data[1];

		global $mysqli;
		global $model2controller;
		$res = $mysqli->query("SELECT " . $this->field . " FROM " . $model2controller[$this->model] . " LIMIT 1");
		if ($res === false) {
			$this->linked2DB = false;
			return ;
			//throw new Exception("ParseKey: {$this->key} is not in the database");
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

				throw new Exception("Unhandled type for field {$this->field}");
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
					$this->listing[$v] = $this->_reference($v);
				}
			}
		}

		$this->linked2DB = true;
		$this->rawExpression = "currentFile()." . $this->field;
		return $this;
	}

	private function _reference() {
		global $mysqli;
		if (is_numeric($this->key)) {
			$sql = "SELECT * FROM `labels` WHERE `id` = '{$this->key}' or `reference` = '". $this->key . "'";
		} else {
			$sql = "SELECT * FROM `labels` WHERE `reference` = '{$this->key}'";
		}
		
		$res = $mysqli->query($sql);
		if ($res === false) {
			throw new Exception("Syntax error in labels: " . $mysqli->errno . ":\n" . $mysqli->error . "\n");
		}
		if ($res->num_rows > 1) {
			throw new Exception("Too much labels for '{$this->key}': " . $sql);
		}
		if ($res->num_rows > 1) {
			$version = $res->fetch_array();
			if ($version["english"] != $key && $version["english"] != "")
				return $version["english"];
		}
		if ($this->linked2DB) {
			return $this->field;
		}
		if (count(explode("-", $this->key)) > 1) {
			return explode("-", $this->key)[1];
		}
		if (count(explode(".", $this->key)) > 1) {
			return explode(".", $this->key)[1];
		}
		return $this->key;
	}

	function label() {
		trace();
		$this->res .= label($this->key, false);
		return $this;
	}

	function rawValue() {
		$this->res .= "{{" . $this->rawExpression . "}}";
		return $this;
	}
	
	function read() {
		if (!$this->linked2DB) {
			throw new Exception("Read: key is not a two parts: '{$this->key}'");
		}
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

	function write($options = array()) {
		$options = array_merge([
			'forceAllowNull' => false
		], $options);

		if (!$this->linked2DB) {
			throw new Exception("Read: key is not in the database: '{$this->key}'");
		}
		// TODO: write
		$this->read($key);
		return $this;
	}

	function value() {
		// TODO: show both sides, and hide with css
		if (!$this->readOnly && array_key_exists('mode', $_REQUEST) && ($_REQUEST['mode'] == "write")) {
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
		if (!$this->linked2DB) {
			throw new Exception("Read: key is not in the database: '{$this->key}'");
		}
		$this->res .= "<tr ng-class='{ emptyValue: !$this->rawExpression}'>\n";
		$this->res .= "	<td>" . label($this->key, [ 'echo' => false ]) . "</td>\n";
		$this->res .= "	<td>";
			$this->value();
		$this->res .="</td>\n";
		$this->res .= "</tr>\n";
		return $this;
	}

	function trLeftRight() {
		$left = new t(str_replace("?", "Left", $this->key));
		$right = new t(str_replace("?", "Right", $this->key));
		$this->res .= "<tr ng-class='{ emptyValue: !{$left->rawExpression} && !{$right->rawExpression} }'>\n";
			$this->res .= "	<td>" . label(str_replace("?", "", $this->key), false) . "</td>\n";
			$this->res .= "	<td>" . $left->value()->getText() . "</td>\n";
			$this->res .= "	<td>" . $right->value()->getText() . "</td>\n";
		$this->res .= "</tr>\n";
		return $this;
	}

	function getText() {
		return $this->res;
	}

	function p() {
		echo $this->res;
	}
}