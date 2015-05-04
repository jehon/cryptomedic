<?php

require_once "helpers/getFolder.php";

$type = $request->routeConsumeNext();
$type = References::model2db($type);

$id = $request->routeConsumeNext();

$res = $server->getDatabase()->getTable($type)->rowGet($id);

$response->ok(getFolder($res['patient_id']));
