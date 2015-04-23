<?php
	header("Content-Type: text/cache-manifest");
	header("Expires: Wed, 11 Jan 1984 00:00:00 GMT");
	header("Pragma: public");

	define("TS_FORMAT", "Y-m-d H:i:s");
	
// TODO: check and cache some stuffs to see if these data need to be recalculated or not !!!

	// By default, consider manifest mtime as a minimum
	// This will be updated in addTs();
	$lastModif = filemtime(__FILE__);

	// Prevent output from here, since we will generate a header at the end of this file
	ob_start();
	{	
		require_once __DIR__ . "/../../rest/php/core.php";
		
		Server::setOption(Server::OPTION_NO_SESSION, true);
		$server = Server::getInstance();
		$request = $server->getRequest();
		
		function addLine($f) {
			echo $f . "\n";
		}
	
		function addOne($f) {
			$f = str_replace("\\", "/", $f);
// 			if ($f[0] == "/") {
				addLine("$f");
// 			} else {
// 				addLine("/cryptomedic/app/$f");
// 			}
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
		addLine("");
		addLine("");
	
		addLine("# cryptomedic version: " . $server->getVersion("cryptomedic"));
		addLine("# rest version: " . $server->getVersion());
		addLine("# database version: " . $server->getDatabase()->getVersion());
		addLine("# system parameter: " . $server->getRequest()->getSystemParameter("version", "#NA#"));
		
		addLine("");
		
		addLine("CACHE:");
		addLine("");
		
		addLine("# Manually added elements");
		addFileTs("index.php");
//disable this one to allow mode online and offline automatically
		addOne("/cryptomedic/app/");
		addFileTs("../index.html");
		addOne("../");
		// Add the manifest itself
		addFileTs(basename(__FILE__));
		addFileTs("../../cryptomedic.version");
		addFileTs("../../rest.version");
		
		// Use the index for import
		ob_start();	
		require("index.php"); 
		ob_clean();
			
		addLine("");
		addLine("# Include dependant php scripts");
		addLine("");
		foreach(MyFiles::glob("../php/*") as $f) {
			addFileTs($f);
		}
		foreach(MyFiles::glob("../routes/*") as $f) {
			addFileTs($f);
		}

		addLine("");
		addLine("# Scripts auto-import");
		addLine("");
		foreach(Script::$scriptsList as $s) {
			addTs($s["ts"]);
			addOne($s["url"]);
		}
		
		addLine("");
		addLine("# static");
		addLine("");
		foreach(MyFiles::glob("static/*", true) as $f) {
			if (in_array(basename($f), [ ".htaccess" ])) continue;
			addFileTs($f);
			addOne($f);
		}
		
		addLine("");
		addLine("# Templates");
		foreach(MyFiles::glob("templates/*.php", true) as $f) {
			addFileTs($f);
			if (substr($f, 0, strlen("templates/fiches/partials")) == "templates/fiches/partials") {
				continue;
			}	
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
		addLine("*");

		addLine("");
	}	

	if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $lastModif) {
		header('HTTP/1.0 304 Not Modified');
		exit;
	}
	
	header("Last-Modified:" . gmdate('D, d M Y H:i:s T', $lastModif));
	ob_flush();

	addLine("# manifest last modif (second): " . $lastModif);
	addLine("# manifest last modif (time): " . date('D, d M Y H:i:s T', $lastModif));
	