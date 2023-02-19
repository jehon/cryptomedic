<?php

// TODO: https://packagist.org/packages/cakephp/database ?
// TODO? https://github.com/paragonie/easydb
// TODO? https://meekro.com/

namespace Cryptomedic\Lib;

use PDO;

use Cryptomedic\Lib\StringsOps;

class DatabaseInvalidParameters extends \Exception {
    function __construct($field, $value) {
        parent::__construct("Field $field has invalid value '$value'", 404);
        $this->field = $field;
        $this->value = $value;
    }
}

class Database {
    static private $pdoConnection = null;

    static protected function init(): void {
        if (Database::$pdoConnection === null) {
            global $myconfig;
            Database::$pdoConnection = new PDO(
                "mysql:host={$myconfig["database"]["host"]};dbname={$myconfig["database"]["schema"]};charset=UTF8",
                $myconfig["database"]["username"],
                $myconfig["database"]["password"],
                [
                    // PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ]
            );
        }
    }

    /**
     * Run a raw exec, returns the number of affected rows if any
     */
    static public function exec(string $request): int {
        self::init();
        // Log::error($request);
        return self::$pdoConnection->exec($request);
    }

    static public function startTransaction(): void {
        self::exec('START TRANSACTION');
    }

    static public function cancelTransaction(): void {
        self::exec('ROLLBACK');
    }

    /**
     * Request must be protected
     */
    static public function select(string $request): \PDOStatement {
        self::init();
        return self::$pdoConnection->query($request);
    }

    /**
     * Request must be protected
     * Group by Field
     * Fields may be not protected
     */ public
    static function selectAsArray(string $request, string $field): array {
        $res = [];
        foreach (self::select($request) as $line) {
            $res[$line[$field]] = $line;
        }
        return $res;
    }

    /**
     * Table will be protected
     * Where must be protected
     */
    static public function selectInTable(string $table, string $where): array {
        DatabaseStructure::checkTableExistsAndGetDefinition($table);
        DatabaseStructure::checkFieldExistsInTableAndGetDefinition($table, 'id');

        return array_map(
            function ($rec) use ($table) {
                return DatabaseStructure::normalizeRecord($table, $rec);
            },
            self::selectAsArray("SELECT * FROM `$table` where $where", 'id')
        );
    }

    /**
     * Table will be protected
     * Id  will be protected
     */
    static public function selectIdInTable(string $table, string $id): array {
        DatabaseStructure::checkFieldExistsInTableAndGetDefinition($table, 'id');

        if (!is_numeric($id)) {
            throw new DatabaseInvalidParameters('id', $id);
        }

        // List: [ id => [records] ]
        $list = self::selectInTable($table, "id = $id");
        if (array_key_exists($id, $list)) {
            return $list[$id];
        }
        throw new Exception("Id not found: $table(id)#$id");
    }

    static public function buildSetStatement(string $table, array $data) {
        self::init();

        $data = array_intersect_key($data, DatabaseStructure::checkTableExistsAndGetDefinition($table));

        $escapedData = array_map(function ($value, $key) {
            if ($value === true) {
                return "$key = 1";
            }
            if ($value === "NOW()") {
                return "$key = NOW()";
            }
            return "$key = " . self::$pdoConnection->quote($value);
        }, $data, array_keys($data));

        $sql = implode(", ", $escapedData);

        return $sql;
    }
}
