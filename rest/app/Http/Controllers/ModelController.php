<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class ModelController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers
	
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
		if ($model == "Patient") {
			// What to do here ?						
		} else {
			if (!Input::has('patient_id')) {
				abort(500, "No identification of patients");
			}
		}		
		
		$m = $this->getModel($model);
		$newObj = $m::create($data);
		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}
		return response()->folder(
				$data['patient_id'], 
				array('newKey' => $newObj->id)
				);
	}	
	
	// PUT / PATCH
	public function update($model, $id) {
		$attributes = Input::except('_type', 'patient_id');
		
		$m = $this->getModel($model);
		$obj = $this->getModelObject($model, $id);
		foreach($attributes as $k => $v) {
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
		$obj = $this->getModelObject($model, $id);
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
		$affectedRows = $m::where("id", "=", $id)->update([ "modified" => new \DateTime() ]);
		if ($affectedRows > 1) {
			abort(500, "Affected rows: " . $affectedRows);
		}
		return response()->folder($obj->patient_id);
	}
}
