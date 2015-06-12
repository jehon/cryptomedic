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

// require_once("OptimisticLockedModel.php");
use Illuminate\Database\Eloquent\Model;

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 * 
 * This is a summary? I think so...
 * 
 * @author jehon
 *
 */
class Bill extends OptimisticLockedModel {
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
	protected static function is($field, $filter) {
		if (strtoupper(substr($field, 0, strlen($filter))) == strtoupper($filter)) {
			return true;
		}
		return false;
	}
	
	public static function getFieldsList($filter, $fieldList = null) {
		$res = array();
		if ($fieldList == null) {
			$fieldList = self::getTableColumnsList();
		}
		foreach($fieldList as $v) {
			if (self::is($v, $filter)) {
				$res[] = $v;								
			}
		}
		sort($res, SORT_NATURAL | SORT_FLAG_CASE);
		return $res;
	}
	
	public static function getSQLFieldsSum($filter) {
		$list = "( 0 ";
		foreach(self::getTableColumnsList() as $v) {
			if (self::is($v, $filter)) {
				$list .= " + (prices.`$v` * bills.`$v`)";
			}
		}
		$list .= ")";
		return $list;
	}
	
	public static function getSQLDiagno() {
		return "TRIM(CONCAT(" .
				"IF(patients.pathology_Ricket, 'R ', '')" .
				", " .
				"IF(patients.pathology_ClubFoot, 'CF ', '')" .
				", " .
				"IF(patients.pathology_CP, 'CP ', '')" .
				", " .
				"IF(patients.pathology_Polio, 'P ', '')" .
				", " .
				"IF(patients.pathology_Burn, 'B ', '')" .
				", " .
				"IF(patients.pathology_Congenital, 'C ', '')" .
				", " .
				"IF(patients.pathology_Adult, 'A ', '')" .
				", " .
				"IF(patients.pathology_Other, 'Oth', '')" .
				"))";
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
				"IF(" . self::getSQLFieldsSum(self::CAT_MEDECINE) . ", 'Med ', '')" .
				", " .
				"IF(" . self::getSQLFieldsSum(self::CAT_WORKSHOP) . ", 'WS ', '')" .
				", " .
				"IF(" . self::getSQLFieldsSum(self::CAT_SURGICAL) . ", 'Surg ', '')" .
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
}
