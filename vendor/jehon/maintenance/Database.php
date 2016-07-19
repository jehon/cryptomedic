<?php
namespace Jehon\Maintenance;

require_once(__DIR__ . "/lib/getParameter.php");
require_once(__DIR__ . "/lib/myglob.php");

use \PDO;
use \PDOException;
use \Exception;

class Database {
	public $pdo;
	protected static $debug = false;

	static public function run($list, $pdoURI, $username, $password, $options =array()) {
		echo "<pre>";
		$db = new Database($pdoURI, $username, $password, $options);
		$db->runAll($list);
		echo "</pre>";
	}

	static public function debug($flag = true) {
		self::$_debug = $flag;
	}

	public function __construct($pdoURI, $username, $password, $options = array()) {
		$this->pdo = new PDO($pdoURI, $username, $password, $options);
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

		$this->runPrepareSqlStatement("SET time_zone = '+00:00'");
		$this->runPrepareSqlStatement("SET CHARACTER SET 'utf8'");
	}

	public function runPrepareSqlStatement($sql, $data = array()) {
		if (self::$_debug) {
			echo "Running prepared statement: $sql [" . implode($data, ",") .  "]<br>";
		}

		$params = array();
		foreach($data as $key => $value) {
			$params[":" . $key] = $value;
		}

		try {
			$stmt = $this->pdo->prepare($sql);
		} catch (Exception $e) {
			if ($stmt) {
				$stmt->closeCursor();
			}
			throw new Exception("[$dbgMsg] Invalid statement: " . $sql, $e);
		}

		$stmt->execute($params);

		if ($stmt->columnCount() > 0) {
			$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		} else {
			$res = $stmt->rowCount();
		}
		$stmt->closeCursor();
		return $res;
	}

	/**
	 * Get the version
	 *
	 * @return mixed
	 */
	public function getVersion() {
		try {
			$v = $this->runPrepareSqlStatement("SELECT value FROM settings WHERE id = 'structure_version'");
			$v = array_pop($v);
			$v = array_pop($v);
			return $v;
		} catch (PDOException $e) {
			echo "!!no version found!! " . $e->getMessage();
			return "";
		}
	}

	/**
	 * Set the version into the database
	 * @param unknown $nv
	 */
	public function setVersion($nv) {
		$this->runPrepareSqlStatement("UPDATE settings SET value = :version WHERE id = 'structure_version'", array('version' => $nv));
	}

	/**
	 * Execute a huge file on the SQL database (small files can work also).
	 *
	 * This is only used in the restore database system route, and in the upgrade database.
	 *
	 * @param String $file
	 * @param string $transactionnel
	 * @return boolean success or failure
	 */
	public function runFile($filename, $transactionnel = false) {
		if (self::$_debug) {
			echo "Running file $filename" . ($transactionnel ? " [transactionnel]" : "") . "<br>";
		}
		// Thanks to http://stackoverflow.com/a/2011454/1954789
		$delimiter = ";";
		set_time_limit(0);

		if (is_file($filename) !== true) {
			echo "File not found: $filename";
			return false;
		}
		$file = fopen($filename, 'r');
		if (is_resource($file) !== true) {
			return false;
		}
		if ($transactionnel) {
			$this->pdo->beginTransaction();
		}
		$query = array();
		$i = 0;
		while (feof($file) === false) {
			$query[] = fgets($file);

			if ((preg_match('~' . preg_quote($delimiter, '~') . '\s*$~iS', end($query)) === 1) || (feof($file))){
				$i++;
				$query = trim(implode('', $query));
				if (strlen(trim($query)) < 1) {
					continue;
				}

				$this->runPrepareSqlStatement($query, array(), "running query $i");
				// echo ".";
				if ($i % 50 == 0) {
					echo "$i\n";
					flush();
				}

				// while (ob_get_level() > 0) {
					// ob_end_flush();
				// }
				// flush();
			}

			if (is_string($query) === true) {
				$query = array();
			}
		}
		fclose($file);
		if ($transactionnel) {
			return $this->pdo->commit();
		}
		return true;
	}

	public function runDirectory($fromDir) {
		if (self::$_debug) {
			echo "Running directory $fromDir<br>";
		}

		$version = $this->getVersion();
		$list = \Jehon\Maintenance\Lib\myglob($fromDir . "/*.sql");
		natsort($list);

		foreach($list as $f) {
			$nextVersion = basename($f, ".sql");
			if (preg_match("~^(\d+)~", basename($f, ".sql"), $nn)) {
				if (count($nn) > 1) {
					$nextVersion = $nn[1];
				} else {
					echo "\n  Skipped (invalid version) $f";
					continue;
				}
			} else {
				echo "\n  Skipped (no version) $f";
				continue;
			}

			if (($nextVersion == $version)
					|| (strnatcmp($version, $nextVersion) > 0)) {
				echo "\nSkipping $f [$nextVersion]";
				continue;
			}

			echo "\nTreating $f [$nextVersion]: ";
			$res = $this->runFile($f, true);
			echo " = " . $res;
			if (!$res) {
				return false;
			}
			$this->setVersion($nextVersion);
		}
	}

