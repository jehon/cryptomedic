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
          MAX(bills.Date) as Date,
          ANY_VALUE(bills.Center) as Center,
          MAX(bills.sl_familySalary) AS sl_familySalary,
          MAX(bills.sl_numberOfHouseholdMembers) AS sl_numberOfHouseholdMembers,
          MAX(bills.Sociallevel) AS Sociallevel,
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

          MAX(consults.date) AS last_seen,
          GROUP_CONCAT(consults.treatment_evaluation SEPARATOR '###') AS last_treat_result,
          ANY_VALUE(consults.treatment_finished) AS last_treat_finished

        FROM patients
          LEFT OUTER JOIN bills ON (
            bills.patient_id = patients.id
            AND " . $this->getParamAsSqlFilter("when", "bills.Date") . "
            AND " . Bill::getActivityFilter("surgical") . "
          )
          LEFT OUTER JOIN prices ON prices.id = bills.price_id
          LEFT OUTER JOIN surgeries ON (
            surgeries.patient_id = patients.id
            AND " . $this->getParamAsSqlFilter("when", "surgeries.Date") . "
          )
          LEFT OUTER JOIN consults ON (consults.patient_id = patients.id)
          LEFT OUTER JOIN consults AS consults2 ON (consults2.patient_id = patients.id AND consults2.date > consults.date)

        WHERE (1 = 1)
          AND (consults2.date IS NULL)
          AND (bills.id IS NOT NULL OR surgeries.id IS NOT NULL)

        GROUP BY patients.id
        ORDER BY bills.Date, bills.id"
      ),
    [
      "bids" => SQL::LIST,
      "cids" => SQL::LIST
    ]);
  }
}
