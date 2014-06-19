<?php
App::uses('AppController', 'Controller');

/**
 * Index controller is an intermediary controller, defined myself, to factorize all classes
 * that need to be "indexed", ie. where you should be able to retrieve all records in one
 * run (unsecurized if from localhost).
 *
 * This is necessary for the caching system.
 */
class IndexController extends AppController {
	function index() {
		$res = $this->{$this->modelClass}->find('all', array('recursive' => 0));
		
		$this->request->data = $res;
		$this->set("flattern", "id");
		$this->set("data", $res);
	}
}
