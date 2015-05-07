<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;


class ReportActivityController extends Controller {
	const DAILY = 0;
	const MONTHLY = 1;
	
	
	public function daily() {
		$when = Request::input("date", "");
			if ($when instanceof DateTime) {
			$when = $when->format("Y-m-d");
		} else {
			if (strlen($when) > 9) {
				$when = substr($when, 0, 10);
			}
		}
		return $this->index($when);
	}
	
	public function monthly() {
		$month = Request::input("month", "");
		if ($month instanceof DateTime) {
			$month = $month->format("Y-m");
		} else {
			$month = substr($month, 0, 7);
			if (strlen($month) == 6) {
				$month = substr($month, 0, 4) . "-0" . substr($month, 5, 1);
			}
		}
		return $this->index($month);
	}
	
	public function index($when) {
		$result = array();
		$result['params'] = array();
		$result['params']['when'] = $when;
		
		$examiner = Request::input("examiner", "");
		$where = Request::input("center", "");
		
		$result['list'] = DB::select("SELECT
				bills.id as bid,
				patients.id as pid,
				bills.Date as Date,
				bills.ExaminerName as ExaminerName,
				bills.Center as Center,
				CONCAT(patients.entryyear, '-', patients.entryorder) as patiens_reference,
				patients.yearofbirth,
				patients.Sex,
				bills.sl_familySalary,
				bills.sl_numberOfHouseholdMembers,
				bills.Sociallevel,
				" . Bill::getSQLDiagno() . " as diagno, 
				" . Bill::getSQLAct() . " as act, 
				" . Bill::getSQLTreatment() . " as treatment, 
				" . Bill::getSQLFieldsSum(Bill::CAT_CONSULT) . " AS price_consult,
	            " . Bill::getSQLFieldsSum(Bill::CAT_MEDECINE) . " AS price_medecine,
				" . Bill::getSQLFieldsSum(Bill::CAT_WORKSHOP) . " AS price_workshop,
	            " . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . " AS price_surgical,
	            " . Bill::getSQLFieldsSum(Bill::CAT_OTHER) . " AS price_other,
	            bills.total_real as total_real,
	            bills.total_asked as total_asked,
	            bills.total_paid as total_paid
	        FROM bills
	        JOIN patients ON bills.patient_id = patients.id
	        JOIN prices ON bills.price_id = prices.id
	        WHERE (1 = 1)
				AND (FIELD(:when, bills.Date, DATE_FORMAT(bills.Date, \"%Y-%m\"), DATE_FORMAT(bills.Date, \"%Y\")) > 0)
				AND (FIELD(:where, '', bills.Center) > 0)
	            AND (FIELD(:examiner, '', bills.ExaminerName) > 0)
			ORDER BY bills.Date ASC, patients.entryyear ASC, patients.entryorder ASC
			",
			array(
					'where' => $where,
					'when' => $when,
					'examiner' => $examiner
			)
		);
		
		$result['totals'] = array();
		foreach($result['list'] as $i => $e) {
			foreach($e as $k => $v) {
				if (!array_key_exists($k, $result['totals'])) {
					$result['totals'][$k] = 0;
				}
				$result['totals'][$k] += $v;
			}
		}
		return response()->jsonOrJSONP($result);
	}
}
