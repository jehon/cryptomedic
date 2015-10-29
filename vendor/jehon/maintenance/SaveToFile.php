<?php

namespace Jehon\Maintenance;

require_once(__DIR__ . "/../../autoload.php");

require_once(__DIR__ . "/lib/extended_session.php");
require_once(__DIR__ . "/lib/getbyurl.php");
require_once(__DIR__ . "/lib/is_served_locally.php");

use Jehon\Maintenance\Lib;

class SaveToFile {
  protected $targetDir;

  static public function run($targetDir) {
    $d = new SaveToFile($targetDir);
    $d->runOne();
  }

  public function __construct($targetDir) {
    $this->targetDir = $targetDir;
  }

  public function runOne() {
    if (!is_dir($this->targetDir)) {
      var_dump("Creating dir " . $this->targetDir);
      if (!mkdir($this->targetDir, 0770, true)) {
        throw new \Exception("Could not create directory " . $this->targetDir);
      }
    }

    if (array_key_exists('original', $_REQUEST) && $_REQUEST['original']) {
      $uploadfile = $_REQUEST['original'];
    } else {
      $uploadfile = basename($_FILES['file']['name']);
    }

    $uploadfile = $this->targetDir . "/" . preg_replace('/[^a-zA-Z0-9-_.]/', '_', $uploadfile);

    // foreach($_FILES as $f => $data) {
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        echo "File is valid, and was successfully uploaded to $uploadfile\n";
    } else {
        echo "Possible file upload attack!\n";
    }
    // }
  }
}
