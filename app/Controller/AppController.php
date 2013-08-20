<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
App::uses('Controller', 'Controller');

class AppController extends Controller {
	var $helpers = array('Html', 'Form', 'Kdm'); 
	public $components = array(
		'Session',
		'Auth' => array(
			'loginRedirect' => array('controller' => 'pages', 'action' => 'display', 'home'),
			'logoutRedirect' => "/"
		)
	);

	var $mytransactions = array(
			"all_edit",
			"all_delete"
		);

    function isAuthorized($transaction = "") {
    	// USED ???
    	$group = $this->Auth->user('group');
    	$page = $this->name;
		$action = $this->action;
		// if (count($this->request->params['pass']) > 0)
			// $param = $this->request->params['pass'][0];
		if (is_array($transaction)) return true;
		if (($transaction != "") && ($transaction != null)) {
	    	$p = explode("_", $transaction);
			$page = $p[0];
			$action = $p[1];
			if (count($p) > 2)
				$param = $p[2];
		}
        if ('admin' == $group) return true;
		switch($page) {
			case "Users":
			    return true;
				break;
			case "Pages":
		        return true;
				break;
		};
		
        switch($action) {
            case "delete":
                if ("manager" == $group) return true;
                return false;
                break;
            case "reference":
            case "add":
            case "edit":
                if ("readonly" == $group) return false;
                return true;
                break;
            case "calculate":
            case "view":
            case "index":
                return true;
                break;
        }
        pr("AUTH: uncatched action: " . $action);
        return true;
    }

	// USED ???
    function notAuthorized() {
        $this->Session->setFlash("You are not authorized to call " . $this->modelClass . "/" . $this->action  . " directly.");
        $this->redirect(array('controller' => 'page', 'action' => 'home'));
        return ;
    }

	function beforeFilter() {
    	// ----------------------------- current browser capacities logs ------------------------
	    if (array_key_exists('data', $this->request)) {
    	    if (array_key_exists('browser', $this->request->data)) {
        	    CakeLog::write(LOG_ERROR, 'browsers capacities,' . $this->request->data['User']['username'] . "," . $this->request->data['browser']);
        	}
        }
        
		// ----------------------------------- ACL --------------------------------
    	$this->Auth->authorize = 'Controller';
    	$this->Auth->loginAction = array('controller' => 'users', 'action' => 'login');
    	$this->Auth->logoutRedirect = array('controller' => 'users', 'action' => 'login');
    	$this->Auth->loginRedirect = "/";
		if ($_SERVER['HTTP_HOST'] == 'localhost') {
			$this->Auth->allow('structure');
		}
		
		// ----------------------------------- Prefs --------------------------------
        $mylogin = $this->Auth->user();
		$this->set("login", $mylogin['username']);
    	$this->set("group", $mylogin['group']);
		// Used ???
    	$this->Session->write("group", $mylogin['group']);
	    	
		// ----------------------------------- Other --------------------------------
		// if (isset($this->{$this->modelClass}))
			// $this->set("mymodel", $this->{$this->modelClass});
		
		// ----------------------------------- Rights --------------------------------
		$denied = array();
		foreach($this->mytransactions as $t) {
			if (!$this->isAuthorized($t)) {
				array_push($denied, $t);
			}
		}
		$this->set("denied", $denied);
	}

	function beforeRender() {
		$data = $this->request->data;
		if (array_key_exists('ajax', $this->viewVars)) {
			// Already set, nothing to do
			return ;
		} 
		if (!is_array($this->request->data)) {
			// No data, no model -> nothing to do
			$this->set("ajax", array());
			return ;
		}
		
		if ($this->action == 'index' 
				|| $this->action == 'day' 
				|| $this->modelClass == 'User'
				|| $this->modelClass == 'Label'
				) {
			$ajax = array();
			if (is_array($this->request->data)) {
				foreach($this->request->data as $i => $m) {
					if (is_array($m)) {
						foreach($m as $d) {
							if (is_array($d) && array_key_exists('id', $d)) {
								$ajax[$d['id']] = $d;
							}
						}
					}
				}	
			}
		} else {
			// We are in the standard view -> let's get the parent Patient
			if ($this->modelClass == 'Patient') {
				// Already loaded
				$ajax = $data;
			} else if (array_key_exists('Patient', $this->request->data)){
				// Dependent
				$pid = $this->request->data['Patient']['id'];
				$a2 = $this->loadModel('Patient', $pid);
				$ajax = $this->Patient->read(null, $pid);
			} else {
				$ajax = array();
			}

			// Let's reformat it in more usable format
		    $data = $ajax;
			$ajax = array();
			if (is_array($data)) {
				if (array_key_exists('Patient', $data)) {
			    	// Flat' it
			    	$ajax = $data['Patient'];
					unset($data['Patient']);
					$ajax['related'] = array();
					$i = 0;
					if (is_array($data)) {
						foreach($data as $km => $dm) {
							if (is_array($data[$km])) {
								foreach($data[$km] as $id => $di) {
									if (is_array($di)) {
										$ajax['related'][$data[$km][$id]['relatedid']] = $data[$km][$id];
									};
								}
							}
						}
					} 
				} 
			}
		}
		$this->set("ajax", $ajax);
	}

