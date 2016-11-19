<?php
/**
 * Bill model.
 *
 * With a summary...
 *
 * @package test
 * @author jehon
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 *
 * This is a summary? I think so...
 *
 * @author jehon
 *
 */
class Bill extends CryptomedicModel {
	const CAT_CONSULT = "consult";
	const CAT_MEDECINE = "medecine";
	const CAT_OTHER = "other";
	const CAT_WORKSHOP = "workshop";
	const CAT_SURGICAL = "surgical";

	public static $categories = [ self::CAT_CONSULT, self::CAT_MEDECINE, self::CAT_OTHER, self::CAT_WORKSHOP, self::CAT_SURGICAL ];
	public static $translations = [ ];

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

	public static function getFieldsList($filter, $fieldList = null) {
		$res = array();
		if ($fieldList == null) {
			$fieldList = static::getTableColumnsList();
		}
		foreach($fieldList as $v) {
			if (static::isBillType($v, $filter)) {
				$res[] = $v;
			}
		}
		sort($res, SORT_NATURAL); //  | SORT_FLAG_CASE
		foreach($res as $k => $v) {
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
		return "((bills."
			. implode($list, " > 0) OR (bills.")
			. " > 0 ))";
	}

	public static function getSQLFieldsSum($filter) {
		$list = "( 0 ";
		foreach(static::getTableColumnsList() as $v) {
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
