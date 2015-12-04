<?php
namespace Jehon\Maintenance;

require_once(__DIR__ . "/../../autoload.php");

require_once(__DIR__ . "/lib/extended_session.php");
require_once(__DIR__ . "/lib/getParameter.php");
require_once(__DIR__ . "/lib/getbyurl.php");
require_once(__DIR__ . "/lib/is_served_locally.php");

use \Exception;
use \DateTime;
use \ZipArchive;

use Jehon\Maintenance\Lib;

class Deploy {
  public static function run($targetDir, $owner, $project) {
    $d = new Deploy();
    $d->runOne($targetDir, $owner, $project);
  }

  public function __construct() {
    // Set a user agent for file_get_contents()
    ini_set ( 'user_agent', 'Mozilla/4.0 (compatible; MSIE 6.0)' );
  }

  /**
   * Get a zip file
   *
   */
  static protected function getZip($zip, $uri) {
    if (file_exists($zip)) {
      echo "already downloaded";
    } else {
      $tzip = $zip . ".tmp";
      $fp = fopen($tzip, 'w');
      if(!$fp) {
        throw new Exception('! Cannot open file for writing: ' . $tzip);
      }

      file_put_contents($tzip, \Jehon\Maintenance\Lib\getByCurl($uri));
      fclose($fp);

      if (filesize($tzip) < 10) {
        throw new Exception("! Problem downloading the file: size is below 100: " . $zip);
      }

      if (!rename($tzip, $zip)) {
        throw new Exception("Critical: could not move the temp zip file ($zip) to " . $zip);
      }
      echo "ok";
    }
  }

  /**
   * Delete a file or a folder structure recursively
   */
  static protected function deleteFileOrFolder($path) {
    if (is_link($path) || is_file($path)) {
      $res = unlink($path);
      if (!$res) {
        throw new Exception("Could not unlink file $file");
      }
    }
    if (is_dir($path)) {
      // Directory
      if(!is_writeable($path)) {
        chmod($path,0777);
      }
      $handle = opendir($path);
      while ($tmp = readdir($handle)){
        if (($tmp != '..') && ($tmp != '.') && ($tmp!='')) {
          self::deleteFileOrFolder($path . DIRECTORY_SEPARATOR . $tmp);
        }
      }
      closedir($handle);
      rmdir($path);

    }
    if (file_exists($path)) {
      throw new Exception("Could not remove: $path");
    }
    return true;
  }

  /**
   * Move a directory away
   */
  static protected function replaceDirectory($from, $to) {
    if (!file_exists($from) || !is_dir($from)) {
      throw new Exception("$from file not present");
    }

    if (file_exists($to)) {
      self::deleteFileOrFolder($to);
    }

    if (!rename($from, $to)) {
      throw new Exception("Critical: could not move from $from to $to");
    }

    return true;
  }

  /**
   * Extract a file, and move the extracted folder above
   *
   */
  static protected function extractZip($zip, $target) {
    $targetTemp = $target . "-temp";

    $ozip = new ZipArchive();

    $res = $ozip->open($zip);
    if ($res !== TRUE) {
      throw new Exception("Opening zip file $zip: " .$res);
    }

    $res = $ozip->extractTo($targetTemp);
    if ($res !== TRUE) {
      throw new Exception("Extracting zip file $zip to $targetTemp: $res");
    }
    $ozip->close();

    // Remove old root-next if it exists
    if (is_dir($target)) {
      self::deleteFileOrFolder($target);
    }

    // Remove unused directory
    $dir = opendir($targetTemp);
    do {
      $file = readdir($dir);
    } while (($file == ".") || ($file == '..') || !$file);
    if (!$file) {
      throw new Exception("Zip file contain nothing");
    }
    closedir($dir);
    $res = rename($targetTemp . DIRECTORY_SEPARATOR . $file, $target);
    if (!$res) {
      throw new Exception("Rename from {$targetTemp}/$file to $target failed");
    }
    self::deleteFileOrFolder($targetTemp);
  }

