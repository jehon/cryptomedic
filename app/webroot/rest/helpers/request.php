<?php

Class request {
	protected $server;
	protected $response;
	protected $method;
	protected $parameters;
	protected $post;
	protected $subquery;

	public function __construct($server, $response) {
		$this->server = $server;
		$this->response = $response;

		/**
		* Defining the query parameter
		*/
		$this->subquery = array();
		if (array_key_exists('REDIRECT_subquery', $_SERVER)) {
			$this->subquery = $_SERVER['REDIRECT_subquery'];
			$this->subquery = array_filter(explode('/', $this->subquery), "strlen");
		}

		foreach($this->subquery as $k => $l)
			$this->response->debugHeader($l, 'SUBQUERY-' . $k);
		
		if (count($this->subquery) < 1)
			$this->response->invalidData("Invalid route");
		
		/**
		* Parameters
		*/
		// parse_str($_SERVER['QUERY_STRING'], $this->parameters);
		// var_dump($_GET);
		$this->parameters = $_GET;
		foreach($this->parameters as $k => $v) {
			$this->response->debugHeader($v, 'SUBQUERY-PARAM-' . $k);
		}

		$this->post = $_POST;
		foreach($this->post as $k => $v) {
			$this->response->debugHeader($v, 'SUBQUERY-POST-' . $k);
		}

		/**
		* Defining the method parameter
		*/
		$this->method = $_SERVER['REQUEST_METHOD'];
		$req_headers = apache_request_headers();
		if (array_key_exists('X-REQUEST-METHOD', $req_headers)) $this->method = $req_headers['X-REQUEST-METHOD'];
		if (array_key_exists('X-HTTP-Method-Override', $req_headers)) $this->method = $req_headers['X-HTTP-Method-Override'];
		if (array_key_exists('_method', $_REQUEST)) {
			unset($this->parameters['_method']);
			$this->method = $_REQUEST['_method'];
		}
		$this->response->debugHeader($this->method, 'SUBQUERY-METHOD');
	}

	public function getRoute($i = null) {
		if ($i == null)
			return $this->subquery;
		if ($i > count($this->subquery))
			return null;
		return $this->subquery[$i-1];;
	}

	public function getMethod() {
		return $this->method;
	}

	public function getParameter($key, $default = null) {
		if (array_key_exists($key, $this->parameters))
			return $this->parameters[$key];
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

	public function matchRoute($elements) {
		foreach($elements as $i => $e) {
			if (!array_key_exists($i, $this->subquery))
				return false;
			if ($this->subquery[$i] != $e)
				return false;
		}
		return true;
	}
}
