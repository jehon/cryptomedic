<?php
	header("Content-Type: text/cache-manifest");
	header("Expires: Wed, 11 Jan 1984 05:00:00 GMT");
	header("Pragma: public");

	require_once __DIR__ . "/../../rest/php/core.php";
	
	Server::setOption(Server::OPTION_NO_SESSION, true);
	$server = Server::getInstance();
	$request = $server->getRequest();

	$fi = 0;
	function addOne($f) {
		$f = str_replace("\\", "/", $f);
		global $fi; 
		$fi++;
		if ($fi > 40) {
			addLine("## $fi ## $f");
		} else {
			addLine("$f");
		}
	}

	$manifest = "";
	function addLine($f) {
		global $manifest;
		echo $f . "\n";
		$manifest .= "$f\n";
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
	addLine("# system parameter: " . $server->getRequest()->getSystemParameter("version", "#NA#"));

	addLine("");
	
	addLine("CACHE:");
	addLine("");
	// Manually added elements
	addOne("/cryptomedic/app/index.php");
	addTs("index.php");
	addOne("/cryptomedic/index.html");
	addTs("../index.html");
	
	echo "#";
	ob_start();	
	require("index.php"); 
	ob_clean();
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
	// addOne("/cryptomedic/cache/123/bower_components/jquery-ui/jquery-ui.min.js");
	foreach(Script::$scriptsList as $s) {
		addOne($s);
	}
	
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
	addLine("# online content (no cache) ");
	addLine("");
	addLine("NETWORK:");
	foreach(Script::$scriptsLive as $f) {
		addTs($f);
		addOne($f);
	}
	addLine("*");
	addLine("");

	echo $manifest;
	
	if (is_writable("manifest.appcache")) {
		file_put_contents("manifest.appcache", $manifest);
		addLine("# manifest.appcache written");
	} else {
		addLine("# Could not write manifest");
	}