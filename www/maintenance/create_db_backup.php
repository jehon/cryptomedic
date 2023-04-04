<?php

require_once(__DIR__ . "/lib/config.php");
require_once(__DIR__ . "/lib/protect.php");

echo "<pre>";

/**
 * Prepare the file
 */
echo "Creating folder\n";
$dir = $myconfig['folders']['backups'];
if (! is_dir($dir)) {
    mkdir($dir, 0777) || die("Could not create backup folder");
    chmod($dir, 0777) || die("Could not chmod backup folder");
}
$backup_file = 'backup_' . date('Y-m-d_H-i-s') . '.sql';
$backup_path = "$dir/$backup_file";
echo "Creating file $backup_file\n";
$fileHandler = fopen($backup_path, 'w+');
chmod($backup_path, 0666) || die("Could not chmod backup file");

echo "Writing headers\n";
fwrite($fileHandler, "\n\n") || die("Could not write to file");

/**
 * Get All Table Names From the Database
 */
echo "\n";
echo "Getting tables\n";
$result = $db->runPrepareSqlStatement("SHOW TABLES");
$tables = array_map(fn($a) => array_pop($a), $result);
usort($tables, function($a, $b) {
    # a < b = -1
    # a > b = 1

    if ($a == $b) return 0;

    # First one:
    if ($a == "patients") return -1;
    if ($b == "patients") return 1;

    # Next one:
    if ($a == "prices") return -1;
    if ($b == "prices") return 1;
    
    # Next one:
    if ($a == "bills") return -1;
    if ($b == "bills") return 1;

    # Order naturally the rest
    return ($a < $b) ? -1 : 1;
});
echo "Found: " . join(', ', $tables) . "\n";

echo "\n";
echo "Saving data:\n";
foreach ($tables as $table) {
    echo "- Saving $table\n";
    fwrite($fileHandler, "\n\n");
    fwrite($fileHandler, "-- ---------------------------------------\n");
    fwrite($fileHandler, "-- \n");
    fwrite($fileHandler, "-- $table\n");
    fwrite($fileHandler, "-- \n");
    fwrite($fileHandler, "-- ---------------------------------------\n");
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
    fwrite($fileHandler, $result . ";\n");
    fwrite($fileHandler, "\n");
  
    /**
     * Table data
     */
    fwrite($fileHandler, "\n");
    $result = $db->runPrepareSqlStatement("SELECT * FROM $table");
    foreach($result as $row) {
        $keys = "";
        $vals = "";

        foreach($row as $key => $val) {
            if ($val) {
                $keys .= '`' . $key . '`,';
                $vals .= $db->pdo->quote($val) . ',';
            }
        }
        $sqlScript = 
            "INSERT INTO $table ("
            . rtrim($keys, ',')
            . ") VALUES ("
            . rtrim($vals, ',')
            . "); \n";
        fwrite($fileHandler, $sqlScript);
    }
}

/**
 * Close the file
 */
fclose($fileHandler); 

echo "\n";
echo "Generating backup done\n";
echo "Ok";
