<?php

$labels = $server->getDatabase()->getTable("labels", array("BYKEY" => "reference"));

$list = $labels->rowAll();
$nlist = array();
foreach($list as $l) {
	if ($l['english'] == "") continue;
	$nlist[$l['id']] = $l['english'];
}

$response->ok($nlist);