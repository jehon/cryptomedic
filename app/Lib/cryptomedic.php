<?php
require_once(__DIR__ . "/../Model/amd_listings.php");

// TODO: dereference getLabel ?
function cryptomedicValue2Label($model, $key, $value) {
	// Used in patients search and in reports
	global $model2controller;
		if (! array_key_exists($model, $model2controller)) {
		return $value;
	}
	
	if (!ClassRegistry::isKeySet($model)) {
		ClassRegistry::init($model);
	}
	
    $omodel = ClassRegistry::getObject($model);
    if (get_class($omodel) != $model) {
        die("Class not found: $model - received " . get_class($omodel));
	}
//     if (!isset($omodel::$part)) {
//         die("No part associated with model $model");
// 	}

	global $model_listing;
	if (!array_key_exists($model . "." . $key, $model_listing))
//     if (!array_key_exists($key, $omodel::$part))
		return $value;
	
	$infos = $model_listing[$model . "." . $key];
//     $infos = $omodel::$part[$key];
    if (!array_key_exists('labels', $infos)) return $value;
    if (!$infos['labels']) return $valule;
    return cryptomedicGetLabel($value);
}

// Seems to be a private function...
function cryptomedicGetLabel($id) {
		if ($id == "") return "?";
		if (count(explode('.', $id)) > 2) {
		// remove the indice: model.i.field => model.field
			$id = preg_replace("/\.[^.]+\./", ".", $id);
	}
	
    $labels = ClassRegistry::init('Label', true);
    if (is_numeric($id)) {
        $label = $labels->find('first', array('conditions' => array('Label.id' => $id)));
	} else {
        $label = $labels->find('first', array('conditions' => array('Label.reference' => $id)));
	}
	
    //if (is_array($label) && array_keys($label, $id)) {
    if (is_array($label)) {
        return $label['Label']['text'];
	}
	return $id;
}

function cryptomedicGetList($model, $field, $allowNull = false) {
	// Used in "day.ctp"
	
// 	if (!ClassRegistry::isKeySet($model)) {
// 		ClassRegistry::init($model);
// 	}
// 	$omodel = ClassRegistry::getObject($model);
// 	if (get_class($omodel) != $model) {
// 		die("Class not found: $model - received " . get_class($omodel));
// 	}
// 		if (!isset($omodel::$part)) {
// 			die("No part associated with model $model");
// 	}
	
	global $model_listing;
	if (!array_key_exists($model . "." . $field, $model_listing)) {
// 	if (!array_key_exists($field, $omodel::$part)) {
		die("No list associated with field $field on model $model");
	}
	
	$choix= $model_listing[$model . "." . $field];
//     $choix = $omodel::$part[$field];

    if (array_key_exists("labels", $choix) && $choix["labels"]) {
        unset($choix["labels"]);
        foreach($choix as $i => $v) {
            $nchoix[$v] = cryptomedicGetLabel($v);
		}
		$choix = $nchoix;
	} else {
		// TODO: not sure it works...
        unset($choix["labels"]);
        $choix = array_combine($choix, $choix);
	}
	
	if ($allowNull) {
        $choix = array('' => $allowNull) + $choix;
	}
	return $choix;
}	
	