<?php

namespace App\Http\Controllers;

use App\Helpers\SQL;
use App\Model\Bill;

class ReportCashRegisterController extends ReportController
{
  public function buildData()
  {
    // (SELECT min(year(bills.Date)) - patients.yearofbirth FROM bills WHERE patient_id = patients.id) as age_at_first_consult,
    $childFilter = "(SELECT min(year(bills.Date)) - patients.yearofbirth FROM bills WHERE patient_id = patients.id) < 18";
    $poorFilter = "bills.Sociallevel <= 3";
    
    $this->result['list'] = 
      $this->runSqlWithNamedParameter(
        "SELECT
            YEAR(bills.Date) as year,
            MONTH(bills.Date) as month,

            SUM(bills.total_real) as total_real,
            SUM(bills.total_asked) as total_asked,
            SUM((SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id)) as paid,

            SUM(IF($childFilter, bills.total_real, 0)) as child_total_real,
            SUM(IF($childFilter, bills.total_asked, 0)) as child_total_asked,
            SUM(IF($childFilter, (SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id), 0)) as child_paid,

            SUM(IF($childFilter AND $poorFilter, bills.total_real, 0)) as poor_child_total_real,
            SUM(IF($childFilter AND $poorFilter, bills.total_asked, 0)) as poor_child_total_asked,
            SUM(IF($childFilter AND $poorFilter, (SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id), 0)) as poor_child_paid

        FROM 
          bills
          LEFT JOIN patients ON patients.id = bills.patient_id
        WHERE 1 = 1
          AND (" . $this->getParamAsSqlFilter("year", "YEAR(bills.Date)") . ")
        GROUP BY YEAR(bills.Date), MONTH(bills.Date)
        ");
  }
}
