<?php
App::uses('AppController', 'Controller');

/**
 * Classical user controller, with login/logout and right management
 */
class UsersController extends AppController {
	var $helpers = array('Html', 'Form', 'Session');
		
	function login() {
		if ($this->Auth->login()) {
            return $this->redirect($this->Auth->redirect());
        }
	}
	
	function logout() {
		$this->Session->setFlash('Goodbye');
		$this->redirect($this->Auth->logout());
	}

	function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('login', 'logout');
	}
}
