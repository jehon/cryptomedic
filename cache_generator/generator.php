<?php
	umask(02);

	$path = explode("/", $_REQUEST['target']);
	$generator = pathinfo($path[0], PATHINFO_FILENAME) . ".php";
	$dest = "../cache/" . $_REQUEST['target'];

	// create path if necessary
	if (!file_exists(dirname($dest))) {
		mkdir(dirname($dest, 0775, true));
	}
	
	$fdest = fopen($dest, "w");
	ftruncate($fdest, 0);

	if (!flock($fdest, LOCK_EX)) {
		http_response_code(404);
		die("Could not get the lock");
	}

	$page = "";
	ob_start(function($buffer) use ($fdest, $dest) { 
		fwrite($fdest, $buffer);
		fflush($fdest);
		fclose($fdest);
		flock($fdest, LOCK_UN);
		chmod($dest, 0664);
		return false;
	});	
	include($generator);
	ob_end_flush();
	
