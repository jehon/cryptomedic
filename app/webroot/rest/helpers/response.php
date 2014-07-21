<?php

/**
 * We set the content-type to json only in case we have an "ok" message
 *
 */

Class Response {
	protected $defaultResponseCode = 404;
	protected $server = array();

	public function __construct($server, $request) {
		$this->server = $server;
		$this->request = $request;
	}

	/**
	  * Perform some debuging before dying if necessary
	  * - debug header
	  * - complete error message
	  * - trace
	  */
	// protected function dieWith($errCode, $errData = null, $dbgData = null) {
	// 	if (is_array($dbgData)) $dbgData = implode($dbgData, "/");
	// 	if ($this->server->getConfig(Server::DEBUG)) {
	// 	if ($dbgData) debugHeader($dbgData);
	// 		trace();
	// 	}
	// 	http_response_code($errCode);
	// 	if ($errData) {
	// 		echo json_encode($errData);
	// 	}
	// 	die();
	// }

	public function defaultResponse($code = 200) {
		$this->defaultResponseCode = $code;
	}

	public function launchDefaultResponse() {
		debugHeader("default reponse launched");
		http_response_code($this->defaultResponseCode);
		die();
	}

	/**
	  * Good, the request is ok, let's send some data to the browser
	  * The function die() after this call.
	  */
	public function ok($data = null) {
		if ($this->request->getSystemParameter("cache", false) || $this->request->getSystemParameter("version", false)) {
			$this->response->cache();
		} else {

		}

		$variable = $this->request->getSystemParameter("variable", null);
		if ($variable) {
			header("Content-type: application/javascript");
			echo $variable . "=";
			if ($data) echo json_encode($data);// , $this->server->getConfig('debug', false) ? JSON_PRETTY_PRINT : 0);
			echo ";";
		} else {
			header("Content-type: application/json");
			if ($data) echo json_encode($data);// , $this->server->getConfig('debug', false) ? JSON_PRETTY_PRINT : 0);
		}
		die();
	}

	public function cache($nbdays = 365, $public = false) {
		// TODO: manage cache
	}
}
