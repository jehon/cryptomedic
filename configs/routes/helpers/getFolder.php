<?php
// require(__DIR__ . "/../../amd_listings.php");

function db2model($dbName) {
	return References::controller2model($dbName);
}

function type2db($type) {
	return References::model2controller($type);
	// global $model2controller;
	// if (array_key_exists($type, $model2controller))
	// 	return $model2controller[$type];
	// return $type;
}

function getFolder($id) {
	global $server;
	$patients = $server->getDatabase()->getTable("patients");
	//new DBTable($server->getConfig("database"), "patients", $server);

	$res = array();
	$p = $patients->rowGet($id);
	if ($p === false || count($p) == 0) {
		throw New DBNotFound("No data matching $id");
	}
	// if (count($p) < 1) $response->notFound("id = " . $id);
	// $p = $p[0];
	$p['_type'] = 'Patient';

	$res['_type'] = 'Folder';
	$res['id'] = $p['id'];
	$res['mainFile'] = $p;
	$res['subFiles'] = array();

	//$rawTable = new DBTable($server->getConfig("database"), null, $server);
	foreach(References::$model2controller as $m => $c) {
		// we work by controller = the same as in database?
		if ($c == "patients") continue;
		// TODO: remove references to this:
		if ($c == "orthopedic_devices") continue;
		if ($c == "surgery_followups") continue;

		$r = $server->getDatabase()->query("SELECT * FROM $c WHERE patient_id = :patient_id", array('patient_id' => $id));
		foreach($r as $ri => $rv) {
			$rv['_type'] = db2model($c);
			$res['subFiles'][] = $rv;
		}
	}
	return $res;
}