<?php

class Bill {
	const CAT_CONSULT = "consult";
	const CAT_MEDECINE = "medecine";
	const CAT_WORKSHOP = "workshop";
	const CAT_SURGICAL = "surgical";
	const CAT_OTHER = "other";
	
	public static $dbTable;
	public static $categories = [ self::CAT_CONSULT, self::CAT_MEDECINE, self::CAT_WORKSHOP, self::CAT_SURGICAL, self::CAT_OTHER ];
	public static $translations = [ ];	
	
	public function __construct($data) {
		$this->data = $data;
	}

	protected static function is($field, $filter) {
		if (strtoupper(substr($field, 0, strlen($filter))) == strtoupper($filter)) {
			return true;
		}
		return false;
	}
	
	public static function getFielsList($filter) {
		$res = array();
		foreach(self::$dbTable->getColumns() as $v) {
			if (self::is($v, $filter)) {
				$res[] = $v;								
			}
		}
		sort($res, SORT_NATURAL | SORT_FLAG_CASE);
		return $res;
	}
	
	public static function getSQLFieldsSum($filter) {
		$list = "( 0 ";
		foreach(self::$dbTable->getColumns() as $v) {
			if (self::is($v, $filter)) {
				$list .= " + (prices.`$v` * bills.`$v`)";
			}
		}
		$list .= ")";
		return $list;
	}
}

global $server;
Bill::$dbTable = $server->getDatabase()->getTable("bills");
