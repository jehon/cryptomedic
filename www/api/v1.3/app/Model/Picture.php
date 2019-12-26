<?php

namespace App\Model;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

class Picture extends CryptomedicModel {
	const DATA_PREFIX = "data:image/";

	public static function getPhysicalRoot() {
		global $myconfig;
		return $myconfig['folders']['storage'] . DIRECTORY_SEPARATOR . "uploadedPictures" . DIRECTORY_SEPARATOR;
	}

	public static function getPictureCountByPhysicalPath($file) {
		return self::where('file', $file)->count();
	}

	public function validate() {
	    if (!$this->patient_id) {
	    	abort(400, "No patient_id on the file");
	    }
	    return true;
	}

	public function getPhysicalPath($file) {
		if (!$file) {
			abort(500, "File is empty: $file");
		}
		$dir = self::getPhysicalRoot();
		if (!is_dir($dir)) {
	   	mkdir($dir, 0777, true);
		}
	    return $dir . $file;
	}

	public function calculateTargetName($mimetype) {
		switch ($mimetype) {
			case "image/png":
				$ext = "png";
				break;
			case "image/jpeg":
				$ext = "jpg";
				break;
			default:
				throw new \Error("Invalid mimetype: " . $mimetype);
		}

		$this->file = "{$this->patient_id}_"
			. ($this->Date == null ? "undated" : $this->Date)
			. "_{$this->id}.{$ext}";

		if (file_exists($this->getPhysicalPath($this->file))) {
			abort(500, "Moving uploaded file to " . $this->getPhysicalPath($this->file) . ": already exists");
		}

		return $this->getPhysicalPath($this->file);
	}

	public static function create(array $attributes = array()) {
		$model = parent::create($attributes);
		if (!$model->id) {
			// We don't have an id, something has failed
			return $model;
		}

		// TODO SECURITY: Enforce file size limit
		if (array_key_exists('fileContent', $_FILES)) {
			$file = $_FILES['fileContent'];
			if ($file['error']) {
				var_dump($file);
				abort(500, "Error in received file");
			}
			$finfo = finfo_open(FILEINFO_MIME_TYPE);
			$mimetype = finfo_file($finfo, $file['tmp_name']);

			$model->calculateTargetName($mimetype);

			if (!move_uploaded_file($_FILES['fileContent']['tmp_name'], $model->getPhysicalPath($model->file))) {
				throw new \Error("Impossible to move the file to " . $model->getPhysicalPath($model->file));
			}
		}

		if (Request::has('fileContent')) {
			$dataURI = Request::input('fileContent');

			// example = data:image/jpeg;base64
			$v = substr($dataURI, strlen("data:"));
			$mimetype = substr($v, 0, strpos($v, ";"));
			$content64 = substr($v, strpos($v, ",") + 1);
			$contentRaw = base64_decode($content64);

			$model->calculateTargetName($mimetype);

			if (!$contentRaw) {
				abort(500, "Received data is empty");
			}

			if (!file_put_contents($model->getPhysicalPath($model->file), $contentRaw)) {
				abort(500, "Storing uploaded file to " . $model->getPhysicalPath($model->file));
  			}
		}

		//chmod($model->getPhysicalPath($model->file), 0660);
		$model->save();

		return $model;
	}

	public function delete() {
		if ($this->file && file_exists($this->getPhysicalPath($this->file))) {
			unlink($this->getPhysicalPath($this->file));
		}
		return parent::delete();
	}
}
