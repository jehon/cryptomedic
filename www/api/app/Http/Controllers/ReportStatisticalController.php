<?php

namespace App\Http\Controllers;

use App\Model\Bill;
use App\Model\CryptomedicModel;
use App\Model\Lists;

class ReportStatisticalController extends ReportController {
	protected $filter = "(1=1)";

	protected function billsByPathology($header, $pathology) {
		$thisfilter = "(patients.pathology = '$pathology')";
		if (!$pathology) {
			$thisfilter = "(patients.pathology is NULL or patients.pathology = 'Other')";
		}
		$newPatients = " (patients.entry_year >= YEAR(bills.date)) AND (ADDDATE(patients.created_at, INTERVAL 1 MONTH) >= bills.date) ";
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
		foreach (Bill::getFieldsList($count_filter) as $f) {
			$this->resultPathSet("summary.count.$count_filter.$f", $this->getOneBySQL("SELECT count(*) as res From bills WHERE {$this->filter} AND (`$f` > 0)"));
			$list .= "OR(`$f`>0)";
		}
		$list = "(" . $list . ")";
	}

	protected function billStats($header, $stat_filter) {
		$stats = $this->runSqlWithNamedParameter("SELECT SUM(total_real) AS total_real,
			SUM(total_asked) as total_asked,
      SUM(payments.amount) as total_paid
			FROM bills
			LEFT JOIN payments ON(payments.bill_id = bills.id)
			WHERE ({$this->filter}) AND ({$stat_filter})");
		$stats = array_pop($stats);
		$this->resultPathSet("$header.real", $stats->total_real);
		$this->resultPathSet("$header.asked", $stats->total_asked);
		$this->resultPathSet("$header.paid", $stats->total_paid);
	}

	public function buildData() {
		$this->filter = "("
			. $this->getParamAsSqlFilter("when", "bills.date")
			. " AND "
			. $this->getParamAsSqlFilter("examiner", "bills.examiner")
			. " AND "
			. $this->getParamAsSqlFilter("center", "bills.center")
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

		// Nb of patients seen
		$this->resultPathSet("summary.nbPatients", $this->getOneBySQL("SELECT count(*) as res FROM (select DISTINCT patient_id FROM bills WHERE {$this->filter} ) AS patients"));

		// Social levels
		$res = $this->runSqlWithNamedParameter("SELECT CAST(SUM(sl_family_salary) / COUNT(*) AS DECIMAL) as income,
				AVG(sl_number_of_household_members) as nbhous
				FROM bills
				WHERE {$this->filter} ");
		$res = array_pop($res);

		$this->resultPathSet("summary.social_level.familyincome", $res->income);
		$this->resultPathSet("summary.social_level.nbhousehold", $res->nbhous);


		$allSL = 0;
		foreach (Lists::getList('SocialLevels') as $i) {
			$allSL += $this->resultPathSet(
				"summary.social_level.$i",
				$this->getOneBySQL("SELECT Count(*) as res FROM bills WHERE {$this->filter} AND social_level = $i")
			);
		}
		$this->resultPathSet("summary.social_level.total", $allSL);

		// By center
		$centers = Lists::getList('Centers');
		$res = $this->runSqlWithNamedParameter("SELECT center, Count(*) as `count` FROM bills WHERE {$this->filter} GROUP BY center");
		$res2 = array();
		foreach ($res as $line) {
			$res2[$line->center] = $line->count;
		}
		foreach ($centers as $c) {
			$this->resultPathSet("summary.centers.$c", array_key_exists($c, $res2) ? $res2[$c] : 0);
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
	}
}
