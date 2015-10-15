<?php namespace App\Http\Controllers;

use App\Patient;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

#require_once(__DIR__ . "/../../../../../php/references.php");
use \References;

class FolderController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public static function getFolder($id) {
		$master = [];
		$master['_type'] = 'Folder';
		$master['id'] = $id;
		$master['mainFile'] = DB::table('patients')->where('id', $id)->first();
		if (!$master['mainFile']) {
			return null;
		}
		$master['mainFile']->_type = 'Patient';

		$master['subFiles'] = array();

		foreach(References::$model2db as $c) {
			if ($c == "patients") continue;

			$r = DB::select("SELECT * FROM $c WHERE patient_id = :patient_id", array('patient_id' => $id));
			foreach($r as $rv) {
				$rv->_type = References::db2model($c);
				$master['subFiles'][] = $rv;
			}
		}
		return $master;
	}

	public static function getFolderOrFail($id) {
		$res = self::getFolder($id);
		if (!$res) {
			abort(404);
		}
		return $res;
	}

	public function index() {
		// Search through them
		$req = DB::table('patients');

		if (Request::input("entryyear", false)) {
			$req->where('entryyear', '=', Request::input("entryyear", false));
		}

		if (Request::input("entryorder", false)) {
			$req->where('entryorder', '=', Request::input("entryorder", false));
		}

		if (Request::input("Lastname", false)) {
			$req->where(function($req) {
				$req->where("Firstname", 'like', '%' . str_replace("j", "z", Request::input("Lastname", false)) .'%')
					->orWhere("Lastname", 'like', '%' . str_replace("j", "z", Request::input("Lastname", false)) . '%');
			});
		}

		if (Request::input("Sex", false)) {
			$req->where('Sex', '=', Request::input("Sex", false));
		}

		if (Request::input("Yearofbirth", false)) {
			$req->where('Yearofbirth', '=', Request::input("Yearofbirth", false));
		}

		if (Request::input("Telephone", false)) {
			$req->where('Telephone', 'like', '%' . Request::input("Telephone", false) . '%');
		}

		if (Request::input("pathology_Ricket", false)) {
			$req->where('pathology_Ricket', '=', '1');
		}

		if (Request::input("pathology_Clubfoot", false)) {
			$req->where('pathology_Clubfoot', '=', '1');
		}

		if (Request::input("pathology_Burn", false)) {
			$req->where('pathology_Burn', '=', '1');
		}

		if (Request::input("pathology_Polio", false)) {
			$req->where('pathology_Polio', '=', '1');
		}

		if (Request::input("pathology_CP", false)) {
			$req->where('pathology_CP', '=', '1');
		}

		if (Request::input("pathology_Congenital", false)) {
			$req->where('pathology_Congenital', '=', '1');
		}

		if (Request::input("pathology_Adult", false)) {
			$req->where('pathology_Adult', '=', '1');
		}

		$req->orderBy('entryyear', 'DESC')->take(100);

		$listing = $req->get();
		foreach($listing as $k => $v) {
			$listing[$k]->_type = 'Patient';
		}
		return response()->jsonOrJSONP($listing);
	}

	public function show($id) {
		return response()->folder($id);
	}

	public function reference($entryyear, $entryorder) {
		$r = DB::select("SELECT * FROM patients WHERE entryyear = ? and entryorder = ?", array($entryyear, $entryorder));
		if (count($r) != 1) {
			return response()->jsonOrJSONP(null);
		}
		$r = array_pop($r);
		return response()->folder($r->id);
	}

	public function createFile() {
		$data = Input::except('_type');

		$newObj = Patient::create($data);
		if (!$newObj->id) {
			abort(500, "Could not create the patient");
		}
		return response()->folder($newObj->id);
	}
}
