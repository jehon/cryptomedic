<?php

require_once("myglob.php");

class Script {
	private $type = "js";
	private $opt = array();
	
	function __construct($url = "") { 
		//$this->_url = $url; 
		$this->url($url);
	}
	
	function url($url) { 	
		$this->_url = $url;
		if (strpos($this->_url, ".css") > 0) $this->css();
		if (strpos($this->_url, ".js") > 0) $this->js();
		 return $this; 
	}
	
	function css() { 		$this->type = "css"; return $this; }
	function js() { 		$this->type = "js"; return $this; }

	// protected function cached() {
	// 	$this->opt["_cache"] = 1;
	// 	return $this;
	// }

	function live() {
		unset($this->opt["_cache"]);
		return $this;
	}
	
	function dependFile($file = null) {
		if ($file == null) $file = $this->_url;
		if (!file_exists($file)) {
			throw new Exception("Script: $file does not exists");
		}
		$this->opt["_version"] = date("YmdHis", filemtime($file));
		return $this;
	}
	
	function dependDb() {
		$this->opt["_version"] = 1;
		$opt[] = 1;
		return $this;
	}
	
	function dependDbTable($table) {
		$this->opt["_version"] = 1;
		$opt[] = 1;
		return $this;
	}

	private function _params() {
		return http_build_query($this->opt, "dep");
	}
	
	function toPrint() {
		switch($this->type) {
			case "js":
				echo "<script type='text/javascript' src='" . $this->_url 
					. (strpos($this->_url, "?") > 0 ? "&" :  "?") . $this->_params() . "'></script>\n";
				break;
			case "css":
				echo "<link rel='stylesheet' href='" . $this->_url 
					. (strpos($this->_url, "?") > 0 ? "&" :  "?") . $this->_params() . "'/>\n";
				break;
			default:
				throw Exception("Invalid type: $type");				
		}

	}
};


class AllScripts {
	private $list = array();

	function __construct($glob) { 
		foreach(myglob($glob) as $f) {
			if (is_file($f)) {
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
