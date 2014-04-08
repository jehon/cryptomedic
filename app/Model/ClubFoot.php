<?php
App::uses('AppModel', 'Model');

class ClubFoot extends AppModel {
   	public static $part = array();

	function __construct() {
		global $amd_listing;
		ClubFoot::$part['CavusFoot'] = $amd_listing['Pain'];
		ClubFoot::$part['Side'] = $amd_listing['Side'];
		ClubFoot::$part['Run'] = array(0, 1, 2);
		ClubFoot::$part['Pain'] = array(0, 1, 2);
		ClubFoot::$part['Sport'] = array(1, 2, 3);
		ClubFoot::$part['WalkingFloorContact'] = array(1, 2, 3);
		ClubFoot::$part['WalkingFirstContact'] = array(1, 2, 3);
		ClubFoot::$part['EquinusReduc'] = array(1, 2, 3, 4);
		ClubFoot::$part['VarusReduc'] = array(1, 2, 3, 4);
		ClubFoot::$part['CPBRotation'] = array(1, 2, 3, 4);
		ClubFoot::$part['AdductionReduc'] = array(1, 2, 3, 4);
		ClubFoot::$part['DIMEGLIO'] = array(1, 2, 3, 4);
		ClubFoot::$part['Center'] = $amd_listing['Centers'];
		
		ClubFoot::$part['EquinusReduc'] = array(1, 2, 3, 4);
		ClubFoot::$part['VarusReduc'] = array(1, 2, 3, 4);
		ClubFoot::$part['CPBRotation'] = array(1, 2, 3, 4);
		ClubFoot::$part['AdductionReduc'] = array(1, 2, 3, 4);
		
// 		ClubFoot::$part['MedialCrease'] = $amd_listing['Pain'];
// 		ClubFoot::$part['PosteriorCrease'] = $amd_listing['Pain'];
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
