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
		$list = Price::with("priceLines")->get();
		return response()->json($list);
	}

	// POST = create
	public function store(Request $request) {
 		$pivot = Input::get('pivot');
		$lastPrice = Price::where("dateto", null)->first();

		if ($lastPrice->_editable) {
			abort(403, "Only one price could be editable at a time");
		}

		$limit = Price::getLimit();
		if ($pivot < $limit) {
			abort(400, "Pivot too low: " . $pivot);
		}

		$newAttr = $lastPrice->getAttributes();

		unset($newAttr['id']);
		$newAttr['datefrom'] = $pivot;

		$obj = Price::create($newAttr);

		if (!$obj->id) {
			abort(500, "Could not create the file");
		}

		$lastPrice->dateto = $pivot;
		$lastPrice->save();

        // TODO: Copy all linked field too
		$priceLinesOld = $lastPrice->priceLines()->get()->toArray();
		foreach($priceLinesOld as $i => $pl) {
			unset($priceLinesOld[$i]['id']);
			$priceLinesOld[$i]['price_id'] = $obj->id;
		}
		$obj->priceLines()->createMany($priceLinesOld);


        $obj['price_lines'] = $obj->priceLines()->get();

		return $obj;
	}

	// PUT / PATCH
	public function update($id) {
 		$data = Input::except([ '_type', 'datefrom', 'dateto' ]);

 		$obj = Price::findOrFail($id);
 		if (!$obj->_editable) {
 			abort(403, "Could not be done on that object");
 		}

		// Do not update last-login...
        unset($data['last-login']);

        $obj = Price::updateWithArray($id, $data);

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

		// Rollback latests "dateto" to null
		DB::update("UPDATE prices SET dateto = NULL WHERE dateto = (SELECT max(dateto) FROM (SELECT dateto FROM prices) AS t)");

		// return response()->json(array());
		return 0;
	}

}
