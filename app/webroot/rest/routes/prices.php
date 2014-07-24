<?php

$labels = new DBTable($server->getConfig("database"), "prices", $server, 
	array("BYKEY" => "reference")
);

$list = $labels->rowAll();
$nlist = array();
foreach($list as $k => $v) {
	$nlist[$v['id']] = $v;
}

$response->ok($nlist);
