<?php 

/**
 * Principle:
 * The modifications made in master can be redone in the same way on the slave
 * - timestamp x table(ordered) x id
 * --> where ts> or (ts= and tablePriority>=) or (ts= and tablePriority= and id>=)
 *
 */
require(__DIR__ . "/../../../../maintenance.php");

function getParameter($key, $default = null) {
	if (array_key_exists($key, $_REQUEST) && ($_REQUEST[$key] > ""))
		return $_REQUEST[$key];
	if ($default === null)
		die("Parameter not found: $key");
	return $default;
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

global $mysqli;
$mysqli = new mysqli($config['database']['host'],
		$config['database']['login'],
		$config['database']['password'],
		$config['database']['schema']
);

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$ts = getParameter('ts', '0');
$tprio = getParameter('tprio', 0);
$id = getParameter('id', 0);
$n = getParameter('n', 5);

$tables = orderedTableList();

$sql = "";
foreach($tables as $k => $t) {
	if ($sql != "") $sql .= " UNION ";
	$sql .= "(SELECT id, modified, $k as priority, '$t' as `table` " .
	"FROM $t " .
	"WHERE (modified > '$ts') " .
	" OR ((modified = '$ts') AND ($k > $tprio)) " .
	" OR ((modified = '$ts') AND ($k = $tprio) AND (id > $id))" .
	"ORDER BY modified ASC, id ASC LIMIT $n)";
}
$sql = "" . $sql
. " ORDER BY modified ASC, priority ASC, id ASC LIMIT $n";

$res = $mysqli->query($sql);
if ($res === false) myerror("error in union", $mysqli);

$datas = array();
while($row = $res->fetch_assoc()) {
$res_row = $mysqli->query("SELECT * FROM {$row['table']} WHERE id = '{$row['id']}'");
		$data = $res_row->fetch_assoc();
		$data['type'] = $row['table'];
		$datas[] = $data;
		$res_row->close();
}
$res->close();

echo serialize($datas);