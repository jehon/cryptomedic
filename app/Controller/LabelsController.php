<?php
App::uses('AppController', 'Controller');

require_once("IndexController.php");

class LabelsController extends IndexController {
	// INDEX CONTROLLER
	function references() {
		$this->index();
		$this->set("flattern", "reference");
	}

}
