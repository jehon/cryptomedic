<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/../../../../Model/amd_listings.php");

$patients = new DBTable($server->getConfig("database"), "patients", $server);

function db2model($dbName) {
	global $model2controller;
	if (array_search($dbName, $model2controller) === false)
		return $dbName;
	else
		return array_search($dbName, $model2controller);

}

if (count($request->getRoute()) == 2) {
	// Get only one
	$id = $request->getRoute(2);
	$res = array();
	$p = $patients->rowGet($id);
	if ($p === false) {
		throw New DBNotFound("No data matching $id");
	}
	// if (count($p) < 1) $response->notFound("id = " . $id);
	// $p = $p[0];
	$p['_type'] = 'Patient';

	$res['_type'] = 'Folder';
	$res['id'] = $p['id'];
	$res['mainFile'] = $p;
	$res['subFiles'] = array();

	$rawTable = new DBTable($server->getConfig("database"), null, $server);
	foreach($model2controller as $m => $c) {
		// we work by controller = the same as in database?
		if ($c == "patients") continue;
		// TODO: remove references to this:
		if ($c == "orthopedic_devices") continue;
		if ($c == "surgery_followups") continue;

		$r = $rawTable->preparedStatement("SELECT * FROM $c WHERE patient_id = ?", $id);
		foreach($r as $ri => $rv) {
			$rv['_type'] = db2model($c);
			$res['subFiles'][] = $rv;
		}
	}
	$response->ok($res);
} else {
	// Search through them
	$sql = "SELECT patients.* FROM patients WHERE (1=1) ";

	if ($request->getParameter("entryyear", false)) 
		$sql .= " AND (patients.entryyear = " . $patients->escape($request->getParameter("entryyear", false)) . ") ";

	if ($request->getParameter("entryorder", false)) 
		$sql .= " AND (patients.entryorder = " . $patients->escape($request->getParameter("entryorder", false)) . ") ";

	if ($request->getParameter("Lastname", false))  {
		$sql .= " AND ((patients.Firstname LIKE " . $patients->escape('%' . str_replace("j", "z", $request->getParameter("Lastname", false)) . '%') . ") ";
		$sql .= " OR (patients.Lastname LIKE " . $patients->escape('%' . str_replace("j", "z", $request->getParameter("Lastname", false)) . '%') . ")) ";
	}

	if ($request->getParameter("Sex", false)) 
		$sql .= " AND (patients.Sex = " . $patients->escape($request->getParameter("Sex", false)) . ") ";

	if ($request->getParameter("Yearofbirth", false)) 
		$sql .= " AND (patients.Yearofbirth = " . $patients->escape($request->getParameter("Yearofbirth", false)) . ") ";

	if ($request->getParameter("Telephone", false)) 
		$sql .= " AND (patients.Telephone LIKE " . $patients->escape('%' . $request->getParameter("Telephone", false) . '%') . ") ";

	if ($request->getParameter("pathology_Ricket", false)) 
		$sql .= " AND (patients.pathology_Ricket = 1) ";

	if ($request->getParameter("pathology_Clubfoot", false)) 
		$sql .= " AND (patients.pathology_Clubfoot = 1) ";

	if ($request->getParameter("pathology_Burn", false)) 
		$sql .= " AND (patients.pathology_Burn = 1) ";

	if ($request->getParameter("pathology_Polio", false)) 
		$sql .= " AND (patients.pathology_Polio = 1) ";

	if ($request->getParameter("pathology_CP", false)) 
		$sql .= " AND (patients.pathology_CP = 1) ";

	if ($request->getParameter("pathology_Congenital", false)) 
		$sql .= " AND (patients.pathology_Congenital = 1) ";

	if ($request->getParameter("pathology_Adult", false)) 
		$sql .= " AND (patients.pathology_Adult = 1) ";

	$sql .= " ORDER BY entryyear DESC LIMIT 100";
	
	debugHeader($sql, "SQL-SEARCH");

	$listing = $patients->execute($sql);
	foreach($listing as $k => $v) {
		$listing[$k]['_type'] = 'Patient';
	}
	$response->ok($listing);
}
