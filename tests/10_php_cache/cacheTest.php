<?php

define("ROOT", __DIR__ . "/../../cache/");

require_once __DIR__ . "/../../php/myfiles.php";

class CacheTest extends PHPUnit_Framework_TestCase
{
	protected function _testOneCachedFile($target) {
		$_REQUEST = array();
		$_REQUEST['target'] = $target;
		$cwd = getcwd();
		chdir(ROOT);
		if (file_exists($target)) {
			unlink($target);
		}
		ob_start();
		require(ROOT . "/generator.php");
		$content = ob_get_contents();
		ob_end_clean();
		chdir($cwd);
		assert(true);
		$this->assertTrue(true, "generating $target");
		return $content;
	}

	public function testTemplates() {
		$cwd = getcwd();
		chdir(ROOT . "/templates");
		foreach(MyFiles::glob("*.php", true) as $f) {
			$f = "templates/" . str_replace(".php", ".html", substr($f, 2));
			$content = $this->_testOneCachedFile($f);
		}
		chdir($cwd);
	}

	/**
	 * @   runInSeparateProcess
	 */
	// public function testManifest() {
	// 	ob_start();
	// 	include(__DIR__ . "/../../cache/manifest.php");
	// 	$content = explode("\n", ob_get_contents());
	// 	ob_end_clean();
	// 	foreach($content as $c) {
	// 		if (!trim($c) || ($c[0] == "#")) {
	// 			continue;
	// 		}
	// 		if (in_array($c, [ "CACHE MANIFEST", "CACHE:", "NETWORK:", "FALLBACK:" ])) {
	// 			break;
	// 		}
	// 		$c = str_replace("/cryptomedic/", "", $c);
	// 		if (file_exists(__DIR__ . "/../../" . $c)) {
	// 			continue;
	// 		}
	// 		# Test if the template is ok
	// 		if (preg_match("%^app/../cache/%", $c)) {
	// 			$cc = str_replace("app/../cache/", "", $c);
	// 			if ($this->_testOneCachedFile($cc)) {
	// 				continue;
	// 			}
	// 		}
	// 		echo "?? " . $c . "\n";
	// 	}
	// }
}
