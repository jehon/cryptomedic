<?php 
require(__DIR__ . "/../../../../maintenance.php");

function getParameter($key, $default = null) {
	if (array_key_exists($key, $_REQUEST))
		return $_REQUEST[$key];
	if ($default === null)
		die("Parameter not found: $key");
	return $default;
}

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

function mylog($arg) {
	//echo $arg;
}

function orderedTableList() {
	global $mysqli;
	$tables = array();
	$res = $mysqli->query("show tables");
	while($row = $res->fetch_array()) {
		$tables[] = array_pop($row);
	}
	$res->close();
	$list = array_unique(array_merge(array("settings", "labels", "deleted", "prices", "patients"), $tables));
	array_shift($list);
	return $list;
}

$mysqli = new mysqli($config['database']['host'],
		$config['database']['login'],
		$config['database']['password'],
		$config['database']['schema']
);

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
mylog("Host infos: " . $mysqli->host_info . "\n");
