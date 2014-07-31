<?php

define("REST_LOADED", 1);

function shutdown() {
	if (defined("TERMINATED_SUCCESSFULL")) return;

    $error = error_get_last();
    if ($error === null) return;

    debugHeader($error['message'], "TERMINATED_PROBLEM");
    echo $error['message'];
    http_response_code(500);
}

register_shutdown_function('shutdown');

try {
	if(!isset($_SESSION)) session_start();
	
	// Debug helper functios
	require_once("../php/debug.php");
	require_once("../php/exceptions.php");
	require_once("../php/dbtable.php");
	require_once("../php/server.php");

	require_once("helpers/request.php");
	require_once("helpers/response.php");
	require_once("helpers/tableRoute.php");

	$server = new Server($config);
	$request = new Request($server);
	$response = new Response($request);

	// define security: authentification + authorization
	require_once("behaviors/authentication.php");
	require_once("behaviors/authorizations.php");

	if (($request->getRoute(1) == "system") && count($request->getRoute()) > 1) {
		$route = "systemroutes" .  DIRECTORY_SEPARATOR . $request->getRoute(2) . ".php";
		if (file_exists($route)) {
			require_once($route);
		}
	} else {
		$route = $server->getConfig("appRoot") . "routes" .  DIRECTORY_SEPARATOR . $request->getRoute(1) . ".php";
		debugHeader($route, "route");
		if (file_exists($route)) {
			require_once($route);
		}
	}

	$response->fire();

	define("TERMINATED_SUCCESSFULL", 1);
} catch (Exception $error) {
    if ($error instanceof HttpException) {
    	debugHeader(get_class($error), "TERMINATED_CLASS");
	    debugHeader($error->getMessage(), "TERMINATED_HTTPERROR");
	   	http_response_code($error->getHttpCode());
   	    echo $error->getHttpCode();
		define("TERMINATED_SUCCESSFULL", 1);
    } else {
	    debugHeader($error->getMessage(), "TERMINATED_NOT_HTTPERROR");
	   	http_response_code(500);
    	throw $error;
    }
}
