<?php

/*

C:\wamp\www\amd\app\webroot\angular\app\partials

<tr>\n.*<td><\?php label\("(.*)"\);\?></td>\n.*<td><\?php value\("(.*)"\);.*\?></td>\n.*</tr>
<?php (new t("$1"))->tr()->p(); ?>\n

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

function rawExpression($key) { 
	debug_print_backtrace();
	(new t($key))->rawExpression()->p(); 
}

function rawValue($key) { 
	debug_print_backtrace();
	(new t($key))->rawValue()->p(); 
}

function value($key) { 
	debug_print_backtrace();
	(new t($key))->value()->p(); 
}

function read($key) { 
	debug_print_backtrace();
	(new t($key))->read()->p(); 
}

function label($key) { 
	debug_print_backtrace();
	(new t($key))->label()->p(); 
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
					$this->listing[$v] = $this->_label($v);
				}
			}
		}

		$this->linked2DB = true;
		$this->rawExpression = "currentFile()." . $this->field;
		return $this;
	}

	private function _label() {
		global $mysqli;
		// if (is_numeric($this->key)) {
		//	$sql = "SELECT * FROM `labels` WHERE `id` = '{$this->key}' or `reference` = '". $this->key . "'";
		// } else {
		$sql = "SELECT * FROM `labels` WHERE `reference` = '{$this->key}'";
		// }
		
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
		if (count(explode(".", $this->key)) > 1) {
			return explode(".", $this->key)[1];
		}
		if (count(explode("-", $this->key)) > 1) {
			return explode("-", $this->key)[1];
		}
		return $this->key;
	}

	function label() {
		$this->res .= "<label for='{$this->key}'>" . $this->_label() . "</label>\n";
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

	function write($forceAllowNull = false) {
		if (!$this->linked2DB) {
			throw new Exception("Read: key is not in the database: '{$this->key}'");
		}
		// TODO: write
		$this->read($key);
		return $this;
	}

	function value() {
		// TODO: show both sides
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
		$this->res .= "	<td>"; 
			$this->label(); 
			$this->res .= "</td>\n";
		$this->res .= "	<td>";
			$this->value();
			$this->res .="</td>\n";
		$this->res .= "</tr>\n";
		return $this;
	}

	function trLeftRight() {
		$this->res .= "<tr>\n";
			$this->res .= "	<td>"; 
				$this->res .= (new t(str_replace("?", "", $this->key)))->label()->getText();
			$this->res .= "</td>\n";
			$this->res .= "	<td>";
				$this->res .= (new t(str_replace("?", "Left", $this->key)))->value()->getText();
			$this->res .= "</td>\n";
			$this->res .= "	<td>";
				$this->res .= (new t(str_replace("?", "Right", $this->key)))->value()->getText();
			$this->res .= "</td>\n";
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