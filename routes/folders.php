<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/helpers/getFolder.php");

if (!$request->routeIsEnded()) {
	// Get only one
	$response->ok(getFolder($request->routeConsumeNext()));
} else {
	// $patients = new DBTable($server->getConfig("database"), "patients", $server);

	// Search through them
	$sql = "SELECT patients.* FROM patients WHERE (1=1) ";

	if ($request->getParameter("entryyear", false)) 
		$sql .= " AND (patients.entryyear = " . $server->getDatabase()->escape($request->getParameter("entryyear", false)) . ") ";

	if ($request->getParameter("entryorder", false)) 
		$sql .= " AND (patients.entryorder = " . $server->getDatabase()->escape($request->getParameter("entryorder", false)) . ") ";

	if ($request->getParameter("Lastname", false))  {
		$sql .= " AND ((patients.Firstname LIKE " . $server->getDatabase()->escape('%' . str_replace("j", "z", $request->getParameter("Lastname", false)) . '%') . ") ";
		$sql .= " OR (patients.Lastname LIKE " . $server->getDatabase()->escape('%' . str_replace("j", "z", $request->getParameter("Lastname", false)) . '%') . ")) ";
	}

	if ($request->getParameter("Sex", false)) 
		$sql .= " AND (patients.Sex = " . $server->getDatabase()->escape($request->getParameter("Sex", false)) . ") ";

	if ($request->getParameter("Yearofbirth", false)) 
		$sql .= " AND (patients.Yearofbirth = " . $server->getDatabase()->escape($request->getParameter("Yearofbirth", false)) . ") ";

	if ($request->getParameter("Telephone", false)) 
		$sql .= " AND (patients.Telephone LIKE " . $server->getDatabase()->escape('%' . $request->getParameter("Telephone", false) . '%') . ") ";

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

	$listing = $server->getDatabase()->query($sql);
	foreach($listing as $k => $v) {
		$listing[$k]['_type'] = 'Patient';
	}
	$response->ok($listing);
}
