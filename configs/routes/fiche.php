<?php

require(__DIR__ . "/helpers/getFolder.php");

class RouteFiche extends RouteDBTable {
	public function collectionIndex() {
		$this->notAllowed();
	}

	public function collectionDelete() {
		$this->notAllowed();
	}

	public function collectionModify() {
		$this->notAllowed();
	}

	public function collectionCustom($method) {
		$this->notAllowed();
	}

	public function elementCreate($data) {
		$data['lastuser'] = $this->server->getSession(Server::LOGIN_USERNAME);

		$idfolder = $data["patient_id"];
		$fid = parent::elementCreate($data);

		// Send back the folder
		$data = getFolder($idfolder);
		$data["newKey"] = $fid;
		return $data;
	}
	
	public function elementRead($id) {
		$this->notAllowed();
	}
	
	public function elementUpdate($id, $data) {
		$data['lastuser'] = $this->server->getSession(Server::LOGIN_USERNAME);

		// Modify the file
		$res = parent::elementUpdate($id, $data);

		// Get the folder id
		$nrec = $this->dbTable->rowGet($id);

		// Send back the folder
		if (array_key_exists("patient_id", $nrec))
			return getFolder($nrec["patient_id"]);
		else
			return getFolder($nrec["id"]);

	}
	
	public function elementDelete($id) {
		// Get the folder id (if it is a file -> will need the patient_id:
		$nrec = $this->dbTable->rowGet($id);

		// if (array_key_exists("file", $nrec) && $nrec["file"]) {
		// 	if (!array_key_exists($type, $config) || !array_key_exists('upload', $config[$type]) || !$config[$type]['upload']) {
		// 		throw new StorageDeleteError("File storage not defined");
		// 	}
		// 	$tfile = $config[$type]['upload'] . DIRECTORY_SEPARATOR . $nrec["file"];
		// 	if (file_exists($tfile)) {
		// 		if (!unlink($tfile)) {
		// 			throw new StorageDeleteError("Could not delete the file");
		// 		}
		// 	}
		// }

		// Delete the record
		parent::elementDelete($id);

		if ($this->table == "patients") {
			return array();
		} else {			
			// Send back the folder
			return getFolder($nrec["patient_id"]);
		}
	}

	public function elementCustom($method, $id) {
		if ($method == "UNLINK") {
			// Unlock the file
			$this->server->getDatabase()->exec("UPDATE {$this->table} SET modified = NOW(), lastuser = :lastuser WHERE id = :id", 
				array("lastuser" => $this->server->getSession(Server::LOGIN_USERNAME), "id" => $id));

			// Get the folder id:
			$nrec = $this->dbTable->rowGet($id);

			// Send back the folder
			return getFolder($nrec["patient_id"]);
		} else {
			parent::elementcustom($method, $id);
		}
	}
}

// TODOJH: restrict more ?
if (!$request->routeIsEnded()) {
	$type = $request->routeConsumeNext();
	$type = type2db($type);

	$tdb = new RouteFiche($request, $response, $server, $type);
	$tdb->routeAndRespond();
}
