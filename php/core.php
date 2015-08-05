<?php
// 	require_once(__DIR__ . "/../../rest/php/core.php");
	
// 	Server::setOption(Server::OPTION_NO_SESSION);
// 	$server = Server::getInstance();
	
	// Application autoload classes
spl_autoload_register(function ($class) {
	$file = __DIR__ . "/" . strtolower($class) . ".php";
	if (file_exists($file)) {
		include_once($file);
		return true;
	}
	return false;
});


function getVersion() {
	$file = __DIR__ . "/../../cryptomedic.version";
	if (file_exists($file)) {
		return trim(file_get_contents($file));
	}
	return "undefined";
}

function myCleanValue($c) {
	return str_replace(["'", " ", "\""], "", $c);
}
	