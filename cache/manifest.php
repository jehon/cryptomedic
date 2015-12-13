<?php
	if (!headers_sent()) {
		header("Content-Type: text/cache-manifest");
		header("Expires: Wed, 11 Jan 1984 00:00:00 GMT");
		header("Pragma: public");
	}

	define("TS_FORMAT", "Y-m-d H:i:s");
	chdir(__DIR__);


	// By default, consider manifest mtime as a minimum
	// This will be updated in addTs();
	$lastModif = filemtime(__FILE__);

	// Prevent output from here, since we will generate a header at the end of this file
	require_once "../php/core.php";

	function addLine($f) {
		echo $f . "\n";
	}

	function addOne($f) {
		$f = str_replace("\\", "/", $f);
		if ($f[0] != "/") {
			$f = "/cryptomedic/app/$f";
		}
		$f = str_replace("/app/../", "/", $f);
		addLine("$f");
	}

	function addTs($ts, $header = "") {
		// Update the global Last-modified time
		if (!is_numeric($ts)) {
			return addLine("# $ts: not numeric");
		}
		global $lastModif;
		addLine("# " . date(constant("TS_FORMAT"), $ts) . " " . ($header ? $header : "explicit timestamp"));
		if ($ts > $lastModif) {
			$lastModif = $ts;
		}
	}

	function addFileTs($f) {
		if (!file_exists($f)) {
			return addLine("# $f: does not exists");
		}
		return addTs(filemtime($f), $f);
	}

	addLine("CACHE MANIFEST");
	// addLine("# cryptomedic version: " . getVersion());
	addLine("");

	addLine("CACHE:");
	addLine("");

	addLine("# Manually added elements");
	addOne("/cryptomedic/");
	addOne("/cryptomedic/app/");
	addOne("/cryptomedic/app/index.html");
	addLine("");

	addLine("# Include dependant php scripts");
	addLine("");
	foreach(MyFiles::glob("../php/*") as $f) {
		addFileTs($f);
	}
	addLine("");

	addLine("# static");
	addLine("");
	foreach(MyFiles::glob("../app/static/*", true) as $f) {
		if (in_array(basename($f), [ ".htaccess" ])) continue;
		addFileTs($f);
		addOne($f);
	}
	addLine("");

	addLine("# build");
	addLine("");
	foreach(MyFiles::glob("../build/*", true) as $f) {
		if (in_array(basename($f), [ ".htaccess" ])) continue;
		addFileTs($f);
		addOne($f);
	}
	addLine("");

	addLine("# cache");
	addLine("");
	foreach(MyFiles::glob("../cache/*", true) as $f) {
		addFileTs($f);
	}
	addLine("");

	foreach(MyFiles::glob("../cache/templates/fiches/*", false) as $f) {
		addOne(str_replace(".php", ".html", $f));
		addOne("../cache/templates/writes/" . str_replace(".php", ".html", basename($f)));
	}
	addLine("");

	foreach(MyFiles::glob("../cache/templates/folder_pages/*", false) as $f) {
		addOne(str_replace(".php", ".html", $f));
	}
	addLine("");

	foreach(MyFiles::glob("../cache/templates/pages/*", false) as $f) {
		addOne(str_replace(".php", ".html", $f));
	}
	addLine("");

	foreach(MyFiles::glob("../cache/templates/reports/*", false) as $f) {
		addOne(str_replace(".php", ".html", $f));
	}
	addLine("");

	foreach(MyFiles::glob("../cache/templates/summary/*", false) as $f) {
		addOne(str_replace(".php", ".html", $f));
	}
	addLine("");

	addLine("NETWORK:");
	addLine("");
	addLine("# online content (no cache)");
	addLine("/cryptomedic/api/");
	addLine("");

	addLine("FALLBACK:");
	addLine("");
	addLine("/cryptomedic/app/		/cryptomedic/app/index.html");
	addLine("");

	addLine("");
	addLine("# manifest last modif detected (second): " . $lastModif);
	addLine("# manifest last modif detected (time): " . date('D, d M Y H:i:s T', $lastModif));

