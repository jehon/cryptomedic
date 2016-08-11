<?php
namespace Jehon\Maintenance;

use \PDO;
use \PDOException;
use \Exception;

function myglob($glob, $recursive = false) {
 	$pattern = basename($glob);
 	$path = dirname($glob);
	if ($path == DIRECTORY_SEPARATOR) return array(".");

	if (!is_readable($path)) {
		throw new Exception("Path is not readable $path");
	}

	$handle = opendir($path);
 	if ($handle === false) {
    return array();
  }
 	$list = array();
  while (false !== ($file = readdir($handle))) {
   	if ($file == ".") {
			continue;
    }
    if ($file == "..") {
    	continue;
	  }
		if (is_file(dirname($glob) . DIRECTORY_SEPARATOR . $file) && fnmatch($pattern, $file)) {
	  	$list[] = $path . DIRECTORY_SEPARATOR . $file;
	  }
	  if (is_dir(dirname($glob) . DIRECTORY_SEPARATOR . $file) && $recursive) {
	  	$res = myglob(dirname($glob) . DIRECTORY_SEPARATOR . $file . DIRECTORY_SEPARATOR . basename($glob), $recursive);
	  	$list = array_merge($list, $res);
	  }
	}
  closedir($handle);
  natsort($list);
  return $list;
}

class Database {
	public $pdo;
	protected static $_debug = false;

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

	public function getCurrentDatabase() {
		$db = $this->runPrepareSqlStatement("SELECT DATABASE();");
		$db = array_pop($db);
		$db = array_pop($db);
		return $db;
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
				if ($i % 50 == 0) {
					echo "$i\n";
					flush();
				}
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
		$list = myglob($fromDir . "/*.sql");
		natsort($list);

		foreach($list as $f) {
			$nextVersion = basename($f, ".sql");
			if (preg_match("~^(\d+)~", basename($f, ".sql"), $nn)) {
				if (count($nn) > 1) {
					$nextVersion = $nn[1];
					if (($nextVersion == $version)
							|| (strnatcmp($version, $nextVersion) > 0)) {
						echo "\nSkipping $f [$nextVersion]";
						continue;
					}
				}
			} else {
				$nextVersion = "invalid";
			}

			echo "\nTreating $f [$nextVersion]: ";
			$res = $this->runFile($f, true);
			echo " = " . $res;
			if (!$res) {
				return false;
			}

			if ($nextVersion != "invalid") {
				$this->setVersion($nextVersion);
			}
		}
	}

	public function runFileOrDirectory($pathOrFile) {
		if (is_dir($pathOrFile)) {
			$this->runDirectory($pathOrFile);
		} else {
			$this->runFile($pathOrFile);
		}
	}
}
