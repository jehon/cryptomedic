<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class ReportController extends Controller {
	protected function consultations_getSqlConsult($label, $table, &$params) {
		$sql = "SELECT \"$label\" as c_type, c.id as c_id, c.Date as c_Date, c.NextCenter as c_Center, c.NextAppointment as c_nextAppointment, c.patient_id as patient_id FROM $table as c ";
		$sql .= " WHERE (1 = 1)";
		
		if (Request::input("day", false)) {
			$sql .= " AND (Nextappointment = ?)";
			$params[] = Request::input("day");
		}		
		
		if (Request::input("center", false)) {
			$sql .= " AND (NextCenter= ?) ";
			$params[] = Request::input("center");
		}		
		return $sql;
	}
		
	public function consultations() {
		$params = array();
		$sql = "SELECT cc.*, patients.*
		FROM "
				. "(("
						. $this->consultations_getSqlConsult("ricket", "ricket_consults", $params)
						. 	") UNION ("
						. $this->consultations_getSqlConsult("clubfoot", "club_foots", $params)
						. 	") UNION ("
						. $this->consultations_getSqlConsult("non-ricket", "nonricket_consults", $params)
				.")) AS cc "
				. " JOIN patients ON (cc.patient_id = patients.id) ";

		$sql .= " LIMIT 100";
		$listing = DB::select($sql, $params);
		return response()->jsonOrJSONP($listing);
	}	
	
// 	public function activity() {
// 	}
}
