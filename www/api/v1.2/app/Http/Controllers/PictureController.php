<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

use App\Model\Picture;

function myglob($glob, $recursive = false) {
  $pattern = basename($glob);
  $path = dirname($glob);
  if ($path == DIRECTORY_SEPARATOR) return array(".");

  if (!is_readable($path)) {
    throw new Exception("Path is not readable $path");
  }

  $handle = opendir($path);
  if ($handle === false) {
    return array();
  }
  $list = array();
  while (false !== ($file = readdir($handle))) {
    if ($file == ".") {
      continue;
    }
    if ($file == "..") {
      continue;
    }
    if (is_file(dirname($glob) . DIRECTORY_SEPARATOR . $file) && fnmatch($pattern, $file)) {
      $list[] = $path . DIRECTORY_SEPARATOR . $file;
    }
    if (is_dir(dirname($glob) . DIRECTORY_SEPARATOR . $file) && $recursive) {
      $res = myglob(dirname($glob) . DIRECTORY_SEPARATOR . $file . DIRECTORY_SEPARATOR . basename($glob), $recursive);
      $list = array_merge($list, $res);
    }
  }
  closedir($handle);
  natsort($list);
  return $list;
}

class PictureController extends Controller {

  // List all database pictures that does not exists on the file system
  public function checkFileSystem() {
    $i = 0;
    $list = DB::table('pictures')->get();
    $res = [];
    echo "<pre>";
    echo "Check database records\n";
    foreach($list as $v) {
      $picture = Picture::findOrFail($v->id);
      $file = $picture->getPhysicalPath();
      if (!file_exists($file)) {
        echo $i++ . ": " . $v->id . " - " . $v->file . "\n";
      }
    }

    echo "\n";
    echo "Check files present\n";
    foreach(myglob(Picture::getPhysicalRoot() . "/*") as $file) {
      $file = substr($file, strlen(Picture::getPhysicalRoot()));
      if (!Picture::getPictureĈountByPhysicalPath($file)) {
        echo $i++ . ": " . $file . "\n";
      }
    }
    echo "</pre>";

    return "ok";
  }

	public function _file($id) {
		$picture = Picture::findOrFail($id);
		$file = $picture->getPhysicalPath();
		if (!file_exists($file)) {
			abort(404, 'file does not exists on disk: ' . $file);
		}
    // Handle client cache (304)
    // Browser cache version not too old ?
    if (array_key_exists('HTTP_IF_MODIFIED_SINCE', $_SERVER) && (filemtime($file) <= strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']))) {
        // End the request with status 304
        // header("HTTP/1.1 304 Not modified");
        abort(304, 'Not Modified $id');
    }
		return $file;
	}

	public function _buildResponse($file) {
    return response()
      ->download($file)
  		->setLastModified((new \DateTime())->setTimestamp(filemtime($file)))
  		->setExpires(new \DateTime("next year"))
  		;
	}

	public function getFile($id) {
		$file = $this->_file($id);
		return $this->_buildResponse($file);
		// ->file($realfile);
	}

	public function getThumbnail($id) {
		$file = $this->_file($id);
		$file = $this->_buildThumbnail($file);
		// var_dump($file);
		return $this->_buildResponse($file);
	}

	public function _buildThumbnail($file) {
		global $myconfig;

    // Constants
    $CACHE_DIR = $myconfig['folders']['temporary'] . "/cache/";
    if (!is_dir($CACHE_DIR)) {
    	mkdir($CACHE_DIR, 0777, true);
    }

    $inWidth = 100;
    $inHeight = 100;

    // Get actual size of source image
    $imgInfo = getimagesize($file);
    $srcWidth =  $imgInfo[0];
    $srcHeight = $imgInfo[1];
    $srcType   = $imgInfo[2];
    switch($srcType) {
      case 1 : $srcType = "gif"; break;
      case 2 : $srcType = "jpeg"; break;
      case 3 : $srcType = "png"; break;
      default: $srcType = "???";
    }

    // Max size : resize
    $xRatio = ($inWidth) ?  ($srcWidth  / $inWidth) : 0;
    $yRatio = ($inHeight) ? ($srcHeight / $inHeight): 0;
    $ratio = max($xRatio, $yRatio, 1);
    $outWidth = intval($srcWidth / $ratio);
    $outHeight = intval($srcHeight/ $ratio);

    // Compute name of cache image
    $cacheName = basename($file) . '#' . $outWidth . 'x' . $outHeight;
    $cacheFile = $CACHE_DIR . '/' . $cacheName;

    // If cache doesn't exist or too old, build it.
    if (!file_exists($cacheName) or ($srcTime > $filectime($cacheFile))) {
        // Create output image
        $outImg = imagecreatetruecolor ($outWidth, $outHeight);

        // Load src image
        switch($srcType) {
            case "png":
                $srcImg = imagecreatefrompng($file);
                break;
            case "gif":
                $srcImg = imagecreatefromgif($file);
                break;
            case "jpeg":
                $srcImg = imagecreatefromjpeg($file);
                break;
            default:
                diewith("unsupported file type '$file'");
        };

        // Resize image
        imagecopyresampled($outImg, $srcImg, 0, 0, 0, 0, $outWidth, $outHeight, $srcWidth, $srcHeight);

        // Save to cached thumb
        switch($srcType) {
            case "png":
                $res = imagepng($outImg, $cacheFile);
                break;
            case "gif":
                $res = imagegif($outImg, $cacheFile);
                break;
            case "jpeg":
                $res = imagejpeg($outImg, $cacheFile);
                break;
            default:
                diewith("unsupported file type '$file'");
        }

        // Check result
        if (!$res) {
        	abort(500, "Unable to save thumb to '$cacheFile'. Check the access right of the HTTP server.");
        }
    }

    // HTTP Header
    // header("Content-Type:image/$srcType");

    // Dump cache file
    // readfile($cacheFile) or diewith("Unable to open cached thumb '$cacheFile'");
    return $cacheFile;
	}
}
