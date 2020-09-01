<?php

define('STORAGE_FILE', __DIR__ . '/../storage/framework/cache/database.json');

echo "In database-structure.php\n<br>";

// 1. Connect to the database

// 2. Load the database structure

if (defined('PATCH_DB') || !file_exists(constant('STORAGE_FILE'))) {
    $dir = dirname(constant('STORAGE_FILE'));
    mkdir($dir, 0777, true);

    file_put_contents(constant('STORAGE_FILE'), '$databaseStructure = ' .var_export($dataStructure, true)) 
        || die("Could not save data to file " . constant('STORAGE_FILE'));
}

require(constant('STORAGE_FILE'));
