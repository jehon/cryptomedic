<?php
	define("GENERATE_MANIFEST", 1);
	
	header("Content-Type: text/cache-manifest");

	$file = fopen("manifest.cache.building", "w");
	function addOne($f) {
		global $file;
		$f = str_replace("\\", "/", $f);
		echo "$f\n";
// 		fwrite($file, $f . "\n");
	}
	
	addOne("CACHE MANIFEST");
	addOne("");

	ob_start();
	require("application.php");
	ob_clean();

	// TODOJH: add version infos
	if (file_exists("cryptomedic.version")) {
		$v = file_get_contents("cryptomedic.version");
	} else {
		$v = date("YmdHis", filemtime("manifest.php"));
	}
	addOne("# application version: $v");
	
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
	foreach(MyFile::myglob("../templates/*", false) as $s) {
		addOne($s);
	}
	
	addOne("");
	addOne("# Templates fiches");
	addOne("");
	foreach(MyFile::myglob("../templates/fiches/*", false) as $s) {
		$s = str_replace("../", "/rest/", $s);
		addOne($s . "?mode=read");
		addOne($s . "?mode=edit");
	}
	
	fclose($file);
	rename("manifest.cache.building", "manifest.cache");
