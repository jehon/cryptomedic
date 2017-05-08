<?php 

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use App\Model\Price;

class PricesController extends Controller {
	public function index() {
		$list = Price::all();
		return response()->json($list);
	}

	// // POST = create
	// public function store() {
	// 	$attributes = Input::except('_type');
	// 	$newObj = Price::create($attributes);
	// 	if (!$newObj->id) {
	// 		abort(500, "Could not create the file");
	// 	}
	// 	return $this->index();
	// }

	// // PUT / PATCH
	// public function update($id) {
 // 		$attributes = Input::except('_type');

 // 		$obj = Price::findOrFail($id);
	// 	foreach($attributes as $k => $v) {
	// 		// Skip system fields
	// 		if (in_array($k, [ $obj->getUpdatedAtColumn(), $obj->getCreatedAtColumn() ])) {
	// 			continue;
	// 		}
	// 		// Set existing fields
	// 		if (array_key_exists($k, $obj->getAttributes()) && ($obj->getAttribute($k) != $v)) {
	// 			$obj->{$k} = $v;
	// 		}
	// 	}
	// 	// Do not update last-login...
	// 	unset($obj->last_login);

	// 	$obj->save();
	// 	return $this->index();
	// }

	// // DELETE
	// public function destroy($id) {
	// 	$obj = User::findOrFail($id);
	// 	if (!$obj) {
	// 		return response()->json(array());
	// 	}
	// 	if(!$obj->delete()) {
	// 		abort(404, "Could not delete $model@$id");
	// 	}
	// 	// return response()->json(array());
	// 	return $this->index();
	// }
}