  public function runOne($targetDir, $owner, $project) {
    if (\Jehon\Maintenance\Lib\isServedLocally()) {
      echo "Served locally: ";
      if (substr($targetDir, -5) != "-test") {
        echo " adding -test postfix";
        $targetDir = $targetDir . "-test";
      } else {
        echo " -test postfix already present";
      }
      echo "<br>";
    }

    $root         = dirname($targetDir);
    $zip          = $targetDir . ".zip";
    $tempUnzipped = $zip . "-test";
    $version      = "latest";
    $versionFile  = $targetDir . ".version";
    $historyFile  = $targetDir . ".history";
    $backup       = $targetDir . "-backup";
    $githubUri    = "https://api.github.com/repos/" . $owner . "/" . $project . "/zipball/master";

    ?>

      Root:               <?php echo $root; ?><br>
      Repository owner:   <?php echo $owner; ?><br>
      Repository project: <?php echo $project; ?><br>
      Version file:       <?php echo $versionFile; ?><br>
      History file:       <?php echo $historyFile; ?><br>
      TargetDir:          <?php echo $targetDir; ?><br>
      TempUnzipped:       <?php echo $tempUnzipped; ?><br>
      GithubUri:          <?php echo $githubUri; ?><br>
      Zip:                <?php echo $zip; ?><br>

      <h3>Rates curl authorized</h3>
      <?php
        Lib\stepByStep(function() {
          $rates = json_decode(Lib\getByCurl("https://api.github.com/rate_limit"), true);
          $rates['resources']['core']['reset2'] = (new DateTime())->setTimestamp($rates['resources']['core']['reset'])->format('Y-m-d H:i:s');
          var_dump($rates['resources']['core']);
        });
      ?>

      <h3>Getting Zip file</h3>
      <?php
        Lib\stepFollow(function() use ($zip, $githubUri) { echo self::getZip($zip, $githubUri); });
      ?>

      <h3>Unzip the file</h3>
      <?php
        Lib\stepByStep(function() use ($zip, $tempUnzipped) { echo self::extractZip($zip, $tempUnzipped); });
      ?>

      <h3>Removing old backup</h3><?php
        Lib\stepByStep(function() use ($backup) { echo self::deleteFileOrFolder($backup); });
      ?>

      <h3>Archive current directory</h3>
      <?php
        Lib\stepFollow(function() use ($targetDir, $backup) { echo (file_exists($targetDir) ? self::replaceDirectory($targetDir, $backup) : ""); });
      ?>

      <h3>Replace directory (real install)</h3>
      <?php
        Lib\stepFollow(function() use ($tempUnzipped, $targetDir) { echo self::replaceDirectory($tempUnzipped, $targetDir); });
      ?>

      <h3>Remove zip file</h3>
      <?php
        Lib\stepByStep(function() use ($zip) { echo self::deleteFileOrFolder($zip); });
      ?>

      <h3>Run custom script</h3>
      <?php
        // Lib\stepByStep(function() { if (function_exists("custom_upgrade")) { echo \custom_upgrade(); } });
      ?>

      <h3>Act the version</h3>
      <?php
        Lib\stepFollow(function() use ($version, $versionFile, $historyFile) {
          echo "<pre>";
          $fversion = $version;
          if ($version == "latest") {
            $fversion = date ( "c" );
          }
          if (! file_put_contents ( $versionFile, $fversion )) {
            throw new Exception ( "Creating version file error" );
          }

          file_put_contents ( $historyFile, date ( "c" ) . ": " . $version . "\n", FILE_APPEND | LOCK_EX );
          echo "</pre>";
          echo "ok";
        });
      ?>

      <h3>Send Email</h3>
      <pre><?php
        //    myMailToLink("Send email", $allEmails, "New version of cryptomedic", <<<EOT
        // Dear all,

        // I did just install a new version of cryptomedic. Please feel free to try it online!

        // If you find anything unusual or not working, please contact me: marielineetjean+cryptomedic@gmail.com.

        // If you don't use cryptomedic anymore, or if you don't want to receive such notifications, please let me know.

        // Sincerelly yours,
        // Jean

        // EOT
        //          );
      ?></pre>
    <?php
  }
}
