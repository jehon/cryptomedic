<?php
App::uses('AppController', 'Controller');

class PatientsController extends AppController {
	
	function save($id = null) {
		// TODO: prevent parent::save if no id is specified -> it should be done in reference
		return parent::save($id);
	}
	
	function index() {
		$sqlfilter = "(1=1)";
		if (array_key_exists('data', $this->request) && array_key_exists('Patient', $this->request->data)) {
			foreach($this->request->data['Patient'] as $k => $v) {
				if (($this->Patient->_schema[$k]['type'] == 'text')
						or ($this->Patient->_schema[$k]['type'] == 'string')) {
					if ($v != '') {
						if (($k == "Lastname") or ($k == "Firstname")) {
							$v = str_replace('j', 'z', $v);
							$sqlfilter .= " AND (($this->modelClass.Firstname  LIKE '%$v%')"
									. " OR ($this->modelClass.Lastname  LIKE '%$v%'))";
						} else
							$sqlfilter .= " AND (replace($this->modelClass.$k, 'j', 'z')  LIKE replace('%$v%', 'j', 'z'))";
					}
				} else if ($this->Patient->_schema[$k]['type'] == 'boolean') {
					if ($v > 0)
						$sqlfilter .= " AND (Patient.$k = true)";
				} else {
					if ($v > 0)
						$sqlfilter .= " AND (Patient.$k  = '$v')";
				}
			}
			$this->set('filter', $this->request->data);
		} else {
			$this->set('filter', 	$filter = array ('Patient' => 
					  array (
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
				)
			);
		}
		$res = $this->Patient->find('all', array('conditions' => $sqlfilter, 'limit' => 100, 'recursive' => 0));
		$this->set('data', $res);
		$this->request->data = $res;
	}

	function reference() {
		/**
         * Used to create a new patient. This is the only official way to create a new patient.
         */
        if (empty($this->request->data)) {
            // No data
            $this->request->data = array('reference-entryyear' => '', 'reference-entryorder' => '');
            return $this->render("../Pages/home");
        }


        if (array_key_exists('reference-ref', $this->request->data)) {
            $pos = strpos($this->request->data['reference-ref'], '-');
            if ($pos > 0) {
                $this->request->data['reference-entryyear'] = substr($this->request->data['reference-ref'], 0, $pos);
                $this->request->data['reference-entryorder'] = substr($this->request->data['reference-ref'], $pos + 1);
            }
        }

        if (!array_key_exists('reference-entryyear', $this->request->data)
            || $this->request->data['reference-entryyear'] == ""
            ) {
            // Too much empty data
            $this->request->data = array('reference-entryyear' => '', 'reference-entryorder' => '');
            return $this->render("../Pages/home");
        }

        if (!array_key_exists('reference-entryorder', $this->request->data))
            $this->request->data['reference-entryorder'] = '';

        // If we are here, it means we at least try once
        $this->request->data['reference'] = 0;

        if (!array_key_exists('create', $this->request->data) || ($this->request->data['create'] != 'true')) {
            // The user entered some data, but does a file already exists?
            $idlist = $this->Patient->find('first',
                array(
                    'conditions' => array(
                        'Patient.entryyear' => $this->request->data['reference-entryyear'],
                        'Patient.entryorder' => $this->request->data['reference-entryorder']
                    ),
                    'fields' => array('id')
                )
            );
            if (is_array($idlist) && (count($idlist) > 0)) {
                return $this->redirect("/patients/view/" . $idlist[$this->modelClass]['id'] . "#read");
            }
        } else {
            // We are in "create" mode, and the user already confirmed the fact
            // that he want to create a new file
            $nPatient = array('entryyear' => $this->request->data['reference-entryyear'],
                "entryorder" => $this->request->data['reference-entryorder']
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
                    $res = $this->Patient->find('first',
                        array(
                            'fields' => array('MAX(entryorder) as n'),
                            'conditions' => array('entryyear' => $nPatient['entryyear'])
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
        return $this->render("../Pages/home");
	}
}
