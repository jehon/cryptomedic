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

$dateFormat = "shortDate";
$dateTimeFormat = "short";

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

class t {
	var $key;
	var $options;
	var $res = "";
	var $linked2DB = false;

	private static $defaultOptions = [
		"baseExpression" => "",
		"writeOnly" => false,
		"readOnly" => false,
		"forceAllowNull" => false
	];

	static function setDefaultOption($key, $val = true) {
		if (!array_key_exists($key, self::$defaultOptions)) {
			return trace("Setting unsupported option: $key");
		}
		self::$defaultOptions[$key] = $val;
	}

	static function setDefaultOptions($defaultOptions) {
		foreach($defaultOptions as $key => $val)
			self::setDefaultOption($key, $val);
	}

	function __construct($key, $options = array()) {
		$this->key = $key;
		$this->options = $options;
		$this->field = $key;

		if (!is_array($options)) {
			trace("options are not an array");
			$this->options = array();
		}

		$this->options = array_merge(self::$defaultOptions, $this->options);

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

		$structures = $res->fetch_fields();
		$this->structure = $structures[0];


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
			} else {
				// Labels = the value itself
				$this->listing = array_combine($this->listing, $this->listing);
			}
		}

		$this->linked2DB = true;
		$this->rawExpression = $this->options['baseExpression'] . $this->field;
		return $this;
	}

	private function _reference($v) {
		global $mysqli;
		$sql = "SELECT * FROM `labels` WHERE `id` = $v" ;
		
		$res = $mysqli->query($sql);
		if ($res === false) {
			throw new Exception("Syntax error in labels: " . $mysqli->errno . ":\n" . $mysqli->error . "\n");
		}
		if ($res->num_rows > 1) {
			throw new Exception("Too much labels for '$v': " . $sql);
		}
		if ($res->num_rows == 1) {
			$version = $res->fetch_array();
			if ($version["english"] != $v && $version["english"] != "")
				return $version["english"];
		}
		return $v;
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
		global $dateFormat;
		global $dateTimeFormat;
		if (!$this->linked2DB) {
			throw new Exception("Read: key is not a two parts: '{$this->key}'");
		}
		switch($this->myType) {
			case 'date':
				// See https://docs.angularjs.org/api/ng/filter/date
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'$dateFormat' }}</span>";
				break;
			case 'datetime':
				// See https://docs.angularjs.org/api/ng/filter/date
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'$dateTimeFormat' }}</span>";
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

	function write() {
		if (!$this->linked2DB) {
			throw new Exception("Read: key is not in the database: '{$this->key}'");
		}
		$required = array_key_exists('MYSQLI_NOT_NULL_FLAG', $this->myFlags);

		// TODO: all the "required" fields

		switch($this->myType) {
			case 'datetime':
				// always read-only
				$this->read();
				break;
			case 'date':
				$this->res .= "<input type='date' ng-model='{$this->rawExpression}' " 
					. ($required ? "required ng-required " : "" )
					. "/>";
				break;
			case 'text':
				if ($this->structure->length > 256) {
					$this->res .= "<textarea ng-model='{$this->rawExpression}' cols=40 rows=4/>";
				} else {
					$this->res .= "<input ng-model='{$this->rawExpression}' "
					. ($required ? "required ng-required " : "" )
					. "/>";
				}
				break;
			case 'numeric':
			case 'float':
				$this->res .= "<input type='number' ng-model='{$this->rawExpression}' "
				. ($required ? "required ng-required " : "" )
				. "/>";
				break;
			case 'boolean':
				$this->res .= "<input type='checkbox' ng-model='{$this->rawExpression}' />";
				break;
			case 'linkedList':
			case 'list':
/*
<span  class="nullable">
    <select ng-model="myColor" ng-options="color.name for color in colors">
      <option value="">-- choose color --</option>
    </select>
  </span>
  */
  				// TODO: back to radio buttons
  				// if (count($this->listing) < 6) {
  				// } else {
  					$this->res .= "<select ng-model='{$this->rawExpression}' "
						. ($required ? "required ng-required " : "" )
  						. ">";
  					if (!array_key_exists('MYSQLI_NOT_NULL_FLAG', $this->myFlags)) {
  						$this->res .= "<option value=''>?</option>";
  					}
  					foreach($this->listing as $k => $v) {
  						$this->res .= "<option value='$k'>$v</option>";
  					}
  					$this->res .= "</select>";
  				// }
				break;
			default:
				$this->res .= "WW {$this->key} input";
				break;
		}
		return $this;
	}

	function value() {
		// TODO: show both sides, and hide with css
		if ($this->options['readOnly']) return $this->read();
		if ($this->options['writeOnly']) return $this->write();

		$this->res .= "<span class='notModeWrite'>";
		$this->read();
		$this->res .= "</span>";

		$this->res .= "<span class='notModeRead'>";
		$this->write();
		$this->res .= "</span>";
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
			$this->res .= "	<td>" . label(str_replace("?", "", $this->key), [ 'echo' => false ]) . "</td>\n";
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

	function readOnly() {
		$this->options['readOnly'] = true;
		return $this;
	}

	function writeOnly() {
		$this->options['writeOnly'] = true;
		return $this;
	}
}