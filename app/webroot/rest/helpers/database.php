<?php

require_once(__DIR__ . "/../adodb/adodb.inc.php");

class database {
	protected $response = array();
	protected $db = null;
	protected $tables = null;
	protected $lastStatement = "";

	public function __construct($config, $server, $response) {
		$this->response = $response;
		$this->server = $server;

		$this->db = ADONewConnection($config['uri']);
		$this->db->SetFetchMode(ADODB_FETCH_ASSOC);
		if (array_key_exists("init", $config)) {
			//$this->db->Execute("SET CHARACTER SET 'utf8'");
			$this->lastStatement = $config['init'];
			$res = $this->db->Execute($config['init']);
			if ($res === false) {
				$this->response->dieOnSqlError($this, "Database init script error");
			}
		}

		$this->tables = $this->server->getCache("tables", null);
		if (is_null($this->tables)) {
			$this->tables = $this->db->MetaTables();
			if ($this->tables === false)
				$this->response->criticalError("Table list error", 500, $this->db->ErrorMsg());
			$this->server->setCache('tables', $this->tables);
		}
	}

	// ---------------------------------- _SQL FUNCTIONS ------------------------------
	public function checkTableName($table) {
		if (in_array($table, $this->tables))
			return true;
		$this->response->criticalError("Table not available: $table");
		return false;
	}

	public function checkTableField($table, $field) {
		// TODO: clean up parameters: check existing ` = sql escape
		// error ? throw exception
		return true;
	}

	public function _checkValue($value) {
		// TODO: clean up parameters: check existing ` = sql escape
		// error ? throw exception
		return true;
	}

	public function rowAll($table, $parameters) {
		$where = $this->getParameter('where', $parameters, "(1=1)");
		$column = $this->getParameter('columns', $parameters, '*');
		
		$cols = split(',', $column);
		
		if ((count($cols) == 1)  && ($cols[0] != '*')) {
			$data = $this->db->GetCol("SELECT DISTINCT `" . $cols[0] . "` FROM `$table` WHERE (id > '') && (modified is not null) && $where ");
			$split = $this->getParameter('split', $parameters, '');
			if ($split != "") {
				$s = array();
				foreach($data as $key => $val) {
					$s = array_merge($s, split($split, $val));
				}
				$data = array_unique($s);
				sort($data);
				if ($data[0] == "") {
					array_shift($data);
				}
			}
		} else {		
			$data = $this->db->GetAll("SELECT * FROM `$table` WHERE (id > '') && (modified is not null) && $where ");
		}
		return $data;
	}

	public function rowGet($table, $id) {
		return $this->db->GetRow("SELECT * FROM `$table` WHERE id='$id' ");
	}

	public function tableList() {
		return $this->tables;
	}

	public function preparedStatement($statement, $data) {
		$this->lastStatement = $statement;
		$stmt = $this->db->Prepare($statement);
		$res = $this->db->Execute($stmt, $data);
		if ($res === false) {
			$this->response->dieOnSqlError($this->db);
		}
		return $res->getArray();
	}

	public function errorMsg() {
		return $this->db->ErrorMsg() . "<br>\n" . $this->lastStatement;
	}
}