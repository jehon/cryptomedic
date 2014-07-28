<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

$table = new TableRoute($request, $response, $server, "users", 
	array(DBTable::PRIVATE_COLUMNS => array("password"))
	);
$table->route();
