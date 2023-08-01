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

use App\Model\DatabaseStructure;

class t {
  const DATETIMEFORMAT = "short";

  static private $defaultOptions = [
    "baseExpression" => "",
    "writeOnly" => false,
    "readOnly" => false,
    "forceAllowNull" => false,
    "inline" => "",
    "model" => null
  ];

  static function setDefaultOption($key, $val = true) {
    if (!array_key_exists($key, static::$defaultOptions)) {
      return trace("Setting unsupported option: $key"); // @codeCoverageIgnore
    }
    static::$defaultOptions[$key] = $val;
  }

  static function isWriteMode() {
    return static::$defaultOptions["writeOnly"];
  }

  var $key;
  var $options;
  var $res = "";
  var $linked2DB = false;
  var $rawExpression = true;

  function __construct($key, array $options = array()) {
    $this->key = $key;
    $this->jsId = str_replace([".", "#", " ", "/", "\\"], "_", $this->key);
    $this->field = $key;
    $this->options = array_merge(static::$defaultOptions, $options);

    $data = explode(".", $this->key);
    if (count($data) != 2) {
      if ($this->options['model'] == null) {
        $this->linked2DB = false;
        return;
      } else {
        $this->field = $key;
        $this->model = $this->options['model'];
      }
    } else {
      $this->model = $data[0];
      $this->field = $data[1];
    }

    try {
      $this->structure = DatabaseStructure::getModelFieldDescription($this->model, $this->field);
      $this->linked2DB = true;

      if (array_key_exists("list", $options) && $options['list']) {
        $this->structure['type'] = DatabaseStructure::TYPE_LIST;
        $this->structure['listing'] = $options['list'];
      }

      if ($this->structure['type'] == DatabaseStructure::TYPE_LIST) {
        if (is_string($this->structure['listing'])) {
          // String list name
          $this->listingName = $this->structure['listing'];
        }
      }
    } catch (DatabaseInvalidStructureException $e) {
      $this->linked2DB = false;
    }
  }

  function fieldGetKey() {
    $be = $this->options['baseExpression'];
    if (substr($be, -1) == ".") {
      $be = substr($be, 0, -1);
    }
    return $be . '["' . $this->field . '"]';
  }

  function fieldIsRequired() {
    return !$this->structure['optional'];
  }

  function fieldGetType() {
    return $this->structure['type'];
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

    switch ($this->fieldGetType()) {
      case DatabaseStructure::TYPE_TIMESTAMP:
        // See https://docs.angularjs.org/api/ng/filter/date
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} | date:'{static::DATETIMEFORMAT}' }}</span>";
        break;
      case DatabaseStructure::TYPE_BOOLEAN:
        $this->res .= "<x-read-boolean ng-attr-value='{{ {$this->fieldGetKey()} }}'></x-read-boolean>";
        break;
      case DatabaseStructure::TYPE_LIST:
        $this->res .= "<span id='{$this->jsId}' name='{$this->field}'>{{ {$this->fieldGetKey()} }}</span>";
        break;
      case DatabaseStructure::TYPE_DATE:
      case DatabaseStructure::TYPE_INTEGER:
      case DatabaseStructure::TYPE_CHAR:
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} }}</span>";
        break;
      case DatabaseStructure::TYPE_TEXT:
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

    $inlineWithoutModel = "name='{$this->field}' class='form-control' id='{$this->jsId}' "
      . ($this->fieldIsRequired() ? " required " : "")
      . $this->options['inline'];

    $inline = $inlineWithoutModel . " ng-model='{$this->fieldGetKey()}' ";

    switch ($this->fieldGetType()) {
      case DatabaseStructure::TYPE_LIST:
        // New system:
        $jsonList = "";
        if (!$this->listingName) {
          $jsonList = json_encode(array_map(
            function ($e) {
              return htmlentities($e, ENT_QUOTES);
            },
            $this->listing
          ));
        }
        $this->res .= "<x-write-list value='{{{$this->fieldGetKey()}}}' name='{$this->field}' "
          . "list-name='{$this->listingName}' "
          . "list='" . $jsonList . "' "
          . ($this->fieldIsRequired() ? "" : "nullable")
          . "></x-write-list>";
        break;
      case DatabaseStructure::TYPE_TIMESTAMP:
        $this->res .= "<span id='{$this->jsId}'>{{ {$this->fieldGetKey()} | date:'{static::DATETIMEFORMAT}' }}</span>";
        break;
      case DatabaseStructure::TYPE_BOOLEAN:
        $this->res .= "<input id='{$this->jsId}' type='checkbox' ng-model='{$this->fieldGetKey()}' ng-true-value='1' ng-false-value='0' />";
        break;
      case DatabaseStructure::TYPE_INTEGER:
        $this->res .= "<input type='number' $inline />";
        break;
      case DatabaseStructure::TYPE_TEXT:
        $this->res .= "<textarea cols=40 rows=4 onkeyup='textareaAdjust(this)' $inline></textarea>";
        break;
      case DatabaseStructure::TYPE_CHAR:
        $this->res .= "<input $inline />";
        break;
      case DatabaseStructure::TYPE_DATE:
        $this->res .= "<x-input-date id='{$this->jsId}' $inlineWithoutModel "
          . " value='{{" . $this->fieldGetKey() . "}}' "
          . "></x-input-date>";
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

  function tr2($label = null) {
    $mode = $this->options['writeOnly'] ? "" : "mode=read";
    $label = ($label ? "label='$label'" : "");

    $this->res .= "<x-fff-field field='{$this->field}' {$label} {$mode} type='{$this->fieldGetType()}'>\n";
    $this->res .= "\t\t\t<div>";
    $this->value();
    $this->res .= "</div>\n";
    $this->res .= "\t\t</x-fff-field>\n";

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

  static function trSided($field, $label = "") {
    $mode = static::$defaultOptions['writeOnly'] ? "" : "mode=read";
    $label = ($label ? "label='$label'" : "");
    echo "<x-fff-field by-sides='$field' $mode $label>";

    echo "  <div slot='left'>"  . (new t(str_replace("*", "left",  static::$defaultOptions['model'] . ".$field")))->value()->__toString() . "</div>";
    echo "  <div slot='right'>"  . (new t(str_replace("*", "right",  static::$defaultOptions['model'] . ".$field")))->value()->__toString() . "</div>";
    echo "</x-fff-field>";
  }
}
