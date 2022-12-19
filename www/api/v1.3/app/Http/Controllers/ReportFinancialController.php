<?php

namespace App\Http\Controllers;

use App\Model\Bill;

class ReportFinancialController extends ReportController {
  public function buildData() {
    $this->result['list'] = $this->runSqlWithNamedParameter("SELECT
        bills.id as bid,
        patients.id as pid,
        CONCAT(patients.entryyear, '-', patients.entryorder) as patient_reference,
        patients.Name as patient_name,
        patients.yearofbirth,
        patients.Sex,
        SUM(" . Bill::getSQLFieldsSum(Bill::CAT_CONSULT) . ") AS price_consult,
        SUM(" . Bill::getSQLFieldsSum(Bill::CAT_MEDECINE) . ") AS price_medecine,
        SUM(" . Bill::getSQLFieldsSum(Bill::CAT_WORKSHOP) . ") AS price_workshop,
        SUM(" . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . ") AS price_surgical,
        SUM(" . Bill::getSQLFieldsSum(Bill::CAT_OTHER) . ") AS price_other,
        bills.total_real as total_real,
        bills.total_asked as total_asked,
        (select sum(amount) from payments where bill_id = bills.id) as total_paid,
        consults.Date AS last_seen,
        consults.TreatmentEvaluation AS last_treat_result,
        consults.TreatmentFinished AS last_treat_finished
      FROM bills
          JOIN patients ON bills.patient_id = patients.id
          JOIN prices ON bills.price_id = prices.id
          LEFT OUTER JOIN consults ON (patients.id = consults.patient_id)
      WHERE (1 = 1)
        AND " . $this->getParamAsSqlFilter("when", "bills.Date") . "
      GROUP BY patients.id
      ORDER BY bills.Date, bills.id"
    );

  }
}
