<?php

class Bill {
	public static $dbTable;

	public function __construct($data) {
		$this->data = $data;
	}

	public static function getSQLFieldSumConsult() {
		return self::getSQLFieldsSum("consult_");
	}

	public static function getSQLFieldSumWorkshop() {
		return self::getSQLFieldsSum("workshop_");
	}

	public static function getSQLFieldSumSurgical() {
		return self::getSQLFieldsSum("surgical_");
	}

	public static function getSQLFieldSumOther() {
		return self::getSQLFieldsSum("other_");
	}

	public static function getSQLFieldsSum($filter) {
		$list = "( 0 ";
		foreach(self::$dbTable->getColumns() as $v) {
			if (strtoupper(substr($v, 0, strlen($filter))) == strtoupper($filter)) {
				$list .= " + (prices.`$v` * bills.`$v`)";
			}
		}
		$list .= ")";
		return $list;
	}
}

Bill::$dbTable = $server->getDatabase()->getTable("bills");
