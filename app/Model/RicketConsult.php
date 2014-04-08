<?php
App::uses('AppModel', 'Model');

class RicketConsult extends AppModel {
	public static $part = array();

	function __construct() {
		global $amd_listing;
		RicketConsult::$part['Bossingforehead'] = $amd_listing['Eval03'];
		RicketConsult::$part['Brace'] = $amd_listing['Device'];
		RicketConsult::$part['LaxityLeft'] = $amd_listing['Eval03'];
		RicketConsult::$part['LaxityRight'] = $amd_listing['Eval03'];
		RicketConsult::$part['Leftleg'] = $amd_listing['LegAnalysis'];
		RicketConsult::$part['Littlefishbowl'] = $amd_listing['Frequency'];
		RicketConsult::$part['Milkglass'] = $amd_listing['Frequency'];
		RicketConsult::$part['Nutritionaladvice'] = $amd_listing['NutritionalAdvice'];
		RicketConsult::$part['Onebowlvegetables'] = $amd_listing['Frequency'];
		RicketConsult::$part['Pain'] = $amd_listing['Pain'];
		RicketConsult::$part['Ribbeading'] = $amd_listing['Eval03'];
		RicketConsult::$part['Ricewithchun'] = $amd_listing['Frequency'];
		RicketConsult::$part['Rightleg'] = $amd_listing['LegAnalysis'];
		RicketConsult::$part['SocialLevel'] = $amd_listing['SocialLevel'];
		RicketConsult::$part['Surgery'] = $amd_listing['Surgery'];
		RicketConsult::$part['Twospoonsesamseedgrounded'] = $amd_listing['Frequency'];
		RicketConsult::$part['WalkingDifficulties'] = $amd_listing['WalkingCapacities'];
		RicketConsult::$part['Wristenlargement'] = $amd_listing['Eval03'];
		RicketConsult::$part['Center'] = $amd_listing['Centers'];
// 		RicketConsult::$part['Advice'] = $amd_listing['CHO/22'];
// 		RicketConsult::$part['Biologicaltest'] = $amd_listing['XRay'];
// 		RicketConsult::$part['Nutritionallevel'] = $amd_listing['CHO/8'];
// 		RicketConsult::$part['Plaster62'] = $amd_listing['Plaster'];
// 		RicketConsult::$part['Results'] = $amd_listing['CHO/31'];
//		RicketConsult::$part['XRay46'] = $amd_listing['XRay'];
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
