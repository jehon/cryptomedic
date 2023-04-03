<?php

require_once(__DIR__ . "/lib/config.php");
require_once(__DIR__ . "/lib/protect.php");

echo "<pre>";

/**
 * Prepare the file
 */
$dir = $myconfig['folders']['backups'];
if (! is_dir($dir)) {
    mkdir($dir, 0777) || die("Could not create backup folder");
    chmod($dir, 0777) || die("Could not chmod backup folder");;
}
$backup_file_name = $dir . '/backup_' . time() . '.sql';
$fileHandler = fopen($backup_file_name, 'w+');
chmod($backup_file_name, 0666) || die("Could not chmod backup file");;

/**
 * Get All Table Names From the Database
 */
$result = $db->runPrepareSqlStatement("SHOW TABLES");
$tables = array_map(fn($a) => array_pop($a), $result);

foreach ($tables as $table) {
    fwrite($fileHandler, "\n\n");
    fwrite($fileHandler, "-----------------------------------------\n");
    fwrite($fileHandler, "-- \n");
    fwrite($fileHandler, "-- $table\n");
    fwrite($fileHandler, "-- \n");
    fwrite($fileHandler, "-----------------------------------------\n");
    fwrite($fileHandler, "\n");

    /**
     * Table structure
     */
    $result = $db->runPrepareSqlStatement("SHOW CREATE TABLE $table");
    $result = array_pop($result);
    if (isset($result["View"])) {
        # We don't save views
        continue;
    }
    $result = array_pop($result);
    fwrite($fileHandler, $result);
    fwrite($fileHandler, "\n");
  
    /**
     * Table data
     */
    fwrite($fileHandler, "\n");
    $result = $db->runPrepareSqlStatement("SELECT * FROM $table");
    foreach($result as $row) {
        $sqlScript = "INSERT INTO $table VALUES(";
        foreach($row as $key => $val) {
            if ($val) {
                $sqlScript .= '"' . $val . '"';
            } else {
                $sqlScript .= '""';
            }
            $sqlScript .= ',';
        }
        $sqlScript = rtrim($sqlScript, ',');
        $sqlScript .= ");\n";
        fwrite($fileHandler, $sqlScript);
    }
}

/**
 * Close the file
 */
fclose($fileHandler); 

echo "Ok";