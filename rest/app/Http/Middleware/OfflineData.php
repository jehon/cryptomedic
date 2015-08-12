<?php

namespace App\Http\Middleware;

require_once __DIR__ . '/../../../../php/references.php';

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;
use \References;
use \DB;
use \App\LogComputer;

class OfflineData {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$response = $next($request);
		if ($response->getStatusCode() != 200) {
			return $response;
		}
		
		$old_cp = $request->header("X-OFFLINE-CP", $request->input("_x_offline_cp", false));
		if ($old_cp !== false) {
			$n = $request->header("X-OFFLINE-N", $request->input("_x_offline_n", 25));
			$data = $response->getData();
			// X-OFFLINE-CP: timestamp|patient_id (generated by $last in _offline->checkpoint)
			if ($old_cp == "") {
				$cp = array("", -1);	
			} else {
				$cp = explode("|", $old_cp);
				if (count($cp) != 2) {
					$cp = array("", -1);
				}
			}
			
			$sql = "";
			$params = array();
			
			foreach(References::$model2db as $m => $t) {
				if ($sql) {
					$sql .= " UNION \n";
				}
				$patient_id = ($t == "patients" ? "id" : "patient_id");
				$sql .= "("
						. "SELECT greatest(created_at, updated_at) as ts, '$t' as t, $patient_id as patient_id"
						. " FROM $t "
						. " WHERE (greatest(created_at, updated_at) > :ts0_{$m}) "
						. "   OR ((greatest(created_at, updated_at) = :ts1_{$m}) AND ($patient_id > :id1_${m}))"
						. " ORDER BY greatest(created_at, updated_at), $patient_id)";
				$params["ts0_{$m}"]    = $params["ts1_${m}"]    = $cp[0];
				$params["id1_{$m}"]    = $cp[1];
			}
			$sql = "SELECT MAX(ts) as ts, patient_id, t \nFROM (\n$sql\n) as p \n ";
			$sql .= "GROUP BY patient_id ";
			$sql .= "ORDER BY MAX(ts), patient_id LIMIT $n";
				
// 			echo "<pre>$sql</pre>\n";
			$res = DB::select($sql, $params);
			
			$last = "";
			$offline = [];
			foreach($res as $i => $r) {
	 			$offline[$i] = getFolder($r->patient_id);
				$last = $r->ts . "|" . $r->patient_id;
			}
			$offline["_checkpoint"] = ($last ? $last : $old_cp);
			$offline["_final"] = (count($res) < $n);
			
			
			if (is_array($data)) {
				$data['_offline'] = $offline;
			} else if (is_object($data)) {
				$data->_offline = $offline;
			}

			// Store the information for helping understanding what is happening out there...
			$computerId = session()->get('computerId');
			$computer = LogComputer::firstOrCreate([ "computer_id" => $computerId ]);
			$computer->last_sync = $old_cp;
			$computer->last_sync_final = $offline['_final'];
			$computer->save();

			$response->setData($data);
			return $response;
		}
		return $response;
	}
}
