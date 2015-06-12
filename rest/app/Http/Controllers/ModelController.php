<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

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
	public function store($model, $data) {
		var_dump($model);
		var_dump($data);
		
		$m = $this->getModel($model);
		// TODO
		return response()->folder($obj->patient_id);
	}	
	
	// PUT / PATCH
	public function update($model, $id, $data) {
		var_dump($model);
		var_dump($id);
		var_dump($data);
		
		$m = $this->getModel($model);
		$obj = $this->getModelObject($data['id']);
// 		$affectedRows = $m::where(getCreate_at(), '=', $modified)->where("id", "=", $id)->update($data);
		return response()->folder($obj->patient_id);
	}
	
	// DELETE
	public function destroy($model, $id) {
		var_dump($model);
		var_dump($id);
		
		$obj = $this->getModelObject($id);
// 		if(!$obj->delete()) {
// 			abort("Could not delete $model@$id");
// 		}
		// quid if patient has dependancies? -> see Patient model http://laravel.com/docs/5.0/eloquent#model-events
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
