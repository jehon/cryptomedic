<?php

global $myconfig;
require_once(__DIR__ . '/../../../../../config.php');

define('MY_FOLDER_TMP',  __DIR__ . '/../../storage/framework/cache/');

$pdoConnection = new PDO("mysql:host={$myconfig["database"]["host"]};dbname={$myconfig["database"]["schema"]}", $myconfig["database"]["username"], $myconfig["database"]["password"]);
$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
