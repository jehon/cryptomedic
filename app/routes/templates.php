<?php

require_once(DIRECTORY_SEPARATOR . "../Lib/amd_listings.php");

$dateFormat = "shortDate";
$dateTimeFormat = "short";

class t {
	var $key;
	var $options;
	var $res = "";
	var $linked2DB = false;
	var $rawExpression = true;

	private static $defaultOptions = [
		"baseExpression" => "",
		"writeOnly" => false,
		"readOnly" => false,
		"forceAllowNull" => false,
		"inline" => ""
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

		global $server;
		global $model2controller;
		$dbtable = $server->getDatabase()->getTable($model2controller[$this->model]);

		if (!$dbtable->isColumn($this->field)) {
			$this->linked2DB = false;
			return ;
		}

		$this->structure = $dbtable->getColumnInfos($this->field);

		switch ($this->structure->type) {
			case "tinyint":
			// case MYSQLI_TYPE_TINY:
			// case MYSQLI_TYPE_BIT:
				$this->myType = "boolean";
				break;
			// case MYSQLI_TYPE_DECIMAL:
			// case MYSQLI_TYPE_NEWDECIMAL:
			// case MYSQLI_TYPE_SHORT:
			// case MYSQLI_TYPE_LONG:
			// case MYSQLI_TYPE_LONGLONG:
			// case MYSQLI_TYPE_INT24:
			case "int":
			case "decimal":
				$this->myType = "numeric";
				break;
			// case MYSQLI_TYPE_FLOAT:
			// case MYSQLI_TYPE_DOUBLE:
			case "float":
				$this->myType = "float";
				break;
			case "datetime":
			// case MYSQLI_TYPE_TIMESTAMP:
			// case MYSQLI_TYPE_DATETIME:
				$this->myType = "datetime";
				break;
			case "date":
			// case MYSQLI_TYPE_DATE:
				$this->myType = "date";
				break;
			// case MYSQLI_TYPE_VAR_STRING:
			// case MYSQLI_TYPE_STRING:
			// case MYSQLI_TYPE_CHAR:
			// case MYSQLI_TYPE_TINY_BLOB:
			// case MYSQLI_TYPE_MEDIUM_BLOB:
			// case MYSQLI_TYPE_LONG_BLOB:
			// case MYSQLI_TYPE_BLOB:
			case "varchar":
			case "mediumtext":
				$this->myType = "text";
				break;
			// case MYSQLI_TYPE_TIME:
			// case MYSQLI_TYPE_YEAR:
			// case MYSQLI_TYPE_NEWDATE:
			// case MYSQLI_TYPE_INTERVAL:
			// case MYSQLI_TYPE_ENUM:
			// case MYSQLI_TYPE_SET:
			// case MYSQLI_TYPE_GEOMETRY:
			default:
				$this->res .= "<div class='jserror'>Unhandled type " . $this->structure->type . " for field {$this->field}</div>";
				$this->myType = "text";
				// throw new Exception("Unhandled type " . $this->structure->type . " for field {$this->field}");
				return;
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
		$sql = "SELECT * FROM `labels` WHERE `id` = $v" ;
		
		global $server;
		$res = $server->getDatabase()->myPostTreatment($server->getDatabase()->getTable("labels")->rowGet($v), "_reference");
		if ($res["english"] != $v && $res["english"] != "")
			return $res["english"];
		return $v;
	}

	function rawValue() {
		$this->res .= "{{" . $this->rawExpression . "}}";
		return $this;
	}
	
	function read() {
		global $dateFormat;
		global $dateTimeFormat;
		if (!$this->linked2DB) {
			$this->res .= "<span class='error'>Read: key is not in the database: '{$this->key}'</span>";
			return;
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
			$this->res .= "<span class='error'>Write: key is not in the database: '{$this->key}'</span>";
			return;
		}

		$required = $this->structure->not_null;

		// $this->res .= "(" . $this->structure->type . "=" . $this->myType . ($required ? "!" : "?"). ")";

		$inline = "class='form-control' ng-model='{$this->rawExpression}' "
			. ($required ? "required ng-required " : "")
			. $this->options['inline'];

		switch($this->myType) {
			case 'datetime':
				// always read-only
				$this->read();
				break;
			case 'date':
				$this->res .= "<input type='date' $inline placeholder='yyyy-MM-dd' mycalendar/>";
				break;
			case 'text':
				if ($this->structure->max_length >= 256) {
					$this->res .= "<textarea  cols=40 rows=4 $inline/>";
				} else {
					$this->res .= "<input $inline />";
				}
				break;
			case 'numeric':
			case 'float':
				$this->res .= "<input type='number'  $inline />";
				break;
			case 'boolean':
				$this->res .= "<input type='checkbox' ng-model='{$this->rawExpression}' ng-true-value='1' ng-false-value='0' />";
				break;
			case 'linkedList':
			case 'list':
				$count = count($this->listing);
				// if (array_key_exists('MYSQLI_NOT_NULL_FLAG', $this->myFlags)) $count++;
				if (!$required) $count++;
  				if ($count <= 6) {
  					$i = 0;
  					$this->res .= "<table style='width: 100%'><tr><td>";
  					foreach($this->listing as $k => $v) {
  						$this->res.= ""
  							. "<input type='radio' value='$k' ng-model='{$this->rawExpression}' {$this->options['inline']}>"
  							. "$v"
  							. "<br>"
  							;
  						if ($i == ceil($count/ 2) - 1) {
  							$this->res .= "</td><td>";
  						}
  						$i++;
  					}
  					// if (!array_key_exists('MYSQLI_NOT_NULL_FLAG', $this->myFlags)) {
					if (!$required) {
  						$this->res.= ""
							. "<input type='radio' ng-value='null' ng-model='{$this->rawExpression}' {$this->options['inline']}>"
	  						. "?"
	  						. "<br>"
	  						;
	  					$i++;
  					}
  					$this->res .= "</td></tr></table>";
  				} else {
  					$this->res .= "<select $inline>";
  					foreach($this->listing as $k => $v) {
  						$this->res .= "<option value='$k'>$v</option>";
  					}
  					// if (!array_key_exists('MYSQLI_NOT_NULL_FLAG', $this->myFlags)) {
  					if (!$required) {
  						$this->res .= "<option value=''>?</option>";
  					}
  					$this->res .= "</select>";
  				}
				break;
			default:
				$this->res .= "WW {$this->key} input";
				break;
		}
		return $this;
	}

	function value() {
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

	function tr($label = null) {
		if ($label == null) $label = $this->field;

		$this->res .= "<tr ng-class='{ emptyValue: !$this->rawExpression}'>\n";
		$this->res .= "	<td>$label</td>\n";
		$this->res .= "	<td>";
		$this->value();
		$this->res .="</td>\n";
		$this->res .= "</tr>\n";
		return $this;
	}

	function trLeftRight($label = null) {
		if ($label == null) $label = str_replace("?", "", $this->key);
		if (strpos($this->key, "?") === false) $this->key = $this->key . "?";

		$left = new t(str_replace("?", "Left", $this->key), $this->options);
		$right = new t(str_replace("?", "Right", $this->key), $this->options);

		$this->res .= "<tr ng-class='{ emptyValue: !{$left->rawExpression} && !{$right->rawExpression} }'>\n";
			$this->res .= "	<td>$label</td>\n";
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

if (($request->getMethod() == Request::READ) && (count($request->getRoute() == 2))) {
	$basename = basename($request->getRoute(2));
	$file = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "templates" . DIRECTORY_SEPARATOR . $basename .".php";
	debugHeader($file, "X-TEMPLATE-ASKED");
	if (file_exists($file)) {
		include_once($file);
		$response->ok();
	}
}
