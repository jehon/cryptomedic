<?php

require_once(__DIR__ . "/helpers/getFolder.php");
require_once(__DIR__ . "/../php/references.php");

class RouteFiche extends RouteDBTable {
	const DATA_PREFIX = "data:image/";
	
	public function collectionIndex() {
		throw new Exception("Not allowed");
	}

	public function collectionDelete() {
		throw new Exception("Not allowed");
	}

	public function collectionModify() {
		throw new Exception("Not allowed");
	}

	public function collectionCustom($method) {
		throw new Exception("Not allowed");
	}

	public function elementCreate(array $data) {
		$data['lastuser'] = $this->server->getSession(Server::LOGIN_USERNAME);
		$file = null;
		foreach($data as $k => $v) {
			if (substr($v, 0, strlen(self::DATA_PREFIX)) == self::DATA_PREFIX) {
				// Test the existence of the storage, to trow exception in case it is not defined
				global $server;
				$storage = $server->getConfig($this->table . ".storage");
				$file = $v;
				unset($data[$k]);
			}
		}
		
		$idfolder = $data["patient_id"];
		$fid = parent::elementCreate($data);
		
		if ($fid && $file) {
			$data = $this->dbTable->rowGet($fid);
			$fname = $data['patient_id'] . "_" . ($data['Date'] == null ? "undated" : $data['Date']) . "_" . $fid;
			$tname = $this->saveFile($file, $fname);
			$this->dbTable->rowUpdate(array("id" => $fid, "file" => $tname));
		}		
		
		// Send back the folder
		$data = getFolder($idfolder);
		$data["newKey"] = $fid;
		return $data;
	}
	
	public function elementRead($id) {
		throw new Exception("Not allowed");
	}
	
	public function elementUpdate($id, array $data) {
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

		// If there is a file field, delete the related (configured) file  
		if (array_key_exists("file", $nrec) && $nrec["file"]) {
			$storage = $this->server->getConfig($this->table . ".storage", false);
			if (!$storage) {
			// if (!array_key_exists($type, $config) || !array_key_exists('upload', $config[$type]) || !$config[$type]['upload']) {
				throw new StorageDeleteError("File storage not defined");
			}
			$tfile = $storage . DIRECTORY_SEPARATOR . $nrec["file"];
			if (file_exists($tfile)) {
				if (!unlink($tfile)) {
					throw new StorageDeleteError("Could not delete the file");
				}
			}
		}

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
			$this->server->getDatabase()->exec("UPDATE `{$this->table}` SET modified = NOW(), lastuser = :lastuser WHERE id = :id", 
				array("lastuser" => $this->server->getSession(Server::LOGIN_USERNAME), "id" => $id));

			// Get the folder id:
			$nrec = $this->dbTable->rowGet($id);

			// Send back the folder
			return getFolder($nrec["patient_id"]);
		} else {
			parent::elementcustom($method, $id);
		}
	}
	
	public function saveFile($dataURI, $fname) {
		global $server;
		$storage = $server->getConfig($this->table . ".storage");
			
		// data:image/jpeg;base64
		$v = substr($dataURI, strlen("data:"));
		$mimetype = substr($v, 0, strpos($v, ";"));
		$content64 = substr($v, strpos($v, ",") + 1);
		
		switch ($mimetype) {
			case "image/png": 
				$ext = "png";
				break;
			case "image/jpeg":
				$ext = "jpg";
				break;
			default:
				 throw new StorageCreateError("Invalid extension");
		}
		$tname = $fname . "." . $ext;
		$tfile = $storage . DIRECTORY_SEPARATOR . $tname;
		debugHeader($tfile, "SAVING-FILE");
		$contentRaw = base64_decode($content64);
		if (!$contentRaw) {
			throw new StorageCreateError("Received data is empty");
		}
		if (file_exists($tfile)) {
			throw new StorageCreateError("Moving uploaded file to $tfile: already exists");
		}
		if (!file_put_contents($tfile, $contentRaw)) {
			throw new StorageCreateError("Moving uploaded file to $tfile");
		}
			
		debugHeader($tfile, "SAVING-FILE-OK");
		return $tname;
	}
}

class StorageDeleteError extends Exception {};
class StorageCreateError extends Exception {};

if (!$request->routeIsEnded()) {
	$type = $request->routeConsumeNext();
	$type = References::model2db($type);

	$tdb = new RouteFiche($request, $response, $server, $type);
	$tdb->routeAndRespond();
}
