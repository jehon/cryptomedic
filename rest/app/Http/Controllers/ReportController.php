<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;


class ReportController extends Controller {
	protected $params = array();
	protected $result = array();
	
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
		return $ret;
	}
}
