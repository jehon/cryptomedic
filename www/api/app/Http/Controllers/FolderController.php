<?php

namespace App\Http\Controllers;

use App\Model\Patient;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

class FolderController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public static function getFolder($model, $id) {
		if ($model == "Patient") {
			return Patient::findOrFail($id)->getDependantsRecords();
		}
	}

	public function index() {
		// Search through them
		$req = DB::table('patients');

		if (Request::input("entry_year", false)) {
			$req->where('entry_year', '=', Request::input("entry_year"));
		}

		if (Request::input("entry_order", false)) {
			$req->where('entry_order', '=', Request::input("entry_order"));
		}

		if (Request::input("name", false)) {
			$req->where("name", 'like', '%' . str_replace("j", "z", Request::input("name")) .'%');
		}

		if (Request::input("sex", false)) {
			$req->where('sex', '=', Request::input("sex"));
		}

		if (Request::input("year_of_birth", false)) {
			$req->where('year_of_birth', '=', Request::input("year_of_birth"));
		}

		if (Request::input("phone", false)) {
			$req->where('phone', 'like', '%' . Request::input("phone") . '%');
		}

		if (Request::input("pathology", false)) {
			$req->where('pathology', '=', Request::input("pathology"));
		}

		$req->orderBy('entry_year', 'DESC')->take(100);

		$listing = $req->get();
		foreach($listing as $k => $v) {
			$listing[$k]->_type = 'Patient';
		}
		return response()->json($listing);
	}

	public function show($model, $id) {
		return response()->json([
			"folder" => $this->getFolder($model, $id),
			"id" => $id
		]);
	}

	public function reference($entry_year, $entry_order) {
		$r = DB::select("SELECT * FROM patients WHERE entry_year = ? and entry_order = ?", array($entry_year, $entry_order));
		if (count($r) != 1) {
			return response()->json(null);
		}
		$r = array_pop($r);
		return $this->show('Patient', $r->id);
	}

	public function createFile() {
		$data = Request::except('_type');

		$newObj = Patient::create($data);
		if (!$newObj->id) {
			abort(500, "Could not create the patient");
		}
		return $this->show('Patient', $newObj->id);
	}
}
