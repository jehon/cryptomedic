<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

use \References;

// TODO: protect frozen files
class ModelController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public static function cannonize($data) {
		if (is_array($data)) {
			foreach($data as $k => $v) {
				$data[$k] = self::cannonize($v);
			}
		}
		if ($data === "null") {
			return null;
		}
		return $data;
	}

	protected function getModel($model) {
		$model = "\\App\\" . \References::db2model($model);
		return $model;
	}

	protected function getModelObject($model, $id) {
		$m = $this->getModel($model);
		return $m::findOrFail($id);
	}

	// POST = create
	public function store($model) {
		$data = Input::except('_type');
		$data = self::cannonize($data);
		$m = $this->getModel($model);
		if ($model == "Patient") {
			// In case we create a patient, things are a bit more complicated!!!
			// We do this only when we need to generate a reference
			// otherwise, we go to FolderController@reference (other route)

			// Generate a reference:
			$res = DB::insert("INSERT INTO patients(entryyear, entryorder)
					 VALUE(?, coalesce(
							greatest(10000,
								(select i from (select (max(entryorder) + 1) as i from patients where entryyear = ? and entryorder BETWEEN 10000 AND 19999) as j )
							),
					10000))", [ Request::input("entryyear"), Request::input("entryyear") ])
			|| abort(500, "Problem inserting and creating reference");

			$id = DB::select("SELECT last_insert_id() as id");// " as id FROM patients");
			$id = $id[0]->id;

			if (!$id) {
				abort(500, "Could not create the patient");
			}
			// TODO: how does Laravel get last_insert_id cleanly???
			// $id = DB::select("SELECT LAST_INSERT_ID() as id");
			// $id = $id[0]->id;

			$m::findOrFail($id);
			$res = $this->update("Patient", $id);
			return response()->folder($id);
		} else {
			if (!Input::has('patient_id')) {
				abort(500, "No identification of patients");
			}
			$newObj = $m::create($data);
		}

		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}
		return response()->folder($data['patient_id'],
					array('newKey' => $newObj->id)
				);
	}

	// PUT / PATCH
	public function update($model, $id) {
 		$data = Input::except('_type', 'patient_id');
		$data = self::cannonize($data);

		$m = $this->getModel($model);
		$obj = $this->getModelObject($model, $id);
		foreach($data as $k => $v) {
			// Skip system fields
			if (in_array($k, [ $obj->getUpdatedAtColumn(), $obj->getCreatedAtColumn(), "modified", "created" ])) {
				continue;
			}
			// Set existing fields
			if (array_key_exists($k, $obj->getAttributes()) && ($obj->getAttribute($k) != $v)) {
				$obj->{$k} = $v;
			}
		}

		$obj->save();
		if ($model == "Patient") {
			return response()->folder($obj->id);
		}
		return response()->folder($obj->patient_id);
	}

	// DELETE
	public function destroy($model, $id) {
		$m = $this->getModel($model);
		$obj = $m::find($id);
		if (!$obj) {
			return response()->jsonOrJSONP(array());
		}
		if(!$obj->delete()) {
			abort(404, "Could not delete $model@$id");
		}

		// quid if patient has dependancies? -> see Patient model http://laravel.com/docs/5.0/eloquent#model-events
		if ($model == "Patient") {
			return response()->jsonOrJSONP(array());
		}
		return response()->folder($obj->patient_id);
	}

	// Unfreeze special route
	public function unfreeze($model, $id) {
		$m = $this->getModel($model);
		$obj = $this->getModelObject($model, $id);
		$affectedRows = $m::where("id", "=", $id)->update([ "updated_at" => new \DateTime() ]);
		if ($affectedRows > 1) {
			abort(500, "Affected rows: " . $affectedRows);
		}
		return response()->folder($obj->patient_id);
	}
}
