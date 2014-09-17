<?php

$prices = $server->getDatabase()->getTable("prices", array("BYKEY" => "reference"));
// $labels = new DBTable($server->getConfig("database"), "prices", $server, 
// 	array("BYKEY" => "reference")
// );

$list = $prices->rowAll();
$nlist = array();
foreach($list as $k => $v) {
	$nlist[$v['id']] = $v;
}

$response->ok($nlist);
