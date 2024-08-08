<?php

namespace App\Http\Controllers;

use App\Helpers\SQL;
use App\Model\Bill;

class ReportSurgicalController extends ReportController
{
  public function buildData()
  {
    $this->result['list'] = SQL::NormalizeList(
      $this->runSqlWithNamedParameter(
        "SELECT
          patients.id as pid,
          CONCAT(patients.entry_year, '-', patients.entry_order) as patient_reference,
          patients.name as patient_name,
          patients.year_of_birth,
          patients.sex,
          patients.pathology,

          IFNULL(GROUP_CONCAT(bills.id SEPARATOR '|'), '') as bids,
          COUNT(bills.id) as bills,
          MAX(bills.date) as date,
          ANY_VALUE(bills.center) as center,
          MAX(bills.sl_family_salary) AS sl_family_salary,
          MAX(bills.sl_number_of_household_members) AS sl_number_of_household_members,
          MAX(bills.social_level) AS social_level,
          SUM(" . Bill::getSQLFieldsSum(Bill::CAT_CONSULT) . ") AS price_consult,
          SUM(" . Bill::getSQLFieldsSum(Bill::CAT_MEDECINE) . ") AS price_medecine,
          SUM(" . Bill::getSQLFieldsSum(Bill::CAT_WORKSHOP) . ") AS price_workshop,
          SUM(" . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . ") AS price_surgical,
          SUM(" . Bill::getSQLFieldsSum(Bill::CAT_OTHER) . ") AS price_other,
          SUM(bills.total_real) as total_real,
          SUM(bills.total_asked) as total_asked,
          SUM((select sum(amount) from payments where bill_id = bills.id)) as total_paid,

          IFNULL(GROUP_CONCAT(surgeries.id SEPARATOR '|'), '') as cids,
          COUNT(surgeries.id) as consults,

          MAX(last_consult.date) AS last_seen,
          GROUP_CONCAT(last_consult.treatment_evaluation SEPARATOR '###') AS last_treat_result,
          ANY_VALUE(last_consult.treatment_finished) AS last_treat_finished

        FROM patients
          LEFT OUTER JOIN bills ON (
            bills.patient_id = patients.id
            AND " . $this->getParamAsSqlFilter("when", "bills.date") . "
            AND " . Bill::getActivityFilter("surgical") . "
          )
          LEFT OUTER JOIN prices ON prices.id = bills.price_id
          LEFT OUTER JOIN surgeries ON (
            surgeries.patient_id = patients.id
            AND " . $this->getParamAsSqlFilter("when", "surgeries.date") . "
          )
          LEFT OUTER JOIN consults AS last_consult     ON (last_consult.patient_id = patients.id)
          LEFT OUTER JOIN consults AS no_consult_after ON (no_consult_after.patient_id = patients.id AND no_consult_after.date > last_consult.date)

        WHERE (1 = 1)
          AND (no_consult_after.date IS NULL)
          AND (bills.id IS NOT NULL OR surgeries.id IS NOT NULL)

        GROUP BY patients.id
        ORDER BY bills.date, bills.id"
      ),
    [
      "bids" => SQL::LIST,
      "cids" => SQL::LIST
    ]);
  }
}
