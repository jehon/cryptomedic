<?php

namespace App\Http\Controllers;

use App\Model\Bill;
use App\Model\CryptomedicModel;
use App\Model\References;

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

	protected function billStats($header, $include = false, $excludes = []) {
		$stat_filter = "(1 = 1)";

		$filter = function($what) {
			return "EXISTS(SELECT * FROM bill_lines JOIN price_lines 
				ON (bill_lines.title = price_lines.title)
				WHERE (bill_lines.bill_id = bills.id AND price_lines.price_id = prices.id)
				AND price_lines.type = '$what')";
		};

		if ($include) {
			$stat_filter = $filter($include);
		}

		foreach($excludes as $e) {
			$stat_filter = $stat_filter . " AND NOT(" . $filter($e) . ")";
		}

		$stats = $this->runSqlWithNamedParameter("
			SELECT SUM(total_real) AS total_real,
			SUM(total_asked) as total_asked,
		    SUM(payments.amount) as total_paid
			FROM bills
			JOIN prices ON (bills.price_id = prices.id)
			LEFT JOIN payments ON (payments.bill_id = bills.id)
			WHERE ({$this->filter}) 
			AND ({$stat_filter})"
			);
		$stats = array_pop($stats);
		$this->resultPathSet("$header.real", $stats->total_real);
		$this->resultPathSet("$header.asked", $stats->total_asked);
		$this->resultPathSet("$header.paid", $stats->total_paid);
	}

  public function buildData() {
		$this->filter = "("
			. $this->getParamAsSqlFilter("when", "bills.Date")
			. " AND "
			. $this->getParamAsSqlFilter("examiner", "bills.examinerName")
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

		// Social levels
		$res = $this->runSqlWithNamedParameter("SELECT CAST(SUM(sl_familySalary) / COUNT(*) AS DECIMAL) as income,
				SUM(sl_numberOfHouseholdMembers) / COUNT(*) as nbhous
				FROM bills
				WHERE {$this->filter} ");
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
		$res = $this->runSqlWithNamedParameter("SELECT Center, Count(*) as `count` FROM bills WHERE {$this->filter} GROUP BY Center");
		$res2 = array();
		foreach($res as $line) {
			$res2[$line->Center] = $line->count;
		}
		foreach($centers as $c) {
			$this->resultPathSet("summary.centers." . CryptomedicModel::myCleanValue($c), array_key_exists($c, $res2) ? $res2[$c] : 0);
		}
		$this->resultPathSet("summary.centers.unspecified", array_key_exists('', $res2) ? $res2[''] : 0);

		// By act
		$res = $this->runSqlWithNamedParameter("
			SELECT count(*) as res, price_lines.title as title
			FROM bills 
			JOIN bill_lines ON (bill_lines.bill_id = bills.id)
			JOIN prices ON (bills.price_id = prices.id)
			JOIN price_lines ON (price_lines.price_id = prices.id AND price_lines.title = bill_lines.title)
			WHERE {$this->filter}
			GROUP BY price_lines.title, price_lines.type
			HAVING res > 0
			ORDER BY price_lines.type, price_lines.title

		");
		foreach($res as $line) {
			$this->resultPathSet("summary." . $line->title, $line->res);
		}

		// Financials

		$this->billStats("summary.financials.surgery",  Bill::CAT_SURGICAL );
		$this->billStats("summary.financials.medical",  BILL::CAT_MEDECINE, [ Bill::CAT_SURGICAL ]);
		$this->billStats("summary.financials.workshop", BILL::CAT_WORKSHOP, [ Bill::CAT_SURGICAL, BILL::CAT_MEDECINE ]);
		$this->billStats("summary.financials.consult",  BILL::CAT_CONSULT,  [ Bill::CAT_SURGICAL, BILL::CAT_MEDECINE, BILL::CAT_WORKSHOP ]);
		$this->billStats("summary.financials.other",    BILL::CAT_OTHER,    [ Bill::CAT_SURGICAL, BILL::CAT_MEDECINE, BILL::CAT_WORKSHOP, BILL::CAT_CONSULT ]);
		$this->billStats("summary.financials.total");
	}
}
