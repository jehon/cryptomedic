<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

require(__DIR__ . "/../../../Model/amd_listings.php");

$patients = new DBTable($server->getConfig("database"), "patients", $server, $response);

if (count($request->getRoute()) == 2) {
	$id = $request->getRoute(2);
	$res = array();
	$p = $patients->rowGet($id);
	if (count($p) < 1) $response->notFound("id = " . $id);
	$p = $p[0];
	$p['_type'] = 'patients';
	$res['mainFile'] = $p;
	$res['subFiles'] = array();

	$rawTable = new DBTable($server->getConfig("database"), null, $server, $response);
	foreach($model2controller as $m => $c) {
		// we work by controller = the same as in database?
		if ($c == "patients") continue;
		$r = $rawTable->preparedStatement("SELECT * FROM $c WHERE patient_id = ?", $id);
		foreach($r as $ri => $rv) {
			$rv['_type'] = $c;
			$res['subFiles'][] = $rv;
		}
	}
	$response->ok($res);
} else {
	// TODO
	$patients->collectionIndex();
}
