<?php
App::uses('AppModel', 'Model');

class NonricketConsult extends AppModel {
   	public static $part = array();

	function __construct() {
		global $amd_listing;
		NonricketConsult::$part['Orthopedicdevice65'] = $amd_listing['Device'];
		NonricketConsult::$part['Pain'] = $amd_listing['Pain'];
		NonricketConsult::$part['Pathology'] = $amd_listing['Pathology'];
		NonricketConsult::$part['Plaster62'] = $amd_listing['Plaster'];
		NonricketConsult::$part['Side'] = $amd_listing['Side'];
		NonricketConsult::$part['Surgery66'] = $amd_listing['Surgery'];
		NonricketConsult::$part['Walk'] = $amd_listing['WalkingCapacities'];
		NonricketConsult::$part['Center'] = $amd_listing['Centers'];
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
