<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

if (count($request->getRoute()) > 1) {
	$type = $request->getRoute(2);
	$type = type2db($type);
	$typeDB = new DBTable($server->getConfig("database"), $type, $server);

	if (count($request->getRoute()) == 3) {
		$id = $request->getRoute(3);

		// UNLOCK
		if ($request->getMethod() == "UNLINK") {
			// Unlock the file
			$typeDB->preparedStatement("UPDATE $type SET modified = NOW(), lastuser = ? WHERE id = ?", array($server->getSession(Server::LOGIN_USERNAME), $id));

			// Get the folder id:
			$nrec = $typeDB->rowGet($id);

			// Send back the folder
			$response->ok(getFolder($nrec["patient_id"]));
		}

		// DELETE
		if ($request->getMethod() == Request::DELETE) {
			// Get the folder id:
			$nrec = $typeDB->rowGet($id);

			// Unlock the file
			$typeDB->preparedStatement("DELETE FROM $type WHERE id = ?", array($id));

			// Send back the folder
			$response->ok(getFolder($nrec["patient_id"]));
		}

		// UPDATE
		if ($request->getMethod() == Request::UPDATE) {
			$data = $request->getPost();
			$data['lastuser'] = $server->getSession(Server::LOGIN_USERNAME);

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
	} else if (count($request->getRoute()) == 2) {
		if ($request->getMethod() == Request::CREATE) {
			$data = $request->getPost();
			$data['lastuser'] = $server->getSession(Server::LOGIN_USERNAME);

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
