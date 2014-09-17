<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 */

App::uses('Model', 'Model');

require_once(__DIR__ . "/../Lib/amd_listings.php");

class AppModel extends Model {
	/**
	 * In all classes, I added a ::part field, having the definitions of the various listings.
	 * This is used in AppController to enrich the *structure* of the object with actual listings.
	 * 
	 * I am pretty sure this could be done by a more normal way, but I don't know how.
	 */
	function enhance($data, $model) {
		/* 
		 * Parse int into integers - this should be removed in cake 3.x
		 * 
		 * From: https://gist.github.com/geon/1189139
		 */
		$columnTypes = $this->getColumnTypes();
		foreach($data as $columnName => $value) {
			if (($columnTypes[$columnName] === 'integer')
					&& ($value !== null) 
					&& (!in_array($columnName, array('patient_id')))) {
				if (intval($value) == $value) {
					$data[$columnName] = intval($value);
				}
			}
		}
		
		/**
		 * Add structural informations, to keep trakc of who is what when managing that in ajax
		 */
		$data['type'] = $model;
		$data['controller'] = Inflector::underscore(Inflector::pluralize($model));
		if (array_key_exists('patient_id', $data) && array_key_exists('id', $data)) {
    		$data['relatedid'] = $model . "-" . $data['id'];
		}
    	// Protect the sheets if too old, but not the patients one (skip above)
		if (array_key_exists('modified', $data)
            && array_key_exists('modified', $data)
            && ($data['modified'] != null)
            && ($data['modified'] > "")) {
            $date = new DateTime();
            $date->sub(new DateInterval('P30D'));
            $date = $date->format('Y-m-d');
            $data['locked'] = ($data['modified'] < $date);
            $data['dlocked'] = $date;
		}
		// Special case for patients:
		if ("Patient" == $this->name) {
			$data['locked'] = false;
			$data['relatedid'] = -1;
            $data['dlocked'] = "patient";
		}
		return $data;
	}
	
	function afterFind($data, $primary = false) {
		/**
		 * Enhance everything...
		 */
		if ($primary) {
			foreach($data as $k => $v) {
				$model = $this->name;
				if (array_key_exists($model, $data[$k])) {
					$data[$k][$model] = $this->enhance($data[$k][$model], $model);
				}
			}
			return parent::afterFind($data, $primary);
		}
		foreach($data as $k => $v) {
			foreach($v as $model => $d) {
				$data[$k][$model] = $this->enhance($d, $model);
			}
		}
		return parent::afterFind($data, $primary);
	}
}
