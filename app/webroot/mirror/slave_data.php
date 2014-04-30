<?php 

/**
 * Principle:
 * - Calculate last modification informations
 * - Treat each line while reading them (so that deleted occur at the right moment in the chain
 *  
 */

require_once("utilities.php");

//var_export(modificationList('2014-01-01 00:00:00', 5));

$tables = orderedTableList();

$sql = "";
foreach($tables as $k => $t) {
	if ($sql != "") $sql .= " UNION ";
	$sql .= "(SELECT id, modified, $k as priority, '$t' as `table` FROM $t ORDER BY modified DESC, id DESC LIMIT 1)";
}
$sql = "" . $sql
. " ORDER BY modified DESC, priority DESC, id DESC LIMIT 1";

$res = $mysqli->query($sql);
if ($res === false) myerror("error in union", $mysqli);

$ref = $res->fetch_assoc();
$res->close();

var_dump($ref);

$url = $config['mirror']['master'] . "/mirror/master_data.php?ts=" . urlencode($ref['modified']) 
	. "&tprio=" . $ref['priority']
	. "&id=" . $ref['id']
	. "&n=5";

// TODO: Quid time-out and errors?
$data = unserialize(file_get_contents($url));

var_dump($data);
