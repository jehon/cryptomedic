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

class Script {
	const TYPE_JS = "js";
	const TYPE_CSS = "css";

	public static $scriptsList = array();
	public static $rootPath = "";
	protected $type = "js";
	protected $opt = array("_cache" => 1);
	protected $ts = 0;

	function __construct($url = "") {
		$this->url($url);
	}

	function url($url) {
		$this->_url = $url;
		if (strpos($this->_url, ".css") > 0) {
			$this->css();
		}
		if (strpos($this->_url, ".js") > 0) {
			$this->js();
		}
		return $this;
	}

	function css() {
		$this->type = "css"; return $this;
	}

	function js() {
		$this->type = "js"; return $this;
	}

	function live() {
		unset($this->opt["_cache"]);
		return $this;
	}

	function dependFile($file = null) {
		if ($file == null) {
			$file = $this->_url;
		}
		$file = self::$rootPath . "/" . $file;
		if (!file_exists($file)) {
			throw new Exception("Script: $file does not exists");
		}
		$this->opt["_version"] = date("YmdHis", filemtime($file));
		$this->ts = max($this->ts, filemtime($file));
		return $this;
	}

// 	function dependDb() {
// 		$this->opt["_version"] = 1;
// 		$this->opt[] = 1;
// 		return $this;
// 	}

	private function _params() {
		return http_build_query($this->opt, "dep");
	}

	function toPrint() {
		$url = $this->_url . (strpos($this->_url, "?") > 0 ? "&" :  "?") . $this->_params();
		if (array_key_exists("_cache", $this->opt)) {
			Script::$scriptsList[] = array("url" => $url, "ts" => $this->ts);
		}

		switch($this->type) {
			case self::TYPE_JS:
				echo "<script type='text/javascript' src='$url'></script>\n";
				break;
			case self::TYPE_CSS:
				echo "<link rel='stylesheet' href='$url'/>\n";
				break;
			default:
				throw Exception("Invalid type: $type");
		}
	}
}
