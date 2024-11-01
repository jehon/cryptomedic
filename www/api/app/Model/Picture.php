<?php

namespace App\Model;

use Illuminate\Support\Facades\Request;

function mkdirIf($filename) {
	$dir = dirname($filename);
	if (!is_dir($dir)) {
		mkdir($dir, 0777, true) || throw new Exception("Could not create folder $dir");
	}
}

class Picture extends CryptomedicModel {
	const DATA_PREFIX = "data:image/";

	// Impossible to init a field based on array_merge
	static function initStatic() {
		// TODO: fileContent is legacy field
		Picture::$apiFields = array_merge(CryptomedicModel::$apiFields, [ "fileBlob", "fileContent" ]);
	}

	public static function getPhysicalRoot() {
		global $myconfig;
		return $myconfig['folders']['storage'] . DIRECTORY_SEPARATOR . "uploadedPictures" . DIRECTORY_SEPARATOR;
	}

	/**
	 * Used to check the filesystem
	 */
	public static function getPictureCountByPhysicalPath($file) {
		return self::where('file', $file)->count();
	}

	/**
	 * From the string (should be the string from the database), calculate the real path
	 *
	 * @param {strint} file: the record in the database
	 */
	static public function getPhysicalPath($file) {
		if (!$file) {
			abort(500, "File is empty: $file");
		}

		$dir = self::getPhysicalRoot();

		if (!is_dir($dir)) {
	   	mkdir($dir, 0777, true);
		}
	    return $dir . $file;
	}

	public function validate() {
	    if (!$this->patient_id) {
	    	abort(400, "No patient_id on the file");
	    }
	    return true;
	}

	public function calculateTargetName($mimetype, $ext = "") {
		if ($ext) {
			$ext = strtolower($ext);
		} else {
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
		}

		$patient = Patient::find($this->patient_id);

		return $patient->entry_year
			. "/"
			. str_pad($patient->entry_order % 100, 3, "0", STR_PAD_LEFT)
			. "/"
			. "{$patient->entry_year}-{$patient->entry_order}."
			. ($this->date == null ? "undated" : $this->date)
			. ".{$this->id}.{$ext}";
	}

	public static function create(array $attributes = array()) {
		$model = parent::create($attributes);
		if (!$model->id) {
			// We don't have an id, something has failed
			return $model;
		}

		// TODO: legacy field
		if (Request::has('fileContent')) {
			$dataURI = Request::input('fileContent');

			// example = data:image/jpeg;base64
			$v = substr($dataURI, strlen("data:"));
			$mimetype = substr($v, 0, strpos($v, ";"));
			$content64 = substr($v, strpos($v, ",") + 1);
			$contentRaw = base64_decode($content64);

			if (!$contentRaw) {
				abort(500, "Received data is empty");
			}

			$model->file = $model->calculateTargetName($mimetype);

			if (file_exists($model->getPhysicalPath($model->file))) {
				abort(500, "Moving uploaded file to " . $model->getPhysicalPath($model->file) . ": already exists");
			}

			mkdirIf($model->getPhysicalPath($model->file));

			if (!file_put_contents($model->getPhysicalPath($model->file), $contentRaw)) {
				abort(500, "Storing uploaded file to " . $model->getPhysicalPath($model->file));
  			}
		}

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

Picture::initStatic();
