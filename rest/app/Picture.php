<?php 
/**
 * Bill model.
 * 
 * With a summary...
 * 
 * @package test
 * @author jehon
 */

namespace App;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 * 
 * This is a summary? I think so...
 * 
 * @author jehon
 *
 */
class Picture extends CryptomedicModel {
	// TODO: creating, updating and saving...
	const DATA_PREFIX = "data:image/";
	
	public static function create(array $attributes) {
		$model = parent::create($attributes);
		if (!$model->id) {
			// We don't have an id, something has failed
			return $model;
		}
		
		if (Request::has('fileContent')) {
			
// 			$model->file = 
			$model->save();	
			
			$dataURI = Request::input('fileContent');
	
			// data:image/jpeg;base64
			$v = substr($dataURI, strlen("data:"));
			$mimetype = substr($v, 0, strpos($v, ";"));
			$content64 = substr($v, strpos($v, ",") + 1);
				
			switch ($mimetype) {
				case "image/png":
					$ext = "png";
					break;
				case "image/jpeg":
					$ext = "jpg";
					break;
				default:
					throw new StorageCreateError("Invalid extension");
			}
			$model->file = "{$model->patient_id}_"
						. ($model->Date == null ? "undated" : $model->Date) 
						. "_{$model->id}.{$ext}";
			$tfile = dirname(dirname(dirname(__DIR__))) . DIRECTORY_SEPARATOR . "uploadedPictures" 
					. DIRECTORY_SEPARATOR . $model->file;
			$contentRaw = base64_decode($content64);
			if (!$contentRaw) {
				abort(500, "Received data is empty");
			}
			if (file_exists($tfile)) {
				abort(500, "Moving uploaded file to $tfile: already exists");
			}
			if (!file_put_contents($tfile, $contentRaw)) {
				abort(500, "Storing uploaded file to $tfile");
			}
			$model->save();
		}
		return $model;
	}

	
}
