<?php

require_once(__DIR__ . "/../amd_listings.php");
require_once(__DIR__ . "/helpers/references.php");

$dateFormat = "shortDate";
$dateTimeFormat = "short";

class t {
	const TYPE_LIST			= 0;
	const TYPE_TIMESTAMP	= 1;
	const TYPE_BOOLEAN		= 2;
	const TYPE_INTEGER		= 3;
	const TYPE_CHAR 		= 4;
	const TYPE_TEXT 		= 5;
	const TYPE_DATE			= 6;
	
	var $key;
	var $options;
	var $res = "";
	var $linked2DB = false;
	var $rawExpression = true;
	var $listing = null;

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

		global $model_listing;
		$this->isList = false;
		$this->isListLinked = false;
		if (array_key_exists($this->key, $model_listing)) {
			// $this->myType = "list";
			$this->type = self::TYPE_LIST;
			$this->isList = true;
			$this->listing = $model_listing[$key];
			if (array_key_exists('labels', $this->listing) && ($this->listing['labels'])) {
				$list = $this->listing;
				// $this->myType = "linkedList";
				$this->isListLinked = true;
				unset($list['labels']);
				$this->listing = buildLinkedList($list);
			} else {
				// Labels = the value itself
				$this->listing = array_combine($this->listing, $this->listing);
			}
		} else {
			switch($this->structure['pdo_type']) {
				case PDO::PARAM_BOOL:
				case PDO::PARAM_STR: 
				case PDO::PARAM_INT:
					switch($this->structure['native_type']) {
						case "TIMESTAMP":
							$this->type = self::TYPE_TIMESTAMP;
							break;
						case "DATE":
							$this->type = self::TYPE_DATE;
							break;
						case "TINY":
							$this->type = self::TYPE_BOOLEAN;
							break;
						case "LONG":
							$this->type = self::TYPE_INTEGER;
							break;	
						case "VAR_STRING":
								if ($this->structure['len'] >= 800) {
								$this->type = self::TYPE_TEXT;
							} else {
								$this->type = self::TYPE_CHAR;
							}
							break;
						case "BLOB":
							$this->type = self::TYPE_TEXT;
							break;
						default:
							echo "Unhandled native_type in __construct";
							var_dump($this->structure);
							break;
					}
					break;
				default:
					echo "Unhandled type in __construct";
					var_dump($this->structure);
					break;				
			}
		}

		$this->required = in_array('not_null', $this->structure['flags']);

		$this->linked2DB = true;
		$this->rawExpression = $this->options['baseExpression'] . $this->field;
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
			$this->res .= "<span class='error'>Read: key is not in the database: '{$this->key}'</span>";
			return;
		}
		switch($this->type) {
  			case self::TYPE_TIMESTAMP: 
					// See https://docs.angularjs.org/api/ng/filter/date
					$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'$dateTimeFormat' }}</span>";
					break;
			case self::TYPE_BOOLEAN:
				$this->res .= "<span id='{$this->key}' ng-show='{$this->rawExpression}'><img src='img/boolean-true.gif'></span>"
						. "<span id='{$this->key}' ng-hide='{$this->rawExpression}'><img src='img/boolean-false.gif'></span>";
				break;
			case self::TYPE_DATE:
				// See https://docs.angularjs.org/api/ng/filter/date
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'$dateFormat' }}</span>";
				break;
			case self::TYPE_LIST:
				if ($this->isListLinked) {
					$this->res .= "<span id='{$this->key}'>{{link( {$this->rawExpression} )}}</span>";
					break;
				}
			case self::TYPE_INTEGER:
			case self::TYPE_TEXT:
			case self::TYPE_CHAR:
				$this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} }}</span>";
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
		
		$inline = "class='form-control' ng-model='{$this->rawExpression}' "
			. ($this->required ? " required " : "")
			. $this->options['inline'];

		switch($this->type) {
			case self::TYPE_LIST:
				$count = count($this->listing);
				if (!$this->required) $count++;
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
					if (!$this->required) {
  						$this->res.= ""
							. "<input type='radio' ng-value='0' ng-model='{$this->rawExpression}' {$this->options['inline']}>"
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
  					if (!$this->required) {
  						$this->res .= "<option value='0'>?</option>";
  					}
  					$this->res .= "</select>";
  				}
  				break;
  			case self::TYPE_TIMESTAMP: 
				$this->res .= "<span>{{ {$this->rawExpression} | date:'$dateTimeFormat' }}</span>";
				break;
			case self::TYPE_BOOLEAN:
				$this->res .= "<input type='checkbox' ng-model='{$this->rawExpression}' ng-true-value='1' ng-false-value='0' />";
				break;
			case self::TYPE_INTEGER:
				$this->res .= "<input type='number' $inline />";	
				break;	
			case self::TYPE_TEXT:
				$this->res .= "<textarea  cols=40 rows=4 $inline></textarea>";
				break;
			case self::TYPE_CHAR:
				$this->res .= "<input $inline />";
				break;
			case self::TYPE_DATE:
				$this->res .= "<input type='date' $inline placeholder='yyyy-MM-dd' mycalendar/>";
				break;
			default:
				$this->res .= "WW {$this->type} input ";
				var_dump($this->structure);
				break;
		}
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

if (($request->getMethod() == Request::READ) && !$request->routeIsEnded()) {
	$basename = basename($request->routeConsumeNext());
	$file = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "templates" . DIRECTORY_SEPARATOR . $basename .".php";
	debugHeader($file, "X-TEMPLATE-ASKED");
	if (file_exists($file)) {
		include_once($file);
		echo "<div class='debug_infos'>" . date("Y-m-d h:M:s") . "</div>";
		$response->ok();
	}
}
