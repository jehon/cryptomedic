<?php

require_once __DIR__ . "/lib/config.php";
require_once __DIR__ . "/lib/protect.php";

echo "<pre>";

$date = date("Y-m-d_H-i-s");

/**
 * Prepare the file
 */
$dir = $myconfig["folders"]["backups"];
echo "Creating folder $dir\n";
if (!is_dir($dir)) {
  mkdir($dir, 0777) || die("Could not create backup folder $dir");
  chmod($dir, 0777) || die("Could not chmod backup folder $dir");
}

$backup_file = "$dir/backup.sql";
echo "Creating file $backup_file\n";
if (file_exists($backup_file)) {
  unlink($backup_file);
}
$fileHandler = fopen($backup_file, "w+");
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
usort($tables, function ($a, $b) {
  $A_BEFORE_B = -1; # a < b = -1
  $A_AFTER_B = 1; # a > b = 1
  if ($a == $b) {
    return 0;
  }

  # First one:
  if ($a == "patients") {
    return $A_BEFORE_B;
  }
  if ($b == "patients") {
    return $A_AFTER_B;
  }

  # Next one:
  if ($a == "prices") {
    return $A_BEFORE_B;
  }
  if ($b == "prices") {
    return $A_AFTER_B;
  }

  # Next one:
  if ($a == "bills") {
    return $A_BEFORE_B;
  }
  if ($b == "bills") {
    return $A_AFTER_B;
  }

  # Last one:
  if ($a == "consults") {
    return $A_AFTER_B;
  }
  if ($b == "consults") {
    return $A_BEFORE_B;
  }

  # Order naturally the rest
  return $a < $b ? $A_BEFORE_B : $A_AFTER_B;
});
echo "Found: " . join(", ", $tables) . "\n";

echo "\n";
echo "Saving data:"; # newline added in for loop
foreach ($tables as $table) {
  echo "\n";
  echo "- Saving $table";
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
  $results = $db->runPrepareStatement("SHOW CREATE TABLE $table");
  # First line (the only one present)
  $result = array_pop($results);

  /*
    $result =
        Table:
            ["Table"] => "users"
            ["Create Table"] => "CREATE TABLE ...

        View:
            ["View"] => "consults"
            ["Create View"] => string(2045) "CREATE ...
            ["character_set_client"] => "utf8mb4"
            ["collation_connection"] =>"utf8mb4_unicode_ci"

    */

  $create_sql = array_values($result)[1];

  if (isset($result["View"])) {
    echo " (view)";

    # CREATE ALGORITHM=UNDEFINED DEFINER=`cryptomekpmain`@`%` SQL SECURITY DEFINER VIEW => CREATE VIEW
    fwrite(
      $fileHandler,
      preg_replace("/CREATE .* VIEW/", "CREATE VIEW", $create_sql) . ";\n"
    );
    fwrite($fileHandler, "\n");

    # We don't save views
    continue;
  }

  fwrite($fileHandler, $create_sql . ";\n");
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

      foreach ($row as $key => $val) {
        $keys .= "`" . $key . "`,";
        if ($val === null) {
          $vals .= "NULL,";
        } else {
          $vals .= $db->pdo->quote($val) . ",";
        }
      }
      $sqlScript =
        "INSERT INTO $table (" .
        rtrim($keys, ",") .
        ") VALUES (" .
        rtrim($vals, ",") .
        "); \n";
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

/**
 * Zipping the file
 */
echo "\n";
$zipFile = $backup_file . ".zip";
echo "Zipping the file to $zipFile\n";
echo "\n";
if (file_exists($zipFile)) {
  unlink($zipFile);
}

$zip = new ZipArchive();
if ($zip->open($zipFile, ZipArchive::CREATE) === true) {
  $zip->addFile($backup_file);
  $zip->close();
}
unlink($backup_file);
echo "\n";
echo "Zipping the file done\n";
echo "\n";

echo "\n";
echo "\n";
echo "Generating backup done\n";
echo "Ok\n";
echo "\n";
