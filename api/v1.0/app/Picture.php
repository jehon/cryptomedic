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
	const DATA_PREFIX = "data:image/";

	public function getPhysicalPath() {
		return dirname(dirname(dirname(dirname(__DIR__)))) . DIRECTORY_SEPARATOR . "uploadedPictures"
				. DIRECTORY_SEPARATOR . $this->file;
	}

	public static function create(array $attributes = array()) {
		$model = parent::create($attributes);
		if (!$model->id) {
			// We don't have an id, something has failed
			return $model;
		}

		if (Request::has('fileContent')) {
			// TODO SECURITY: Enforce file size limit

			$dataURI = Request::input('fileContent');

			// example = data:image/jpeg;base64
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
			$contentRaw = base64_decode($content64);
			if (!$contentRaw) {
				abort(500, "Received data is empty");
			}
			if (file_exists($model->getPhysicalPath())) {
				abort(500, "Moving uploaded file to " . $model->getPhysicalPath() . ": already exists");
			}
			if (!file_put_contents($model->getPhysicalPath(), $contentRaw)) {
				abort(500, "Storing uploaded file to " . $model->getPhysicalPath());
			}
			$model->save();
		}
		return $model;
	}

	public function delete() {
		if ($this->file && file_exists($this->getPhysicalPath())) {
			unlink($this->getPhysicalPath());
		}
		return parent::delete();
	}
}
