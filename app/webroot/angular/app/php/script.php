<?php

class Script {
	private $type = "js";
	private $opt = array();
	
	function __construct($url = "") { $this->_url = $url; }
	
	public function url($url) { 	$this->_url = $url; return $this; }
	public function css() { 		$this->type = "css"; return $this; }
	public function js() { 			$this->type = "js"; return $this; }
	
	function dependFile($file = null) {
		if ($file == null) $file = $this->_url;
		if (!file_exists($file)) {
			throw Exception("Script: $file does not exists");
		}
		$this->opt[] = date("YmdHis", filemtime($file));
		return $this;
	}
	
	function dependDbTable($table) {
		$opt[] = 1;
		return $this;
	}

	private function _params() {
		return http_build_query($this->opt, "dep");
	}
	
	function toPrint() {
		switch($this->type) {
			case "js":
				echo "<script type='text/javascript' src='" . $this->_url . "?" . $this->_params() . "'></script>\n";
				break;
			case "css":
				echo "<link rel='stylesheet' href='" . $this->_url . "?" . $this->_params() . "'/>\n";
				break;
			default:
				throw Exception("Invalid type: $type");				
		}

	}
};
