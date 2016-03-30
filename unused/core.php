<?php

// Application autoload classes
spl_autoload_register(function ($class) {
	$file = __DIR__ . "/" . strtolower($class) . ".php";
	if (file_exists($file)) {
		include_once($file);
		return true;
	}
	return false;
});


function myCleanValue($c) {
	return str_replace(["'", " ", "\""], "", $c);
}
