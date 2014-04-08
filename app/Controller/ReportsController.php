<?php
App::uses('AppController', 'Controller');

require_once("PagesController.php");

// TODO: clean up the API
// TODO: security

class ReportsController extends PagesController {
	public $uses = array('Patient', 'Bill', 'ClubFoot', 'NonricketConsult', 'OrthopedicDevice', 'RicketConsult', 'Surgery', 'SurgeryFollowup');
	
	var $result = array();

	function beforeRender() {
		$this->request->data = $this->result;
	}
	
	function _conditionMontly($year, $month) {
		return array("Date BETWEEN ? AND ?" => array($year . "-" . $month . "-01", date("Y-m-d", mktime(0, 0, 0, $month + 1, 0, $year))));
	}
	
	function _addLine($data) {
		if (!is_array($data))
			$data = func_get_args();
		array_push($this->result, $data);
		if (count($data) > 1)
			return $data[1];
	}
	
	function _getCountBy($header, $model, $conditions) {
		$cmodel = ClassRegistry::init($model);
		$res = $this->$model->find('count', array('conditions' => $conditions));
		return $this->_addLine($header, $res);
	}

	function _getBillCountBy($header, $conditions = array(), $timeCondition = array()) {
		if (!is_array($conditions)) {
			$this->_addLine($header, "Not implemented");
			return ;
		}
		return $this->_getCountBy($header, "Bill", array_merge($timeCondition, $conditions));
	}
	
	function _getBillExpressionBy($header, $expression, $conditions = array()) {
		if (!is_array($conditions)) {
			$this->_addLine($header, "Not implemented");
			return ;
		}
		
		$res = $this->Bill->find('all', array('conditions' => $conditions,
				'fields' => $expression
		));
	
		if (!is_array($expression)) {
			$res = (float) array_pop($res[0][0]);
			if (floor($res) == $res) $res = (int) $res;
			return $this->_addLine($header, $res);
		}
		foreach($res[0][0] as $k => $v) {
			if (floor($v) == $v) $res[0][0][$k] = (int) $v;
		}
		return $res[0][0];
	}
	
	function _billStats($header, $condition = array()) {
		$this->_addLine("", $header);
		$stats = $this->_getBillExpressionBy("stats",
				array("SUM(total_real) as total_real", "SUM(total_asked) as total_asked", "SUM(total_paid) as total_paid"),
				$condition);
		$this->_addLine("total_real", $stats['total_real']);
		$this->_addLine("total_asked", $stats['total_asked']);
		$this->_addLine("total_paid", $stats['total_paid']);
		if ($stats['total_real'] > 0)
			$this->_addLine("total paid / total real", $stats['total_paid'] / $stats['total_real']);
		else
			$this->_addLine("total paid / total real", "-");
		$this->_addLine("");
	}
	
	/* REPORTS */
	
