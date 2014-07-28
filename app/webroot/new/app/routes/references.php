<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

// require(__DIR__ . "/../../../../Model/amd_listings.php");

$patients = new DBTable($server->getConfig("database"), "patients", $server);

if (count($request->getRoute()) == 1) {
	// Check if a reference exists or not
	$sql = "SELECT patients.id FROM patients WHERE (1=1) ";
	if ($request->getParameter("entryyear", false)) 
		$sql .= " AND (patients.entryyear = " . $patients->escape($request->getParameter("entryyear", false)) . ") ";

	if ($request->getParameter("entryorder", false)) 
		$sql .= " AND (patients.entryorder = " . $patients->escape($request->getParameter("entryorder", false)) . ") ";

	$sql .= " ORDER BY entryyear DESC LIMIT 100";
	$response->ok($patients->execute($sql));

} elseif (count($request->getRoute()) == 1) {
	// TODO: create a reference, reserve one, ...

}
