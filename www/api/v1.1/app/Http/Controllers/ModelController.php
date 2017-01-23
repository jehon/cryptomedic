<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

use App\References;

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

	protected function getModelClass($model) {
		$model = "\\App\\" . $model;
		if ($model === false) {
			abort(400, "No correct model found");
		}
		return $model;
	}

	protected function getObjectByModelAndId($model, $id) {
		$m = $this->getModelClass($model);
		return $m::findOrFail($id);
	}

	// POST = create
	public function create($model) {
		$data = Input::except('_type');
		$data = self::cannonize($data);
		$m = $this->getModelClass($model);

		if ($model == "Patient") {
			// In case we create a patient, things are a bit more complicated!!!
			// We do this only when we need to generate a reference
			// otherwise, we go to FolderController@reference (other route)

			// Generate a reference:
			$res = DB::insert("INSERT INTO patients(entryyear, entryorder, Name)
					 VALUE(?, coalesce(
							greatest(10000,
								(select i from (select (max(entryorder) + 1) as i from patients where entryyear = ? and entryorder BETWEEN 10000 AND 19999) as j )
							),
					10000), ?)", [ Request::input("entryyear"), Request::input("entryyear"), Request::input("Name") ])
			|| abort(500, "Problem inserting and creating reference");

			// TODO: how does Laravel get last_insert_id cleanly???
			$id = DB::select("SELECT last_insert_id() as id");
			$id = $id[0]->id;

			if (!$id) {
				abort(500, "Could not create the patient");
			}

			$m::findOrFail($id);
			$res = $this->update("Patient", $id);
			return response()->json([ 'newKey' => $id ]);
		}

		// \DB::enableQueryLog();
		$newObj = $m::create($data);
		// print_r(\DB::getQueryLog());

		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}

		return response()->json([ 'newKey' => $newObj->id ]);
	}

	// PUT / PATCH
	public function update($model, $id) {
		$obj = $this->getObjectByModelAndId($model, $id);

 		$data = Input::except([ '_type' ] + $obj->getReadOnlyField());
		$data = self::cannonize($data);

		foreach($data as $k => $v) {
			// Skip system fields
			if (in_array($k, [ $obj->getUpdatedAtColumn(), $obj->getCreatedAtColumn()])) {
				continue;
			}
			// Set existing fields
			if (array_key_exists($k, $obj->getAttributes()) && ($obj->getAttribute($k) != $v)) {
				$obj->{$k} = $v;
			}
		}

		$obj->save();
		return response()->json([ "id" => $obj->id ]);
	}

	// DELETE
	public function destroy($model, $id) {
		$m = $this->getModelClass($model);
		$obj = $m::find($id);
		if (!$obj) {
			return response()->json(array());
		}
		if(!$obj->delete()) {
			abort(404, "Could not delete $model@$id");
		}

		// quid if patient has dependancies? -> see Patient model http://laravel.com/docs/5.0/eloquent#model-events
		return response()->json(array());
	}

	// Unfreeze special route
	public function unfreeze($model, $id) {
		$m = $this->getModelClass($model, $id);
		$affectedRows = $m::where("id", "=", $id)->update([ "updated_at" => new \DateTime() ]);
		if ($affectedRows > 1) {
			abort(500, "Affected rows: " . $affectedRows);
		}
		return response()->json([ "id" => $id ]);
	}
}
