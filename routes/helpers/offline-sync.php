<?php

function getOfflineSyncData() {
	// TODO MEDIUM: add offline data
	return null;
	
	
	$sql = "";
	foreach(References::$model2db as $m => $t) {
		if ($sql) {
			$sql .= " UNION ";
		}
		$sql .= "(SELECT lastmodified, '$t' as t, id FROM $t)";
	}

	trace($sql);
	global $server;
	$res = $server->getDatabase()->query("$sql ORDER BY modified, t, id LIMIT 10");
	return $res;
}
