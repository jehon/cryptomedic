<?php namespace App\Http\Controllers;

// Example: 2014-01-29 => 1 patient

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

class ReportConsultationsController extends ReportController {

  public function buildData() {
    $this->result['list'] = $this->runSqlWithNamedParameter(
      "SELECT patients.*, appointments.examiner as examiner, appointments.id as c_id, appointments.center as c_center, appointments.purpose as purpose, "
        . " appointments.date as c_date, appointments.patient_id as patient_id "
        . " FROM appointments "
        . " JOIN patients ON (appointments.patient_id = patients.id) "
        . " WHERE (1 = 1) "
        // . " AND " . $this->getParamAsSqlFilter("when", "day")
        . " AND " . $this->getParamAsSqlFilter("day", "date")
        . " AND " . $this->getParamAsSqlFilter("center", "center")

        . " ORDER BY appointments.date, patients.id"
        . " LIMIT 100"
      );
  }
}
