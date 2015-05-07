<?php

class AllScripts {
	protected $list = array();

	function __construct($glob) {
		foreach(MyFiles::glob(Script::$rootPath . "/" . $glob) as $f) {
			if (is_file($f)) {
				// Strip the $rootPath prefix so that script still could work
				$f = substr($f, strlen(Script::$rootPath . "/"));

				// Replace "\" by "/"
				$f = str_replace("\\", "/", $f);
				$this->list[] = new Script($f);
			}
		}
		return $this;
	}

	public function __call($fn, $arguments) {
		// Call the same function on all Script's in the list
		foreach($this->list as $s) {
			call_user_func_array(array($s, $fn), $arguments);
		}
		return $this;
	}
}
