<?php
	define("GENERATE_MANIFEST", 1);
	
	$file = fopen("manifest.cache.building", "w");
	fwrite($file, "CACHE MANIFEST\n");
	fwrite($file, "\n");

	// TODOJH: add version infos
	
	ob_start();
	require("app\index.php");
	ob_clean();

	function addOne($f) {
		global $file;
		$f = str_replace("\\", "/", $f);
		echo "adding $f<br>";
		fwrite($file, $f . "\n");
	}

	echo "<h3>General</h3>";
	addOne("/cryptomedic/app/index.php");
	
	echo "<h3>Scripts auto-import</h3>";
	foreach(Script::$scriptsList as $s) {
		addOne($s);
	}
	
	echo "<h3>Images</h3>";
	foreach(MyFile::myglob("app/img/*.*", true) as $s) {
		addOne($s);
	}
	
	echo "<h3>js</h3>";
	foreach(MyFile::myglob("app/js/*.js", true) as $s) {
		addOne($s);
	}
	
	echo "<h3>css</h3>";
	foreach(MyFile::myglob("app/css/*", true) as $s) {
		addOne($s);
	}

	echo "<h3>static</h3>";
	foreach(MyFile::myglob("app/static/*", true) as $s) {
		addOne($s);
	}
	
	echo "<h3>Templates</h3>";
	foreach(MyFile::myglob("templates/*", false) as $s) {
		addOne($s);
	}
	
	echo "<h3>Templates fiches</h3>";
	foreach(MyFile::myglob("templates/fiches/*", false) as $s) {
		addOne($s . "?mode=read");
		addOne($s . "?mode=edit");
	}
	
	fclose($file);
	rename("manifest.cache.building", "manifest.cache");
