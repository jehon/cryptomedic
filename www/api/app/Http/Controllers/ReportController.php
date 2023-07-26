<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Support\Facades\Request;

abstract class ReportController extends Controller {
  protected $params;
  protected $result;

  protected $internalWhenFrom;
  protected $internalWhenTo;
  protected $sqlBindParams;

  public function index() {
    // Reset all parameters, since testing will re-use the same object
    $this->params = Request::all();
    $this->sqlBindParams = [];
    $this->result = [];
    $this->internalWhenFrom = false;
    $this->internalWhenTo = false;

    $this->result['params'] = array();
    $this->result['list'] = array();

    // TODO: Refaire: param=time + from and to = calculated based on what is not specified in "time" (ex: 2016 -> +"-01-01")
    // demande changement dans controlleur javascript

    if (Request::has('period')) {
      if (($this->getParam('period') == 'year') && Request::has('year')) {
        $when = $this->getParam('year');
        if ($when instanceof DateTime) {
          $when = $when->format("Y-m-d");
        }

        $when = substr($when, 0, 4);

        if (!preg_match("/^[0-9]{4}$/", $when)) {
          abort(406, "Invalid year: " . $when);
        }

        $year = $when;

        $this->internalWhenFrom = "{$year}-01-01";
        $this->internalWhenTo = date("Y-m-d", mktime(0, 0, -1, 1, 1, $year + 1));
        $this->result['params']['when'] = $when;
        $this->result['params']['period'] = "yearly";
      }

      if (($this->getParam('period') == 'month') && Request::has('month')) {
        $when = $this->getParam('month');
        if ($when instanceof DateTime) {
          $when = $when->format("Y-m-d");
        }

        $when = substr($when, 0, 7);

        if (!preg_match("/^[0-9]{4}-[0-9]{2}$/", $when)) {
          abort(406, "Invalid month: " . $when);
        }

        $year = substr($when, 0, 4);
        $month = substr($when, 5, 2);

        $this->internalWhenFrom = "{$year}-{$month}-01";
        $this->internalWhenTo = date("Y-m-d", mktime(0, 0, -1, $month + 1, 1, $year));
        $this->result['params']['when'] = $when;
        $this->result['params']['period'] = "monthly";
      }

      if (($this->getParam('period') == 'day') && Request::has('day')) {
        $when = $this->getParam('day');

        if ($when instanceof DateTime) {
          $when = $when->format("Y-m-d");
        }

        $when = substr($when, 0, 10);

        if (!preg_match("/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/", $when)) {
          abort(406, "Invalid day: '" . $when . "'");
        }
        $year = substr($when, 0, 4);
        $month = substr($when, 5, 2);
        $day = substr($when, 8, 2);

        $this->internalWhenFrom = "{$year}-{$month}-{$day}";
        $this->internalWhenTo = date("Y-m-d", mktime(0, 0, -1, $month, $day + 1, $year));
        $this->result['params']['when'] = $when;
        $this->result['params']['period'] = "daily";
      }
    }

    if (!$this->internalWhenFrom) {
      abort(406, "Invalid: no time period specified");
    }

    $this->buildData();

    return response()->json($this->result)->setEncodingOptions(JSON_NUMERIC_CHECK);
  }

  abstract function buildData();

  // *** Helpers *** //
  // public function requireParam($name) {
  //   if (!Request::has($name)) {
  //     abort(406, "Parameter '$name' not found");
  //   }
  // }

  public function getParam($name, $default = "") {
    if ($name == 'whenFrom') {
      $this->result['params'][$name] = $this->internalWhenFrom;
      return $this->internalWhenFrom;
    }
    if ($name == 'whenTo') {
      $this->result['params'][$name] = $this->internalWhenTo;
      return $this->internalWhenTo;
    }
    if (Request::has($name)) {
      $ret = Request::input($name);
    } else {
      $ret = $default;
    }

    switch($ret) {
      case "true": 
        $ret = true;
        break;
      case "false": 
        $ret = false;
        break;
    }

    $this->result['params'][$name] = $ret;
    return $ret;
  }

  public function getParamAsSqlNamed($name) {
    $sqlParam = str_replace(".", "_", $name) . count($this->sqlBindParams);

    $this->result['params'][$name] = $this->sqlBindParams[$sqlParam] = $this->getParam($name);

    return ":" . $sqlParam;
  }

  public function getParamAsSqlReset() {
    $this->sqlBindParams = [];
  }

  public function getParamAsSqlFilter($name, $field, $mandatory = false) {
    if ($name == "when") {
      return "($field BETWEEN " . $this->getParamAsSqlNamed("whenFrom") . " AND " . $this->getParamAsSqlNamed("whenTo") . ")";
    }

    if ($mandatory) {
      return "($field = " . $this->getParamAsSqlNamed($name) . ") ";
    } else {
      return "(FIELD(" . $this->getParamAsSqlNamed($name) . ", '', $field) > 0) ";
    }
  }


  function runSqlWithNamedParameter($sql) {
    return DB::select($sql, $this->sqlBindParams);
  }

  /**
   *
   * @param unknown $sql A sql statement returning "res"
   */
  function getOneBySQL($sql) {
    $res = $this->runSqlWithNamedParameter($sql);
    $res = array_pop($res);
    return $res->res;
  }

  /**
   * Set a value into an array with a dot notation path
   * @param unknown $path "key1.key2.key3"
   * @param unknown $val
   * @return unknown $val
   */
  public function resultPathSet($path, $val) {
    $loc = &$this->result['list'];
    foreach (explode('.', $path) as $step) {
      if (!array_key_exists($step, $loc)) {
        $loc[$step] = array();
      }
      $loc = &$loc[$step];
    }
    return $loc = $val;
  }
}
