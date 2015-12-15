<?php namespace App\Http\Controllers;

use App\Patient;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

use \References;

class FolderController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public static function sortFiles($a, $b) {
		if ($a->_type != $b->_type) {
			if ($a->_type == 'Patient') {
				return -1;
			}
			if ($b->_type == 'Patient') {
				return 1;
			}
			return strcmp($a->_type, $b->_type);
		} else {
			if ($a->id != $b->id) {
				return strcmp($a->id, $b->id);
			} else {
				return 0;
			}
		}
	}

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
		usort($master['subFiles'], "self::sortFiles");
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
			$req->where('entryyear', '=', Request::input("entryyear"));
		}

		if (Request::input("entryorder", false)) {
			$req->where('entryorder', '=', Request::input("entryorder"));
		}

		if (Request::input("Name", false)) {
			$req->where("Name", 'like', '%' . str_replace("j", "z", Request::input("Name")) .'%');
		}

		if (Request::input("Sex", false)) {
			$req->where('Sex', '=', Request::input("Sex"));
		}

		if (Request::input("Yearofbirth", false)) {
			$req->where('Yearofbirth', '=', Request::input("Yearofbirth"));
		}

		if (Request::input("Telephone", false)) {
			$req->where('Telephone', 'like', '%' . Request::input("Telephone") . '%');
		}

		if (Request::input("Pathology", false)) {
			$req->where('Pathology', '=', Request::input("Pathology"));
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
