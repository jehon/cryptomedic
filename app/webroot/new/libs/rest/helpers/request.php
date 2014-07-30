<?php

require_once("../php/debug.php");
require_once("../php/exceptions.php");
require_once("../php/server.php");

Class request {
	protected $server;
	protected $method;
	protected $parameters;
	protected $post;
	protected $subquery;

	public function __construct($server) {
		$this->server = $server;

		/**
		* Defining the query parameter
		*/

		$this->subquery = array();
		if (array_key_exists('REDIRECT_subquery', $_SERVER)) {
			$this->subquery = $_SERVER['REDIRECT_subquery'];
			$this->subquery = array_filter(explode('/', $this->subquery), "strlen");
		}

		if (count($this->subquery) < 1) {
			debugHeader("Is configuration ok? No subquery found");
			throw new HttpInvalidData("Invalid route");
		}
		
		foreach($this->subquery as $k => $l)
			debugHeader($l, 'SUBQUERY-' . $k);
		
		/**
		* Parameters
		*/
		$this->parameters = array();
		$this->systemParameters = array();
		foreach($_GET as $k => $v) {
			if (substr($k, 0, 1) == "_") {
				$ks = substr($k, 1);
				$this->systemParameters[$ks] = $v;
				debugHeader($v, 'SUBQUERY-SYSPARAM-' . $ks);
			} else {
				$this->parameters[$k] = $v;
				debugHeader($v, 'SUBQUERY-PARAM-' . $k);
			}
		}

		$this->post = $_POST;
		if (!$this->post) {
			// Read data from php://input
			// @Author cakephp (CakeRequest.php#934)
			$fh = fopen('php://input', 'r');
			$content = stream_get_contents($fh);
			if ($content) {
				$content = json_decode($content);
				if (is_array($content)) {
					$this->post = $content;
				} else if (is_object($content)) {
					foreach($content as $k => $v)
						$this->post[$k] = $v;
				} else {
					throw new HttpInvalidData("Input content");
				}
			}
		}

		foreach($this->post as $k => $v) {
			debugHeader($v, 'SUBQUERY-POST-' . $k);
		}

		/**
		* Defining the method parameter
		*/
		$this->method = $_SERVER['REQUEST_METHOD'];
		$req_headers = apache_request_headers();
		if (array_key_exists('X-REQUEST-METHOD', $req_headers)) $this->method = $req_headers['X-REQUEST-METHOD'];
		if (array_key_exists('X-HTTP-Method-Override', $req_headers)) $this->method = $req_headers['X-HTTP-Method-Override'];
		if (array_key_exists('_method', $_REQUEST)) {
			$this->method = $_REQUEST['_method'];
			unset($this->systemParameters['_method']);
		}
		debugHeader($this->method, 'SUBQUERY-METHOD');
	}

	public function getRoute($i = null) {
		if ($i == null)
			return $this->subquery;
		if ($i > count($this->subquery))
			return null;
		return $this->subquery[$i-1];;
	}

	public function matchRoute($elements) {
		foreach($elements as $i => $e) {
			if (!array_key_exists($i, $this->subquery))
				return false;
			if ($this->subquery[$i] != $e)
				return false;
		}
		return true;
	}

	public function getMethod() {
		return $this->method;
	}

	public function getParameter($key, $default = null) {
		if (array_key_exists($key, $this->parameters))
			return $this->parameters[$key];
		return $default;
	}

	public function getSystemParameter($key, $default = null) {
		if (array_key_exists($key, $this->systemParameters))
			return $this->systemParameters[$key];
		return $default;
	}

	public function getParameters() {
		return $this->parameters;
	}

	public function getPost($key = null, $default = null) {
		if ($key == null) return $this->post;
		if (array_key_exists($key, $this->post))
			return $this->post[$key];
		return $default;
	}


/**
 * Read data from php://input, mocked in tests.
 *
 * @return string contents of php://input
 * @Author cakephp (CakeRequest.php#934)
 */
	// protected function _readInput() {
	// 	if (empty($this->_input)) {
	// 		$fh = fopen('php://input', 'r');
	// 		$content = stream_get_contents($fh);
	// 		fclose($fh);
	// 		$this->_input = $content;
	// 	}
	// 	return $this->_input;
	// }
}
