<?php

class t {
    const TYPE_LIST         = 0;
    const TYPE_TIMESTAMP    = 1;
    const TYPE_BOOLEAN      = 2;
    const TYPE_INTEGER      = 3;
    const TYPE_CHAR         = 4;
    const TYPE_TEXT         = 5;
    const TYPE_DATE         = 6;

    const DATEFORMAT = "shortDate";
    const DATETIMEFORMAT = "short";

	static private $cacheUnused = array();
    static private $defaultOptions = [
        "baseExpression" => "",
        "writeOnly" => false,
        "readOnly" => false,
        "forceAllowNull" => false,
        "inline" => "",
    	"model" => null
    ];
    static private $uuid = 0;
    
    static function setDefaultOption($key, $val = true) {
        if (!array_key_exists($key, self::$defaultOptions)) {
            return trace("Setting unsupported option: $key");
        }
        self::$defaultOptions[$key] = $val;
    }

    static function setDefaultOptions(array $defaultOptions) {
        foreach($defaultOptions as $key => $val)
            self::setDefaultOption($key, $val);
    }

    static function UUID()  {
        self::$uuid++;
        return self::$uuid;
    }
    
    var $key;
    var $options;
    var $res = "";
    var $linked2DB = false;
    var $rawExpression = true;
    var $listing = null;
    
    function __construct($key, array $options = array()) {
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
        	if ($this->options['model'] == null) {
	            $this->linked2DB = false;
    	        return ;
        	} else {
        		$this->field = $key;
        		$this->model = $this->options['model'];
        	}
        } else {
        	$this->model = $data[0];
        	$this->field = $data[1];
        }

        $this->linked2DB = true;

        global $server;
        $dbtable = $server->getDatabase()->getTable(References::model2db($this->model));

        if (!$dbtable->isColumn($this->field)) {
            $this->linked2DB = false;
            return ;
        }

        $this->used(References::model2db($this->model), $this->field);
        
        $this->structure = $dbtable->getColumnInfos($this->field);

        $this->isList = false;
        $this->isListLinked = false;
        $header = $this->model . "." . $this->field;
        if (array_key_exists($header, References::$model_listing)) {
            // $this->myType = "list";
            $this->type = self::TYPE_LIST;
            $this->isList = true;
            $this->listing = References::$model_listing[$header];
            if (array_key_exists('labels', $this->listing) && ($this->listing['labels'])) {
                $list = $this->listing;
                // $this->myType = "linkedList";
                $this->isListLinked = true;
                unset($list['labels']);
                $this->listing = References::buildLinkedList($list);
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
    
	function meta($p) {
		global $request;
		if ($request) {
			if ($request->getSystemParameter("meta", false)) {
				$this->res .= "=" . $p . $this->key;
				$this->res .= ($this->linked2DB ? "" : "##");
				$this->res .= "-" . $this->model . "." . $this->field; 
				$this->res .= ":" . $this->type;
				if ($this->type == self::TYPE_LIST) {
					$this->res .= "(";
					foreach($this->listing as $k => $v) { 
						$this->res .= $k . ":" . $v . ","; 
					}
					$this->res .= ")";
				}
				$this->res .= ($this->required ? "!" : "?");
				$this->res .= "[" . $this->rawExpression . "]";
				$this->res .= "=";
				return true;
			}
		}
		return false;
	}
    
    function read() {
        if (!$this->linked2DB) {
            $this->res .= "<span class='error'>Read: key is not in the database: '{$this->key}'</span>";
            return $this;
        }
		if ($this->meta("r")) return $this;
        
        switch($this->type) {
            case self::TYPE_TIMESTAMP: 
                    // See https://docs.angularjs.org/api/ng/filter/date
                    $this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'{self::DATETIMEFORMAT}' }}</span>";
                    break;
            case self::TYPE_BOOLEAN:
                $this->res .= "<span id='{$this->key}' ng-show='{$this->rawExpression}'><img src='static/img/boolean-true.gif'></span>"
                        . "<span id='{$this->key}' ng-hide='{$this->rawExpression}'><img src='static/img/boolean-false.gif'></span>";
                break;
            case self::TYPE_LIST:
                if ($this->isListLinked) {
                    $this->res .= "<span id='{$this->key}'>{{link( {$this->rawExpression} )}}</span>";
                    break;
                }
            case self::TYPE_DATE:
            // TODOJH: recheck this later - Workaround!!!
            //     // See https://docs.angularjs.org/api/ng/filter/date
            //     $this->res .= "<span id='{$this->key}'>{{ {$this->rawExpression} | date:'{self::DATEFORMAT}' }}</span>";
            //     break;
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
            return $this;
        }
        if ($this->meta("w")) return $this;
        
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
                $this->res .= "<span>{{ {$this->rawExpression} | date:'{self::DATETIMEFORMAT}' }}</span>";
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
                // TODOJH: date workaround
                $uuid = t::UUID();
                $this->res .= "<input type='text' $inline placeholder='yyyy-MM-dd' mycalendar uuid='$uuid'/>";
                $this->res .= "<span ng-if='errors.date_$uuid' class='jserror'>"
                    . "Invalid date: please enter yyyy-mm-dd"
                    . "</span>";
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

        global $request;
		if ($request->getParameter("mode", "read") == "read") {
			$this->res .= "<span class='notModeWrite'>";
			$this->read();
			$this->res .= "</span>";
		}

		if ($request->getParameter("mode", "edit") == "edit") {
			$this->res .= "<span class='notModeRead'>";
	        $this->write();
	        $this->res .= "</span>";
		}
        return $this;
    }

    function tr($label = null) {
        if ($label == null) $label = $this->field;

        $this->res .= "<tr ng-class='{ emptyValue: !$this->rawExpression}'>\n";
        $this->res .= " <td>$label</td>\n";
        $this->res .= " <td>";
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
            $this->res .= " <td>$label</td>\n";
            $this->res .= " <td>" . $left->value()->getText() . "</td>\n";
            $this->res .= " <td>" . $right->value()->getText() . "</td>\n";
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
    
    static public function used($table, $field) {
    	if (!array_key_exists($table, self::$cacheUnused)) {
    		global $server;
			self::$cacheUnused[$table] = $server->getDatabase()->getTableColumnsInfos($table);
			self::used($table, 'id');
			self::used($table, 'created');
			self::used($table, 'modified');
			self::used($table, 'lastuser');
			self::used($table, 'patient_id');
    	}
    	if (array_key_exists($field, self::$cacheUnused[$table])) {
    		unset(self::$cacheUnused[$table][$field]);
    	}
    }
    
    static public function showUnused($table) {
    	echo "<h1>Unused fields for $table</h1>";
    	if (array_key_exists($table, self::$cacheUnused)) {
	    	foreach(self::$cacheUnused[$table] as $field => $meta) {
	    		echo "$field\n";
	    		global $server;
	    		$res = $server->getDatabase()->query("SELECT count(*) as n, $field as val FROM $table GROUP BY $field ORDER BY count(*) DESC LIMIT 5");
				echo "<table>";
				foreach($res as $rec) {
					echo "<tr><td>{$rec['n']}</td><td>{$rec['val']}</td></tr>";
				}
				echo "</table>";
				echo "ALTER TABLE `$table` DROP `$field`;<br>";
	    	}
    	} else {
    		echo "Table $table was not used in the template";
    	}
    }
        
}
