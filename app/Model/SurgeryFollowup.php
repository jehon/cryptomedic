<?php
App::uses('AppModel', 'Model');

class SurgeryFollowup extends AppModel {
   	public static $part = array();

	function __construct() {
		global $amd_listing;
		SurgeryFollowup::$part['BoneConsolidation'] = $amd_listing['YesMediumNo'];
		SurgeryFollowup::$part['ResultImprovement'] = $amd_listing['CHO/31'];
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
