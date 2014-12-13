<?php

$prices = $server->getDatabase()->getTable("prices", array("BYKEY" => "reference"));

$list = $prices->rowAll();
$nlist = array();
foreach($list as $k => $v) {
	$nlist[$v['id']] = $v;
}

$response->ok($nlist);
