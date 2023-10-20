<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

// TODO: protect frozen files
abstract class FicheController extends CRUDController
{
    // @see http://laravel.com/docs/5.0/controllers

    protected function getOnlineObject($id)
    {
        return (object) [
            "record" => static::getObjectByModelAndId($id),
            "id" => $id,
            "type" => $this->getModelClass()->get_class()
        ];
    }

    public function store()
    {
        $newObj = parent::store();
        $id = $newObj->id;

        return response()->json([
            'newKey' => $id,
            'folder' => $newObj->getRoot()->getDependantsRecords()
        ]);
    }

    public function update($id)
    {
        $obj = parent::update($id);
        return response()->json([
            "id" => $obj->id,
            'folder' => $obj->getRoot()->getDependantsRecords()
        ]);
    }

    public function destroy($id)
    {
        try {
            // Keep root reference for folder build up...
            $obj = static::getObjectById($id);
            $root = $obj->getRoot();

            parent::destroy($id);

            return response()->json([
                "id" => $id,
                'folder' => $root->getDependantsRecords()
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json('not found');
        }
    }

    // Unfreeze special route
    public function unlock($id)
    {
        // TODO: PUT (See loaders.tsx)
        // TODO: Send back modified file only
        $m = static::getModelClass($id);
        $obj = $m::find($id);

        $affectedRows = $m::where("id", "=", $id)->update(["updated_at" => new \DateTime()]);
        if ($affectedRows > 1) {
            abort(500, "Affected rows: " . $affectedRows);
        }
        // Reload the object
        $newObj = $m::find($id);

        return response()->json([
            'id' => $id,
            'folder' => $obj->getRoot()->getDependantsRecords(),
            'file' => $newObj
        ]);
    }
}
