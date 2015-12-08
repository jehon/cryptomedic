<?php namespace App\Http\Controllers;

// Example: 2014-01-29 => 1 patient

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

#require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class ReportConsultationsController extends ReportController {
  /* Consultations */
  // protected function consultations_getSqlConsult($label, $table) {
  //  $sql = ;
  //  $sql .= " WHERE (1 = 1) " .
  //    "AND " . $this->getReportParamFilter("day", "Nextappointment", true) .
  //    "AND " . $this->getReportParamFilter("center", "NextCenter");
  //  $sql .= " ORDER BY c.id";
  //  return $sql;
  // }

  public function index() {
    $sql = "SELECT patients.*, appointments.id as c_id, appointments.Date as c_Date, appointments.NextCenter as c_Center, "
        . " appointments.NextAppointment as c_nextAppointment, appointments.patient_id as patient_id "
        . " FROM appointments "
        . " JOIN patients ON (appointments.patient_id = patients.id) "
        . " WHERE (1 = 1) "
        . "AND " . $this->getReportParamFilter("day", "Nextappointment", true)
        . "AND " . $this->getReportParamFilter("center", "NextCenter");

    $sql .= " ORDER BY appointments.Date, patients.id ";
    $sql .= "LIMIT 100";
    $this->result['list'] = DB::select($sql, $this->sqlBindParams);
    return response()->jsonOrJSONP($this->result);
  }
}
