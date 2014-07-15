<?php

define("REST_LOADED", 1);

function shutdown() {
	if (defined("TERMINATED_SUCCESSFULL")) return;
    $error = error_get_last();
    if ($error === null) return;

    debugHeader($error['message'], "TERMINATED_PROBLEM");
    http_response_code(500);
}

register_shutdown_function('shutdown');

if(!isset($_SESSION)) session_start();

// Debug helper functios
require_once("helpers/debug.php");
foreach(glob(__DIR__ . DIRECTORY_SEPARATOR . "helpers" . DIRECTORY_SEPARATOR . "*.php") as $f) {
	require_once($f);
}

// Configure the application
require_once("config.php");
$server = new Server($config);
$response = new Response($server);
$request = new Request($server, $response);

// define security: authentification + authorization
require_once("behaviors/authentication.php");
require_once("behaviors/authorizations.php");

$route = __DIR__ . DIRECTORY_SEPARATOR . "routes" .  DIRECTORY_SEPARATOR . $request->getRoute()[0] . ".php";
if (file_exists($route)) {
	require_once($route);
}

$response->launchDefaultResponse();

// var_dump($_SESSION);

define("TERMINATED_SUCCESSFULL", 1);
