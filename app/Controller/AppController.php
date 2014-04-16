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

// TODO: simplify rights
// TODO: simplify what ajax is doing

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
	
	function isAuthorized($user, $resource = null, $action = null, $args = null) {
		if ($resource == null)  $resource = $this->name;
		if ($action == null)	$action = $this->action;
		if ($args == null)		$args = $this->passedArgs;
		
		$group = $this->Auth->user ( 'group' );
		// pr(array('group' => $group, 'resource' => $resource, 'action' => $action, 'args' => $args));
		
		if ('admin' == $group)
			return true;
		switch ($resource) {
			case "Users" :
				switch ($action) {
					case "login" :
						return true;
					case "logout" :
						return true;
				}
				return false;
				break;
			case "Pages" :
				if (count ( $args ) > 0) {
					switch ($args [0]) {
						case "resetcookie" :
						case "home" :
							return true;
					}
				}
				return true;
				break;
			case "Reports" :
				return true;
		}
		;
		
		switch ($action) {
			case "unlock" :
			case "delete" :
                if ("manager" == $group) return true;
				return false;
				break;
			case "reference" :
			case "add" :
			case "edit" :
                if ("readonly" == $group) return false;
				return true;
				break;
			case "structure" :
			case "calculate" :
			case "view" :
			case "index" :
				return true;
				break;
		}
		pr ( "AUTH: uncatched action: " . $action );
		return true;
	}
	
	function beforeFilter() {
		// ----------------------------- current browser capacities logs ------------------------
		if (array_key_exists ( 'data', $this->request )) {
			if (array_key_exists ( 'browser', $this->request->data )) {
				CakeLog::write ( LOG_ERROR, 'browsers capacities,' . $this->request->data ['User'] ['username'] . "," . $this->request->data ['browser'] );
			}
		}
		
		// ----------------------------------- Prefs --------------------------------
        $mylogin = $this->Auth->user();
		$this->set("login", $mylogin['username']);
		
		// ----------------------------------- Rights --------------------------------
		$denied = array();
		if (!$this->isAuthorized($mylogin, "all", "edit")) 	    $denied[] = "all_edit";
		if (!$this->isAuthorized($mylogin, "all", "delete"))    $denied[] = "all_delete";
		if (!$this->isAuthorized($mylogin, "all", "unlock"))	$denied[] = "all_unlock";
		$this->set("denied", $denied);
	}

	function beforeRender() {
		if (!array_key_exists('data', $this->viewVars))
			return;
		
		$data = $this->viewVars['data'];
		if (array_key_exists('ajax', $this->viewVars)) {
			// Already set, nothing to do
			return;
		}
		
		if (!is_array($data)) {
			// No data, no model -> nothing to do
			$this->set("ajax", array());
			return;
		}
		
		// Used in case of patient, to transfer to the page the patient content
		if ($this->action == 'index'
				|| $this->action == 'day'
				|| $this->modelClass == 'User'
				|| $this->modelClass == 'Label'
				) {
			$ajax = array();
			if (is_array($this->request->data)) {
				foreach( $data as $i => $m ) {
					if (is_array ( $m )) {
						foreach ( $m as $d ) {
							if (is_array ( $d ) && array_key_exists ( 'id', $d )) {
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
			} else if (array_key_exists('Patient', $data)) {
				// Dependent
				$pid = $data['Patient']['id'];
				$this->loadModel('Patient', $pid);
				$ajax = $this->Patient->read(null, $pid);
			} else {
				$ajax = array();
			}
			
			// Let's reformat it in more usable format
			$ajaxo = $ajax;
			$ajax = array();
			if (is_array($ajaxo)) {
				if (array_key_exists('Patient', $ajaxo )) {
					// Flat' it
					$ajax = $ajaxo['Patient'];
					unset($ajaxo['Patient']);
					$ajax['related'] = array();
					$i = 0;
					if (is_array($ajaxo)) {
						foreach($ajaxo as $km => $dm ) {
							if (is_array($ajaxo[$km])) {
								foreach($ajaxo[$km] as $id => $di) {
									if (is_array($di)) {
										$ajax['related'][$ajaxo[$km][$id]['relatedid']] = $ajaxo[$km][$id];
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
	
	function myRedirectToPatientPage($data, $flash = "", $flash_class = "flashko") {
		if ($flash > "") {
			$this->Session->setFlash ( $flash, "default", array (
					"class" => $flash_class 
			) );
		}
		if (is_array ( $data ) && array_key_exists ( $this->modelClass, $data ))
			$mdata = $data [$this->modelClass];
		else
			$mdata = $data;
		if (is_array ( $mdata ) && array_key_exists ( "patient_id", $mdata )) {
			return $this->redirect ( "/patients/view/" . $mdata ['patient_id'] . "#related/$this->modelClass-" . $mdata ['id'] . "/read" );
		}
		
		return $this->redirect ( "/" . $this->request->params ['controller'] . "/view/" . (is_array ( $mdata ) ? $mdata ['id'] : $mdata) );
	}
	
	function unlock($id = null) {
		if ($id == null || $id <= 0) {
			$this->Session->setflash('Invalid request.');
			return $this->redirect( "/" );
		}
		
		if ($this->modelClass == "Patient") {
			// $this->Session->setflash("Patient are always open to modifications.", 'default', array('class' => 'flashok'));
			return $this->myRedirectToPatientPage($id, "Patient are always open to modifications.", "flashok" );
		}
		
		$data = $this->{$this->modelClass}->read ( null, $id );
		if ($data == null) {
			$this->Session->setFlash('Invalid ' . $this->modelKey . ": #$id" );
			return $this->redirect( "/" );
		}
		
		// Change the data
		$mdata = $data[$this->modelClass];
		
		$login = $this->Auth->user ();
		$mdata['lastuser'] = $login['username'];
		
		$today = new DateTime ();
		$mdata['modified'] = $today->format( 'Y-m-d 00:00:00' );
		
		if ($this->{$this->modelClass}->save($mdata)) {
			// $this->Session->setflash('Great! The ' . $this->modelClass . ' has been unlocked !', 'default', array('class' => 'flashok'));
			return $this->myRedirectToPatientPage($data, 'Great! The ' . $this->modelClass . ' has been unlocked !', "flashok" );
		}
		// } else {
		// $this->Session->setflash('Bad luck! The ' . $this->modelClass . ' has not been unlocked.');
		return $this->myRedirectToPatientPage($data, 'Bad luck! The ' . $this->modelClass . ' has not been unlocked.', "flashko" );
		// }
		// return $this->myRedirectToPatientPage($data);
	}
	
	function save() {
		// $this->set('patient', -1);
		// $this->set('mode', "#read");
		// $this->set('type', "");
		// $this->set('related', -1);
		if (empty ( $this->request->data ) > 0) {
			$this->Session->setflash ( 'Not enough data' );
			return $this->redirect ( "/" );
		}
		
		if (! array_key_exists ( 'type', $this->request->data )) {
			$this->Session->setflash ( 'Incomplete data' );
			return $this->redirect ( '/' );
		}
		
		// Ok we have data's
		// if ($this->request->data['type'] == 'Patient') {
		// $this->set('patient', $this->request->data['id']);
		// $this->set('type', "");
		// $this->set('related', -1);
		// } else {
		// if (!array_key_exists('patient_id', $this->request->data)) {
		// $this->Session->setflash('Incompleted related data');
		// return $this->redirect('/');
		// }
		// $this->set('patient', $this->request->data['patient_id']);
		// $this->set('mode', "#related");
		// $this->set('type', $this->request->data['type']);
		// $this->set('related', $this->request->data['id']);
		// }
		
		$login = $this->Auth->user ();
		$this->request->data ['lastuser'] = $login ['username'];
		
		if ($this->{$this->request->data ['type']}->save ( $this->request->data )) {
			if (! ($this->request->data ['id'] > 0)) {
				// $id = $this->{$this->request->data['type']}->getLastInsertID();
				$this->request->data ['id'] = $id;
				// $this->set('related', $id);
			}
			// $this->Session->setflash('Great! The ' . $this->request->data['type'] . ' has been saved !', 'default', array('class' => 'flashok'));
			return $this->myRedirectToPatientPage ( $this->request->data, 'Great! The ' . $this->request->data ['type'] . ' has been saved !', 'flashok' );
		}
		// } else {
		// $this->Session->setflash('Bad luck! The ' . $this->request->data['type'] . ' has not been saved.');
		return $this->myRedirectToPatientPage ( $this->request->data, 'Bad luck! The ' . $this->request->data ['type'] . ' has not been saved.' );
		// }
	}
	
	function view($id = null) {
		if ($id == null || $id <= 0) {
			$this->Session->setflash('Invalid request.');
			return $this->redirect("/");
		}
		
		$data = $this->{$this->modelClass}->read(null, $id);
		if ($data == null) {
			$this->Session->setFlash('Invalid ' . $this->modelKey . ": $id");
			return $this->redirect('/');
		}
		$this->set("data", $data);
		$this->render('details');
	}
	
	function delete($id) {
		// $this->set('patient', -1);
		// $this->set('mode', '#history');
		// $this->set('type', "");
		// $this->set('related', -1);
		if (!$id) {
			$this->Session->setFlash('Not enough data.');
			return $this->render("/");
		}
		
		$data = $this->{$this->modelClass}->read ( null, $id );
		
		if (($data == null) || ($data === false)) {
			$this->Session->setFlash('Invalid data');
			return $this->redirect("/");
		}
		
		if ($this->{$this->modelClass}->delete ( $id )) {
			$this->Session->setFlash($this->modelKey . ' deleted', 'default', array (
					'class' => 'flashok' 
			) );
			if (array_key_exists ( 'patient_id', $data [$this->modelClass] )) {
				return $this->redirect ( "/patients/view/" . $data [$this->modelClass] ['patient_id'] );
			} else {
				return $this->redirect( "/" );
			}
		}
		
		$this->Session->setFlash ( "Problem deleting " . $this->modelKey );
		// if ($this->modelClass != 'Patient') {
		// $this->set('patient', $data['Patient']['id']);
		// $this->set('mode', '#history');
		// }
		return $this->myRedirectToPatientPage($data);
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

		$this->set("cached", true);
		$this->set("data", $data);
	}
}
