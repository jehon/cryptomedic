<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

if (!$request->routeIsEnded()) {
	$type = $request->routeConsumeNext();
	$type = type2db($type);
	// $typeDB = new DBTable($server->getConfig("database"), $type, $server);
	$typeDB = $server->getDatabase()->getTable($type);


	if (!$request->routeIsEnded()) {
		$id = $request->routeConsumeNext();

		// UNLOCK
		if ($request->getMethod() == "UNLINK") {
			// Unlock the file
			$server->getDatabase()->preparedStatement("UPDATE $type SET modified = NOW(), lastuser = ? WHERE id = ?", array($server->getSession(Server::LOGIN_USERNAME), $id));

			// Get the folder id:
			$nrec = $typeDB->rowGet($id);

			// Send back the folder
			$response->ok(getFolder($nrec["patient_id"]));
		}

		// DELETE
		if ($request->getMethod() == Request::DELETE) {
			// Get the folder id:
			$nrec = $typeDB->rowGet($id);

			if (array_key_exists("file", $nrec) && $nrec["file"]) {
				if (!array_key_exists($type, $config) || !array_key_exists('upload', $config[$type]) || !$config[$type]['upload']) {
					throw new StorageDeleteError("File storage not defined");
				}
				$tfile = $config[$type]['upload'] . DIRECTORY_SEPARATOR . $nrec["file"];
				if (file_exists($tfile)) {
					if (!unlink($tfile)) {
						throw new StorageDeleteError("Could not delete the file");
					}
				}
			}

			// Delete the record
			$server->getDatabase()->preparedStatement("DELETE FROM $type WHERE id = ?", array($id));

			if ($type == "patients") {
				$response->ok();
			} else {			
				// Send back the folder
				$response->ok(getFolder($nrec["patient_id"]));
			}
		}

		// UPDATE
		if ($request->getMethod() == Request::UPDATE) {
			$data = $request->getPost();
			// $data['lastuser'] = $server->getSession(Server::LOGIN_USERNAME);

			// Modify the file
			$typeDB->rowUpdate($data);

			// Get the folder id
			$nrec = $typeDB->rowGet($id);

			// Send back the folder
			if (array_key_exists("patient_id", $nrec))
				$response->ok(getFolder($nrec["patient_id"]));
			else
				$response->ok(getFolder($nrec["id"]));
		}
	} else {

		// Create
		if ($request->getMethod() == Request::CREATE) {
			$data = $request->getPost();
			// $data['lastuser'] = $server->getSession(Server::LOGIN_USERNAME);

			$idfolder = $request->getPost("patient_id");
			$fid = $typeDB->rowCreate($data);

			$data = getFolder($idfolder);
			$data["newKey"] = $fid;
			// header("NEWKEY: " . $fid);

			// Send back the folder
			$response->ok($data);
		}
	}
}
