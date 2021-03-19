<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class UsersController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	public function index() {
		$list = User::all();
		return response()->json($list);
	}

	public function show($id) {
		$u = User::findOrFail($id);
		return response()->json($u);
	}

	public function emails() {
		// return $this->index();

		$res = "";
		$list = User::where('email', '>', '')->get();
		foreach ($list as $v) {
			$res .= $v['name'] . '&lt;' . $v['email'] . '&gt;, ';
		}
		return $res;
	}

	// POST = create
	public function store() {
		$attributes = Request::except('_type');
		$newObj = User::create($attributes);
		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}
		return $newObj;
	}

	// PUT / PATCH
	public function update($id) {
		$attributes = Request::except('_type');

		$obj = User::findOrFail($id);
		foreach ($attributes as $k => $v) {
			// Skip system fields
			if (in_array($k, [$obj->getUpdatedAtColumn(), $obj->getCreatedAtColumn()])) {
				continue;
			}
			// Set existing fields
			if (array_key_exists($k, $obj->getAttributes()) && ($obj->getAttribute($k) != $v)) {
				$obj->{$k} = $v;
			}
		}
		// Do not update last-login...
		unset($obj->last_login);

		$obj->save();
		return $obj;
	}

	// DELETE
	public function destroy($id) {
		$obj = User::findOrFail($id);
		if (!$obj) {
			return response()->json(array());
		}
		if (!$obj->delete()) {
			abort(404, "Could not delete $model@$id");
		}
		// return response()->json(array());
		return $this->index();
	}

	// Update password
	public function password($id) {
		$user = User::findOrFail($id);
		$pwd = Request::input('password', false);
		if (!$pwd) {
			$user->password = '';
		} else {
			$user->password = Hash::make($pwd);
		}
		$user->save();
		return $this->index();
	}
}
