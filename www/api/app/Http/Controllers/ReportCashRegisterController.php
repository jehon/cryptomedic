<?php

namespace App\Http\Controllers;

use App\Helpers\SQL;
use App\Model\Bill;

class ReportCashRegisterController extends ReportController
{
  public function buildData()
  {
    $poorFilter = "  ";
    
    $this->result['list'] = 
      $this->runSqlWithNamedParameter(
        "SELECT
            YEAR(bills.Date) as year,
            MONTH(bills.Date) as month,

            SUM(total_real) as total_real,
            SUM(total_asked) as total_asked,
            SUM((SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id)) as paid,

            SUM(IF(false, total_real, 0)) as child_total_real,
            SUM(IF(false, total_asked, 0)) as child_total_asked,
            SUM(IF(false, (SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id), 0)) as child_paid,

            SUM(IF(false, total_real, 0)) as poor_child_total_real,
            SUM(IF(false, total_asked, 0)) as poor_child_total_asked,
            SUM(IF(false, (SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id), 0)) as poor_child_paid

        FROM 
          bills
          LEFT JOIN patients ON patients.id = bills.patient_id
        WHERE 1 = 1
          AND (" . $this->getParamAsSqlFilter("year", "YEAR(bills.Date)") . ")
        GROUP BY YEAR(bills.Date), MONTH(bills.Date)
        ");
  }
}
