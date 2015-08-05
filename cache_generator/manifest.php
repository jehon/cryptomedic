<?php
	if (!headers_sent()) {
		header("Content-Type: text/cache-manifest");
		header("Expires: Wed, 11 Jan 1984 00:00:00 GMT");
		header("Pragma: public");
	}
	
	define("TS_FORMAT", "Y-m-d H:i:s");
?>
CACHE MANIFEST

<?php
	
	// By default, consider manifest mtime as a minimum
	// This will be updated in addTs();
	$lastModif = filemtime(__FILE__);

	// Prevent output from here, since we will generate a header at the end of this file
	require_once __DIR__ . "/../php/core.php";

	function addLine($f) {
		echo $f . "\n";
	}
	
	function addOne($f) {
		$f = str_replace("\\", "/", $f);
		if ($f[0] == "/") {
			addLine("$f");
		} else {
			addLine("/cryptomedic/app/$f");
		}
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
	
	addLine("# cryptomedic version: " . getVersion());
	addLine("");
	
	addLine("CACHE:");
	addLine("");
	
	addLine("# Manually added elements");
	addFileTs("../app/index.php");
	addOne("/cryptomedic/app/");
	addFileTs("../index.html");
	addOne("/cryptomedic/");
	addFileTs("../../cryptomedic.version");
	
	// Use the index for import
	ob_start();	
	require("../app/index.php"); 
	ob_end_clean();
	
	addLine("");
	
	addLine("# Include dependant php scripts");
	addLine("");
	foreach(MyFiles::glob("../php/*") as $f) {
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
	foreach(MyFiles::glob("../app/static/*", true) as $f) {
		if (in_array(basename($f), [ ".htaccess" ])) continue;
		addFileTs($f);
		addOne($f);
	}
	addLine("");
		
	addLine("# cache");
	addLine("");
	foreach(MyFiles::glob("../cache/*", true) as $f) {
		if (in_array(basename($f), [ ".htaccess" ])) continue;
		addFileTs($f);
// 			addOne($f);
	}
?>

NETWORK:
# online content (no cache)
*
<?php 
	
	addLine("");
	addLine("# manifest last modif detected (second): " . $lastModif);
	addLine("# manifest last modif detected (time): " . date('D, d M Y H:i:s T', $lastModif));
	