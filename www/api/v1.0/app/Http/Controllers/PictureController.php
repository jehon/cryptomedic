<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

use App\Picture;

// TODO: protect frozen files
class PictureController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers

	// Unfreeze special route
	public function getFile($id) {
		$picture = Picture::findOrFail($id);
		$realfile = $picture->getPhysicalPath();
		// var_dump($realfile);
		if (!file_exists($realfile)) {
			abort(404, 'file does not exists on disk');
		}

    // header('Content-Type: '. File::mimeType($realfile));
		return response()->download($realfile);
		// return response()->file($realfile);
	}
}
