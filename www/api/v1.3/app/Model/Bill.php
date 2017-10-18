<?php

namespace App\Model;

class Bill extends CryptomedicModel {
	const CAT_CONSULT = "consult";
	const CAT_MEDECINE = "medecine";
	const CAT_OTHER = "other";
	const CAT_WORKSHOP = "workshop";
	const CAT_SURGICAL = "surgical";

	public static $categories = [ self::CAT_CONSULT, self::CAT_MEDECINE, self::CAT_OTHER, self::CAT_WORKSHOP, self::CAT_SURGICAL ];
	public static $translations = [ ];

    public function billLines() {
        return $this->hasMany('App\Model\BillLine');
    }

	public function getDependantsList() {
		$list = [];

		foreach([ "Payment" => "payments" ] as $m => $t) {
			$obj = "\\App\\Model\\" . $m;

			// $r = DB::select("SELECT * FROM $t WHERE patient_id = :patient_id", array('patient_id' => $id));
			$r = $obj::where("bill_id", $this->id)->get();
			foreach($r as $ri => $rv) {
				$list = array_merge($list, $rv->getDependantsList());
			}
		}

		return array_merge([ $this->getLineRecord() ], $list);
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
				'Date'         => $obj->Date,
				'ExaminerName' => $obj->ExaminerName,
				'Amount'       => $first_payment,
			]);
			$p->save();

			// To enrich the online informations...
		    // session()->push("online", $p);
		}

		if (array_key_exists('bill_lines', $attributes)) {
			$obj->syncSubItems(BillLine::class, $obj->billLines(), $attributes['bill_lines']);
		}

		return $obj;
	}

	public static function updateWithArray($id, $attributes) {
		$obj = parent::updateWithArray($id, $attributes);

		if (array_key_exists('bill_lines', $attributes)) {
			$obj->syncSubItems(BillLine::class, $obj->billLines(), $attributes['bill_lines']);
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
				unset($res[$k]);
				$res[] = $v;
			}
		}
		return $res;
	}

	public static function getActivityFilter($filter) {
		if (!$filter) {
			return "(1 = 1)";
		}
		return "(EXISTS(SELECT * FROM bill_lines 
			JOIN price_lines ON price_lines.title = bill_lines.title
			WHERE bill_lines.bill_id = bills.id
				AND price_lines.price_id = prices.id
				AND bill_lines.bill_id = bills.id 
				AND `type` = '$filter')) ";
	}

	public static function getSQLFieldsSum($filter) {
		return " IFNULL(
			(SELECT SUM(price_lines.Amount * bill_lines.Amount) FROM price_lines JOIN bill_lines ON price_lines.title = bill_lines.title
				JOIN prices ON (prices.id = price_lines.price_id)
				WHERE bill_lines.bill_id = bills.id and prices.id = bills.price_id AND price_lines.`type` = '$filter'
				GROUP BY price_lines.`type`
			), 0)";

			// (SELECT SUM(Amount) * (SELECT price_lines.Amount FROM price_lines WHERE price_lines.price_id = bills.price_id AND price_lines.`title` = bill_lines.`title`) AS a FROM bill_lines WHERE `type` = '$filter' GROUP BY `type`, `title`) as am
			// ), 0)";
		// return " IFNULL((SELECT SUM(a) FROM
		// 	(SELECT SUM(Amount) * (SELECT price_lines.Amount FROM price_lines WHERE price_lines.price_id = bills.price_id AND price_lines.`title` = bill_lines.`title`) AS a FROM bill_lines WHERE `type` = '$filter' GROUP BY `type`, `title`) as am
		// 	), 0)";
	}

	public static function ifThen($title, $accronym, $field = 'price_lines.title', $else = "''") {
		return "IF(STRCMP($field, '$title') = 0, '$accronym', $else)\n";
	}

	public static function getSQLAct() {
		// TODO: migrate this on Prices ?
		return "TRIM(CONCAT("
				. static::ifThen('consult_CDC_consultation_physio', 'CsP') . ", "
				. static::ifThen('consult_CDC_consultation_Doctor', 'CD') . ", "
				. static::ifThen('consult_field_visit',             'FV') . ", "
				. static::ifThen('consult_home_visit',              'HV') 
				. "))";
	}

	public static function getSQLTreatment() {
		// TODO: migrate this on Prices ?
		return "TRIM(CONCAT("
				. static::ifThen(static::CAT_MEDECINE,            'Med',    'price_lines.`type`') . ", "
				. static::ifThen(static::CAT_WORKSHOP,            'WS',     'price_lines.`type`') . ", "
				. static::ifThen(static::CAT_SURGICAL,            'Surg',   'price_lines.`type`') . ", "
				. static::ifThen('other_make_long_plaster',       'Plast',  'price_lines.title', 
					static::ifThen('other_make_short_plaster',    'Plast',  'price_lines.title',
					static::ifThen('other_making_plaster',        'Plast'))
					) . ", "
				. static::ifThen('other_making_dressing',         'Dress') . ", "
				. static::ifThen('other_X_Ray',                   'XR') . ", "
				. static::ifThen('other_physiotherapy',           'Physio') . ", "
				. static::ifThen('other_Other_consultation_care', 'Other')
				. "))";
	}

  public function validate() {
    if (!$this->patient_id) {
      abort(400, "No patient_id on the file");
    }
    return true;
  }
}
