<?php

//http_response_code(404);

Class Response {
	protected $server = array();
	const INVALID_ROUTE = 404;

	public function __construct($server) {
		$this->server = $server;
	}

	public function ok($data = null) {
		if ($data) json_encode($data, $this->server->getConfig('debug', false) ? JSON_PRETTY_PRINT : 0);
		die("");
	}

	public function dieOnSqlError($database, $dbgMsg = false) {
		if ($dbgMsg) $this->debugHeader($dbgMsg);
		if ($this->server->getConfig('debug', false)) {
			die("Invalid sql " . ($dbgMsg ? "[" . $dbgMsg . "]" : "") . ":" . $database->errorMsg());
		}
		die("Invalid sql: " . $db->ErrorMsg());
	}

	public function invalidData($dbgMsg = false) {
		if ($dbgMsg) $this->debugHeader($dbgMsg);
		header("Invalid data", true, 406);
		die("Invalid data");
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