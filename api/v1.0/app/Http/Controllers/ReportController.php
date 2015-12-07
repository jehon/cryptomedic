<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

#require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class ReportController extends Controller {
	protected $params = array();
	protected $result = array();

// 	private $internalWhenFilter = " (1=1) ";
	protected $internalWhenFrom = "";
	protected $internalWhenTo = "";
	protected $sqlBindParams = array();

	public function byTiming($timing) {
		switch($timing) {
			case 'day': return $this->daily();
			case 'month': return $this->monthly();
			case 'year': return $this->yearly();
		}
		abort(404, "No correct timing found");
	}

	public function yearly() {
		$when = $this->getReportParams('year', (new \DateTime())->format("Y"));
		if (!preg_match("/^[0-9]{4}$/", $when)) {
			abort(406, "Invalid year");
		}
		$year = substr($when, 0, 4);

		$this->internalWhenFrom = "{$year}-01-01";
		$this->internalWhenTo = date("Y-m-d", mktime(0, 0, 0, 1, 0, $year + 1));
		return $this->index($this->getReportParams('year', (new \DateTime())->format("Y") ));
	}

	public function monthly() {
		$when = $this->getReportParams('month', (new \DateTime())->format("Y-m"));
		if (!preg_match("/^[0-9]{4}-[0-9]{2}$/", $when)) {
			abort(406, "Invalid month");
		}
		$year = substr($when, 0, 4);
		$month = substr($when, 5, 2);

		$this->internalWhenFrom = "{$year}-{$month}-01";
		$this->internalWhenTo = date("Y-m-d", mktime(0, 0, 0, $month + 1, 0, $year));
		return $this->index($when);
	}

	public function daily() {
		$when = $this->getReportParams('day', (new \DateTime())->format("Y-m-d"));
		$when = substr($when, 0, 10);
		if (!preg_match("/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/", $when)) {
			abort(406, "Invalid day: " . $when);
		}
		$year = substr($when, 0, 4);
		$month = substr($when, 5, 2);
		$day = substr($when, 8, 2);

		$this->internalWhenFrom = "{$year}-{$month}-{$day}";
		$this->internalWhenTo = date("Y-m-d", mktime(0, 0, 0, $month, $day + 1, $year));
		return $this->index($when);
	}

	public function __construct() {
		// Add a specific filter to treat parameters
		$this->beforeFilter(function() {
			$this->params = Request::all();

			if (array_key_exists('date', $this->params)) {
				// Special treatment for date
				if ($this->params['date'] instanceof DateTime) {
					$this->params['date'] = $this->params['date']->format("Y-m-d");
				} else {
					if (strlen($this->params['date']) > 9) {
						$this->params['date'] = substr($this->params['date'], 0, 10);
					}
				}
			}

			if (array_key_exists('month', $this->params)) {
				// Special treatment for month
				if ($this->params['month'] instanceof DateTime) {
					$this->params['month'] = $this->params['month']->format("Y-m");
				} else {
					$this->params['month'] = substr($this->params['month'], 0, 7);
					if (strlen($this->params['month']) == 6) {
						$this->params['month'] = substr($this->params['month'], 0, 4) . "-0" . substr($this->params['month'], 5, 1);
					}
				}
			}

			$this->result['params'] = array();
		});
	}

	public function getReportParams($name, $default = null) {
		$ret = $default;
		if (array_key_exists($name, $this->params)) {
			$ret = $this->params[$name];
		}
		$this->result['params'][$name] = $ret;
		if ($name == "when") {
			$this->result['params']['whenFrom'] = $this->internalWhenFrom;
			$this->result['params']['whenTo'] = $this->internalWhenTo;
		}
		return $ret;
	}

	public function getReportParamFilter($paramName, $fieldName, $mandatory = false) {
		if ($paramName == "when") {
			$sqlParam = $paramName . count($this->sqlBindParams);
			$this->sqlBindParams[$sqlParam."From"] = $this->internalWhenFrom;
			$this->sqlBindParams[$sqlParam."To"] = $this->internalWhenTo;
			return "($fieldName BETWEEN :{$sqlParam}From AND :{$sqlParam}To)";
		}

		$param = $this->getReportParams($paramName, "");
		$sqlParam = $paramName . count($this->sqlBindParams);
		$this->sqlBindParams[$sqlParam] = $this->getReportParams($paramName);

		if ($mandatory) {
			if (!$param) {
				abort(406, "Invalid param '$paramName'");
			}
			return "($fieldName = :$sqlParam) ";
		} else {
			return "(FIELD(:$sqlParam, '', $fieldName) > 0) ";
		}
	}

	/**
	 *
	 * @param unknown $sql A sql statement returning "res"
	 */
	function getOneBySQL($sql) {
		$res = DB::select($sql, $this->sqlBindParams);
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
		$loc = &$this->result;
		foreach(explode('.', $path) as $step) {
			if (!array_key_exists($step, $loc)) {
				$loc[$step] = array();
			}
			$loc = &$loc[$step];
		}
		return $loc = $val;
	}
}
