<?php
App::uses('AppModel', 'Model');

define("PICTWEB", "/uploadedPictures/");
define("PICTROOT", $_SERVER['DOCUMENT_ROOT'] . "/uploadedPictures/" );

class Picture extends AppModel {
	function beforeDelete($cascade = true) {
		/**
		 * Remove the actual physical picture before removing the database record
		 */
		$data = $this->read('file', $this->id);
		if (isset($data['Picture']['file']))
			if (file_exists(constant("PICTROOT") . $data['Picture']['file']))
				if (!unlink(constant("PICTROOT") . $data['Picture']['file'])) {
					echo "Can not delete file for some unknown reason";
				}
		return parent::beforeDelete($cascade);
	}

	function beforeSave($options = array())  {
		/**
		 * Manage the newly uploaded picture if any
		 */
		if (array_key_exists('filecontent', $this->data['Picture'])
				&& array_key_exists('size', $this->data['Picture']['filecontent'])
				&& ($this->data['Picture']['filecontent']['size'] > 0)) {
			$this->data['Picture']['OriginalName'] = $this->data['Picture']['filecontent']['name'];
			$ext = substr($this->data['Picture']['filecontent']['name'], strrpos($this->data['Picture']['filecontent']['name'], '.'));			
			
			$i = 0;
			$newname = $this->data['Picture']['patient_id'] . "_" . date('Y-m-d_H-i-s') . $ext;
			while(file_exists(constant("PICTROOT") . "/" . $newname)) {
			 	$i = $i + 1;
				$newname = $this->data['Picture']['patient_id'] . "_" . date('Y-m-d_H-i-s') . "_" . $i . $ext;
			}

			$res = move_uploaded_file($this->data['Picture']['filecontent']['tmp_name'], constant("PICTROOT") . "/" . $newname);
			if (!$res) {
				echo "Not able to move the file";
				return false;
			}
			
			$this->_reducePicture(constant("PICTROOT") . "/" . $newname, constant("PICTROOT") . "/" . $newname, 800);
			
			$this->data['Picture']['file'] = $newname;
			unset($this->data['Picture']['filecontent']);
		}
		return true;
	}
	
	function _reducePicture($src, $dst, $maxSize) {
		/**
		 * Helper function to reduce the size of the picture if needed
		 */
		$imgInfo = getimagesize($src) or diewith("Unable to open '$uri'");
    	$srcWidth =  $imgInfo[0];
    	$srcHeight = $imgInfo[1];
		if ($srcWidth > $srcHeight) {
			$ratio = $srcWidth  / $maxSize;
		} else {
			$ratio = $srcHeight / $maxSize;
		}
		
		$outWidth = intval($srcWidth / $ratio);
		$outHeight = intval($srcHeight/ $ratio);
        $outImg = imagecreatetruecolor($outWidth, $outHeight);
        
        switch($imgInfo[2]) { // Type of image
            case 1:
                $srcImg = imagecreatefromgif($src);
                break;
            case 2:
                $srcImg = imagecreatefromjpeg($src);
                break;
            case 3:
                $srcImg = imagecreatefrompng($src);
                break;
            default: 
                die("unsupported file type '$src'");
        };

        imagecopyresampled($outImg, $srcImg, 0, 0, 0, 0, $outWidth, $outHeight, $srcWidth, $srcHeight);
        switch($imgInfo[2]) { // Type of image
            case 1:
                $res = imagegif($outImg, $dst);
                break;
            case 2:
                $res = imagejpeg($outImg, $dst);
                break;
            case 3:
                $res = imagepng($outImg, $dst);
                break;
            default: 
                die("unsupported file type '$dst'");
        }
		
        if (!$res) die("Unable to save thumb to '$dst'. Check the access right of the HTTP server.");
	}

	public $belongsTo = array(
		'Patient' => array(
			'className' => 'Patient',
			'foreignKey' => 'patient_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
