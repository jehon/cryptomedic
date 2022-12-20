<?php

namespace App\Http\Controllers;

use App\Model\Bill;

class ReportFinancialController extends ReportController {
  public function buildData() {
    $this->result['list'] = array_map(fn($rec) => array_merge((array) $rec, [
        "is_child" => ($rec->age_at_first_consult < 18),
        "is_complete" => ($rec->nb_consults + $rec->nb_pictures) > 0
      ]),
      $this->runSqlWithNamedParameter("SELECT
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
        SUM(bills.total_real) AS total_real,
        SUM(bills.total_asked) AS total_asked,
        COALESCE(SUM((SELECT SUM(amount) FROM payments WHERE bill_id = bills.id)), 0) AS total_paid,
        (SELECT min(year(Date)) - patients.yearofbirth from bills where patient_id = patients.id) as age_at_first_consult,
        (SELECT count(*) from consults WHERE consults.patient_id = patients.id) as nb_consults,
        (SELECT count(*) from pictures WHERE pictures.patient_id = patients.id) as nb_pictures,
        COUNT(*) as nb_bills
      FROM patients
          JOIN bills ON bills.patient_id = patients.id
          JOIN prices ON prices.id = bills.price_id
      WHERE (1 = 1)
        AND " . $this->getParamAsSqlFilter("when", "bills.Date") . "
      GROUP BY patients.id
      ORDER BY patient_reference"
    )
  );

  }
}
