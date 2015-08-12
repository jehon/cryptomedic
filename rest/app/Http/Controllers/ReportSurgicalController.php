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

		$this->result['list'] = DB::select("SELECT
				bills.id as bid,
				patients.id as pid,
				bills.Date as Date,
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
				(select consults.Date                from consults where consults.patient_id = bills.patient_id ORDER BY consults.Date DESC LIMIT 1) as last_seen,
				(select consults.TreatmentEvaluation from consults where consults.patient_id = bills.patient_id ORDER BY consults.Date DESC LIMIT 1) as last_treat_result,
				(select consults.TreatmentFinished   from consults where consults.patient_id = bills.patient_id ORDER BY consults.Date DESC LIMIT 1) as last_treat_ended 
			FROM bills
	            JOIN patients ON bills.patient_id = patients.id
	            JOIN prices ON bills.price_id = prices.id
	        WHERE (1 = 1)
				AND " . $this->getReportParamFilter("when", "bills.Date") . "
				AND " . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . " > 0
			ORDER BY bills.Date ASC, patients.entryyear ASC, patients.entryorder ASC, bills.id ASC
			", $this->sqlBindParams + [ "whenFrom12" => $this->internalWhenFrom ]
		);

		$this->result['totals'] = array();
		foreach($this->result['list'] as $e) {
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
