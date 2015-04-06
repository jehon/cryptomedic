<?php

require_once("offline-sync.php");
	
function getFolder($id) {
	global $server;
	$patients = $server->getDatabase()->getTable("patients");

	$res = array();
	$p = $patients->rowGet($id);
	if ($p === false || count($p) == 0) {
		throw New HttpInvalidData("No data matching $id");
	}
	$p['_type'] = 'Patient';

	$res['_type'] = 'Folder';
	$res['id'] = $p['id'];
	$res['mainFile'] = $p;
	$res['subFiles'] = array();

	foreach(References::$model2db as $m => $c) {
		// we work by controller = the same as in database?
		if ($c == "patients") continue;
		// TODO: remove references to this:
		if ($c == "orthopedic_devices") continue;
		if ($c == "surgery_followups") continue;

		$r = $server->getDatabase()->query("SELECT * FROM $c WHERE patient_id = :patient_id", array('patient_id' => $id));
		foreach($r as $ri => $rv) {
			$rv['_type'] = References::db2model($c);
// 			$rv['_type'] = db2model($c);
			$res['subFiles'][] = $rv;
		}
	}
	$res['_listing'] = getOfflineSyncData();
	
	return $res;
}
