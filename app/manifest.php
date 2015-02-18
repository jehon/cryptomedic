<?php
	header("Content-Type: text/cache-manifest");
	header("Expires: Wed, 11 Jan 1984 00:00:00 GMT");
	header("Pragma: public");

// TODO: check some stuffs to see if these data need to be recalculated or not !!!
	
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
	
		$fi = 0;
		function addOne($f) {
			$f = str_replace("\\", "/", $f);
			global $fi; 
			$fi++;
			# 46 = prices -> problem?
			if ($fi > 108) {
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

				// Update the global Last-modified time
				global $lastModif;
				$modifTime = max($lastModif, filemtime($f) );
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
// 		addOne("/cryptomedic/app/index.php");
		addTs("index.php");
// 		addOne("/cryptomedic/index.html");
		addTs("../index.html");
		// Add the manifest itself
		addTs(basename(__FILE__));
		
		// Use the index for import
		ob_start();	
		require("index.php"); 
		ob_clean();
			
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
	// 	foreach(Script::$scriptsLive as $f) {
	// 		addTs($f);
	// 		addOne($f);
	// 	}
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
	addLine("# manifest last modif (time): " . gmdate('D, d M Y H:i:s T', $lastModif));
	