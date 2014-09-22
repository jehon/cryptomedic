<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

//$patients = new DBTable($server->getConfig("database"), "patients", $server);

function checkReference($entryyear, $entryorder) {
	global $server;
	return $server->getDatabase()->preparedStatement("SELECT patients.id FROM patients WHERE patients.entryyear = ? and patients.entryorder = ? ORDER BY entryyear DESC LIMIT 100", 
		array($entryyear, $entryorder));

}

if (count($request->getRoute()) == 1) {
	if (!($entryyear = $request->getData("entryyear", false)))
		throw new HttpInvalidData("entryyear");

	if (!($entryorder = $request->getData("entryorder", false)))
		throw new HttpInvalidData("entryorder");

	if ($request->getMethod() == Request::READ) {
		// Check if a reference exists or not
		$response->ok(checkReference($entryyear, $entryorder));
	}

	if ($request->getMethod() == Request::CREATE) {
		// Create a reference
		$server->getDatabase()->db->BeginTrans();

		// Check the patient
		$res = checkReference($entryyear, $entryorder);
		if (count($res) != 0) {
			$server->getDatabase()->db->RollbackTrans();
			throw new HttpAlreadyDone("Reference exists");
		}

		$id = $server->getDatabase()->getTable("patients")->rowCreate(array(
			'entryyear' => $entryyear, 
			'entryorder' => $entryorder,
			'lastuser' => $server->getSession(Server::LOGIN_USERNAME)));
		$server->getDatabase()->db->CommitTrans();

		$response->ok(getFolder($id));
	}
}