	public function monthlyReport() {
		if (!$this->request->query('month')) {
			pr("No data: please fill in the form");
			return;
		}

		$input = $this->request->query('month');
		$year = substr($input, 0, 4);
		$month = substr($input, 5, 2);

		$this->_addLine("Requested");
		$this->_addLine("year", $year);
		$this->_addLine("month", $month);
		
		$this->_addLine("Diagnostic");

		$new = array("AND" => array("Patient.entryyear >= YEAR(Bill.Date)", "ADDDATE(Patient.created, INTERVAL 1 MONTH) >= Bill.Date"));
		
		$this->_getBillCountBy("Ricket consults", array("Patient.pathology_Ricket" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("New Ricket consults", array("Patient.pathology_Ricket" => "1", $new, $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Old Ricket consults", array("Patient.pathology_Ricket" => "1", "NOT" => $new, $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Club foots", array("Patient.pathology_Clubfoot" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("New Club foots", array("Patient.pathology_Clubfoot" => "1", $new, $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Old Club foots", array("Patient.pathology_Clubfoot" => "1", "NOT" => $new, $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Polio", array("Patient.pathology_Polio" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Burn", array("Patient.pathology_Burn" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("CP", array("Patient.pathology_CP" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Congenital", array("Patient.pathology_Congenital" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Adult", array("Patient.pathology_Adult" => "1", $this->_conditionMontly($year, $month)));
		$this->_getBillCountBy("Other", array("Patient.pathology_other" => "1", $this->_conditionMontly($year, $month)));
		
		$this->_addLine("Social Level");
		$inco = $this->_getBillExpressionBy("Family income (mean)", "CAST(SUM(Patient.Familysalaryinamonth) / COUNT(*) AS DECIMAL)", array($this->_conditionMontly($year, $month)));
		$nbhous = $this->_getBillExpressionBy("Nb household mb (mean)", "SUM(Patient.Numberofhouseholdmembers) / COUNT(*)", array($this->_conditionMontly($year, $month)));
		if ($nbhous > 0)
			$this->_addLine("ratio (mean)", $inco / $nbhous);
		else
			$this->_addLine("ratio (mean)", "-");
		
		$i = 0;
		$this->_getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i", $this->_conditionMontly($year, $month))); $i++;
		$this->_getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i", $this->_conditionMontly($year, $month))); $i++;
		$this->_getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i", $this->_conditionMontly($year, $month))); $i++;
		$this->_getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i", $this->_conditionMontly($year, $month))); $i++;
		$this->_getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i", $this->_conditionMontly($year, $month))); $i++;
		$this->_getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i", $this->_conditionMontly($year, $month))); $i++;
		
		$this->_addLine("Where");
		$centers = $this->Bill->find('list', array('fields' => array("Center"), "group" => "Center"));
		foreach($centers as $c) {
			$this->_getBillCountBy(cryptomedicValue2Label("RicketConsult", "Center", $c), array("Center" => $c, $this->_conditionMontly($year, $month)));
		}
		
		$this->_addLine("Consult Activity");
		$anyConsult = array("OR" => array());
		foreach($this->Bill->billFields("consult") as $f) {
			$this->_getBillCountBy($f, array("$f >" => 0, $this->_conditionMontly($year, $month)));
			$anyConsult["OR"][$f . " >"] = "0";
		}
		
		$this->_addLine("Workshop Activity");
		$anyWorkshop = array("OR" => array());
		foreach($this->Bill->billFields("workshop") as $f) {
			$this->_getBillCountBy($f, array("$f >" => 0, $this->_conditionMontly($year, $month)));
			$anyWorkshop["OR"][$f . " >"] = "0";
		}
		
		$this->_addLine("Surgical activity");
		$anySurgery = array("OR" => array());
		foreach($this->Bill->billFields("surgical") as $f) {
			$this->_getBillCountBy($f, array("$f >" => 0), $this->_conditionMontly($year, $month));
			$anySurgery["OR"][$f . " >"] = "0";
		}
		
		$this->_addLine("Other activity");
		foreach($this->Bill->billFields("other") as $f) {
			$this->_getBillCountBy($f, array("$f >" => 0), $this->_conditionMontly($year, $month));
		}
		
		$this->_addLine("Financials");
		$this->_billStats("Surgery", array($anySurgery, $this->_conditionMontly($year, $month)));
		
		$onlyWorkshop = array("AND" => array_merge($anyWorkshop, array("NOT" => array_merge_recursive($anySurgery)), $this->_conditionMontly($year, $month)));
		$this->_billStats("Workshop (exl. surgeries)", $onlyWorkshop);
		
		$onlyConsults = array("AND" => array_merge($anyConsult, array("NOT" => array_merge_recursive($anySurgery, $anyWorkshop)), $this->_conditionMontly($year, $month)));
		$this->_billStats("Consults (ex. surgeries and workshops", $onlyConsults);
		
		$onlyOther = array("AND" => array("NOT" => array_merge_recursive($anySurgery, $anyWorkshop, $anyConsult), $this->_conditionMontly($year, $month)));
		$this->_billStats("Others", $onlyOther);
		
		$this->_billStats("Grand Total", array($this->_conditionMontly($year, $month)));
	}
	
	function day() {
		// TODO: in the view, use the request->data("filter.blabla") which is null-resistant
		$this->request->data['filter'] = array();
		$this->request->data['filter']['Nextappointment'] = $this->request->query('Nextappointment', date('Y-m-d'));
		$this->request->data['filter']['Center'] = $this->request->query('Center', "");
		
		$filter = $this->request->data['filter'];
		if ($filter['Center'] == "") unset($filter['Center']);
		$filter = array('recursive' => 0, 'conditions' => $filter);
	
		$this->request->data['list'] = array();
		$this->request->data['list'] = array_merge($this->request->data['list'], $this->RicketConsult->find('all', $filter));
		$this->request->data['list'] = array_merge($this->request->data['list'], $this->NonricketConsult->find('all', $filter));
		$this->request->data['list'] = array_merge($this->request->data['list'], $this->ClubFoot->find('all', $filter));
	}
	
	function activity() {
		// TODO
	}
}
