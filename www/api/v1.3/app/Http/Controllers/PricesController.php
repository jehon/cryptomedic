<?php 

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Model\Price;

class PricesController extends Controller {
	public function index() {
		$list = Price::all();
		return response()->json($list);
	}

	// POST = create
	public function store(Request $request) {
 		$pivot = Input::get('pivot');
		$lastPrice = Price::where("dateto", null)->first();

		$limit = Price::getLimit();
		if ($pivot < $limit) {
			abort(400, "Pivot too low: " . $pivot);
		}

		$newAttr = $lastPrice->getAttributes();

		unset($newAttr['id']);
		$newAttr['datefrom'] = $pivot;

		$newObj = Price::create($newAttr);

		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}

		$lastPrice->dateto = $pivot;
		$lastPrice->save();

		return $newObj;
	}

	// PUT / PATCH
	public function update($id) {
 		$attributes = Input::except('_type');

 		$obj = Price::findOrFail($id);
 		if (!$obj->_editable) {
 			abort(403, "Could not be done on that object");
 		}
		foreach($attributes as $k => $v) {
			// Skip system fields
			if (in_array($k, [ $obj->getUpdatedAtColumn(), $obj->getCreatedAtColumn() ])) {
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
		$obj = Price::findOrFail($id);
		if (!$obj) {
			return response()->json(array());
		}
		if (!$obj->_editable) {
			abort(403, "Forbidden");
		}
		if(!$obj->delete()) {
			abort(404, "Could not delete $model@$id");
		}
		// return response()->json(array());
		return 0;
	}
}
