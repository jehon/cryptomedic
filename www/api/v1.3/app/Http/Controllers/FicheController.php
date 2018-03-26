<?php namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
// use App\Http\Controllers\FolderController;
// use DB;
use Illuminate\Http\Response;
// use Illuminate\Support\Facades\Request;
// use Illuminate\Support\Facades\Input;

// TODO: protect frozen files
abstract class FicheController extends CRUDController {
    // @see http://laravel.com/docs/5.0/controllers

    protected function getOnlineObject($id) {
        return (object) [
            "record" => static::getObjectByModelAndId($id),
            "id" => $id,
            "type" => $this->getModelClass()->get_class()
        ];
    }

    public function store() {
		$newObj = parent::store();
		$id = $newObj->id;

        return response()->json([
            'newKey' => $id,
            'folder' => $newObj->getRoot()->getDependantsList()
        ]);
    }

    public function update($id) {
		$obj = parent::update($id);
        return response()->json([
            "id" => $obj->id,
            'folder' => $obj->getRoot()->getDependantsList()
        ]);
    }

	public function destroy($id) {
        // Keep root reference for folder build up...
        $obj = static::getObjectById($id);
        $root = $obj->getRoot();

		parent::destroy($id);

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
