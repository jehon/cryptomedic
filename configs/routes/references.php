<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

//$patients = new DBTable($server->getConfig("database"), "patients", $server);

function checkReference($entryyear, $entryorder) {
	global $server;
	return $server->getDatabase()->query("SELECT patients.id FROM patients WHERE patients.entryyear = :entryyear and patients.entryorder = :entryorder ORDER BY entryyear DESC LIMIT 100", 
		array("entryyear" => $entryyear, "entryorder" => $entryorder));

}

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
	$server->getDatabase()->pdo->beginTrans();

	// Check the patient
	$res = checkReference($entryyear, $entryorder);
	if (count($res) != 0) {
		$server->getDatabase()->pdo->rollback();
		throw new HttpAlreadyDone("Reference exists");
	}

	$id = $server->getDatabase()->getTable("patients")->rowCreate(array(
		'entryyear' => $entryyear, 
		'entryorder' => $entryorder,
		'lastuser' => $server->getSession(Server::LOGIN_USERNAME)));
	$server->getDatabase()->pdo->commit();

	$response->ok(getFolder($id));
}
