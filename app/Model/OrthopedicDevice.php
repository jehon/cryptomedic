<?php
App::uses('AppModel', 'Model');

class OrthopedicDevice extends AppModel {
   	public static $part = array();

	function __construct() {
		global $amd_listing;
		OrthopedicDevice::$part['Device'] = $amd_listing['Device'];
		OrthopedicDevice::$part['Goal'] = $amd_listing['OrthopedicGoal'];
		OrthopedicDevice::$part['Orthopedicdevice'] = $amd_listing['CHO/29'];
		OrthopedicDevice::$part['Result'] = $amd_listing['CHO/26'];
		OrthopedicDevice::$part['TypeOfMaterial'] = $amd_listing['Material'];
		OrthopedicDevice::$part['UsingProposal'] = $amd_listing['OrthopedicUsage'];
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
