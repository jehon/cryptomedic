<?php

Class Response {
	protected $server = array();

	public function __construct($server) {
		$this->server = $server;
	}

	/**
	  * Perform some debuging before dying if necessary
	  * - debug header
	  * - complete error message
	  * - trace
	  */
	protected function dieWith($errCode, $errData = null, $dbgData = null) {
		if (is_array($dbgData)) $dbgData = implode($dbgData, "/");
		if ($this->server->getConfig(Server::DEBUG)) {
		if ($dbgData) $this->debugHeader($dbgData);
			trace();
		}
		http_response_code($errCode);
		if ($errData) {
			echo json_encode($errData);
		}
		die();
	}

	/**
	  * Good, the request is ok, let's send some data to the browser
	  * The function die() after this call.
	  */
	public function ok($data = null) {
		if ($data) echo json_encode($data, $this->server->getConfig('debug', false) ? JSON_PRETTY_PRINT : 0);
		die();
	}

    /**
      * The user should be connected to perform the operation
      */
	public function unauthorized($errData = null) {
		$this->dieWith(401, $errData);
	}

	/** 
	  * The user is correctly connected, but there is some problem related to authorizations
	  */
	public function forbidden($errData = null) {
		$this->dieWith(403, $errData);
	}

	/**
	  * - data provided is incomplete or invalid
	  * - route is invalid
	  */ 
	public function invalidData($invalidData = null) {
		$this->dieWith(406, "Invalid data", $invalidData);
	}

	/**
	  * - ?
	  * - SQL error
	  */
	public function internalError($dbgMsg = false) {
		$this->dieWith(500, "An internal error", $dbgMsg);
	}

	/**
	 * Add a debug header to the request (only if in debug mode)
	 * 
	 * The header is in the form "$topic: $content"
	 * 
	 * @param $topic: the title of the debug header
	 * @param $content: value sent to the browser
	 */
	public function debugHeader($content, $topic = "ERROR") {
		if ($this->server->getConfig('debug', false)) {
			header("X-DEBUG-" . $topic . ': ' . $content, false);
		}
	}
}
