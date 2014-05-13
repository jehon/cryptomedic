<?php
App::uses('AppController', 'Controller');

/**
 * Classical user controller, with login/logout and right management
 */
class UsersController extends AppController {
	var $helpers = array('Html', 'Form', 'Session');
		
	function login() {
//		// ----------------------------- current browser capacities logs ------------------------
//		if (array_key_exists('data', $this->request)) {
//			if (array_key_exists('browser', $this->request->data)) {
//				CakeLog::write(LOG_ERROR, 'browsers capacities,' . $this->request->data ['User'] ['username'] . "," . $this->request->data ['browser']);
//			}
//		}
		
		if ($this->Auth->login()) {
			return $this->redirect($this->Auth->redirect());
        }
        $this->response->statusCode(401);
        
//		echo "<a href='http://localhost/amd/patients/unlock/10'>no extension</a><br>";
//		echo "<a href='http://localhost/amd/patients/unlock/10.json'>json</a><br>";
		
		$origin = Router::parse($this->Auth->redirect());
		if (array_key_exists('ext', $origin) && ($origin['ext'] > '')) {
			$this->render("unauthorized", "empty");
		}
	}
	
	function logout() {
		$this->Session->setFlash('Goodbye');
		$this->redirect($this->Auth->logout());
	}
	
	function settings() {
		// Should be "settings" and also pass max_upload_size, loginname, group, ...
		$mylogin = $this->Auth->user();
		$data = array(
			"login" => $mylogin['username'],
			"group" => $mylogin['group'], 
			"maxUploadSizeMb" => min((int) ini_get('upload_max_filesize'),
				(int)(ini_get('post_max_size') * 0.90),
				(int)(ini_get('memory_limit') * 0.5)
			),
			"denied" => array()
		);
		if (! $this->isAuthorized($mylogin, "all", "edit"))		$data['denied'][] = "all_edit";
		if (! $this->isAuthorized($mylogin, "all", "delete"))	$data['denied'][] = "all_delete";
		if (! $this->isAuthorized($mylogin, "all", "unlock"))	$data['denied'][] = "all_unlock";
		$this->set("data", $data);
	}
	
	function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('login', 'logout');
	}
}
