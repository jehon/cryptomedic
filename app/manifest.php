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
	
	addLine("CACHE MANIFEST");
	addLine("");

	ob_start();
	require("application.php");
	ob_clean();

	// TODOJH: add version infos

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
	addOne("/cryptomedic/app/application.php?" . filemtime("application.php"));
	
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
	foreach(MyFile::myglob("static/*", true) as $s) {
		if (in_array(basename($s), [ ".htaccess" ])) continue;
		addOne($s);
	}
	
	addLine("");
	addLine("# Templates");
	foreach(MyFile::myglob("../templates/*.php") as $s) {
		$s = str_replace("../", "/rest/", $s);
		$s = str_replace(".php", ".html", $s);
		addOne($s);
	}
	
	addLine("");
	addLine("# Templates fiches");
	addLine("");
	foreach(MyFile::myglob("../templates/fiches/*.php") as $s) {
		$s = str_replace("../", "/rest/", $s);
		$s = str_replace(".php", ".html", $s);
		addOne($s . "?mode=read");
		addOne($s . "?mode=edit");
	}
	
	addLine("");
	addLine("");
	addLine("NETWORK:");
	foreach(Script::$scriptsLive as $s) {
		addOne($s);
	}
	addLine("*");
	