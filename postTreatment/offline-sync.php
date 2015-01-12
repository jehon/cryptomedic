<?php

if (array_key_exists('HTTP_REFERRER', $_SERVER) && basename($_SERVER['HTTP_REFERRER']) == "index.php") {
	if ($request->getExtension() == "") {
		$sql = "";
		foreach(References::$model2db as $m => $t) {
			if ($sql) {
				$sql .= " UNION ";
			}
			$sql .= "(SELECT lastmodified, '$t' as t, id FROM $t)";
		}
		
		$res = $server->getDatabase()->query("$sql ORDER BY modified, t, id LIMIT 10");
	}
}