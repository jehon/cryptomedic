<?php
App::uses('AppModel', 'Model');

class Label extends AppModel {

	function afterFind($data, $primary = false) {
		/**
		 * Set the 'text' to map the language.
    	 */
		foreach($data as $k => $v) {
			if (!array_key_exists("text", $data[$k]['Label'])) {
				$data[$k]['Label']['text'] = $v['Label']['english'];
				unset($data[$k]['Label']['english']);
				unset($data[$k]['Label']['french']);
			}
		}
		return $data;
	}
}
