<?php 
	global $model2controller;
	$model2controller = array(
			"Bill" => "bills",
			"ClubFoot" => "club_foots",
			"NonricketConsult" => "nonricket_consults",
			"OrthopedicDevice" => "orthopedic_devices",
			"Patient" => "patients",
			"Picture" => "pictures",
			"RicketConsult" => "ricket_consults",
			"Surgery" => "surgeries",
			"SurgeryFollowup" => "surgery_followups",
	);

	// TODO: dereference getLabel ?
	function cryptomedicValue2Label($model, $key, $value) {
		global $model2controller;
		if (! array_key_exists($model, $model2controller)) {
			return $value;
		}
		
		if (!ClassRegistry::isKeySet($model)) {
			ClassRegistry::init($model);
		}
		
		$omodel =& ClassRegistry::getObject($model);
		if (get_class($omodel) != $model) {
			die("Class not found: $model - received " . get_class($omodel));
		}
		if (!isset($omodel::$part)) {
			die("No part associated with model $model");
		}

		if (!array_key_exists($key, $omodel::$part)) 
			return $value;
		$infos = $omodel::$part[$key];
		if (!array_key_exists('labels', $infos)) return $value;
		if (!$infos['labels']) return $valule;
		return cryptomedicGetLabel($value);
	}

	// Seems to be a private function...
	// TODO: specialize this on into "translations"
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
		if (!ClassRegistry::isKeySet($model)) {
			ClassRegistry::init($model);
		}
		
		$omodel =& ClassRegistry::getObject($model);
		if (get_class($omodel) != $model) {
			die("Class not found: $model - received " . get_class($omodel));
		}
		if (!isset($omodel::$part)) {
			die("No part associated with model $model");
		}
		
		if (!array_key_exists($field, $omodel::$part)) {
			die("No list associated with field $field on model $model");
		}
		
		$choix = $omodel::$part[$field];
		
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
	