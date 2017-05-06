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
abstract class ModelController extends Controller {
  // @see http://laravel.com/docs/5.0/controllers

  public static function cannonize($data) {
    if (is_array($data)) {
      foreach($data as $k => $v) {
        $data[$k] = static::cannonize($v);
      }
    }
    if ($data === "null") {
      return null;
    }
    return $data;
  }

  abstract static public function getModelClass();

  public static function getObjectById($id) {
    $m = static::getModelClass();
    return $m::findOrFail($id);
  }

  protected function getOnlineObject($id) {
    return (object) [
      "record" => static::getObjectByModelAndId($id),
      "id" => $id,
      "type" => $this->getModelClass()->get_class()
    ];
  }

  // POST = create
  public function store() {
    $data = Input::except('_type');
    $data = static::cannonize($data);
    $m = static::getModelClass();

    if ($m instanceOf Patient) {
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
        abort(500, "Could not create the " . $this->getModelClass()->get_class());
      }

      // $m::findOrFail($id);
      $response = $this->update("Patient", $id);
      if (!$response) {
        abort(500, "Could not update the created " . $this->getModelClass()->get_class());
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
  public function update($id) {
    $obj = static::getObjectById($id);

    if ($obj->isLocked()) {
      abort(403, "File is frozen");
    }

    $data = Input::except([ '_type' ] + $obj->getReadOnlyField());
    $data = static::cannonize($data);
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
  public function destroy($id) {
    $m = static::getModelClass();
    $obj = $m::find($id);

    if ($obj->isLocked()) {
      abort(403, "File is frozen");
    }

    if ($this->getModelClass() instanceof Patient) {
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
  public function unlock($id) {
    $m = static::getModelClass($id);
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
