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
require_once(__DIR__ . "/../Lib/cryptomedic.php");

// TODO: check rights

class AppController extends Controller {
	public $helpers = array('Html', 'Form');
		 
	public $components = array(
		'Session',
		'Auth' => array(
			'loginRedirect' => array('controller' => 'pages', 'action' => 'display', 'home'),
			'logoutRedirect' => "/"
		),
		'RequestHandler' => array(
        	'viewClassMap' => array(
            	'json' => 'MyJson',
        		'csv' => 'MyCsv',
        		'csvfr' => 'MyCsv',
        		'xls' => 'MyExcel'
        	)
		)
	);

	var $mytransactions = array(
        "all_edit",
        "all_delete",
        "all_unlock"
    );

    function isAuthorized($user) {
        $resource = $this->name;
        $action = $this->action;
        $args = $this->passedArgs;

//        pr(array('resource' => $resource, 'action' => $action, 'args' => $args));
        return $this->testAuthorized($resource, $action, $args);
    }

    function testAuthorized($resource, $action, $args = array()) {
    	$group = $this->Auth->user('group');

        if ('admin' == $group) return true;
		switch($resource) {
			case "Users":
			    return true;
				break;
			case "Pages":
		        return true;
				break;
		};
		
        switch($action) {
            case "unlock":
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
            case "structure":
            case "calculate":
            case "view":
            case "index":
                return true;
                break;
        }
        pr("AUTH: uncatched action: " . $action);
        return true;
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
    	
		// ----------------------------------- Prefs --------------------------------
        $mylogin = $this->Auth->user();
		$this->set("login", $mylogin['username']);
    	$this->set("group", $mylogin['group']);
		// Used ???
    	$this->Session->write("group", $mylogin['group']);
	    	
		// ----------------------------------- Rights --------------------------------
		$denied = array();
		foreach($this->mytransactions as $t) {
            $p = explode("_", $t);
            $resource = $p[0];
            $action = $p[1];
			if (!$this->testAuthorized($resource, $action)) {
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
		
		// Used in case of patient, to transfer to the page the patient content
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
				$this->loadModel('Patient', $pid);
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

    function unlock($id) {
        if ($id == null || $id <= 0) {
            $this->Session->setflash('Invalid request.');
            return $this->render("../results");
        }

        $data = $this->{$this->modelClass}->read(null, $id);
        if ($data == null) {
            $this->Session->setFlash('Invalid ' . $this->modelKey . ": $id");
            return $this->render('../Patients/notfound');
        }
        $data = $data[$this->modelClass];

        $login = $this->Auth->user();
        $data['lastuser'] = $login['username'];

        $date = new DateTime();
        $data['modified'] = $date->format('Y-m-d 00:00:00');

        $this->set('mode', "#related");
        $this->set('type', $this->modelClass);
        $this->set('related', $id);
        $this->set('patient', $data['patient_id']);

        if ($this->{$this->modelClass}->save($data)) {
            $this->Session->setflash('Great! The ' . $this->modelClass . ' has been unlocked !', 'default', array('class' => 'flashok'));
        } else {
            $this->Session->setflash('Bad luck! The ' . $this->modelClass . ' has not been unlocked.');
        }
        return $this->render("../results");
    }

	function save() {
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
	
	function view($id) {
        if ($id == null) {
			return $this->render('notfound');
		}
		$data = $this->{$this->modelClass}->read(null, $id);
		if ($data == null) {
			$this->Session->setFlash('Invalid ' . $this->modelKey . ": $id");
			return $this->render('notfound');
		}
		$this->request->data = $data;
		$this->set("data", $data);
		$this->render('details');
	}

	function delete($id) {
		// TODO: Add to "deleted" table -> sync with indexedDB 
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

	function structure() {
		$model = $this->modelClass;
	    if (!ClassRegistry::isKeySet($model)) {
			ClassRegistry::init($model);
		}
		
		$oModel = ClassRegistry::getObject($model);
		$data = $oModel->schema();
		if (isset($oModel::$part)) {
			foreach($oModel::$part as $f => $l) {
				$data[$f]['list'] = $l;
			}
		}
		$data['timestamp'] = array("type" => 'timestamp');
		$data['type'] = array("type" => 'string');
		$data['controller'] = array("type" => 'string');
		$this->request->data = $data;
		$this->set("cached", true);			
		$this->set("data", $data);			
	}
}
