<?php
/**
 * Generate a template into the cache
 *
 * Parameters available:
 * @param meta: if set, meta informations will be shown
 *
 * special treatment:
 * /templates/writes/blablabla.html -> will go to /templates/fiches/blablabla.html, but in write mode (writeOnly forced)
 */

// date_default_timezone_set("GMT");

use App\Model\References;

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

  static function setPDO($pdo) {
    static::$pdo = $pdo;
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
        $this->listingName = References::$model_listing[$header];
        $this->listing = References::$lists[$this->listingName];
    } else if (array_key_exists("*.{$this->field}", References::$model_listing)) {
      // *.Field generic list
        $this->struct_type = static::TYPE_LIST;
        $this->isList = true;
        $this->listingName = References::$model_listing["*.{$this->field}"];
        $this->listing = References::$lists[$this->listingName];
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

  function id($id) {
    $this->jsId = $id;
    return $this;
  }

  function read() {
    if (!$this->linked2DB) {
      $this->res .= "<span id='{$this->jsId}' class='error'>Read: key is not in the database: '{$this->key}'</span>";
      return $this;
    }

    switch($this->fieldGetType()) {
      case static::TYPE_TIMESTAMP:
        // See https://docs.angularjs.org/api/ng/filter/date
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} | date:'{static::DATETIMEFORMAT}' }}</span>";
        break;
      case static::TYPE_BOOLEAN:
        $this->res .= "<read-boolean ng-attr-value='{{ {$this->fieldGetKey()} }}'></read-boolean>";
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

    $inline = "name='{$this->field}' class='form-control' id='{$this->jsId}' ng-model='{$this->fieldGetKey()}' "
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
          foreach($this->listing as $v) {
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
    $this->res .= "\n";
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

  function readOnly() {
    $this->options['readOnly'] = true;
    return $this;
  }

  function writeOnly() {
    $this->options['writeOnly'] = true;
    return $this;
  }

  function p() {
    echo $this->res;
  }

  function __toString() {
    return $this->res;
  }
}
