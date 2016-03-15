<?php namespace App\Http\Controllers;

require_once(__DIR__ . "/../../../../../php/core.php");

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;
use \myCleanValue;
use \References;

class ReportStatisticalController extends ReportController {
	protected $filter = "(1=1)";

	protected function billsByPathology($header, $pathology) {
		$thisfilter = "(patients.Pathology = '$pathology')";
		if (!$pathology) {
			$thisfilter = "(patients.Pathology is NULL or patients.Pathology = 'Other')";
		}
		$newPatients = " (patients.entryyear >= YEAR(bills.Date)) AND (ADDDATE(patients.created_at, INTERVAL 1 MONTH) >= bills.Date) ";
		$sql = "SELECT count(*) as res FROM bills JOIN patients ON (bills.patient_id = patients.id)"
				. " WHERE {$this->filter} AND $thisfilter";
		$all = $this->getOneBySQL($sql);
		$this->resultPathSet($header . ".total", $all);

		$sql = "SELECT count(*) as res FROM bills JOIN patients ON (bills.patient_id = patients.id)"
				. " WHERE {$this->filter} AND $thisfilter AND $newPatients";
		$newone = $this->getOneBySQL($sql);
		$this->resultPathSet($header . ".new", $newone);
		$this->resultPathSet($header . ".old", $all - $newone);
		return 1;
	}

	// By bill element
	protected function billCountByType($count_filter, &$list) {
		global $bills;
		if ($list == "") {
			$list = "(1=0)";
		}
		foreach(Bill::getFieldsList($count_filter) as $f) {
			$this->resultPathSet("summary.$f", $this->getOneBySQL("SELECT count(*) as res From bills WHERE {$this->filter} AND ($f > 0)"));
			$list .= "OR($f>0)";
		}
		$list = "(" . $list . ")";
	}

	protected function billStats($header, $stat_filter) {
		$sql = "SELECT SUM(total_real) AS total_real,
		SUM(total_asked) as total_asked,
		SUM(total_paid) as total_paid
		FROM bills
		WHERE ({$this->filter}) AND ({$stat_filter})";

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
		$this->billsByPathology("summary.pathologies.rickets", "Ricket");
		$this->billsByPathology("summary.pathologies.clubfoots", "ClubFoot");
		$this->billsByPathology("summary.pathologies.polio", "Polio");
		$this->billsByPathology("summary.pathologies.burn", "Burn retraction");
		$this->billsByPathology("summary.pathologies.cp", "Cerebral Palsy");
		$this->billsByPathology("summary.pathologies.fracture", "Fracture");
		$this->billsByPathology("summary.pathologies.infection", "Infection");
		$this->billsByPathology("summary.pathologies.congenital", "Congenital");
		$this->billsByPathology("summary.pathologies.adult", "Adult Physio");
		$this->billsByPathology("summary.pathologies.normal", "Normal Patient");
		$this->billsByPathology("summary.pathologies.other", false);
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
			$this->resultPathSet("summary.centers." . myCleanValue($c), array_key_exists($c, $res2) ? $res2[$c] : 0);
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
