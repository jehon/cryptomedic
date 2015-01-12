<html manifest="manifest.php">
<?php 
	require_once __DIR__ . "/../../rest/php/core.php";
	Script::$rootPath = __DIR__;
	
	require_once("content.php");
?>
<script>
	if (indexedDB) {
		console.info("[application mode] Enabling offline cache - TODOJH !!!! NOT DONE WHILE DEVELOPPING !!!!");
// 		cryptomedic.settings.offlineCache = true;
	}

	<?php 
		// TODOJH: remove this when local cache is ok!
		if ($request->isServedLocally()) {
			?>
				if (indexedDB) {
					console.warn("Enabling offline cache in local dev");
					cryptomedic.settings.offlineCache = true;
				}
			<?php 
		}
	?>
</script>
</html>
