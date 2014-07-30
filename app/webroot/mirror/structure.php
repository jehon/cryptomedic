<pre>
<?php 
require(__DIR__ . "/../../../../maintenance.php");

function versionAfter($before, $after) {
	$beforea = explode(".", $before);
	$aftera = explode(".", $after);
	foreach($beforea as $i => $v) {
		if (!array_key_exists($i, $aftera)) return false;
		if ($beforea[$i] < $aftera[$i]) return true;
		if ($beforea[$i] > $aftera[$i]) return false;
	}
	if (count($beforea) == count($aftera)) return false;
	return true;
}

function myerror($msg, $mysqli = null) {
	echo "\n";
	if ($msg != null) {
		if (strlen($msg) > 0) {
			echo "$msg: ";
		}
	}
	if ($mysqli != null) {
		echo "FAILED #" . $mysqli->errno . ":\n" . $mysqli->error . "\n";
	}
	die("** ERROR **\n");
}

global $mysqli;
$mysqli = new mysqli($config['database']['host'],
		$config['database']['login'],
		$config['database']['password'],
		$config['database']['schema']
);

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$res = $mysqli->query("SELECT `value` FROM `settings` WHERE `id` = 'structure_version' ORDER BY `id` ASC");

if ($res === false) {
	$version = "";
} else {
	if ($res->num_rows > 1) {
		myerror("Too much infos in the database");
	}
	
	if ($res->num_rows == 0) {
		$version = "0";
	} else {
		$version = $res->fetch_array();
		$version = array_pop($version);
	}
}
echo "Current version: $version\n";

if (!array_key_exists("nextVersion", $_REQUEST))
	die("Please specify version");

$nextVersion = $_REQUEST['nextVersion'];
echo "Requesting version: $nextVersion\n";
$f = __DIR__ . "/upgrade.sql/" . $nextVersion . ".sql";
if (!file_exists($f))
	die("Version does not exists");

// foreach(glob(__DIR__ . "/upgrade.sql/*") as $f) {
	// $nextVersion = basename($f, ".sql");
	$nextVersion = $nextVersion;
	if (!versionAfter($version, $nextVersion)) {
		continue;
	}
	echo "Treating $f [$nextVersion]: ";
	$content = file_get_contents($f);
	if (preg_match("/USE `amd_chakaria`/i", $content)) {
		die("Use close detected");
	}
	
	$i = 1;
	$mysqli->autocommit(false);
	if ($mysqli->multi_query($content)) {
		while ($mysqli->more_results() && $mysqli->next_result()) {
			$i++;
			echo ".";
		} // flush multi_queries
	} 
	if ($mysqli->errno) {
		myerror("Executing the batch failed @$i?", $mysqli);
	}
	
	echo "ok";
	$ures = $mysqli->query("UPDATE `settings` SET `value`= '$nextVersion' WHERE `id` = 'structure_version'");
	if ($ures === false) {
		echo " !! version not updated: " . $mysqli->errno . ":\n" . $mysqli->error;
	}
	$mysqli->commit();
	echo "\n";
// }
