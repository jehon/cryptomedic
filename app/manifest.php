<?php
	header("Content-Type: text/cache-manifest");
	header("Expires: Wed, 11 Jan 1984 05:00:00 GMT");
	header("Pragma: public");

	require_once __DIR__ . "/../../rest/php/core.php";
	
	Server::setOption(Server::OPTION_NO_SESSION);
	$server = Server::getInstance();
	$request = new Request($server);

	function addOne($f) {
		$f = str_replace("\\", "/", $f);
		echo "$f\n";
	}
	
	function addLine($f) {
		echo $f . "\n";
	}

	function addTs($f) {
		if (file_exists($f)) {
			addLine("# " . filemtime($f). " $f");
		} else {
			addLine("# $f: does not exists");
		}
	}
	
	addLine("CACHE MANIFEST");
	addLine("");
	addLine("");

	addLine("# cryptomedic version: " . $server->getVersion("cryptomedic"));
	addLine("# rest version: " . $server->getVersion());
	addLine("# database version: " . $server->getDatabase()->getVersion());

	if ($request->getSystemParameter("version", false)) {
		addLine("# system parameter: " . $request->getSystemParameter("version"));
	}

	addLine("");
	
	addLine("CACHE:");
	addLine("# Manually added elements");
	addLine("");
	addOne("/cryptomedic/app/index.php");
	addTs("index.php");
	addOne("/cryptomedic/index.html");
	addTs("../index.html");
	
	// Will prevent outputting headers in require

	echo "#";
// 	ob_start();	
// 	require("index.php"); 
// 	ob_clean();
	echo "-\n";
		
	addLine("");
	addLine("# Include dependant php scripts");
	addLine("");
	foreach(MyFile::myglob("../php/*") as $f) {
		addTs($f);
	}
	foreach(MyFile::myglob("../routes/*") as $f) {
		addTs($f);
	}
	
	addLine("");
	addLine("# Scripts auto-import");
	addLine("");
// 	foreach(Script::$scriptsList as $s) {
// 		addOne($s);
// 	}
	
	addLine("");
	addLine("# static");
	addLine("");
	foreach(MyFile::myglob("static/*", true) as $f) {
		if (in_array(basename($f), [ ".htaccess" ])) continue;
		addTs($f);
		addOne($f);
	}
	
	addLine("");
	addLine("# Templates");
	foreach(MyFile::myglob("templates/*.php", true) as $f) {
		addTs($f);
		if (substr($f, 0, strlen("templates/fiches")) == "templates/fiches") {
			addOne($f . "?mode=read");
			addOne($f . "?mode=edit");		
		} else {
			addOne($f);
		}
	}
	
	addLine("");
	addLine("# Templates fiches");
	addLine("");
// 	foreach(MyFile::myglob("../templates/fiches/*.php") as $f) {
// 		addTs($f);
// 		addOne($f . "?mode=read");
// 		addOne($f . "?mode=edit");
// 	}

	addLine("");
	addLine("# online content (no cache) ");
	addLine("");
	addLine("NETWORK:");
// 	foreach(Script::$scriptsLive as $f) {
// 		addTs($f);
// 		addOne($f);
// 	}
	addLine("*");
	addLine("");
	