<?php

// TODO: Restrict to cli only

require_once(__DIR__ . "/../globalConfig.php");

$mysqldump = "mysqldump --user=" . getGlobalConfig("databaseUsername") 
			. " --password=" . getGlobalConfig("databasePassword")
			. " --host=localhost "
			. " --skip-dump-date "
			. " --add-drop-table"
			;
			
$target = __DIR__ . "/../database_scripts/structure/structure.sql";
unlink($target);
var_dump(exec("$mysqldump --no-data --databases amd_chakaria > '" . $target ."'"));

// var_dump(exec("$mysqldump amd_chakaria --tables > '" . __DIR__ . "/../database_scripts/structure/0 structure.sql'"));

