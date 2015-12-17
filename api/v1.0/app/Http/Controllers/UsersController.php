<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;
use App\User;

class UsersController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public function index() {
		$list = User::all();
		return response()->jsonOrJSONP($list);
	}

	// POST = create
	public function store() {
		$attributes = Input::except('_type');
		$newObj = User::create($attributes);
		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}
		return $this->index();
	}

	// PUT / PATCH
	public function update($id) {
 		$attributes = Input::except('_type');

 		$obj = User::findOrFail($id);
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
		return $this->index();
	}

	// DELETE
	public function destroy($id) {
		$obj = User::findOrFail($id);
		if (!$obj) {
			return response()->jsonOrJSONP(array());
		}
		if(!$obj->delete()) {
			abort(404, "Could not delete $model@$id");
		}
		// return response()->jsonOrJSONP(array());
		return $this->index();
	}

	// Update password
	public function password($id) {
		$user = User::findOrFail($id);
		$pwd = Request::input('password', false);
		if (!$pwd) {
			abort(403, "No password supplied");
		}
		$user->password = Hash::make($pwd);
		$user->save();
		return $this->index();
	}
}
