<?php

class Script {
	private $type = "js";
	private $opt = array();
	private $list = array();
	
	function __construct($url = "") { $this->_url = $url; }
	
	public function url($url) { 	$this->_url = $url; return $this; }
	public function css() { 		$this->type = "css"; return $this; }
	public function js() { 			$this->type = "js"; return $this; }
	
	private function _apply($fn, $args = array()) {
		foreach($this->list as $s) {
			call_user_func_array(array($s, $fn), $args);
// 			$s->$fn($arg[0]);
		}
	}
	
	public function all($pattern) {
		foreach(glob($pattern) as $f) {
			if (is_file($f)) {
				$this->list[] = new Script($f);
			}
		}
		return $this;
	}
	
	function cached() {
		$this->_apply(__FUNCTION__, func_get_args());
		$this->opt["cached"] = 1;
		return $this;
	}

	function live() {
		$this->_apply(__FUNCTION__, func_get_args());
		unset($this->opt["cached"]);
		return $this;
	}
	
	function dependFile($file = null) {
		$this->_apply(__FUNCTION__, func_get_args());
		if (!$this->_url) return $this;
		if ($file == null) $file = $this->_url;
		if (!file_exists($file)) {
			throw new Exception("Script: $file does not exists");
		}
		$this->opt[] = date("YmdHis", filemtime($file));
		return $this;
	}
	
	function dependDb() {
		$this->_apply(__FUNCTION__, func_get_args());
		$opt[] = 1;
		return $this;
	}
	
	function dependDbTable($table) {
		$this->_apply(__FUNCTION__, func_get_args());
		$opt[] = 1;
		return $this;
	}

	private function _params() {
		return http_build_query($this->opt, "dep");
	}
	
	function toPrint() {
		$this->_apply(__FUNCTION__, func_get_args());
		if (!$this->_url) return ;
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
