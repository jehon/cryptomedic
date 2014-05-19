<?php
App::uses('AppModel', 'Model');

class Patient extends AppModel {
//     public static $part = array();

// 	function __construct() {
// 		global $amd_listing;
// 		Patient::$part['District'] = $amd_listing['Districts'];
// 		Patient::$part['Doesthechildrengotoschool'] = $amd_listing['SchoolAttendee'];
// 		Patient::$part['Family'] = $amd_listing['ParentalStatus'];
// 		Patient::$part['Fatherseducation'] = $amd_listing['Schools'];
// 		Patient::$part['Home'] = $amd_listing['Owning'];
// 		Patient::$part['Motherseducation'] = $amd_listing['Schools'];
// 		Patient::$part['Religion'] = $amd_listing['Religions'];
// 		Patient::$part['Roof'] = $amd_listing['CHO/4'];
// 		Patient::$part['Sex'] = $amd_listing['Gender'];
// 		Patient::$part['Sociallevel'] = $amd_listing['SocialLevel'];
// 		Patient::$part['Union_'] = $amd_listing['Unions'];
// 		Patient::$part['Upazilla'] = $amd_listing['Upazilla'];
// 		Patient::$part['Wall'] = $amd_listing['CHO/4'];
		
// 		parent::__construct();
// 	}

	function beforeSave($options = array()) {
        if (!isset($this->data)) {
            return false;
        }

        if (!array_key_exists('Patient', $this->data)) {
            return false;
        }

		/**
		 * Change all "j" by "z" in names (bangali has more than two consons mapping to j or z, and the mapping is not clean)
		 */
        if (isset($this->data['Patient']['Lastname']))
            $this->data['Patient']['Lastname'] = str_replace('j', 'z', $this->data['Patient']['Lastname']);
        if (isset($this->data['Patient']['Firstname']))
            $this->data['Patient']['Firstname'] = str_replace('j', 'z', $this->data['Patient']['Firstname']);
        if (isset($this->data['Patient']['Fathersname']))
            $this->data['Patient']['Fathersname'] = str_replace('j', 'z', $this->data['Patient']['Fathersname']);

        return parent::beforeSave($options);
	}
	
	public $hasMany = array(
		'Bill' => array(
			'className' => 'Bill',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'ClubFoot' => array(
			'className' => 'ClubFoot',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'NonricketConsult' => array(
			'className' => 'NonricketConsult',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'OrthopedicDevice' => array(
			'className' => 'OrthopedicDevice',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'Picture' => array(
			'className' => 'Picture',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'RicketConsult' => array(
			'className' => 'RicketConsult',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'Surgery' => array(
			'className' => 'Surgery',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'SurgeryFollowup' => array(
			'className' => 'SurgeryFollowup',
			'foreignKey' => 'patient_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);
}
