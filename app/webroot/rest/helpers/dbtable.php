<?php

require_once(__DIR__ . "/../../new/libs/adodb/adodb.inc.php");

class DBTable {
	const PRIVATE_COLUMNS = "privateColumns";
	const BY_ID = "id";

	protected $db = null;
	protected $table;
	protected $lastStatement = "";
	protected $columns;

	public function __construct($config, $table, $server, $options = array()) {
		$this->server = $server;
		$this->table = $table;
		$this->options = array_merge(array(
				self::PRIVATE_COLUMNS => array()
			), $options);

		$this->db = ADONewConnection($config['uri']);
		$this->db->SetFetchMode(ADODB_FETCH_ASSOC);
		if (array_key_exists("init", $config)) {
			$this->lastStatement = $config['init'];
			$this->myPostTreatment($this->db->Execute($config['init']), "Database init script error");
		}

		$tablesList = $this->server->getCache("tables", null);
		if (is_null($tablesList)) {
			$tablesList = $this->db->MetaTables();
			if ($tablesList === false)
				throw new DBSystemError("Table list error: " . $this->db->ErrorMsg());
			$this->server->setCache('tables', $tablesList);
		}
		if (($this->table != null) && (array_search($this->table, $tablesList) === false)) {
			throw new DBInvalidData("Incorrect table: " . $this->table);
		}
	}

	public function isColumn($col) {
		if (!$this->table) throw new DBSystemError("No table in ". __METHOD__);
		$i = array_search($col, $this->getColumns());
		if ($i === false)
			return false;
		return $this->columns[$i];
	}

	public function escape($what) {
		return $this->db->qstr($what, get_magic_quotes_gpc());
	}

	public function getColumns() {
		if (!$this->table) throw new DBSystemError("No table in ". __METHOD__);
		if (!$this->columns) 
			$this->columns = $this->myPostTreatment($this->db->MetaColumnNames($this->table), "Getting columns names");
		return $this->columns;
	}

	public function rowAll($where = array(), $limit = null) {
		if (!$this->table) throw new DBSystemError("No table in ". __METHOD__);
		$sql = "SELECT ";

		$cols = array_diff($this->getColumns(), $this->options[self::PRIVATE_COLUMNS]);
		$sql .= "`" . implode($cols, "`, `") . "`";
		$sql .= "FROM `{$this->table}` ";

		// We send back only what we can handle: 
		$whereClause = "(id is not null) AND (modified is not null)";
		
		foreach($where as $p => $v) {
			$np = $this->isColumn($p);
			if (!$np)
				throw new DBInvalidData("rowAll: " . $p);
			$whereClause .= " AND (`$np` LIKE " . $this->escape($v) . ")";
		}
		$sql .= "WHERE " . $whereClause;

		if (is_numeric($limit))
			$sql .= "LIMIT " . $limit;

		$data = $this->myPostTreatment($this->db->GetAll($sql), "rowAll");
		return $data;
	}

	public function rowGet($id) {
		if (!$this->table) throw new DBSystemError("No table in ". __METHOD__);
		$res = $this->preparedStatement("SELECT * FROM `{$this->table}` WHERE `id` = ?", array($id));
		foreach($this->options[self::PRIVATE_COLUMNS] as $c) {
			unset($res[$c]);
		}
		return $res;
	}

	public function preparedStatement($statement, $data) {
		$this->lastStatement = $statement;
		$stmt = $this->db->Prepare($statement); // This could not fail!
		$res = $this->myPostTreatment($this->db->Execute($stmt, $data), "executing statement");
		return $res->getArray();
	}

	public function execute($sql, $byId = false) {
		$recordSet = $this->myPostTreatment($this->db->GetAll($sql), "executing sql");
		if ($byId === false) return $recordSet;
		$res = array();
		foreach($recordSet as $v) {
			$res[$v[$byId]] = $v;
		}
		return $res;
	}
 
	protected function myPostTreatment($result, $dbgMsg) {
		if (($result === false) && ($this->db->ErrorMsg())) {
			trace();
			throw new DBSystemError("Invalid SQL: " . ($dbgMsg ? "[" . $dbgMsg . "]" : "") . ":" . $this->db->ErrorMsg());
		}
		return $result;
	}

	// private function myTreatNumbers($data) {
	// 	if (is_string($data)) 
	// 		if (filter_var($data, FILTER_VALIDATE_FLOAT))
	// 			return filter_var($data, FILTER_VALIDATE_FLOAT);
	// 	if (is_array($data)) {
	// 		$d2 = array();
	// 		foreach($data as $k => $v) {
	// 			$d2[$k] = $this->myTreatNumber($v);
	// 		} 
	// 		return $d2;
	// 	}
	// 	return $data;
	// }
}
