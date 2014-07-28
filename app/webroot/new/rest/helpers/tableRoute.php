<?php

// http://en.wikipedia.org/wiki/Representational_state_transfer

require_once(dirname(dirname(__DIR__)) . "/libs/php/debug.php");
require_once(dirname(dirname(__DIR__)) . "/libs/php/exceptions.php");
require_once(dirname(dirname(__DIR__)) . "/libs/php/server.php");
require_once(dirname(dirname(__DIR__)) . "/libs/php/dbtable.php");
require_once("request.php");
require_once("response.php");

class TableRoute {
	protected $server;
	protected $dbTable;
	protected $request;
	protected $response;
	protected $table;
	protected $route;

	public function __construct($request, $response, $server, $table, $options = array()) {
		$this->dbTable = new DBTable($server->getConfig("database"), $table, $server, $response, $options);
		$this->request = $request;
		$this->response = $response;
		$this->server = $server;
		$this->table = $table;

		debugHeader($table, "TABLE");
	}

	public function route() {
		if (count($this->request->getRoute()) == 1) {
			switch($this->request->getMethod()) {
				case "GET":
					$this->collectionIndex();
					break;
				case "POST":
					$this->collectionAdd();
					break;
				case "PUT":
					$this->collectionReplace();
					break;
				case "DELETE":
					$this->collectionDelete();
					break;
				default:
					throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
					break;
			}
		} else {
			switch($this->request->getMethod()) {
				case "GET":
					$this->elementGet();
					break;
				case "PUT":
					$this->elementModify();
					break;
				case "DELETE":
					$this->elementDelete();
					break;
				default:
					throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
					break;
			}
		}
		return true;
	}

	public function collectionIndex() {
		$where = array();
		foreach($this->request->getParameters() as $p => $v) {
			$where[$p] = $v;
		}
		$this->response->ok($this->dbTable->rowAll($where));
	}

	public function collectionDelete() {
		throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
	}

	public function collectionAdd() {
		throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
	}
	
	public function collectionModify() {
		throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
	}

	public function elementGet() {
		throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
	}

	public function elementDelete() {
		throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
	}

	public function elementModify() {
		throw new HttpUnauthorized("Method not allowed: " . $this->request->getMethod());
	}
}
