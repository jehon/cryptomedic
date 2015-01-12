<html manifest="manifest.php?2">
<?php 
	require_once __DIR__ . "/../../rest/php/core.php";
	Script::$rootPath = __DIR__;
	
	require_once("online.php");
?>
<script>
<?php 
	// TODOJH: remove this when local cache is ok!
	if ($request->isServedLocally()) {
		?>
			<script>
				console.warn("Enabling offline cache in local dev");
				if (indexedDB) {
					cryptomedic.settings.offlineCache = true;
				}
			</script>
		<?php 
	}
?>

	if (indexedDB) {
		console.info("[application mode] Enabling offline cache - TODOJH !!!! NOT DONE WHILE DEVELOPPING !!!!");
// 		cryptomedic.settings.offlineCache = true;
	}
</script>
</html>