	function save($id = null) {
		$this->set('patient', -1);
		$this->set('mode', "#read");
		$this->set('type', "");
		$this->set('related', -1);
				
        if (empty($this->request->data) > 0) {
        	$this->Session->setflash('Not data');
			return $this->render('../flash');
        }
		if (!array_key_exists('type', $this->request->data)) {
			$this->Session->setflash('Incomplete data');
			return $this->render('../flash');			
		}
		
		// Ok we have data's
		if ($this->request->data['type'] == 'Patient') {
			$this->set('patient', $this->request->data['id']);
			$this->set('type', "");
			$this->set('related', -1);
		} else {
			if (!array_key_exists('patient_id', $this->request->data)) {
				$this->Session->setflash('Incompleted related data');
				return $this->render('../flash');			
			}
			$this->set('patient', $this->request->data['patient_id']);
			$this->set('mode', "#related");
			$this->set('type', $this->request->data['type']);
			$this->set('related', $this->request->data['id']);
		}
		
		$login = $this->Auth->user();
        $this->request->data['lastuser'] = $login['username'];

        if ($this->{$this->request->data['type']}->save($this->request->data)) {
        	if (!($this->request->data['id'] > 0)) {
        		$id = $this->{$this->request->data['type']}->getLastInsertID();
        		$this->request->data['id'] = $id;
				$this->set('related', $id);
        	}
			$this->Session->setflash('Great! The ' . $this->request->data['type'] . ' has been saved !', 'default', array('class' => 'flashok'));
        } else {
            $this->Session->setflash('Bad luck! The ' . $this->request->data['type'] . ' has not been saved.');
        }
		return $this->render('../results');
	}
	
	function view($id = null) {
        if ($id == null) {
			return $this->render('notfound');
		}
		$data = $this->{$this->modelClass}->read(null, $id);
		if ($data == null) {
			$this->Session->setFlash('Invalid ' . $this->modelKey . ": $id");
			return $this->render('notfound');
		}
		$this->request->data = $data;
		$this->render('details');
	}

	function delete($id = null) {
		$this->set('patient', -1);
		$this->set('mode', '#history');
		$this->set('type', "");
		$this->set('related', -1);
		if (!$id) {
			$this->Session->setFlash('Invalid ' . $this->modelKey);
			return $this->render("../results");
		}
		$data = $this->{$this->modelClass}->read(null, $id);
		if (($data == null) || ($data === false)) {
			$this->Session->setFlash('Invalid ' . $this->modelKey . ": $id");
			return $this->render("../results");
		}
		if ($this->{$this->modelClass}->delete($id)) {
			$this->Session->setFlash($this->modelKey . ' deleted', 'default', array('class' => 'flashok'));
		} else {
			$this->Session->setFlash("Problem deleting " . $this->modelKey);
		}
		if ($this->modelClass != 'Patient') {
			$this->set('patient', $data['Patient']['id']);
			$this->set('mode', '#history');
		}
		return $this->render("../results");
	}

	function day($day = null) {
		// fix day="today" if day is null
		if ($day == null) {
			$day = date('Y-m-d');
		}
		
		if (!array_key_exists('filter', $this->request->data)) {
			$this->request->data['filter'] = array();
		}
		
		if (!array_key_exists('Nextappointment', $this->request->data['filter'])) {
			$this->request->data['filter']['Nextappointment'] = $day;
		}
		if (!array_key_exists('Center', $this->request->data['filter'])) {
			$this->request->data['filter']['Center'] = "";
		}
		
		$this->request->data['list'] = array();
		$cond = $this->request->data['filter'];
		
		if ($cond['Center'] == "") unset($cond['Center']);
		$cond = array('recursive' => 0, 'conditions' => $cond);
		
		$this->loadModel("RicketConsult");
	    $this->request->data['list'] = array_merge($this->request->data['list'], $this->RicketConsult->find('all', $cond));

		$this->loadModel("NonricketConsult");
	    $this->request->data['list'] = array_merge($this->request->data['list'], $this->NonricketConsult->find('all', $cond));

		$this->loadModel("ClubFoot");
	    $this->request->data['list'] = array_merge($this->request->data['list'], $this->ClubFoot->find('all', $cond));

	    $this->render("../day");
	}
    
	function structure() {
		$model = $this->modelClass;
	    if (!ClassRegistry::isKeySet($model)) {
			$omodel =& ClassRegistry::init($model);
		}
			
		$omodel =& ClassRegistry::getObject($model);
		$data = array();
		$data = $omodel->schema();
		if (isset($omodel::$part)) {
			foreach($omodel::$part as $f => $l) {
				$data[$f]['list'] = $l;
			}
		}
		$data['timestamp'] = array("type" => 'timestamp');
		$data['type'] = array("type" => 'string');
		$data['controller'] = array("type" => 'string');
		$this->request->data = $data;
		$this->set("data", $data);
		$this->set("ajax", $data);
		$this->render("../noview", "ajax");
	}
}
