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
            SUM((SELECT SUM(Amount) FROM payments WHERE payments.bill_id = bills.id)) as paid
        FROM 
          bills
          LEFT JOIN patients ON patients.id = bills.patient_id
        WHERE 1 = 1
          AND (" . $this->getParamAsSqlFilter("year", "YEAR(bills.Date)") . ")
        GROUP BY YEAR(bills.Date), MONTH(bills.Date)
        ");
  }
}
