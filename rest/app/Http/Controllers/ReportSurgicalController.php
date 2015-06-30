<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;


class ReportSurgicalController extends ReportController {
	public function index($when) {
		$this->getReportParams("when", $when);
		$examiner = $this->getReportParams("examiner", "");
		$where = $this->getReportParams("center", "");

		$this->result['list'] = DB::select("SELECT
				bills.id as bid,
				patients.id as pid,
				bills.Date as Date,
				bills.ExaminerName as ExaminerName,
				bills.Center as Center,
				CONCAT(patients.entryyear, '-', patients.entryorder) as patient_reference,
				CONCAT(patients.FirstName, ' ', patients.LastName) as patient_name,
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
	            bills.total_paid as total_paid,
				exists(select * from bills as b2 where b2.patient_id = bills.patient_id and b2.Date < :whenFrom12) as oldPatient,
				1 as last_seen,
				1 as last_treat_result,
				1 as last_treat_ended 
			FROM bills
	        JOIN patients ON bills.patient_id = patients.id
	        JOIN prices ON bills.price_id = prices.id
	        WHERE (1 = 1)
				AND " . $this->getReportParamFilter("when", "bills.Date") . "
				AND " . $this->getReportParamFilter("center", "bills.Center") . "
				AND " . $this->getReportParamFilter("examiner", "bills.ExaminerName") . "
			ORDER BY bills.Date ASC, patients.entryyear ASC, patients.entryorder ASC, bills.id ASC
			", $this->sqlBindParams + [ "whenFrom12" => $this->internalWhenFrom ]
		);

		$this->result['totals'] = array();
		foreach($this->result['list'] as $i => $e) {
			foreach($e as $k => $v) {
				if (!array_key_exists($k, $this->result['totals'])) {
					$this->result['totals'][$k] = 0;
				}
				$this->result['totals'][$k] += $v;
			}
		}
		return response()->jsonOrJSONP($this->result);
	}
}
