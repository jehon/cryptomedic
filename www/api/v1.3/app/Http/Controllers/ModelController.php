<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

use App\Model\References;

// TODO: protect frozen files
abstract class ModelController extends Controller {
    // @see http://laravel.com/docs/5.0/controllers

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
        $data = Input::all();
        $m = static::getModelClass();

        $newObj = $m::create($data);
        if (!$newObj->id) {
            abort(500, "Could not create the file");
        }
        $id = $newObj->id;

        return response()->json([
            'newKey' => $id,
            'folder' => $newObj->getRoot()->getDependantsList()
        ]);
    }

    // PUT / PATCH
    public function update($id) {
        $data = Input::all();
        $m = static::getModelClass();

        $obj = $m::updateWithArray($id, $data);

        return response()->json([
            "id" => $obj->id,
            'folder' => $obj->getRoot()->getDependantsList()
        ]);
    }

    // DELETE
    public function destroy($id) {
        $obj = static::getObjectById($id);

        // Keep root reference for folder build up...
        $root = $obj->getRoot();

        if ($obj) {
            $obj->delete();
        }

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
