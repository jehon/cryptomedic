<?php

define('STORAGE_FILE', __DIR__ . '/../storage/framework/cache/database.json');

// 1. Connect to the database

// 2. Load the database structure

if (defined('PATCH_DB') || !file_exists(constant('STORAGE_FILE'))) {
    $dir = dirname(constant('STORAGE_FILE'));
    is_dir($dir) || mkdir($dir, 0777, true);

    $dataStructure = [ 1, 2, 3 ];

    $export = 'define("DATABASE_STRUCTURE", ' . var_export($dataStructure, true) . ');';

    file_put_contents(constant('STORAGE_FILE'), "<?php $export") 
        || die("Could not save data to file " . constant('STORAGE_FILE'));
}

require(constant('STORAGE_FILE'));
