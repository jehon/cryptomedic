<?php

require_once("../php/debug.php");
require_once("../php/exceptions.php");
require_once("request.php");

/**
 * We set the content-type to json only in case we have an "ok" message
 *
 */
Class Response {
	protected $response = 404;
	protected $cachingTime = 0;
	protected $cachingPublic = false;
	public $data = null;

	public function __construct($request) {
		$this->request = $request;
		if ($this->request->getSystemParameter("cache", false) || $this->request->getSystemParameter("version", false)) {
			$this->cache();
		}
	}

	public function terminate() {
		die();
	}

	public function noCache() {
		$this->cachingTime = false;
		$this->cachingPublic = false;
	}

	public function cache($time = "+ 1 year", $public = false) {
		if (!is_int($time)) {
			$time = strtotime($time);
		}
		$this->cachingTime = $time;
		$this->cachingPublic = $public;
	}

	public function setResponse($code = 200) {
		$this->defaultResponseCode = $code;
	}

	/**
	  * Good, the request is ok, let's send some data to the browser
	  * The function die() after this call.
	  */
	public function ok($data = array()) {
		$this->setResponse();
		$this->data = $data;
// TODO: remove this fire()?
// $this->fire();
	}

	public function fire() {
		if ($this->data === null) {
			throw new HttpNotFound("No data in fire");
		}

		// Cache
		//header("Date: " . gmdate("D, j M Y G:i:s ", time()) . 'GMT');
		//header("Last-Modified: ".  gmdate("D, d M Y H:i:s") . " GMT");
		if ($this->cachingTime == 0) {
			header("Pragma: no-cache");
			header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
			// header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
			header("Cache-Control: no-cache");
		} else {
			//header("Pragma: cache");
			header("Expires: " . $this->cachingTime);
			header("Cache-Control: " . ($this->cachingPublic ? "public" : "private") . " max-age=" . ($this->cachingTime - time()) );
		}

		// Content
		$variable = $this->request->getSystemParameter("variable", null);
		if ($variable) {
			header("Content-type: application/javascript");
			echo $variable . "=";
			if ($this->data) echo json_encode($this->data, JSON_NUMERIC_CHECK);
			echo ";";
		} else {
			header("Content-type: application/json");
			if ($this->data) echo json_encode($this->data, JSON_NUMERIC_CHECK);
		}
		die();
	}
}
