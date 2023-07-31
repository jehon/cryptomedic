<?php

namespace App\Model;

class Bill extends CryptomedicModel {
	const CAT_CONSULT = "consult";
	const CAT_MEDECINE = "medecine";
	const CAT_OTHER = "other";
	const CAT_WORKSHOP = "workshop";
	const CAT_SURGICAL = "surgical";

	public static $categories = [self::CAT_CONSULT, self::CAT_MEDECINE, self::CAT_OTHER, self::CAT_WORKSHOP, self::CAT_SURGICAL];
	public static $translations = [];

	public function getDependantsRecords() {
		$list = [];

		foreach (["Payment" => "payments"] as $m => $t) {
			$obj = "\\App\\Model\\" . $m;

			// $r = DB::select("SELECT * FROM $t WHERE patient_id = :patient_id", array('patient_id' => $id));
			$r = $obj::where("bill_id", $this->id)->get();
			foreach ($r as $ri => $rv) {
				$list = array_merge($list, $rv->getDependantsRecords());
			}
		}

		return array_merge([$this->getLineRecord()], $list);
	}

	public static function create(array $attributes = array()) {
		$first_payment = 0;
		if (array_key_exists('first_payment', $attributes)) {
			$first_payment = $attributes['first_payment'];
		}
		$obj = parent::create($attributes);
		if ($first_payment) {
			$p = new Payment([
				'bill_id'      => $obj->id,
				'date'         => $obj->date,
				'examiner'     => $obj->examiner,
				'Amount'       => $first_payment,
			]);
			$p->save();

			// To enrich the online informations...
			session()->push("online", $p);
		}
		return $obj;
	}

	/**
	 * A function testing field appartenance
	 *
	 * @param unknown $field
	 * @param unknown $filter
	 * @return boolean
	 */
	protected static function isBillType($field, $filter) {
		if (strtoupper(substr($field, 0, strlen($filter))) == strtoupper($filter)) {
			return true;
		}
		return false;
	}

	public static function getFieldsList($filter) {
		$res = array();
		$fieldList = static::getTableColumnsList();
		foreach ($fieldList as $v) {
			if (static::isBillType($v, $filter)) {
				$res[] = $v;
			}
		}
		sort($res, SORT_NATURAL); //  | SORT_FLAG_CASE
		foreach ($res as $k => $v) {
			if (preg_match("/_other_/i", $v)) {
				// var_dump($v);
				unset($res[$k]);
				$res[] = $v;
			}
		}
		return $res;
	}

	public static function getActivityFilter($filter, $fieldList = null) {
		if (!$filter) {
			return "(1 = 1)";
		}
		$list = self::getFieldsList($filter, $fieldList);
		return "((bills.`"
			. implode("` > 0) OR (bills.`", $list)
			. "` > 0 ))";
	}

	public static function getSQLFieldsSum($filter) {
		$list = "( 0 ";
		foreach (static::getTableColumnsList() as $v) {
			if (static::isBillType($v, $filter)) {
				$list .= " + (prices.`$v` * bills.`$v`)";
			}
		}
		$list .= ")";
		return $list;
	}

	public static function getSQLAct() {
		return "TRIM(CONCAT(" .
			"IF(bills.consult_CDC_consultation_physio, 'CsP ', '')" .
			", " .
			"IF(bills.consult_CDC_consultation_Doctor, 'CD ', '')" .
			", " .
			"IF(bills.consult_field_visit, 'FV ', '')" .
			", " .
			"IF(bills.consult_home_visit, 'HV ', '')" .
			"))";
	}

	public static function getSQLTreatment() {
		return "TRIM(CONCAT(" .
			"IF(" . static::getSQLFieldsSum(static::CAT_MEDECINE) . ", 'Med ', '')" .
			", " .
			"IF(" . static::getSQLFieldsSum(static::CAT_WORKSHOP) . ", 'WS ', '')" .
			", " .
			"IF(" . static::getSQLFieldsSum(static::CAT_SURGICAL) . ", 'Surg ', '')" .
			", " .
			"IF(bills.other_making_plaster + bills.other_make_long_plaster + bills.other_make_short_plaster, 'Plast ', '')" .
			", " .
			"IF(bills.other_making_dressing, 'Dress ', '')" .
			", " .
			"IF(bills.other_X_Ray, 'XR ', '')" .
			", " .
			"IF(bills.other_physiotherapy, 'Physio ', '')" .
			", " .
			"IF(bills.other_Other_consultation_care, 'Other ', '')" .
			"))";
	}

	public function validate() {
		if (!$this->patient_id) {
			abort(400, "No patient_id on the file");
		}
		return true;
	}
}
