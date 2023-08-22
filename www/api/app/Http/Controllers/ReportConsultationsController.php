<?php namespace App\Http\Controllers;

// Example: 2014-01-29 => 1 patient

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

class ReportConsultationsController extends ReportController {

  public function buildData() {
    $this->result['list'] = $this->runSqlWithNamedParameter(
      "SELECT patients.*, appointments.examiner as examiner, appointments.id as c_id, appointments.next_center as c_center, appointments.purpose as purpose, "
        . " appointments.next_appointment as c_next_appointment, appointments.patient_id as patient_id "
        . " FROM appointments "
        . " JOIN patients ON (appointments.patient_id = patients.id) "
        . " WHERE (1 = 1) "
        // . " AND " . $this->getParamAsSqlFilter("when", "day")
        . " AND " . $this->getParamAsSqlFilter("day", "next_appointment")
        . " AND " . $this->getParamAsSqlFilter("center", "next_center")

        . " ORDER BY appointments.next_appointment, patients.id"
        . " LIMIT 100"
      );
  }
}
