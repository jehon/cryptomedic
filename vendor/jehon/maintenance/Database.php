<?php
namespace Jehon\Maintenance;

require_once(__DIR__ . "/lib/parameters.php");
require_once(__DIR__ . "/lib/myglob.php");

use \PDO;
use \PDOException;
use \Exception;

class Database {
	public $pdo;

	static public function run($list, $pdoURI, $username, $password, $options =array()) {
		echo "<pre>";
		$db = new Database($pdoURI, $username, $password, $options);
		$db->runAll($list);
		echo "</pre>";
	}
	
	public function __construct($pdoURI, $username, $password, $options = array()) {
		$this->pdo = new PDO($pdoURI, $username, $password, $options);
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	
	public function runPrepareSqlStatement($sql, $data = array()) {
		$params = array();
		foreach($data as $key => $value) {
			$params[":" . $key] = $value;
		}
	
		try {
			$stmt = $this->pdo->prepare($sql);
		} catch (Exception $e) {
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
			echo "!!no version found!!";
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
					
				try {
					$this->runPrepareSqlStatement($query, array(), "running query $i");
				} catch (Exception $e) {
					var_dump($e);
					die("Error executing sql: " . $query);
				}
				echo ".";
				if ($i % 50 == 0) {
					echo "$i\n";
				}
	
				while (ob_get_level() > 0) {
					ob_end_flush();
				}
				flush();
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
		try {
			if (is_dir($pathOrFile)) {
				$this->runDirectory($pathOrFile);
			} else {
				$this->runFile($pathOrFile);
			}
		} catch (Exception $e) {
			var_dump($e);
			exit (-1);
		}
		echo "\n";	
	}
	
	public function runAll($list) {
		foreach($list as $l) {
			$this->runOne($l);
		}
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