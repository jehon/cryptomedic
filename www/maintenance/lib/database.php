<?php

namespace Jehon\Maintenance;

require_once __DIR__ . "/filesystem.php";

use \PDO;
use \PDOException;
use \Exception;

class Database
{
    public $pdo;
    protected static $_debug = false;

    public static function debug($flag = true)
    {
        self::$_debug = $flag;
    }

    public function __construct($pdoURI, $username, $password, $options = [])
    {
        $this->pdo = new PDO($pdoURI, $username, $password, $options);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

        $this->runPrepareStatement("SET time_zone = '+00:00'");
        $this->runPrepareStatement("SET CHARACTER SET 'utf8'");
    }

    public function prepareStatement($sql, $data = [])
    {
        if (self::$_debug) {
            echo "Running prepared statement: $sql [" .
                implode(",", $data) .
                "]<br>";
        }

        $params = [];
        foreach ($data as $key => $value) {
            $params[":" . $key] = $value;
        }

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);

            return $stmt;
        } catch (Exception $e) {
            if ($stmt) {
                $stmt->closeCursor();
            }
            throw new Exception(
                "[ERROR] Invalid statement: " . $sql . "\n" . $e->getMessage(),
                0
            );
        }
    }

    public function runPrepareStatement($sql, $data = [])
    {
        $stmt = $this->prepareStatement($sql, $data);

        if ($stmt->columnCount() > 0) {
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $res = $stmt->rowCount();
        }
        $stmt->closeCursor();
        return $res;
    }

    public function getCurrentDatabase()
    {
        $db = $this->runPrepareStatement("SELECT DATABASE();");
        $db = array_pop($db);
        $db = array_pop($db);
        return $db;
    }

    /**
     * Get the version
     *
     * @return mixed
     */
    public function getVersion()
    {
        $exists = $this->runPrepareStatement(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = :mydb AND table_name = 'settings';",
            ["mydb" => $this->getCurrentDatabase()]
        );

        if (count($exists) < 1) {
            echo "!!! Creating the settings table !!!\n";
            $this->runPrepareStatement(
                "CREATE TABLE IF NOT EXISTS `settings` (
					  `id` varchar(50) NOT NULL,
					  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
					  `updated_at` timestamp NULL DEFAULT NULL,
					  `value` varchar(50) DEFAULT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=utf8;"
            );
        }

        $v = $this->runPrepareStatement(
            "SELECT value FROM settings WHERE id = 'structure_version'"
        );
        if (count($v) < 1) {
            echo "!! Forcing version to 0 !!";
            $this->runPrepareStatement(
                "INSERT INTO `settings` (id, value) VALUE('structure_Version', 0)"
            );
            return 0;
        }
        $v = array_pop($v);
        $v = array_pop($v);
        return $v;
    }

    /**
     * Set the version into the database
     * @param unknown $nv
     */
    public function setVersion($nv)
    {
        $this->runPrepareStatement(
            "UPDATE settings SET value = :version WHERE id = 'structure_version'",
            ["version" => $nv]
        );
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
    public function runFile($filename, $transactionnel = false)
    {
        if (self::$_debug) {
            echo "Running file $filename" .
                ($transactionnel ? " [transactionnel]" : "") .
                "<br>";
        }
        // Thanks to http://stackoverflow.com/a/2011454/1954789
        $delimiter = ";";
        set_time_limit(0);

        if (is_file($filename) !== true) {
            echo "File not found: $filename";
            return false;
        }
        $file = fopen($filename, "r");
        if (is_resource($file) !== true) {
            return false;
        }
        if ($transactionnel) {
            $this->pdo->beginTransaction();
        }
        $query = [];
        $i = 0;
        while (feof($file) === false) {
            $query[] = fgets($file);

            if (
                preg_match(
                    "~" . preg_quote($delimiter, "~") . '\s*$~iS',
                    end($query)
                ) === 1 ||
                feof($file)
            ) {
                $i++;
                $query = trim(implode("", $query));
                if (strlen(trim($query)) < 1) {
                    continue;
                }
                $query = str_replace("@@", ";", $query);

                $this->runPrepareStatement($query, [], "running query $i");
                if ($i % 50 == 0) {
                    echo "$i\n";
                }
            }

            if (is_string($query) === true) {
                $query = [];
            }
        }
        fclose($file);
        if ($transactionnel) {
            return $this->pdo->commit();
        }
        return true;
    }

    public function runDirectory($fromDir)
    {
        if (self::$_debug) {
            echo "Running directory $fromDir<br>";
        }

        $list = myglob($fromDir . "/*.sql");
        natsort($list);

        foreach ($list as $f) {
            $name = basename($f);
            $nextVersion = getVersionIn($f);
            if ($nextVersion != "") {
                if (
                    $this->getVersion() == $nextVersion ||
                    strnatcmp($this->getVersion(), $nextVersion) > 0
                ) {
                    echo "\nSkipping $name [$nextVersion]";
                    continue;
                }
            }

            echo "\nTreating $name [$nextVersion]: ";
            $res = $this->runFile($f);
            echo " = " . $res . "\n";
            if (!$res) {
                return false;
            }

            if ($nextVersion != "") {
                $this->setVersion($nextVersion);
            }
        }
    }

    public function runFileOrDirectory($pathOrFile)
    {
        if (is_dir($pathOrFile)) {
            $this->runDirectory($pathOrFile);
        } else {
            $this->runFile($pathOrFile);
        }
    }
}

global $db;
$db = new \Jehon\Maintenance\Database(
    "mysql:dbname={$myconfig["database"]["schema"]};host={$myconfig["database"]["host"]}",
    $myconfig["database"]["username"],
    $myconfig["database"]["password"]
);
