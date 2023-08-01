<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Model\Price;

class PricesController extends Controller {
	public function index() {
		$list = Price::all();
		return response()->json($list);
	}

	// POST = create
	public function store() {
		$pivot = Request::input('pivot');
		$lastPrice = Price::where("date_to", null)->first();

		if ($lastPrice->_editable) {
			abort(403, "Only one price could be editable at a time");
		}

		$limit = Price::getLimit();
		if ($pivot < $limit) {
			abort(400, "Pivot too low: " . $pivot);
		}

		$newAttr = $lastPrice->getAttributes();

		unset($newAttr['id']);
		$newAttr['date_from'] = $pivot;

		$newObj = Price::create($newAttr);

		if (!$newObj->id) {
			abort(500, "Could not create the file");
		}

		$lastPrice->date_to = $pivot;
		$lastPrice->save();

		return $newObj;
	}

	// PUT / PATCH
	public function update($id) {
		$attributes = Request::except(['_type', 'date_from', 'date_to']);

		$obj = Price::findOrFail($id);
		if (!$obj->_editable) {
			abort(403, "Could not be done on that object");
		}
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
		$obj = Price::findOrFail($id);
		if (!$obj) {
			return response()->json(array());
		}
		if (!$obj->_editable) {
			abort(403, "Forbidden");
		}
		if (!$obj->delete()) {
			abort(404, "Could not delete $model@$id");
		}

		// Rollback latests "date_to" to null
		DB::update("UPDATE prices SET date_to = NULL WHERE date_to = (SELECT max(date_to) FROM (SELECT date_to FROM prices) AS t)");

		// return response()->json(array());
		return 0;
	}

	public function priceFields() {
		$values = Request::all();
		var_dump($values);

		$billFields = \App\Model\Bill::getTableColumnsList();
		sort($billFields, SORT_NATURAL);

		$billDef = "INT(11) NOT NULL DEFAULT '0'";
		$priceDef = "INT(11) NULL DEFAULT '0'";

		$old = $values['old'];
		$new = str_replace(" ", "_", $values['new']);

		echo "<textarea cols=160 rows=5>";

		if (strlen($new) > 64) {
			echo "--Field length is too long\n";
		} else {
			if (strlen($old) > 0) {
				if (in_array($old, $billFields)) {
					echo "-- Changing " . $values['old'] . " to " . $values['new'] . "\n";
					echo "ALTER TABLE `bills` CHANGE `$old` `$new` $billDef;\n";
					echo "ALTER TABLE `prices` CHANGE `$old` `$new` $priceDef;\n";
				} else {
					echo "-- Old field unknown: $old<br>";
				}
			} else {
				echo "-- Creating " . $values['new'] . "\n";
				echo "ALTER TABLE `bills` ADD `$new` $billDef;\n";
				echo "ALTER TABLE `prices` ADD `$new` $priceDef;\n";
			}
		}

		echo "\n";
		echo "</textarea>";

?>
		<form>
			Old: <input name='old' value='<?php echo $old ?>'><br>
			New: <input name='new' value='<?php echo $new ?>'><br>
			<button type='submit'>Submit</button>
		</form>
<?php

		echo implode("<br>", $billFields);
	}
}
