<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;

abstract class CRUDController extends Controller {
    abstract static public function getModelClass();

    public static function getObjectById($id) {
        $m = static::getModelClass();
        return $m::findOrFail($id);
    }

    // show = Read
    public function show($id) {
        return static::getObjectById($id);
    }

    // POST = create
    public function store() {
        $data = Request::all();
        $m = static::getModelClass();

        $newObj = $m::create($data);
        if (!$newObj->id) {
            abort(500, "Could not create the file");
        }
        return $newObj;
    }

    // PUT / PATCH = modify
    public function update($id) {
        $data = Request::all();
        $m = static::getModelClass();

        $obj = $m::updateWithArray($id, $data);
        return $obj;
    }

    // DELETE
    public function destroy($id) {
        try {
            $obj = static::getObjectById($id, true);
            $obj->delete();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json('not found');
        }
    }
}
