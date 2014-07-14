<?php

// http://en.wikipedia.org/wiki/Representational_state_transfer

class TableRoute {
	protected $server;
	protected $dbTable;
	protected $request;
	protected $response;
	protected $table;
	protected $route;

	public function __construct($response, $server, $table) {
		$this->dbTable = new DBTable($server->getConfig("database"), $table, $server, $response);
		$this->response = $response;
		$this->server = $server;
		$this->table = $table;

		$this->response->debugHeader($table, "TABLE");
	}

	public function route($request) {
		$this->request = $request;
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
					$this->response->unauthorized("Method not allowed: " . $this->request->getMethod());
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
					$this->response->unauthorized("Method not allowed: " . $this->request->getMethod());
					break;
			}
		}
		return true;
	}

	public function collectionIndex() {
		// TODO: implement search parameters
		$where = array();
		foreach($this->request->getParameters() as $p => $v) {
			$where[$p] = $v;
		}
		$this->response->ok($this->dbTable->rowAll($where, array("password")));
	}

	public function collectionDelete() {
		$this->response->unauthorized("Method not allowed: " . __METHOD__);
	}

	public function collectionAdd() {
		$this->response->unauthorized("Method not allowed: " . __METHOD__);
	}
	
	public function collectionModify() {
		$this->response->unauthorized("Method not allowed: " . __METHOD__);
	}

	public function elementGet() {
		$this->response->ok($this->dbTable->rowGet($this->request->getRoute(2)));
	}

	public function elementDelete() {
		$this->response->unauthorized("Method not allowed: " . __METHOD__);
	}

	public function elementModify() {
		$this->response->unauthorized("Method not allowed: " . __METHOD__);
	}

}
