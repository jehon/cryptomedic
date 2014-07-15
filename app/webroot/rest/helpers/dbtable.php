<?php

require_once(__DIR__ . "/../adodb/adodb.inc.php");

class DBTable {
	const PRIVATE_COLUMNS = "privateColumns";

	protected $response = array();
	protected $db = null;
	protected $table;
	protected $lastStatement = "";
	protected $columns;

	public function __construct($config, $table, $server, $response, $options = array()) {
		$this->response = $response;
		$this->server = $server;
		$this->table = $table;
		$this->options = array_merge(array(
				self::PRIVATE_COLUMNS => array()
			), $options);

		$this->db = ADONewConnection($config['uri']);
		$this->db->SetFetchMode(ADODB_FETCH_ASSOC);
		if (array_key_exists("init", $config)) {
			//$this->db->Execute("SET CHARACTER SET 'utf8'");
			$this->lastStatement = $config['init'];
			$this->dieIfNecessary($this->db->Execute($config['init']), "Database init script error");
		}

		$tablesList = $this->server->getCache("tables", null);
		if (is_null($tablesList)) {
			$tablesList = $this->db->MetaTables();
			if ($tablesList === false)
				$this->response->internalError("Table list error", 500, $this->db->ErrorMsg());
			$this->server->setCache('tables', $tablesList);
		}
		if (($this->table != null) && (array_search($this->table, $tablesList) === false)) {
			$this->response->invalidData("Incorrect table: " . $this->table);
		}
	}

	public function escape($what) {
		return $this->db->qstr($what, get_magic_quotes_gpc());
	}

	public function getColumns() {
		if (!$this->table) $this->response->internalError("No table in " . __METHOD__);
		if (!$this->columns) 
			$this->columns = $this->dieIfNecessary($this->db->MetaColumnNames($this->table), "Getting columns names");
		return $this->columns;
	}

	public function isColumn($col) {
		if (!$this->table) $this->response->internalError("No table in " . __METHOD__);
		$i = array_search($col, $this->getColumns());
		if ($i === false)
			return false;
		return $this->columns[$i];
	}

	public function rowAll($where = array(), $limit = null) {
		if (!$this->table) $this->response->internalError("No table in " . __METHOD__);
		$sql = "SELECT ";

		$cols = array_diff($this->getColumns(), $this->options[self::PRIVATE_COLUMNS]);
		$sql .= "`" . implode($cols, "`, `") . "`";
		$sql .= "FROM `{$this->table}` ";

		// We send back only what we can handle:
		$whereClause = "(id > '') AND (modified is not null)";
		// $whereClause = "(1 = 1)";
		
		foreach($where as $p => $v) {
			$np = $this->isColumn($p);
			if (!$np) {
				$this->response->invalidData("rowAll: " . $p);
			}
			$whereClause .= " AND (`$np` LIKE " . $this->escape($v) . ")";
		}
		$sql .= "WHERE " . $whereClause;

		if (is_numeric($limit))
			$sql .= "LIMIT " . $limit;

		$data = $this->dieIfNecessary($this->db->GetAll($sql), "rowAll");
		return $data;
	}

	public function rowGet($id) {
		if (!$this->table) $this->response->internalError("No table in " . __METHOD__);
		$res = $this->preparedStatement("SELECT * FROM `{$this->table}` WHERE id= ?", array($id));
		foreach($this->options[self::PRIVATE_COLUMNS] as $c) {
			unset($res[$c]);
		}
		return $res;
	}

	public function preparedStatement($statement, $data) {
		$this->lastStatement = $statement;
		$stmt = $this->dieIfNecessary($this->db->Prepare($statement), "preparing statement");
		$res = $this->dieIfNecessary($this->db->Execute($stmt, $data), "executing statement");
		return $res->getArray();
	}

	public function dieIfNecessary($result, $dbgMsg) {
		if (($result === false) && ($this->db->ErrorMsg())) {
			$this->response->internalError("Invalid SQL", 
				"Invalid sql " . ($dbgMsg ? "[" . $dbgMsg . "]" : "") . ":" . $this->db->ErrorMsg());
		}
		return $result;
	}
}