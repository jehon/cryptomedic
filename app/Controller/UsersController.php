<?php
App::uses('AppController', 'Controller');

/**
 * Classical user controller, with login/logout and right management
 */
class UsersController extends AppController {
	var $helpers = array (
			'Html',
			'Form',
			'Session' 
	);

	function login() {
		if (! $this->request->data) {
			return;
		}
		// echo "<a href='http://localhost/amd/patients/unlock/10'>no extension</a><br>";
		// echo "<a href='http://localhost/amd/patients/unlock/10.json'>json</a><br>";
		
		// ----------------------------- current browser capacities logs ------------------------
		// if (array_key_exists('data', $this->request)) {
		// if (array_key_exists('browser', $this->request->data)) {
		// CakeLog::write(LOG_ERROR, 'browsers capacities,' . $this->request->data ['User'] ['username'] . "," . $this->request->data ['browser']);
		// }
		// }
		
		if ($this->Auth->redirect() == "/") {
			$ajax = array_key_exists('ext', $this->request->params) && ($this->request->params ['ext'] > '');
		} else {
			$origin = Router::parse($this->Auth->redirect());
			$ajax = (array_key_exists('ext', $origin) && ($origin ['ext'] > ''));
		}
		
		if ($ajax && is_array($this->request->data) && array_key_exists('username', $this->request->data) && array_key_exists('password', $this->request->data)) {
			// In ajax mode, we imitate the official way: data[User][username] ...
			$data = array (
					"User" => array (
							"username" => $this->request->data ['username'],
							"password" => $this->request->data ['password'] 
					) 
			);
			$this->request->data = $data;
			$user = $this->Auth->identify($this->request, $this->response);
			$ok = $this->Auth->login($user);
		} else {
			$ok = $this->Auth->login();
		}
		
		if ($ok) {
			if ($this->request->is('ajax')) return;
			return $this->redirect($this->Auth->redirect());
		}
		$this->response->statusCode(401);
		if ($this->request->is('ajax')) {
			$this->set("data", "Invalid username and/or password");
			return ;
		}
		$this->Session->setFlash("Invalid username and/or password");
	}

	function logout() {
		$this->Session->setFlash('Goodbye');
		$this->redirect($this->Auth->logout());
	}

	function settings() {
		// Should be "settings" and also pass max_upload_size, loginname, group, ...
		$mylogin = $this->Auth->user();
		$data = array (
				"username" => $mylogin ['username'],
				"group" => $mylogin ['group'],
				"maxUploadSizeMb" => min(( int ) ini_get('upload_max_filesize'), ( int ) (ini_get('post_max_size') * 0.90), ( int ) (ini_get('memory_limit') * 0.5)),
				"denied" => array () 
		);
		if (! $this->isAuthorized($mylogin, "all", "edit"))
			$data ['denied'] [] = "all_edit";
		if (! $this->isAuthorized($mylogin, "all", "delete"))
			$data ['denied'] [] = "all_delete";
		if (! $this->isAuthorized($mylogin, "all", "unlock"))
			$data ['denied'] [] = "all_unlock";
		if (! $this->isAuthorized($mylogin, "all", "debug"))
			$data ['denied'] [] = "all_debug";
		$this->set("data", $data);
	}

	function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('login', 'logout');
	}
}
