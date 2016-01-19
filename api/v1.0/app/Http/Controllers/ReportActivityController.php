<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

use \References;

class ReportActivityController extends ReportController {
  public function index($when) {
    $this->getReportParams("when", $when);
    $this->getReportParams("examiner", "");
    $this->getReportParams("center", "");
    $this->getReportParams("activity", "");

    $this->result['list'] = DB::select("SELECT
        bills.id as bid,
        patients.id as pid,
        bills.Date as Date,
        bills.ExaminerName as ExaminerName,
        bills.Center as Center,
        CONCAT(patients.entryyear, '-', patients.entryorder) as patient_reference,
        patients.Name as patient_name,
        patients.yearofbirth,
        patients.Sex,
        bills.sl_familySalary,
        bills.sl_numberOfHouseholdMembers,
        bills.Sociallevel,
        patients.Pathology,
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
        exists(select * from bills as b2 where b2.patient_id = bills.patient_id and b2.Date < bills.Date) as oldPatient
      FROM bills
          JOIN patients ON bills.patient_id = patients.id
          JOIN prices ON bills.price_id = prices.id
      WHERE (1 = 1)
        AND " . $this->getReportParamFilter("when", "bills.Date") . "
        AND " . $this->getReportParamFilter("center", "bills.Center") . "
        AND " . $this->getReportParamFilter("examiner", "bills.ExaminerName") . "
        AND " . Bill::getActivityFilter($this->getReportParams("activity", "")) . "
      ORDER BY bills.id "
      , $this->sqlBindParams
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
