<?php namespace App\Http\Controllers;

use App\Patient;
use App\SyncComputer;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class SyncController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers
	
	public function sync() {
		$old_cp = Request::input("cp", false);
		if ($old_cp === false) {
			return response();
		}
		$data = array("_offline" => $this->_syncData($old_cp));
	
		return Response($data);
	}
	
	public function _syncData($old_cp) {
		define("n", 200);
		
		$offline = [];
			
		// X-OFFLINE-CP: timestamp|patient_id (generated by $last in _offline->checkpoint)
		if ($old_cp == "") {
			$cp = array("", -1);	
			$offline['reset'] = 1;
		} else {
			$cp = explode("|", $old_cp);
			if (count($cp) != 2) {
				$cp = array("", -1);
				$offline['reset'] = 1;
			} else {
				$offline['reset'] = 0;
			}
		}

		$sqlu = "";
		$params = array();

		foreach((References::$model2db + [ "Deleted" => "deleteds" ]) as $m => $t) {
			if ($sqlu) {
				$sqlu .= " UNION \n";
			}
			$patient_id = ($t == "patients" ? "id" : "patient_id");
			$sqlu .= "("
					. "SELECT greatest(created_at, updated_at) as ts, '$t' as t, $patient_id as patient_id"
					. " FROM $t "
					. " WHERE (greatest(created_at, updated_at) > :ts0_{$m}) "
					. "   OR ((greatest(created_at, updated_at) = :ts1_{$m}) AND ($patient_id > :id1_${m}))"
					. " ORDER BY greatest(created_at, updated_at), $patient_id)";
			$params["ts0_{$m}"]    = $params["ts1_${m}"]    = $cp[0];
			$params["id1_{$m}"]    = $cp[1];
		}
		$sql = "SELECT MAX(ts) as ts, patient_id, t \nFROM (\n$sqlu\n) as p \n ";
		$sql .= "GROUP BY patient_id ";
		$res = DB::select("SELECT count(*) as c FROM ($sql) as p", $params);
		$offline["remaining"] = $res[0]->c;
		
		$sql .= "ORDER BY MAX(ts), patient_id ";
		$sql .= "LIMIT " . constant("n");

		$res = DB::select($sql, $params);
			
		$last = "";
		$offline['data'] = [];
		foreach($res as $i => $r) {
			if ($r->t == 'deleteds') {
				$offline['data'][$i] = [ 'id' => $r->patient_id, '_deleted' => true ];
			} else {
				$offline['data'][$i]['record'] = FolderController::getFolder($r->patient_id);
			}
			$offline['data'][$i]['_dueTo'] = $r->t . "# pid" . $r->patient_id;
			$last = $offline['data'][$i]['checkpoint'] = $r->ts . "|" . $r->patient_id;
		}
		$offline["checkpoint"] = ($last ? $last : $old_cp);
		$offline["isfinal"] = (count($res) < constant("n"));

		// Store the information for helping understanding what is happening out there...
		$computerId = session()->get('computerId');
		$computer = SyncComputer::firstOrCreate([ "computer_id" => $computerId ]);
		$computer->last_sync = $old_cp;
		$computer->last_sync_final = $offline['isfinal'];
		$computer->save();
		
		return $offline;
	}
}
