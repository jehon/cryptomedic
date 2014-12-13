<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

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

	if ($entryorder < 0) {
		$id = $server->getDatabase()->insert("insert into patients(entryyear, entryorder)
				value(:entryyear, 
					coalesce(
						greatest(
							10000,
							(select i from (
								select (max(entryorder) + 1) as i from patients where entryyear = :entryyear
							) as j )
						),
					10000)
				) 
			", array('entryyear' => $entryyear));
	} else {
		$server->getDatabase()->pdo->beginTransaction();

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
	}

	$response->ok(getFolder($id));
}
