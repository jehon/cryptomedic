<?php
if (!defined("REST_LOADED")) die("Ca va pas la tête?");

function getSqlConsult($label, $table) {
	global $request;
	global $patients;

	return "SELECT \"$label\" as c_type, c.id as c_id, c.Date as c_Date, c.Center as c_Center, c.patient_id as patient_id FROM $table as c "
			. "WHERE (c.NextAppointment = " . $patients->escape($request->getParameter("day", false)) . ") ";

}

if ((count($request->getRoute()) == 1) && ($request->getMethod() == Request::READ)) {
	$patients = new DBTable($server->getConfig("database"), "patients", $server);

	// Search through them
	$sql = "SELECT cc.*, patients.*
		FROM "
		. "(("
			. getSqlConsult("ricket", "ricket_consults")
		. 	") UNION ("
			. getSqlConsult("clubfoot", "club_foots")
		. 	") UNION ("
			. getSqlConsult("non-ricket", "nonricket_consults")
		.")) AS cc "
		. " JOIN patients ON (cc.patient_id = patients.id) ";

	if ($request->getParameter("center", false)) 
		$sql .= " AND (c_center = " . $patients->escape($request->getParameter("center", false)) . ") ";

	$sql .= " LIMIT 100";

	debugHeader($sql, "SQL-SEARCH");

	$listing = $patients->execute($sql);
	$response->ok($listing);
}
