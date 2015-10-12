<?php
namespace Jehon\Maintenance;

require_once(__DIR__ . "/lib/parameters.php");
require_once(__DIR__ . '/lib/myglob.php');

use Jehon\Maintenance\Lib;
use function Jehon\Maintenance\Lib\getConfig;
use function Jehon\Maintenance\Lib\getParameter;
use function Jehon\Maintenance\Lib\myglob;

class Logs {
	protected $list;
	protected $files;

	static public function run($list) {
		$logs = new Logs($list);
		if (getParameter("file", -1) < 0) {
			$logs->showListing();
		} else {
			$logs->showOne($logs->files[getParameter("file")]);
		}
	}
	
	public function __construct($list) {
		$this->list = $list;
		$this->files = [ ];
		foreach($list as $l) {
			if (is_dir($l)) {
				$this->addDir($l);
			} else {
				$this->addFile($l);
			}
		}
	}

	protected function addDir($dir) {
		foreach(myglob($dir . "/*") as $f) {
			if (basename($f)[0] == ".") {
				continue;
			}
			$this->addFile($f);
		}
	}

	protected function addFile($f) {
		if (substr($f, -2) == "gz") {
			return;
		}
		if (!is_file($f)) {
			return;
		}
		$this->files[] = $f;
	}
	
	public function showOne($file) {
		echo "<h1>" . $file ."</h1>";
		echo "<a href='?'>Go listing</a><br>";
		echo "<pre>";
		if (!is_readable($file)) {
			die("Could not read the file $file");
		}
		try {
			readfile($file);
		} catch (\Exception $e) {
			var_dump($e);
		}
	}
	
	public function showListing() {
		foreach($this->files as $i => $f) {
			if (is_readable($f)) {
				echo "<a href='?file=$i'>" . $f . "</a><br>";
			} else {
				echo "$f<br>";
			}
		}		
	}
}
	