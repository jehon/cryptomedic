<?php
	define("GENERATE_MANIFEST", 1);
	
	$file = fopen("manifest.cache.building", "w");
	fwrite($file, "CACHE MANIFEST\n");
	fwrite($file, "\n");

	// TODOJH: add version infos
	
	ob_start();
	require("index.php");
	ob_clean();

	function addOne($f) {
		global $file;
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
	
	echo "<h3>templates</h3>";
	// TODOJH
	foreach(MyFile::myglob("templates/*", true) as $s) {
		addOne($s);
	}
	
	fclose($file);
	rename("manifest.cache.building", "manifest.cache");
