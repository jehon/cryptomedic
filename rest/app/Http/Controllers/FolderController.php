<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class FolderController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers
	
	public function index() 
	{
		return "search";	
	}
	
	public function show($id)
	{
		$master = [];
		$master['_type'] = 'Folder';
		$master['id'] = $id; 
		$master['mainFile'] = DB::table('patients')->where('id', $id)->first();
		if (!$master['mainFile']) {
			abort(404);
		}
		$master['mainFile']->_type = 'Patient';
	
		$master['subFiles'] = array();
		
		
		foreach(References::$model2db as $m => $c) {
			if ($c == "patients") continue;
			
			$r = DB::select("SELECT * FROM $c WHERE patient_id = :patient_id", array('patient_id' => $id));
			foreach($r as $ri => $rv) {
				$rv->_type = References::db2model($c);
				$master['subFiles'][] = $rv;
			}
		}
		return response()->jsonOrJSONP($master);
	}
	
	public function related($model, $id) {
		$type = References::model2db($model);
		$r = DB::select("SELECT * FROM $type WHERE id = ?", array($id));
		if (count($r) != 1) {
			abort(404);
		}
		$r = array_pop($r);
		return $this->show($r->patient_id);
// 		return response()->jsonOrJSONP($r->patient_id);
	}
}
