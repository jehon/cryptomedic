<?php
	require_once(__DIR__ . "/../../rest/php/core.php");
	
	Server::setOption(Server::OPTION_NO_SESSION);
	$server = Server::getInstance();
	
	// Application autoload classes
	spl_autoload_register(function ($class) {
		if (requireIfExists(__DIR__ . "/" . strtolower($class) . ".php")) {
			return true;
		}
		return false;
	});

	// Same as from ReportController
	function clean($c) {
		return str_replace(["'", " ", "\""], "", $c);
	}	
