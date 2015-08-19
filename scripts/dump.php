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

// Backup the structure
var_dump(exec("$mysqldump --databases amd_chakaria --no-data > '" . $target ."'"));

// Backup the table settings
var_dump(exec("$mysqldump --databases amd_chakaria --tables settings >> '" . $target ."'"));

// Commit the file to the repository
var_dump(exec("git commit -m 'updating the structure' '$target'"));

var_dump("done");
 