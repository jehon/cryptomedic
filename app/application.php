<html manifest="manifest.php?_version=<?php echo time(); ?>">
<?php 
	require_once __DIR__ . "/../../rest/php/core.php";
	Script::$rootPath = __DIR__;
	
	(new AllScripts("offline/*.js"))->dependFile()->toPrint();
	
	require_once("index.php");
	
?>
</html>
