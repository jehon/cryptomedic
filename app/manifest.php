<?php
	define("GENERATE_MANIFEST", 1);
	
	header("Content-Type: text/cache-manifest");

	function addOne($f) {
		global $file;
		$f = str_replace("\\", "/", $f);
		echo "$f\n";
	}
	
	addOne("CACHE MANIFEST");
	addOne("");

	ob_start();
	require("application.php");
	ob_clean();

	// TODOJH: add version infos

	if (file_exists("cryptomedic.version")) {
		addOne("# cryptomedic version: " . file_get_contents("cryptomedic.version"));
	}
	if (file_exists("rest.version")) {
		addOne("# rest version: " . file_get_contents("rest.version"));
	}
	addOne("# database version: " . $server->getDatabase()->getVersion());
	if ($request->getSystemParameter("version", false)) {
		addOne("# system parameter: " . $request->getSystemParameter("version"));
	}
	
	addOne("");
	addOne("# General");
	addOne("");
	addOne("/cryptomedic/app/application.php");
	
	addOne("");
	addOne("# Scripts auto-import");
	addOne("");
	foreach(Script::$scriptsList as $s) {
		addOne($s);
	}
	
	addOne("");
	addOne("# Images");
	addOne("");
	foreach(MyFile::myglob("img/*.*", true) as $s) {
		addOne($s);
	}
	
	addOne("");
	addOne("# css");
	addOne("");
	foreach(MyFile::myglob("css/*", true) as $s) {
		addOne($s);
	}

	addOne("");
	addOne("# static");
	addOne("");
	foreach(MyFile::myglob("static/*", true) as $s) {
		addOne($s);
	}
	
	addOne("");
	addOne("# Templates");
	foreach(MyFile::myglob("../templates/*.php") as $s) {
		$s = str_replace("../", "/rest/", $s);
		$s = str_replace(".php", ".html", $s);
		addOne($s);
	}
	
	addOne("");
	addOne("# Templates fiches");
	addOne("");
	foreach(MyFile::myglob("../templates/fiches/*.php") as $s) {
		$s = str_replace("../", "/rest/", $s);
		$s = str_replace(".php", ".html", $s);
		addOne($s . "?mode=read");
		addOne($s . "?mode=edit");
	}
	
	addOne("");
	addOne("");
	addOne("NETWORK:");
	foreach(Script::$scriptsLive as $s) {
		addOne($s);
	}
	addOne("*");
	