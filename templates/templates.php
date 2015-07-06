<?php 
// 	echo "<pre>";
// 	var_dump($_REQUEST);
// 	var_dump($_SERVER);
// 	echo "</pre>";
	
require_once("../config.php");
require_once("../php/references.php");

global $cache_file;

$cache_file = $config['tempDir'] . "/templates/" . str_replace(array("?", "&", ".", "/", "\\", "%", " ", ":"),  "_", $_SERVER['REQUEST_URI']);

// If we have a cache file, but that we are not working locally:
if (is_file( $cache_file ) && (strcasecmp(substr($_SERVER['HTTP_HOST'], 0, 9), "localhost") != 0)) {
	echo "<!-- from cache -->";
	readfile( $cache_file );
	exit;
}

// inspiré de http://stackoverflow.com/a/3787258
// cache via output buffering, with callback
function template_cache_output( $content ) {
	// If we defined not to cache the template, then do not save it...
// 	if (defined("NOCACHE") && (constant("NOCACHE") > 0)) {
		global $cache_file;
		try {
			file_put_contents( $cache_file, $content );
		} catch (Exception $e) {
			debugHeader($e->getMessage(), "X-CACHE-WRITING-PROBLEM");
		}
// 	}
	return $content;
}

ob_start( 'template_cache_output' );

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

    static protected $pdo = false;
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
    static $sqlAllTableStructure = array();
    
    static function initialize() {
    	global $config;
		require(__DIR__ . "/../config.php");
        
    	try {
    		self::$pdo = new PDO(
    				"mysql:host=" . $config['database']['pdo_host'] . ";dbname=" . $config['database']['pdo_schema'],
    				$config['database']['pdo_username'],
    				$config['database']['pdo_password']);
    	} catch (PDOException $e) {
    		throw new Exception($e->getMessage());
    	}
    }
    
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

    static function cacheSqlStructureFor($sqlTable) {
    	if (!array_key_exists($sqlTable, self::$sqlAllTableStructure)) {
    		self::$sqlAllTableStructure[$sqlTable] = array();
    		$rows = self::$pdo->query("SELECT * FROM `{$sqlTable}` LIMIT 1");
    		for($i = 0; $i < $rows->columnCount(); $i++) {
    			$meta = $rows->getColumnMeta($i);
    			self::$sqlAllTableStructure[$sqlTable][$meta['name']] = $meta;
    		}
    	}
    	return self::$sqlAllTableStructure[$sqlTable];
    }
    
    var $key;
    var $options;
    var $res = "";
    var $linked2DB = false;
    var $rawExpression = true;
    var $listing = null;
    
    function __construct($key, array $options = array()) {
        $this->key = $key;
        $this->jsId = str_replace([".", "#", " ", "/", "\\" ], "_", $this->key);
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

		$this->sqlTable = References::model2db($this->model);
		
		self::cacheSqlStructureFor($this->sqlTable);
		
		if (!array_key_exists($this->field, self::$sqlAllTableStructure[$this->sqlTable])) {
            $this->linked2DB = false;
            return ;
        }

        $this->structure = self::$sqlAllTableStructure[$this->sqlTable][$this->field];

        $this->used($this->sqlTable, $this->field);
                
        $this->isList = false;
        $this->isListLinked = false;
        $header = $this->model . "." . $this->field;
        if (array_key_exists("list", $options) && $options['list']) {
        	$this->type = self::TYPE_LIST;
        	$this->isList = true;
        	$this->listing = $options['list'];
        } else if (array_key_exists($header, References::$model_listing)) {
        	// Model.Field specific list
            $this->type = self::TYPE_LIST;
            $this->isList = true;
            $this->listing = References::$model_listing[$header];
        } else if (array_key_exists("*.{$this->field}", References::$model_listing)) {
        	// *.Field generic list
            $this->type = self::TYPE_LIST;
            $this->isList = true;
            $this->listing = References::$model_listing["*.{$this->field}"];
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
    
	function displayCode($mode) {
			if (array_key_exists("_meta", $_REQUEST) && $_REQUEST['_meta']) {
			$this->res .= "=" . $mode . $this->key;
			$this->res .= ($this->linked2DB ? "" : "##");
			$this->res .= "-" . $this->model . "." . $this->field; 
			$this->res .= ":" . $this->type;
			if ($this->type == self::TYPE_LIST) {
				$this->res .= "(";
				foreach($this->listing as $k => $v) { 
					$this->res .= $v . ","; 
				}
				$this->res .= ")";
			}
			$this->res .= ($this->required ? "!" : "?");
			$this->res .= "[" . $this->rawExpression . "]";
			$this->res .= "=";
			return true;
		}
		return false;
	}
    
    function read() {
        if (!$this->linked2DB) {
            $this->res .= "<span id='{$this->jsId}' class='error'>Read: key is not in the database: '{$this->key}'</span>";
            return $this;
        }
		if ($this->displayCode("r")) return $this;
        
        switch($this->type) {
            case self::TYPE_TIMESTAMP: 
                    // See https://docs.angularjs.org/api/ng/filter/date
                    $this->res .= "<span id='{$this->jsId}'>{{ {$this->rawExpression} | date:'{self::DATETIMEFORMAT}' }}</span>";
                    break;
            case self::TYPE_BOOLEAN:
                $this->res .= "<span id='{$this->jsId}' ng-show='{$this->rawExpression}'><img src='static/img/boolean-true.gif'></span>"
                        . "<span id='{$this->jsId}' ng-hide='{$this->rawExpression}'><img src='static/img/boolean-false.gif'></span>";
                break;
            case self::TYPE_LIST:
                $this->res .= "<span id='{$this->jsId}'>{{ {$this->rawExpression} }}</span>";
                break;
            case self::TYPE_DATE:
            // TODOJH: recheck this later - Workaround!!!
            //     // See https://docs.angularjs.org/api/ng/filter/date
            //     $this->res .= "<span id='{$this->jsId}'>{{ {$this->rawExpression} | date:'{self::DATEFORMAT}' }}</span>";
            //     break;
            case self::TYPE_INTEGER:
            case self::TYPE_CHAR:
            	$this->res .= "<span id='{$this->jsId}'>{{ {$this->rawExpression} }}</span>";
                break;
            case self::TYPE_TEXT:
                $this->res .= "<span id='{$this->jsId}' style='white-space: pre'>{{ {$this->rawExpression} }}</span>";
                break;
            default:
                $this->res .= "{$this->key} input id={$this->jsId}";
                break;
        }
        return $this;
    }

    function write() {
        if (!$this->linked2DB) {
            $this->res .= "<span id='{$this->jsId}'class='error'>Write: key is not in the database: '{$this->key}'</span>";
            return $this;
        }
        if ($this->displayCode("w")) return $this;
        
        $inline = "class='form-control' id='{$this->jsId}' ng-model='{$this->rawExpression}' "
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
                            . "<input type='radio' value=\"" . htmlentities($v) . "\" ng-model='{$this->rawExpression}' {$this->options['inline']}>"
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
                        $this->res .= "<option value=\"" . htmlentities($v) . "\">$v</option>";
                    }
                    if (!$this->required) {
                        $this->res .= "<option value='0'>?</option>";
                    }
                    $this->res .= "</select>";
                }
                break;
            case self::TYPE_TIMESTAMP: 
                $this->res .= "<span id='{$this->jsId}'>{{ {$this->rawExpression} | date:'{self::DATETIMEFORMAT}' }}</span>";
                break;
            case self::TYPE_BOOLEAN:
                $this->res .= "<input type='checkbox' ng-model='{$this->rawExpression}' ng-true-value='1' ng-false-value='0' />";
                break;
            case self::TYPE_INTEGER:
                $this->res .= "<input type='number' $inline />";    
                break;  
            case self::TYPE_TEXT:
                $this->res .= "<textarea cols=40 rows=4 $inline></textarea>";
                break;
            case self::TYPE_CHAR:
                $this->res .= "<input $inline />";
                break;
            case self::TYPE_DATE:
                // TODOJH: date workaround
                $uuid = self::UUID();
                $this->res .= "<input id='{$this->jsId}' type='text' $inline placeholder='yyyy-MM-dd' mycalendar uuid='$uuid'/>";
                $this->res .= "<span ng-if='errors.date_$uuid' class='jserror'>"
                    . "Invalid date: please enter yyyy-mm-dd"
                    . "</span>";
                break;
            default:
                $this->res .= "WW {$this->type} input ";
                var_dump($this->structure);
                break;
        }
        return $this;
    }

    function value() {
        if ($this->options['readOnly']) return $this->read();
        if ($this->options['writeOnly']) return $this->write();
        
        if (!array_key_exists("mode", $_REQUEST) || ($_REQUEST['mode'] == "read")) {
			$this->res .= "<span class='notModeWrite'>";
			$this->read();
			$this->res .= "</span>";
		}

        if (array_key_exists("mode", $_REQUEST) && ($_REQUEST['mode'] == "edit")) {
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

    function trRightLeft($label = null) {
        if ($label == null) $label = str_replace("?", "", $this->key);
        if (strpos($this->key, "?") === false) $this->key = $this->key . "?";

        $left = new t(str_replace("?", "Left", $this->key), $this->options);
        $right = new t(str_replace("?", "Right", $this->key), $this->options);
        
        $this->res .= "<tr ng-class='{ emptyValue: !{$left->rawExpression} && !{$right->rawExpression} }'>\n";
            $this->res .= " <td>$label</td>\n";
            $this->res .= " <td>" . $right->value()->getText() . "</td>\n";
            $this->res .= " <td>" . $left->value()->getText() . "</td>\n";
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
    
    static public function used($sqlTable, $field) {
    	if (!array_key_exists($sqlTable, self::$cacheUnused)) {
			self::cacheSqlStructureFor($sqlTable);
			self::$cacheUnused[$sqlTable] = self::$sqlAllTableStructure[$sqlTable];
 			self::used($sqlTable, 'id');
			self::used($sqlTable, 'created');
			self::used($sqlTable, 'modified');
			self::used($sqlTable, 'lastuser');
 			self::used($sqlTable, 'patient_id');
    	}
    	if (array_key_exists($field, self::$cacheUnused[$sqlTable])) {
    		unset(self::$cacheUnused[$sqlTable][$field]);
    	}
    }
    
    static public function showUnused() {
    	global $config;

    	$table = $_REQUEST['_unused'];
    	echo "<h1>Unused fields for $table</h1>";
    	if (array_key_exists($table, self::$cacheUnused)) {
	    	foreach(self::$cacheUnused[$table] as $field => $meta) {
	    		echo "$field\n";
	    		$res = self::$pdo->query("SELECT count(*) as n, $field as val FROM $table GROUP BY $field ORDER BY count(*) DESC LIMIT 5");
				echo "<table>";
				foreach($res as $rec) {
					echo "<tr><td>{$rec['n']}</td><td>{$rec['val']}</td></tr>";
				}
				echo "</table>";

				$stmt = self::$pdo->prepare("SELECT `CONSTRAINT_NAME` as k FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE "
						. "WHERE `CONSTRAINT_SCHEMA` = :schema AND `TABLE_NAME` = :table AND `COLUMN_NAME` = :column");
				$res = $stmt->execute(array("schema" => $config['database']['pdo_schema'], "table" => $table, "column" => $field));
				if ($res) {
					foreach($stmt->fetchAll() as $k) {
						echo "ALTER TABLE `$table` DROP FOREIGN KEY ${k['k']}; ";
					}
	    		}
				echo "ALTER TABLE `$table` DROP `$field`;<br>";
	    	}
    	} else {
    		echo "Table $table was not used in the template";
    	}
    }        
}

t::initialize();

// Same as from ReportController
function clean($c) {
	return str_replace(["'", " ", "\""], "", $c);
}

if (array_key_exists("_unused", $_REQUEST) && $_REQUEST['_unused']) {
 	register_shutdown_function("T::showUnused");	
}

if (array_key_exists('page', $_REQUEST) && $_REQUEST['page'] && ($_REQUEST['page'] != basename(__FILE__))) {
	$template = $_SERVER['REDIRECT_subquery'];
	// FIXME check that we don't go upstair the templates dir
	$filename = __DIR__ . "/" . $template;
	if (file_exists($filename)) {
		$cachingTime = 3600*24*100;
		$lastModified = max(filemtime(__FILE__), filemtime($filename));
		header("Last-Modified: ".  gmdate("D, d M Y H:i:s", $lastModified) . " GMT");
		header("Expires: " . gmdate("D, d M Y H:i:s", $lastModified + $cachingTime) . " GMT");
		header("Cache-Control: public max-age=" . $cachingTime);

		try {
			include($filename);
		} catch (Exception $e) {
			var_dump($e);
			return 100;
		}
	}
} else {
	die("I say: invalid call");
}
