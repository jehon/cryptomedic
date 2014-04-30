<pre>
<?php 
require_once("utilities.php");

$res = $mysqli->query("SELECT `value` FROM `settings` WHERE `id` = 'structure_version' ORDER BY `id` ASC");

if ($res === false) {
	$version = "";
} else {
	if ($res->num_rows > 1) {
		myerror("Too much infos in the database");
	}
	
	$version = $res->fetch_array();
	$version = array_pop($version);
}
echo "Current version: $version\n";

foreach(glob(__DIR__ . "/upgrade.sql/*") as $f) {
	$target_v = basename($f, ".sql");
	if (!versionAfter($version, $target_v)) {
		mylog("Skipping $f [$target_v]\n");
		continue;
	}
	echo "Treating $f [$target_v]: ";
	$content = file_get_contents($f);
	if (!$mysqli->multi_query($content)) {
		myerror("Executing the content failed", $mysqli);
	}
	echo "ok\n";
	$res = $mysqli->query("UPDATE `settings` SET `value`= '$target_v' WHERE `id` = 'structure_version' ORDER BY `id` ASC");
}
