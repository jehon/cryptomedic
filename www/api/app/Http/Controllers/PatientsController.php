<?php

namespace App\Http\Controllers;

use App\Model\Patient;

use DB;
use Illuminate\Support\Facades\Request;

class PatientsController extends FicheController {
	static public function getModelClass() {
		return "App\\Model\\Patient";
	}

	public function show($id) {
        return Patient::with("appointment", "bill", "bill.payment", "club_foot", "other_consult", "picture", "ricket_consult", "surgery")->findOrFail($id);
    }

	public function store() {
	    $data = Request::except('_type');
	    $data = Patient::cannonize($data);

		// In case we create a patient, things are a bit more complicated!!!
		// We do this only when we need to generate a reference
		// otherwise, we go to FolderController@reference (other route)

		// Generate a reference:
		$res = DB::insert("INSERT INTO patients(entry_year, entry_order, name)
		   VALUE(?, coalesce(
		      greatest(10000,
		        (select i from (select (max(entry_order) + 1) as i from patients where entry_year = ? and entry_order BETWEEN 10000 AND 19999) as j )
		      ),
		  10000), ?)", [ Request::input("entry_year"), Request::input("entry_year"), Request::input("name") ])
		|| abort(500, "Problem inserting and creating reference");

		// TODO: how does Laravel get last_insert_id cleanly???
		$id = DB::select("SELECT last_insert_id() as id");
		$id = $id[0]->id;

		if (!$id) {
			abort(500, "Could not create the " . $this->getModelClass()->get_class());
		}

		$response = $this->update($id);
		if (!$response) {
			abort(500, "Could not update the created " . $this->getModelClass()->get_class());
		}
		$newObj = Patient::findOrFail($id);
	 
	    return response()->json([
    		'newKey' => $id,
    		'folder' => $newObj->getRoot()->getDependantsRecords()
    	]);
	}

	public function destroy($id) {
		$obj = static::getObjectById($id);

		if ($obj->isLocked()) {
			abort(403, "File is frozen");
		}

		if ($obj) {
		    // quid if patient has dependancies? -> see Patient model http://laravel.com/docs/5.0/eloquent#model-events
			$obj->delete();
		}

		// Patient root
		return response()->json([
		    'id' => $id,
		    'folder' => []
		]);
	}

}

