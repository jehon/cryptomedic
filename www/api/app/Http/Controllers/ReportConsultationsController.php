<?php namespace App\Http\Controllers;

// Example: 2014-01-29 => 1 patient

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

class ReportConsultationsController extends ReportController {

  public function buildData() {
    $this->result['list'] = $this->runSqlWithNamedParameter(
      "SELECT patients.*, appointments.examiner as examiner, appointments.id as c_id, appointments.Date as c_date, appointments.NextCenter as c_center, appointments.purpose as purpose, "
        . " appointments.NextAppointment as c_nextAppointment, appointments.patient_id as patient_id "
        . " FROM appointments "
        . " JOIN patients ON (appointments.patient_id = patients.id) "
        . " WHERE (1 = 1) "
        // . " AND " . $this->getParamAsSqlFilter("when", "day")
        . " AND " . $this->getParamAsSqlFilter("day", "Nextappointment")
        . " AND " . $this->getParamAsSqlFilter("center", "NextCenter")

        . " ORDER BY appointments.Date, patients.id "
        . "LIMIT 100"
      );
  }
}
