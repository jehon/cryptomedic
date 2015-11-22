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
		if (!file_exists($path)) {
			echo "Not deleting not existing file: $path";
			return true;
		}
		if(!is_writeable($path) && is_dir($path)) {
			chmod($path,0777);
		}
		if (is_file($path)) {
			$res = unlink($path);
			if (!$res) {
				throw new Exception("Could not unlink file $file");
			}
			return $res;
		}
		if (!is_dir($path)) {
			return false;
		}
		$handle = opendir($path);
		while ($tmp = readdir($handle)){
			if (($tmp != '..') && ($tmp != '.') && ($tmp!='')) {
				if(!is_writeable($path.DIRECTORY_SEPARATOR.$tmp)) {
					chmod($path.DIRECTORY_SEPARATOR.$tmp,0777);
				}
				if (is_file($path.DIRECTORY_SEPARATOR.$tmp)) {
					self::deleteFileOrFolder($path.DIRECTORY_SEPARATOR.$tmp);
				}
				if (is_dir($path.DIRECTORY_SEPARATOR.$tmp)) {
					self::deleteFileOrFolder($path.DIRECTORY_SEPARATOR.$tmp);
				}
			}
		}
		closedir($handle);
		rmdir($path);
		if (is_dir($path)) {
			throw new Exception("Could not remove directory: $path");
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
			echo "Served locally<br>";
			$targetDir = $targetDir . "-test";
		}

		$root = dirname($targetDir);
		$zip = $targetDir . ".zip";
		$tempUnzipped = $zip . "-extracted";
		$version = "latest";
		$versionFile = $targetDir . ".version";
		$historyFile = $targetDir . ".history";
		$backup = $targetDir . "-backup";
		?>

			Root: 				<?php echo $root; ?><br>
			Repository owner: 	<?php echo $owner; ?><br>
			Repository project: <?php echo $project; ?><br>
			Version file: 		<?php echo $versionFile; ?><br>
			History file: 		<?php echo $historyFile; ?><br>
			TargetDir: 			<?php echo $targetDir; ?><br>
			TempUnzipped: 		<?php echo $tempUnzipped; ?><br>

			<h3>Rates curl authorized</h3>
			<?php
				$rates = json_decode(\Jehon\Maintenance\Lib\getByCurl( "https://api.github.com/rate_limit" ), true);
				$rates['resources']['core']['reset2'] = (new DateTime())->setTimestamp($rates['resources']['core']['reset'])->format('Y-m-d H:i:s');
				var_dump($rates['resources']['core']);

				// Must be not the first one, for "latest" version to work correctly
				$tags = array();
				$tags["latest"] = array ();
				$tags["latest"]["zipball_url"] = "https://api.github.com/repos/" . $owner . "/" . $project . "/zipball/master";
				$tags["latest"]["name"] = "latest";
				flush();
			?>

			<h3>Zip file URI<h3>
			<?php
				$githubUri = $tags[$version]['zipball_url'];
				echo $githubUri;
				flush();
			?>

			<h3>Getting Zip file</h3>
			<?php echo self::getZip($zip, $githubUri); ?>

			<h3>Unzip the file</h3>
			<?php
				echo self::extractZip($zip, $tempUnzipped);
				flush();
			?>

			<h3>Removing old backup</h3>
			<?php
				echo self::deleteFileOrFolder ( $backup );
				flush();
			?>

			<h3>Archive old directory</h3>
			<?php
				if (file_exists ( $targetDir )) {
					echo self::replaceDirectory ( $targetDir, $backup );
				}
				flush();
			?>

			<h3>Replace directory (real install)</h3>
			<?php
				echo self::replaceDirectory ( $tempUnzipped, $targetDir);
				flush();
			?>

			<h3>Remove zip file</h3>
			<?php echo self::deleteFileOrFolder ( $zip ); ?>

			<h3>Run custom script</h3>
			<?php
				if (function_exists("custom_upgrade")) {
					echo custom_upgrade();
				}
				flush();
			?>

			<h3>Act the version</h3>
			<pre><?php
				$fversion = $version;
				if ($version == "latest") {
					$fversion = date ( "c" );
				}
				if (! file_put_contents ( $versionFile, $fversion )) {
					throw new Exception ( "Creating version file error" );
				}

				file_put_contents ( $historyFile, date ( "c" ) . ": " . $version . "\n", FILE_APPEND | LOCK_EX );
				echo "ok";
			?></pre>

			<h3>Send Email</h3>
			<pre><?php
				// 		myMailToLink("Send email", $allEmails, "New version of cryptomedic", <<<EOT
				// Dear all,

				// I did just install a new version of cryptomedic. Please feel free to try it online!

				// If you find anything unusual or not working, please contact me: marielineetjean+cryptomedic@gmail.com.

				// If you don't use cryptomedic anymore, or if you don't want to receive such notifications, please let me know.

				// Sincerelly yours,
				// Jean

				// EOT
				// 					);
			?></pre>
		<?php
		if (file_exists ( $historyFile )) {
			echo "<h3>History</h3>";
			echo "<pre>";
			$history = file_get_contents ( $historyFile );
			$history = explode ( "\n", $history );
			$history = array_reverse ( $history );
			foreach ( $history as $l ) {
				echo $l . "\n";
			}
			echo "</pre><br>";
		} else {
			echo "<h3>No history file found</h3>";
		}
	}
}
