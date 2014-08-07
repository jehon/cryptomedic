<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

if (count($request->getRoute() == 3)) {
	$type = $request->getRoute(2);
	$id = $request->getRoute(3);
	$type = type2db($type);

	$typeDB = new DBTable($server->getConfig("database"), $type, $server);
	if ($request->getMethod() == "UNLINK") {
		// Unlock the file
		$typeDB->preparedStatement("UPDATE $type SET modified = NOW() WHERE id = ?", $id);

		// Get the folder id:
		$nrec = $typeDB->rowGet($id);

		// Send back the folder
		$response->ok(getFolder($nrec["patient_id"]));
	}

	if ($request->getMethod() == "PUT") {
		var_dump($request->getPost());
		// Modify the file
		$typeDB->rowUpdate($request->getPost());

		// Get the folder id
		$nrec = $typeDB->rowGet($id);

		// Send back the folder
		if (array_key_exists("patient_id", $nrec))
			$response->ok(getFolder($nrec["patient_id"]));
		else
			$response->ok(getFolder($nrec["id"]));
	}
}
