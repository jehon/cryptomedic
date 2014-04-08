<?php
App::uses('AppModel', 'Model');

class Surgery extends AppModel {
   	public static $part = array();

	function __construct() {
		global $amd_listing;
		Surgery::$part['ChestAuscultation'] = $amd_listing['ChestAuscultation'];
		Surgery::$part['GeneralCondition'] = $amd_listing['GoodBad'];
		Surgery::$part['HeartAuscultation'] = $amd_listing['HeartBeat'];
		Surgery::$part['Location'] = $amd_listing['CHO/11'];
		Surgery::$part['MedicalProblem'] = $amd_listing['MedicalProblem'];
		Surgery::$part['MouthAndTeeth'] = $amd_listing['Teeth'];
		Surgery::$part['Operation'] = $amd_listing['Operation'];
		Surgery::$part['Side'] = $amd_listing['Side'];
		Surgery::$part['Skin'] = $amd_listing['Skin'];
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
}
