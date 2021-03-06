<?php

namespace App\Http\Controllers;

use App\Model\Bill;

class ReportSurgicalController extends ReportController {
  public function buildData() {
    $this->result['list'] = $this->runSqlWithNamedParameter("SELECT
        bills.id as bid,
        patients.id as pid,
        bills.Date as Date,

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
              (select sum(amount) from payments where bill_id = bills.id) as total_paid,
        exists(select * from bills as b2 where b2.patient_id = bills.patient_id and b2.Date < " . $this->getParamAsSqlNamed("whenFrom") . ") as oldPatient,
        consults.Date AS last_seen,
        consults.TreatmentEvaluation AS last_treat_result,
        consults.TreatmentFinished AS last_treat_finished
      FROM bills
          JOIN patients ON bills.patient_id = patients.id
          JOIN prices ON bills.price_id = prices.id
          LEFT OUTER JOIN consults ON (patients.id = consults.patient_id)
          LEFT OUTER JOIN consults AS consults2 ON (patients.id = consults2.patient_id AND consults2.Date > consults.Date)
      WHERE (1 = 1)
        AND " . $this->getParamAsSqlFilter("when", "bills.Date") . "
        AND " . Bill::getActivityFilter("surgical") . "
        AND consults2.Date IS NULL
      ORDER BY bills.Date, bills.id"
    );

    $this->result['totals'] = array();
    foreach($this->result['list'] as $e) {
      foreach($e as $k => $v) {
		if (!is_numeric($v)) {
			continue;
		}
        if (!array_key_exists($k, $this->result['totals'])) {
          $this->result['totals'][$k] = 0;
        }
        $this->result['totals'][$k] += $v;
      }
    }
  }
}
