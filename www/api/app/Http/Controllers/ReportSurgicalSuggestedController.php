<?php

namespace App\Http\Controllers;

use App\Helpers\SQL;
use App\Model\Bill;

class ReportSurgicalSuggestedController extends ReportController
{
  public function buildData()
  {
    $this->result['list'] = 
      $this->runSqlWithNamedParameter(
        "SELECT
          patients.id as pid,
          CONCAT(patients.entryyear, '-', patients.entryorder) as patient_reference,
          patients.Name as patient_name,
          patients.yearofbirth,
          patients.Sex,
          patients.Pathology,

          COUNT(surgeries.id) as amount_surgeries,
          MAX(surgeries.Date) AS last_surgery,
          MAX(consults.Date) AS suggested_from

        FROM patients
          LEFT OUTER JOIN surgeries ON (surgeries.patient_id = patients.id)
          LEFT OUTER JOIN consults ON (consults.patient_id = patients.id AND consults.suggestedForSurgery = 1)

        WHERE (1 = 1)
          AND " . $this->getParamAsSqlFilter("year", "YEAR(consults.Date)") . "

        GROUP BY patients.id
        ORDER BY patients.entryyear, patients.entryorder"
          );
  }
}
