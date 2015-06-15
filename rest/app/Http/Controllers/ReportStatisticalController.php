<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

// TODO: use center and examiner

class ReportStatisticalController extends ReportController {
	protected $filter = "(1=1)";
	
	protected function billsByPathology($header, $pathology) {
		$newPatients = " (patients.entryyear >= YEAR(bills.Date)) AND (ADDDATE(patients.created, INTERVAL 1 MONTH) >= bills.Date) ";
		$sql = "SELECT count(*) as res FROM bills JOIN patients ON (bills.patient_id = patients.id)"
				. " WHERE {$this->filter} AND patients.$pathology > 0";
		$all = $this->getOneBySQL($sql);
		$this->resultPathSet($header . ".total", $all);

		$sql = "SELECT count(*) as res FROM bills JOIN patients ON (bills.patient_id = patients.id)"
				. " WHERE {$this->filter} AND patients.$pathology > 0 AND $newPatients";
		$newone = $this->getOneBySQL($sql);
		$this->resultPathSet($header . ".new", $newone);
		$this->resultPathSet($header . ".old", $all - $newone);
		return 1;
	}
	
	// By bill element
	protected function billCountByType($filter, &$list) {
		global $bills;
		if ($list == "") { 
			$list = "(1=0)";
		}
		foreach(Bill::getFieldsList($filter) as $f) {
			$this->resultPathSet("summary.$f", $this->getOneBySQL("SELECT count(*) as res From bills WHERE {$this->filter} AND ($f > 0)"));
			$list .= "OR($f>0)";
		}
		$list = "(" . $list . ")";
	}

	protected function billStats($header, $filter) {
		$sql = "SELECT SUM(total_real) AS total_real,
		SUM(total_asked) as total_asked,
		SUM(total_paid) as total_paid
		FROM bills
		WHERE ({$this->filter}) AND ({$filter})";

		$stats = DB::select($sql, $this->sqlBindParams);
		$stats = array_pop($stats);
		$this->resultPathSet("$header.real", $stats->total_real);
		$this->resultPathSet("$header.asked", $stats->total_asked);
		$this->resultPathSet("$header.paid", $stats->total_paid);
	}
	
	public function index($when) {
		$this->result['params']['when'] = $when;
		$this->filter = "(" 
			. $this->getReportParamFilter("when", "bills.Date")
			. " AND "
			. $this->getReportParamFilter("examiner", "bills.examinerName")
			. " AND "
			. $this->getReportParamFilter("center", "bills.center")
			. ")";

		// By pathology
		$this->billsByPathology("summary.pathologies.rickets", "pathology_Ricket");
		$this->billsByPathology("summary.pathologies.clubfoots", "pathology_Clubfoot");
		$this->billsByPathology("summary.pathologies.polio", "pathology_Polio");
		$this->billsByPathology("summary.pathologies.burn", "pathology_Burn");
		$this->billsByPathology("summary.pathologies.cp", "pathology_CP");
		$this->billsByPathology("summary.pathologies.congenital", "pathology_Congenital");
		$this->billsByPathology("summary.pathologies.adult", "pathology_Adult");
		$this->billsByPathology("summary.pathologies.other", "pathology_other");
		$this->resultPathSet("summary.pathologies.total", $this->getOneBySQL("SELECT count(*) as res FROM bills WHERE {$this->filter} "));
		
		// Social levels
		$res = DB::select("SELECT CAST(SUM(sl_familySalary) / COUNT(*) AS DECIMAL) as income,
				SUM(sl_numberOfHouseholdMembers) / COUNT(*) as nbhous
				FROM bills
				WHERE {$this->filter} ", 
				$this->sqlBindParams);
		$res = array_pop($res);
		
		$this->resultPathSet("summary.sociallevel.familyincome", $res->income);
		$this->resultPathSet("summary.sociallevel.nbhousehold", $res->nbhous);

		
		$allSL = 0;
		foreach(References::$lists['SocialLevel'] as $i) {
			$allSL += $this->resultPathSet("summary.sociallevel.$i", 
					$this->getOneBySQL("SELECT Count(*) as res FROM bills WHERE {$this->filter} AND SocialLevel = $i"));
		}
		$this->resultPathSet("summary.sociallevel.total", $allSL);
				
		// By center
		$centers = References::$lists['Centers'];
		$res = DB::select("SELECT Center, Count(*) as `count` FROM bills WHERE {$this->filter} GROUP BY Center", 
			$this->sqlBindParams);
		$res2 = array();
		foreach($res as $line) {
			$res2[$line->Center] = $line->count;
		}
		foreach($centers as $c) {
			$this->resultPathSet("summary.centers." . $this->clean($c), array_key_exists($c, $res2) ? $res2[$c] : 0);
		}
		$this->resultPathSet("summary.centers.unspecified", array_key_exists('', $res2) ? $res2[''] : 0);
		
		// By act
		$anySurgery = "";
		$this->billCountByType(Bill::CAT_SURGICAL, $anySurgery);
		
		$anyMedical = "";
		$this->billCountByType(Bill::CAT_MEDECINE, $anyMedical);
		
		$anyWorkshop = "";
		$this->billCountByType(Bill::CAT_WORKSHOP, $anyWorkshop);
		
		$anyConsult = "";
		$this->billCountByType(Bill::CAT_CONSULT, $anyConsult);
		
		$anyOther = "";
		$this->billCountByType(Bill::CAT_OTHER, $anyOther);
		
		// Financials
		$this->billStats("summary.financials.surgery", $anySurgery);
		$this->billStats("summary.financials.medical", "NOT($anySurgery) AND ($anyMedical)");
		$this->billStats("summary.financials.workshop", "NOT($anyMedical OR $anySurgery) AND ($anyWorkshop)");
		$this->billStats("summary.financials.consult", "NOT($anyMedical OR $anySurgery OR $anyWorkshop) AND $anyConsult");
		$this->billStats("summary.financials.other", "NOT($anyMedical OR $anySurgery OR $anyWorkshop OR $anyConsult) AND $anyOther");
		$this->billStats("summary.financials.total", "(1=1)");

		return response()->jsonOrJSONP($this->result);
	}
}
