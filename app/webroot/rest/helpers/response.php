<?php

//http_response_code(404);

Class Response {
	protected $server = array();

	public function __construct($server) {
		$this->server = $server;
	}

	protected function dieWith($errCode, $errData = null, $dbgData = null) {
		if (is_array($dbgData)) $dbgData = implode($dbgData, "/");
		if ($dbgData) $this->debugHeader($dbgData);
		if ($errData) {
			echo json_encode($errData, $this->server->getConfig('debug', false) ? JSON_PRETTY_PRINT : 0);
		}
		http_response_code($errCode);
		die();
	}

	public function ok($data = null) {
		if ($data) echo json_encode($data, $this->server->getConfig('debug', false) ? JSON_PRETTY_PRINT : 0);
		die();
	}

	public function unauthorized($errData = null) {
		$this->dieWith(401, $errData);
	}

	public function forbidden($errData = null) {
		$this->dieWith(403, $errData);
	}

	public function invalidData($invalidData = null) {
		$this->dieWith(406, "Invalid data", $invalidData);
	}

	public function internalError($dbgMsg = false) {
		$this->dieWith(500, "An internal error", $dbgMsg);
	}

	/**
	* We encounter a critical error. We send back to the browser an http error $errorCode.
	* 
	* If the debug mode is not enabled, then all message with error code != 500 will be the same
	* This is done to avoid security information leaking to the browser. 
	*
	* @param string $msg: body of the response message (for indication)
	* @param int $errorCode: code of the error
	* @param string $dbgMsg: an additionnal error code
	* @see debugHeader
	*/
	public function criticalError($msg, $errorCode = 500, $dbgMsg = false) {
		$this->debugHeader($dbgMsg);
		// TODO: dbgmsg could be managed automatically
		if ($this->server->getConfig('debug', false)) {
			header($msg, true, $errorCode);
		} else {
			if ($errorCode = 500) {
				header("Internal rest error", true, $errorCode);
			} else {
				header($msg, true, $errorCode);
			}
		}
		die($msg);
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
