<?php

require_once(__DIR__ . "/lib/config.php");
require_once(__DIR__ . "/lib/protect.php");

echo "<pre>";

$date = date('Y-m-d_H-i-s');

/**
 * Prepare the file
 */
$dir = $myconfig['folders']['backups'];
echo "Creating folder $dir\n";
if (! is_dir($dir)) {
    mkdir($dir, 0777) || die("Could not create backup folder $dir");
    chmod($dir, 0777) || die("Could not chmod backup folder $dir");
}

$backup_file = "$dir/backup.sql";
echo "Creating file $backup_file\n";
if (file_exists($backup_file)) {
    unlink($backup_file);
}
$fileHandler = fopen($backup_file, 'w+');
chmod($backup_file, 0666) || die("Could not chmod backup file $backup_file");

echo "Writing headers\n";
fwrite($fileHandler, "\n") || die("Could not write to file");
fwrite($fileHandler, "-- \n");
fwrite($fileHandler, "-- \n");
fwrite($fileHandler, "-- Backup generated at $date\n");
fwrite($fileHandler, "-- \n");
fwrite($fileHandler, "-- \n");
fwrite($fileHandler, "\n\n");

#
# Disable strict mode
#    Some data are not perfectly ok, so let's do our best...
#
#    https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sql-mode-strict
#
fwrite($fileHandler, "SET sql_mode = '';\n");

/**
 * Get All Table Names From the Database
 */
echo "\n";
echo "Getting tables\n";
$result = $db->runPrepareStatement("SHOW TABLES");
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
    $result = $db->runPrepareStatement("SHOW CREATE TABLE $table");
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
    try {
        fwrite($fileHandler, "\n");
        $stmt = $db->prepareStatement("SELECT * FROM $table");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $keys = "";
            $vals = "";

            foreach($row as $key => $val) {
                $keys .= '`' . $key . '`,';
                if ($val === null) {
                    $vals .= 'NULL,';
                } else {
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
    } finally {
        if ($stmt) {
            $stmt->closeCursor();
        }
    }
}

/**
 * Close the file
 */
fwrite($fileHandler, "\n");
fwrite($fileHandler, "-- Generating backup done\n");
fwrite($fileHandler, "\n");
fclose($fileHandler); 

echo "\n";
echo "Generating backup done\n";
echo "Ok\n";
echo "\n";
