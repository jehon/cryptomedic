<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FolderController;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

use App\Model\Picture;
use App\Helpers\FS;

$myLogI = 0;
$myLogFix = 0;
function mylog($picture, $msg, $fix = null) {
  global $myLogI;
  global $myLogFix;
  $myLogI++;
  echo "<tr>";
  echo "<td>#" . $myLogI . "</td>";
  if ($picture) {
    echo "<td><a href='/built/frontend/ng1x.html#/patient/" . $picture->patient_id . "/picture." . $picture->id . "'>" . $picture->id . "</a></td>";
    echo "<td>" . $picture->file . "</td>";
  }
  echo "<td>$msg</td>";

  if ($myLogFix < Request::input('n')) {
    if ($fix) {
      $myLogFix++;
      echo "<td>!$myLogFix</td>";
      $fix($picture);
    }
  }

  echo "</tr>";
  flush();
}

class PicturesController extends FicheController {
  static public function getModelClass() {
    return "App\\Model\\Picture";
  }

  // List all database pictures that does not exists on the file system
  public function checkFileSystem() {
    echo "Running with fix: <a href='?n=100'>Fix with n=100</a>";
    $res = [];
    echo "<table style='width: 100%;'>";
    echo "<tr style='background-color: lightgray;'><td colspan='100'>From database</td></tr>\n";
    flush();
    foreach(Picture::all() as $picture) {
      if ($picture->file == null) {
        mylog($picture, "no-file-in-database", function($picture) {
          $picture->delete();
        });
      } else {
        $file = $picture->getPhysicalPath($picture->file);
        if (!file_exists($file)) {
          mylog($picture, "no-file-on-filesystem");
        } else {
          $ext = pathinfo($picture->file, PATHINFO_EXTENSION);
          if ($ext) {
            $calc = $picture->calculateTargetName("", $ext);
            if ($calc != $picture->file) {
              mylog($picture, $calc, function($picture) use($calc) {
                \App\Model\mkdirIf($picture->getPhysicalPath($calc));
                rename($picture->getPhysicalPath($picture->file), $picture->getPhysicalPath($calc));
                $picture->file = $calc;
                $picture->save();
              });
            }
          } else {
            mylog($picture, "no-extension");
          }
        }
      }
    }
    echo "<tr><td></td></tr>";

    echo "<tr style='background-color: lightgray;'><td colspan='100'>From filesystem</td></tr>";
    flush();
    foreach(FS::glob(Picture::getPhysicalRoot() . "/*", true) as $file) {
      $file = substr($file, strlen(Picture::getPhysicalRoot()));
      if (!Picture::getPictureCountByPhysicalPath($file)) {
        mylog(null, "no-db-record: " . $file, function($picture) use($file) {
          unlink(Picture::getPhysicalPath($file));
        });
      }
    }
    echo "</table>";
    flush();
    return "ok";
  }

	private function _file($id) {
		$picture = Picture::findOrFail($id);
		$file = $picture->getPhysicalPath($picture->file);
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

	private function _buildResponse($file) {
    return response()
    	->download($file)
  		->setLastModified((new \DateTime())->setTimestamp(filemtime($file)))
  		->setExpires(new \DateTime("next year"))
  		;
	}

	// Entry point for full image
	public function getFile($id) {
		$file = $this->_file($id);
		return $this->_buildResponse($file);
	}

	// Entry point for thumbnail
	public function getThumbnail($id) {
		$file = $this->_file($id);
		$file = $this->_buildThumbnail($id, $file);
		return $this->_buildResponse($file);
	}

	private function _buildThumbnail($id, $file) {
		global $myconfig;

    // Constants
    $CACHE_DIR = $myconfig['folders']['temporary'] . "/thumbnails/";
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
    $cacheName = $id . '#' . $outWidth . 'x' . $outHeight;
    $cacheFile = $CACHE_DIR . '/' . $cacheName;

    // If cache doesn't exist or too old, build it.
    if (!file_exists($cacheName) or ($srcTime > $filectime($cacheFile))) {
		// Create output image
        $outImg = \imagecreatetruecolor($outWidth, $outHeight);

        // Load src image
        switch($srcType) {
            case "png":
                $srcImg = \imagecreatefrompng($file);
                break;
            case "gif":
                $srcImg = \imagecreatefromgif($file);
                break;
            case "jpeg":
                $srcImg = \imagecreatefromjpeg($file);
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