	public function runOne($pathOrFile) {
		echo "\n*** $pathOrFile ***\n";
		if (is_dir($pathOrFile)) {
			$this->runDirectory($pathOrFile);
		} else {
			$this->runFile($pathOrFile);
		}
		echo "\n";
	}

	public function runAll($list) {
		foreach($list as $l) {
			$this->runOne($l);
		}
	}

	public function backupTable($table) {
	  $result = $mysqli->query('SELECT * FROM '. $table);
	  // Get number of fields (columns) of each table
	  $num_fields = $mysqli->field_count  ;
	  // Add table information
	  $return .= "--\n" ;
	  $return .= '-- Tabel structure for table `' . $table . '`' . "\n" ;
	  $return .= "--\n" ;
	  $return.= 'DROP TABLE  IF EXISTS `'.$table.'`;' . "\n" ;
	  // Get the table-shema
	  $shema = $mysqli->query('SHOW CREATE TABLE '.$table) ;
	  // Extract table shema
	  $tableshema = $shema->fetch_row() ;
	  // Append table-shema into code
	  $return.= $tableshema[1].";" . "\n\n" ;
	  // Cycle through each table-row
	  while($rowdata = $result->fetch_row())
	  {
	  	// Prepare code that will insert data into table
      $return .= 'INSERT INTO `'.$table .'`  VALUES ( '  ;
      // Extract data of each row
      for($i=0; $i<$num_fields; $i++)
      {
	       $return .= '"'.$mysqli->real_escape_string($rowdata[$i]) . "\"," ;
      }
      // Let's remove the last comma
      $return = substr("$return", 0, -1) ;
      $return .= ");" ."\n" ;
	  }
		$return .= "\n\n" ;
	}

	public function backup() {
		// https://github.com/vkt005/php-mysql-db-backup/

		// Introduction information
		$return='';
		$return .= "--\n";
		$return .= "-- A Mysql Backup System \n";
		$return .= "--\n";
		$return .= '-- Export created: ' . date("Y/m/d") . ' on ' . date("h:i") . "\n\n\n";
		$return = "--\n";
		$return .= "-- Database : " . DB_NAME . "\n";
		$return .= "--\n";
		$return .= "-- --------------------------------------------------\n";
		$return .= "-- ---------------------------------------------------\n";
		$return .= 'SET AUTOCOMMIT = 0 ;' ."\n" ;
		$return .= 'SET FOREIGN_KEY_CHECKS=0 ;' ."\n" ;
		$tables = array() ;
		// Exploring what tables this database has
		$result = $mysqli->query('SHOW TABLES' ) ;
		// Cycle through "$result" and put content into an array
		while ($row = $result->fetch_row()) {
		    $tables[] = $row[0] ;
		}
		// Cycle through each  table
		foreach($tables as $table) {
				$return .= $this->backupTable($table);
		}
		// Close the connection
		$mysqli->close() ;
		$return .= 'SET FOREIGN_KEY_CHECKS = 1 ; '  . "\n" ;
		$return .= 'COMMIT ; '  . "\n" ;
		$return .= 'SET AUTOCOMMIT = 1 ; ' . "\n"  ;
		//$file = file_put_contents($fileName , $return) ;
		$zip = new ZipArchive() ;
		$resOpen = $zip->open(BACKUP_DIR . '/' .$fileName.".zip" , ZIPARCHIVE::CREATE) ;
		if( $resOpen ){
		$zip->addFromString( $fileName , "$return" ) ;
		    }
		$zip->close() ;
		$fileSize = get_file_size_unit(filesize(BACKUP_DIR . "/". $fileName . '.zip')) ;
		// Function to append proper Unit after file-size .
	}

	// function databasePurge() {
	// 	global $pdo;
	// 	global $config;
	// 	$schema = $config['database']['pdo_schema'];

	//  	$res = databasePrepareSqlStatement("DROP DATABASE IF EXISTS " . $schema);
	//  	$res = databasePrepareSqlStatement("CREATE DATABASE " . $schema);
	//  	$res = databasePrepareSqlStatement("USE " . $schema);
	// 	return "Purge Database ok";
	// }
}
