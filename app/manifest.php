<?php
	define("GENERATE_MANIFEST", 1);
	
	header("Content-Type: text/cache-manifest");
	
	function addOne($f) {
		$f = str_replace("\\", "/", $f);
		echo "$f\n";
	}
	
	function addLine($f) {
		echo $f . "\n";
	}

	function addTs($f) {
		if (file_exists($f)) {
			addLine("# $f: " . filemtime($f));
		} else {
			addLine("# $f: does not exists");
		}
	}
	
	addLine("CACHE MANIFEST");
	addLine("");
	
	ob_start();
	require("index.php");
	ob_clean();

	if (file_exists("cryptomedic.version")) {
		addLine("# cryptomedic version: " . file_get_contents("cryptomedic.version"));
	}
	if (file_exists("rest.version")) {
		addLine("# rest version: " . file_get_contents("rest.version"));
	}
	addLine("# database version: " . $server->getDatabase()->getVersion());
	if ($request->getSystemParameter("version", false)) {
		addLine("# system parameter: " . $request->getSystemParameter("version"));
	}

	if ($request->isServedLocally()) {
		//addLine("# Served locally: " . time());
	}
	
	addLine("");
	addLine("# General");
	addLine("");
	addOne("/cryptomedic/app/index.php");
	addTs("index.php");
	addTs("content.php");
	// 	addOne("/cryptomedic/app/index.php?" . filemtime("index.php") . "&" . filemtime("content.php"));
	addOne("/cryptomedic/index.html");
	addTs("index.html");
	// 	addOne("/cryptomedic/index.html?" . filemtime(basename(__DIR__) . "/index.html") . "&" . filemtime("index.php"));
	
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
	foreach(Script::$scriptsList as $s) {
		addOne($s);
	}
	
	addLine("");
	addLine("# Images");
	addLine("");
#	foreach(MyFile::myglob("static/img/*.*", true) as $s) {
#		addOne($s);
#	}
	
	addLine("");
	addLine("# css");
	addLine("");
#	foreach(MyFile::myglob("static/css/*", true) as $s) {
#		addOne($s);
#	}

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
	foreach(MyFile::myglob("../templates/*.php") as $f) {
		addTs($f);
		$s = str_replace("../", "/rest/", $f);
		$s = str_replace(".php", ".html", $s);
		addOne($s);
	}
	
	addLine("");
	addLine("# Templates fiches");
	addLine("");
	foreach(MyFile::myglob("../templates/fiches/*.php") as $f) {
		addTs($f);
		$s = str_replace("../", "/rest/", $f);
		$s = str_replace(".php", ".html", $s);
		addOne($s . "?mode=read");
		addOne($s . "?mode=edit");
	}
	
	addLine("");
	addLine("# online content (no cache) ");
	addLine("");
	addLine("NETWORK:");
	foreach(Script::$scriptsLive as $f) {
		addTs($f);
		addOne($f);
	}
	addLine("");
	addLine("*");
	