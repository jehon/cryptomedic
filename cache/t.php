<?php
/**
 * Generate a template into the cache
 *
 * Parameters available:
 * @param meta: if set, meta informations will be shown
 * @param unused table: if set, show unused fields of the <table> in the database
 *
 * special treatment:
 * /templates/writes/blablabla.html -> will go to /templates/fiches/blablabla.html, but in write mode (writeOnly forced)
 */

require_once(__DIR__ . "/../php/references.php");
require_once(__DIR__ . "/../php/app-mocks.php");

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
    global $generator;
    try {
      static::$pdo = new PDO(
          "mysql:host=" . $generator['database']['pdo_host'] . ";dbname=" . $generator['database']['pdo_schema'],
          $generator['database']['pdo_username'],
          $generator['database']['pdo_password']);
      static::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
      throw new Exception($e->getMessage()); // @codeCoverageIgnore
    }
  }

  static function setDefaultOption($key, $val = true) {
      if (!array_key_exists($key, static::$defaultOptions)) {
          return trace("Setting unsupported option: $key"); // @codeCoverageIgnore
      }
      static::$defaultOptions[$key] = $val;
  }

  static function UUID()  {
      static::$uuid++;
      return static::$uuid;
  }

  static function cacheSqlStructureFor($sqlTable) {
    if (!array_key_exists($sqlTable, static::$sqlAllTableStructure)) {
      static::$sqlAllTableStructure[$sqlTable] = array();
      foreach(static::$pdo->query("SHOW COLUMNS FROM `{$sqlTable}`") as $row) {
        static::$sqlAllTableStructure[$sqlTable][$row['Field']] = $row;
      }
    }
    return static::$sqlAllTableStructure[$sqlTable];
  }

  static function getColumnsOfTable($sqlTable) {
    return array_keys(static::cacheSqlStructureFor($sqlTable));
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
    $this->options = array_merge(static::$defaultOptions, $this->options);

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

    $this->sqlTable = References::model2db($this->model);

    static::cacheSqlStructureFor($this->sqlTable);

    if (!in_array($this->field, static::getColumnsOfTable($this->sqlTable))) {
      $this->linked2DB = false;
      return ;
    }
    $this->linked2DB = true;

    $this->structure = static::$sqlAllTableStructure[$this->sqlTable][$this->field];

    $this->used($this->sqlTable, $this->field);

    $this->isList = false;
    $this->isListLinked = false;
    $header = $this->model . "." . $this->field;
    if (array_key_exists("list", $options) && $options['list']) {
      $this->struct_type = static::TYPE_LIST;
      $this->isList = true;
      $this->listing = $options['list'];
    } else if (array_key_exists($header, References::$model_listing)) {
      // Model.Field specific list
        $this->struct_type = static::TYPE_LIST;
        $this->isList = true;
        $this->listing = References::$model_listing[$header];
    } else if (array_key_exists("*.{$this->field}", References::$model_listing)) {
      // *.Field generic list
        $this->struct_type = static::TYPE_LIST;
        $this->isList = true;
        $this->listing = References::$model_listing["*.{$this->field}"];
    } else {
      $matches = array();
      if (false === preg_match("/([a-z]+)(\(([0-9]+)\)(.*[a-zA-Z]+)?)?/", strtolower($this->structure['Type']), $matches)) {
        throw new Exception("Error in preg_match"); // @codeCoverageIgnore
      }

    /*
     * ==== $matches ====
     * 1: type natif
     * 3: length
     * 4: qualificatif (unsigned)
     *
     * All matches are lowercase
     */
    $this->struct_type = $matches[1];
    $this->struct_length = (count($matches) > 3 ? intval($matches[3]) : 0);
    $this->struct_unsigned = (count($matches) > 4 ? $matches[4] : "");
    // Special case:
    switch($this->struct_type) {
      case "date":
        $this->struct_type = static::TYPE_DATE;
        break;
      case "tinyint":
      case "int":
        if ($this->struct_length == 1) {
          $this->struct_type = static::TYPE_BOOLEAN;
        } else {
          $this->struct_type = static::TYPE_INTEGER;
        }
        break;
      case "varchar":
        if ($this->struct_length >= 800) {
          // Long text = blob
          $this->struct_type = static::TYPE_TEXT;
        } else {
          $this->struct_type = static::TYPE_CHAR;
        }
        break;
      case "mediumtext":
        $this->struct_type = static::TYPE_TEXT;
        break;
      case "timestamp":
        $this->struct_type = static::TYPE_TIMESTAMP;
        break;
      default:
        echo "Unhandled type in __construct: {$this->struct_type}";
        var_dump($this->structure);
        throw new Exception("Unhandled type in __construct: {$this->struct_type}");
        break;
      }
    }
    return $this;
  }

  function fieldGetKey() {
    return $this->options['baseExpression'] . $this->field;
  }

  function fieldIsRequired() {
    return $this->structure['Null'] == "NO";
  }

  function fieldGetType() {
    return $this->struct_type;
  }

  function fieldGetList() {

  }

  function displayCode($mode) {
    if (array_key_exists("_meta", $_REQUEST) && $_REQUEST['_meta']) {
      $this->res .= "=" . $mode . $this->key;
      $this->res .= ($this->linked2DB ? "db" : "##");
      $this->res .= "-" . $this->model . "." . $this->field;
      $this->res .= ":" . $this->fieldGetType();
      if ($this->fieldGetType() == static::TYPE_LIST) {
        $this->res .= "(";
        foreach($this->listing as $v) {
          $this->res .= $v . ",";
        }
        $this->res .= ")";
      }
      $this->res .= ($this->fieldIsRequired() ? "!" : "?");
      $this->res .= "[" . $this->fieldGetKey() . "]";
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
    if ($this->displayCode("r")) {
      return $this;
    }

    switch($this->fieldGetType()) {
      case static::TYPE_TIMESTAMP:
        // See https://docs.angularjs.org/api/ng/filter/date
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} | date:'{static::DATETIMEFORMAT}' }}</span>";
        break;
      case static::TYPE_BOOLEAN:
        $this->res .= "<span id='{$this->jsId}_ok' ng-show='{$this->fieldGetKey()}'><img src='static/img/boolean-true.gif'></span>"
                      . "<span id='{$this->jsId}_ko' ng-hide='{$this->fieldGetKey()}'><img src='static/img/boolean-false.gif'></span>";
        break;
      case static::TYPE_LIST:
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} }}</span>";
        break;
      case static::TYPE_DATE:
          // TODOJH: recheck this later - Workaround!!!
          //     // See https://docs.angularjs.org/api/ng/filter/date
          //     $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} | date:'{static::DATEFORMAT}' }}</span>";
          //     break;
      case static::TYPE_INTEGER:
      case static::TYPE_CHAR:
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} }}</span>";
        break;
      case static::TYPE_TEXT:
        $this->res .= "<span id='{$this->jsId}' style='white-space: pre'>{{ {$this->fieldGetKey()} }}</span>";
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
    if ($this->displayCode("w")) {
      return $this;
    }

    $inline = "class='form-control' id='{$this->jsId}' ng-model='{$this->fieldGetKey()}' "
        . ($this->fieldIsRequired() ? " required " : "")
        . $this->options['inline'];

    switch($this->fieldGetType()) {
      case static::TYPE_LIST:
        $count = count($this->listing);
        if (!$this->fieldIsRequired()) {
          $count++;
        }
        if ($count <= 6) {
          $i = 0;
          $this->res .= "<table style='width: 100%'><tr><td>";
          foreach($this->listing as $k => $v) {
            $this->res.= ""
                . "<input type='radio' value=\"" . htmlentities($v) . "\" ng-model='{$this->fieldGetKey()}' {$this->options['inline']}>"
                . "$v"
                . "<br>"
                ;
            if ($i == ceil($count/ 2) - 1) {
              $this->res .= "</td><td>";
            }
            $i++;
          }
          if (!$this->fieldIsRequired()) {
            $this->res.= ""
                . "<input type='radio' ng-value='0' ng-model='{$this->fieldGetKey()}' {$this->options['inline']}>"
                . "?"
                . "<br>"
                ;
            $i++;
          }
          $this->res .= "</td></tr></table>";
        } else {
          $this->res .= "<select $inline>";
          foreach($this->listing as $v) {
            $this->res .= "<option value=\"" . htmlentities($v) . "\">$v</option>";
          }
          if (!$this->fieldIsRequired()) {
            $this->res .= "<option value='0'>?</option>";
          }
          $this->res .= "</select>";
        }
        break;
      case static::TYPE_TIMESTAMP:
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} | date:'{static::DATETIMEFORMAT}' }}</span>";
        break;
      case static::TYPE_BOOLEAN:
        $this->res .= "<input id='{$this->jsId}' type='checkbox' ng-model='{$this->fieldGetKey()}' ng-true-value='1' ng-false-value='0' />";
        break;
      case static::TYPE_INTEGER:
        $this->res .= "<input type='number' $inline />";
        break;
      case static::TYPE_TEXT:
        $this->res .= "<textarea cols=40 rows=4 $inline></textarea>";
        break;
      case static::TYPE_CHAR:
        $this->res .= "<input $inline />";
        break;
      case static::TYPE_DATE:
        // TODOJH: date workaround
        $uuid_date = static::UUID();
        $this->res .= "<input id='{$this->jsId}' type='text' $inline placeholder='yyyy-MM-dd' mycalendar uuid='$uuid_date'/>";
        $this->res .= "<span ng-if='errors.date_$uuid_date' class='jserror'>"
            . "Invalid date: please enter yyyy-mm-dd"
            . "</span>";
        break;
      default:
        $this->res .= "WW {$this->fieldGetType()} input ";
        var_dump($this->structure);
        break;
    }
    return $this;
  }

  function value() {
    if ($this->options['readOnly']) {
      return $this->read();
    }
    if ($this->options['writeOnly']) {
      return $this->write();
    }
    return $this->read();
  }

  function tr($label = null) {
    if ($label == null) $label = $this->field;

    $this->res .= "<tr ng-class='{ emptyValue: !{$this->fieldGetKey()}}'>\n";
    $this->res .= " <td>$label</td>\n";
    $this->res .= " <td>";
    $this->value();
    $this->res .="</td>\n";
    $this->res .= "</tr>\n";
    return $this;
  }

  function trRightLeft($label = null) {
    if ($label == null) {
      $label = str_replace("?", "", $this->key);
    }
    if (strpos($this->key, "?") === false) {
      $this->key = $this->key . "?";
    }

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
    if (!array_key_exists($sqlTable, static::$cacheUnused)) {
      static::$cacheUnused[$sqlTable] = static::cacheSqlStructureFor($sqlTable);
      static::used($sqlTable, 'id');
      static::used($sqlTable, 'created_at');
      static::used($sqlTable, 'updated_at');
      static::used($sqlTable, 'lastuser');
      static::used($sqlTable, 'patient_id');
    }
    if (array_key_exists($field, static::$cacheUnused[$sqlTable])) {
      unset(static::$cacheUnused[$sqlTable][$field]);
    }
  }

  static public function showUnused() {
    global $config;

    $table = $_REQUEST['_unused'];
    echo "<h1>Unused fields for $table</h1>";
    if (array_key_exists($table, static::$cacheUnused)) {
      foreach(static::$cacheUnused[$table] as $field => $meta) {
        echo "$field\n";
        $res = static::$pdo->query("SELECT count(*) as n, $field as val FROM $table GROUP BY $field ORDER BY count(*) DESC LIMIT 5");
        echo "<table>";
        foreach($res as $rec) {
          echo "<tr><td>{$rec['n']}</td><td>{$rec['val']}</td></tr>";
        }
        echo "</table>";

        $stmt = static::$pdo->prepare("SELECT `CONSTRAINT_NAME` as k FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE "
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

if (array_key_exists("_unused", $_REQUEST) && $_REQUEST['_unused']) {
  register_shutdown_function("T::showUnused");
}
