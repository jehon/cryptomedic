<?php

namespace App\Http\Controllers;

use App\Patient;
use App\References;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

class FolderController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public static function getFolder($id) {
		$patient = Patient::findOrFail($id);
		$res = array_merge([ $patient->getSyncRecord() ], $patient->getDependantList());
		// usort($res, "self::sortFiles");
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
		return response()->json($listing);
	}

	public function show($id) {
		return response()->json([
			"folder" => $this->getFolder($id),
			"id" => $id
		]);
	}

	public function reference($entryyear, $entryorder) {
		$r = DB::select("SELECT * FROM patients WHERE entryyear = ? and entryorder = ?", array($entryyear, $entryorder));
		if (count($r) != 1) {
			return response()->json(null);
		}
		$r = array_pop($r);
		return $this->show($r->id);
	}

	public function createFile() {
		$data = Input::except('_type');

		$newObj = Patient::create($data);
		if (!$newObj->id) {
			abort(500, "Could not create the patient");
		}
		return $this->show($newObj->id);
	}
}
