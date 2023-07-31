<?php

namespace App\Http\Controllers;

use App\Helpers\SQL;
use App\Model\Bill;

class ReportFinancialController extends ReportController {
  public function buildData() {
    $this->result['list'] = SQL::NormalizeList(
      $this->runSqlWithNamedParameter(
        SQL::withCalculated("
            SELECT
              patients.id as pid,
              CONCAT(patients.entry_year, '-', patients.entry_order) as patient_reference,
              patients.name as patient_name,
              patients.year_of_birth,
              patients.sex,
              AVG(bills.Sociallevel) as Sociallevel,
              SUM(" . Bill::getSQLFieldsSum(Bill::CAT_CONSULT) . ") AS price_consult,
              SUM(" . Bill::getSQLFieldsSum(Bill::CAT_MEDECINE) . ") AS price_medecine,
              SUM(" . Bill::getSQLFieldsSum(Bill::CAT_WORKSHOP) . ") AS price_workshop,
              SUM(" . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . ") AS price_surgical,
              SUM(" . Bill::getSQLFieldsSum(Bill::CAT_OTHER) . ") AS price_other,
              SUM(bills.total_real) AS total_real,
              SUM(bills.total_asked) AS total_asked,
              COALESCE(SUM((SELECT SUM(amount) FROM payments WHERE bill_id = bills.id)), 0) AS total_paid,
              (SELECT min(year(date)) - patients.year_of_birth from bills where patient_id = patients.id) as age_at_first_consult,
              (SELECT count(*) from consults WHERE consults.patient_id = patients.id) as nb_consults,
              (SELECT count(*) from pictures WHERE pictures.patient_id = patients.id) as nb_pictures,
              COUNT(*) as nb_bills
            FROM patients
                JOIN bills ON bills.patient_id = patients.id
                JOIN prices ON prices.id = bills.price_id
            WHERE (1 = 1)
              AND " . $this->getParamAsSqlFilter("when", "bills.date") . "
            GROUP BY patients.id
            HAVING (1 = 1)
      ",
      [
        "is_child" => "age_at_first_consult < 18",
        "is_complete" => "(nb_consults + nb_pictures) > 0"
      ])
      . " HAVING (1 = 1)
        " . ($this->getParam('is_complete', false) ? " AND ( nb_consults + nb_pictures > 0 )" : "") . "
        " . ($this->getParam('is_child', false) ? " AND ( age_at_first_consult < 18 )" : "") . "
        " . ($this->getParam('is_poor', false) ? " AND ( Sociallevel <= 3 )" : "") . "
        ORDER BY patient_reference"
      ),
      [
        "is_child" => SQL::BOOLEAN,
        "is_complete" => SQL::BOOLEAN
      ]
    );
  }
}
