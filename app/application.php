<html manifest="manifest.php?2">
<?php 
	require_once __DIR__ . "/../../rest/php/core.php";
	Script::$rootPath = __DIR__;
	
	require_once("index.php");
?>
<script>
	if (indexedDB) {
		console.info("[application mode] Enabling offline cache - TODOJH !!!! NOT DONE WHILE DEVELOPPING !!!!");
// 		cryptomedic.settings.offlineCache = true;
	}
</script>
</html>
