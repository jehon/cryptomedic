<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

use App\Model\References;
use App\Model\Patient;

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

  public static function getModelClass($model) {
    $model = "\\App\\Model\\" . $model;
    if ($model === false) {
      abort(400, "No correct model found");
    }
    return $model;
  }

  public static function getObjectByModelAndId($model, $id) {
    $m = self::getModelClass($model);
    return $m::findOrFail($id);
  }

  protected function getOnlineObject($model, $id) {
    return (object) [
      "record" => self::getObjectByModelAndId($model, $id),
      "id" => $id,
      "type" => $model
    ];
  }

  // POST = create
  public function create($model) {
    $data = Input::except('_type');
    $data = self::cannonize($data);
    $m = self::getModelClass($model);

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
        abort(500, "Could not create the $model");
      }

      // $m::findOrFail($id);
      $response = $this->update("Patient", $id);
      if (!$response) {
        abort(500, "Could not update the created $model");
      }
      $newObj = Patient::findOrFail($id);
    } else {
      $newObj = $m::create($data);
      if (!$newObj->id) {
        abort(500, "Could not create the file");
      }
      $id = $newObj->id;
    }

    return response()->json([
      'newKey' => $id,
      'folder' => $newObj->getRoot()->getDependantsList()
    ]);
  }

  // PUT / PATCH
  public function update($model, $id) {
    $obj = self::getObjectByModelAndId($model, $id);

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
    return response()->json([
      "id" => $obj->id,
      'folder' => $obj->getRoot()->getDependantsList()
    ]);
  }

  // DELETE
  public function destroy($model, $id) {
    $m = self::getModelClass($model);
    $obj = $m::find($id);

    if ($model == "Patient") {
      $root = false;
    } else {
      // Keep root reference for folder build up...
      $root = $obj->getRoot();
    }

    if ($obj) {
      $obj->delete();
    }

    if (!$root) {
      // Patient root
      return response()->json([
        'id' => $id,
        'folder' => []
      ]);
    }

    // quid if patient has dependancies? -> see Patient model http://laravel.com/docs/5.0/eloquent#model-events
    return response()->json([
      "id" => $id,
      'folder' => $root->getDependantsList()
    ]);
  }

  // Unfreeze special route
  public function unlock($model, $id) {
    $m = self::getModelClass($model, $id);
    $obj = $m::find($id);

    $affectedRows = $m::where("id", "=", $id)->update([ "updated_at" => new \DateTime() ]);
    if ($affectedRows > 1) {
      abort(500, "Affected rows: " . $affectedRows);
    }

    return response()->json([ 
      'id' => $id,
      'folder' => $obj->getRoot()->getDependantsList()
    ]);
  }
}
