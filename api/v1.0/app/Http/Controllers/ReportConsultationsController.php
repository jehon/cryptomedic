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
	protected function consultations_getSqlConsult($label, $table) {
		$sql = "SELECT \"$label\" as c_type, c.id as c_id, c.Date as c_Date, c.NextCenter as c_Center, c.NextAppointment as c_nextAppointment, c.patient_id as patient_id FROM $table as c ";
		$sql .= " WHERE (1 = 1) " .
			"AND " . $this->getReportParamFilter("day", "Nextappointment", true) .
			"AND " . $this->getReportParamFilter("center", "NextCenter");
		$sql .= " ORDER BY c.id";
		return $sql;
	}

	public function index() {
		$sql = "SELECT cc.*, patients.*
		FROM "
				. "(("
						// . $this->consultations_getSqlConsult("ricket", "ricket_consults")
						// . 	") UNION ("
						// . $this->consultations_getSqlConsult("clubfoot", "club_foots")
						// . 	") UNION ("
						// . $this->consultations_getSqlConsult("non-ricket", "nonricket_consults")
						// . 	") UNION ("
						. $this->consultations_getSqlConsult("appointment", "appointments")
				.")) AS cc "
				. " JOIN patients ON (cc.patient_id = patients.id) ";

		$sql .= " ORDER BY cc.c_Date, patients.id, cc.c_type ";
		$sql .= "LIMIT 100";
		$this->result['list'] = DB::select($sql, $this->sqlBindParams);
		return response()->jsonOrJSONP($this->result);
	}
}
