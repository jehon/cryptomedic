<?php
App::uses('AppModel', 'Model');

class Bill extends AppModel {
   	public static $part = array();
   	var $uses = array('Price');
   			
	function __construct() {
		global $amd_listing;
		Bill::$part['Center'] = $amd_listing['Centers'];
		Bill::$part['Sociallevel'] = $amd_listing['SocialLevel'];
		parent::__construct();
	}

	public $belongsTo = array(
		'Patient' => array(
			'className' => 'Patient',
			'foreignKey' => 'patient_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
	
	function beforeSave($options = array()) {
		/**
		 * Calculate the actual price
		 */
        if (array_key_exists('Bill', $this->data)) {
        	$this->data['Bill'] = Bill::calculateTotal($this->data['Bill'], null);
        }
		return parent::beforeSave($options);
	}

	static function calculateTotal($data, $price) {
		if ($price == null) {
// 			pr("here we are: " . $data['Date']);
			$price_model = ClassRegistry::init('Price');
			$prices = $price_model->find('all', array('conditions' => array(
					"AND" => array(
							"OR" => array('datefrom' => null, 'datefrom <' => $data['Date']),
							"OR" => array('dateto' => null, 'dateto >=' => $data['Date'])
							)
					)));
			$price = $prices[0]["Price"];
// 			pr($price);
/*			
			$db = new DATABASE_CONFIG();
			$server = mysql_connect($db->default['host'], $db->default['login'], $db->default['password']);
			mysql_query("USE " . $db->default['database']);
			$res = mysql_query("SELECT * FROM prices "
						." WHERE ((datefrom is null) OR (datefrom <= '" . $data['Date'] . "'))"
						." AND ((dateto is null) OR (dateto > '" . $data['Date'] . "'))"
					);
			if ($res === false) {
				echo "Error: " . mysql_error();
				die("error");
			}
			$price = mysql_fetch_assoc($res);
*/
		}
		$total = 0;
		foreach($price as $i => $p) {
			if ($i == "id") continue;
			if ($i == "modified") continue;
			if ($i == "created") continue;
			if ($i == "lastuser") continue;
			if ($i == "datefrom") continue;
			if ($i == "dateto") continue;
			if ($i == "socialLevelPercentage_0") continue;
			if ($i == "socialLevelPercentage_1") continue;
			if ($i == "socialLevelPercentage_2") continue;
			if ($i == "socialLevelPercentage_3") continue;
			if ($i == "socialLevelPercentage_4") continue;
			if ($p < 0) continue;
			if (array_key_exists($i, $data))
				$total += $price[$i] * $data[$i];
		}
		$data['total_real'] = $total;
		$data['total_asked'] = $total;
		$sl = $data['Sociallevel'];
		if ($sl !== null) {
			if (array_key_exists("socialLevelPercentage_" . $sl, $price)) {
				if ($price["socialLevelPercentage_" . $sl] > 0) {
					$data['total_asked'] = $total * $price["socialLevelPercentage_" . $sl];
				}
			}
		}
		return $data;
	}

	function billFields($prefix = "") {
		$f = array();
		foreach(Bill::schema() as $field => $details) {
			if (substr($field, 0, strlen("socialLevelPercentage")) == "socialLevelPercentage")
				continue;
		
			if (substr($field, -2, 2) == "id")
				continue;
		
			if (in_array($field, array('modified', 'created', 'lastuser', 'datefrom', 'dateto', 'Date', 'Center', 'ExaminerName', 'Sociallevel', 'total_asked', 'total_real')))
				continue;
		
			if (substr($field, 0, strlen($prefix)) == $prefix)
				$f[] = $field;
		}
		return $f;
	}
}
