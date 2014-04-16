<?php
App::uses('AppController', 'Controller');

class PatientsController extends AppController {
	function index() {
		$sqlfilter = "(1=1)";
		$filter = array (
				'Patient' => array (
						'id' => '',
						'entryyear' => '',
						'entryorder' => '',
						'Firstname' => '',
						'Lastname' => '',
						'Yearofbirth' => '',
						'Fathersname' => '',
						'Telephone' => '',
						'pathology_other' => '' 
				) 
		);
		if (array_key_exists ( 'Patient', $this->request->data )) {
			$filter = $this->request->data;
			$types = $this->Patient->getColumnTypes ();
			foreach ( $this->request->data ['Patient'] as $k => $v ) {
				if (($types [$k] == 'text') or ($types [$k] == 'string')) {
					if ($v != '') {
						if (($k == "Lastname") or ($k == "Firstname")) {
							$v = str_replace ( 'j', 'z', $v );
							$sqlfilter .= " AND (($this->modelClass.Firstname  LIKE '%$v%')" . " OR ($this->modelClass.Lastname  LIKE '%$v%'))";
						} else
							$sqlfilter .= " AND (replace($this->modelClass.$k, 'j', 'z')  LIKE replace('%$v%', 'j', 'z'))";
					}
				} else if ($types[$k] == 'boolean') {
					if ($v > 0)
						$sqlfilter .= " AND (Patient.$k = true)";
				} else {
					if ($v > 0)
						$sqlfilter .= " AND (Patient.$k  = '$v')";
				}
			}
			$this->set('filter', $this->request->data);
		}
		$res = $this->Patient->find ( 'all', array (
				'conditions' => $sqlfilter,
				'limit' => 100,
				'recursive' => 0 
		) );
		$this->set ( "filter", $filter );
		$this->set ( 'data', $res );
	}

	function reference() {
		/**
         * Used to create a new patient. This is the only official way to create a new patient.
		 */
		$data = $this->request->data;
		
		if (empty($this->request->data) || !$this->request->data("entryyear")) {
			// No data
			$this->set ( 'data', array (
					'entryyear' => '',
					'entryorder' => '' 
			) );
			return;
		}
		
		if (! array_key_exists ( 'entryorder', $data ))
			$data ['entryorder'] = '';
		
		if (! $this->request->data ( 'entryyear' )) {
			// Too much empty data
			unset($data['reviewed']);
			$this->set ('data', $data );
			return;
		}
		
		if ($this->request->data("forceCreate") == "false") {
			// The user entered some data, but does a file already exists?
			$idlist = $this->Patient->find('first', array (
					'conditions' => array(
							'Patient.entryyear' => $data['entryyear'],
							'Patient.entryorder' => $data['entryorder']
					),
                    'fields' => array('id')
					) 
            );
            if (is_array($idlist) && (count($idlist) > 0)) {
                return $this->redirect("/patients/view/" . $idlist[$this->modelClass]['id'] . "#read");
			}
			
			$data ['reviewed'] = true;
		} else {
			// We are in "create" mode, and the user already confirmed the fact
			// that he want to create a new file
			$nPatient = array (
					'entryyear' => $data['entryyear'],
					"entryorder" => $data['entryorder']
			);
			$success = false;
            if ($nPatient['entryorder'] > "") {
				// A complete reference exists, create it !
                $success = $this->Patient->save($nPatient);
			} else {
				// Let's generate a new reference
				$maxTry = 100;
				do {
					// Get the maximum existing number in that year
					$res = $this->Patient->find ( 'first', array (
							'fields' => array (
									'MAX(entryorder) as n' 
							),
							'conditions' => array (
									'entryyear' => $nPatient ['entryyear'] 
							) 
                        ));
					
					// Only numbers above 10.000 could be automatically generated
                    $nPatient['entryorder'] = max(10000, (count($res) > 0 ? $res[0]['n'] + 1 : 0));
					
                    $success = $this->Patient->save($nPatient);
                    $maxTry--;
                    pr($success);
                } while (!$success && ($maxTry > 0));
			}
			if ($success) {
                return $this->redirect("/patients/view/" . $this->Patient->getLastInsertId() . "#edit");
			} else {
                return $this->setFlash("An error occured creating/saving the patient");
			}
		}
		$this->set("data", $data);
	}
}
