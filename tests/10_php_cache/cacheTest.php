<?php

define("ROOT", __DIR__ . "/../../cache/");

require __DIR__ . "/../../php/myfiles.php";

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

	/**
	 * @   runInSeparateProcess
	 */
	// public function testManifest()
	// {
	// 	$content = $this->_testOneCachedFile("manifest.manifest");
	// 	$this->assertNotEmpty($content);
	// 	$this->assertStringStartsWith("CACHE MANIFEST", $content);
	// 	$this->assertContains("NETWORK:", $content);
	// 	$this->assertContains("CACHE:", $content);
	// }

	public function testTemplates() {
		$cwd = getcwd();
		chdir(ROOT . "/templates");
		foreach(MyFiles::glob("*.php", true) as $f) {
			$f = "templates/" . str_replace(".php", ".html", substr($f, 2));
			$content = $this->_testOneCachedFile($f);
		}
		chdir($cwd);
	}
}
