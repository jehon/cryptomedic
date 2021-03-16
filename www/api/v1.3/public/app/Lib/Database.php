<?php

// TODO: https://packagist.org/packages/cakephp/database ?
// TODO? https://github.com/paragonie/easydb
// TODO? https://meekro.com/

namespace Cryptomedic\Lib;

use PDO;

use Cryptomedic\Lib\StringsOps;

class DatabaseQueryException extends TechnicalException {
}

class DatabaseNotFoundException extends BusinessException {
}

class DatabaseInvalidParameters extends BusinessException {
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
        throw new DatabaseNotFoundException("Id not found: $table(id)#$id");
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

    // static public function insert(string $table, array $data, bool $orUpdate = false) {
    //     self::init();

    //     $validData = [];
    //     $updateOnlyData = [];
    //     foreach ($data as $key => $value) {
    //         try {
    //             $def = DatabaseStructure::getDefinitionForField($table, $key);
    //             $validData[$key] = $value;
    //             if (!$def->protected && !$def->insertOnly) {
    //                 $updateOnlyData[$key] = $value;
    //             }
    //         } catch (DatabaseInvalidStructureException $e) {
    //             // TODO: what to do with undefined columns?
    //         }
    //     }

    //     $sql = self::buildSetStatement($table, $validData);

    //     // INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE name="A", age=19
    //     $sql = "INSERT INTO $table SET $sql";
    //     if ($orUpdate) {
    //         $sqlUpdate = self::buildSetStatement($table, $updateOnlyData);
    //         $sql .= " ON DUPLICATE KEY UPDATE $sqlUpdate";
    //     }
    //     self::exec($sql);

    //     // if ($res == 1) {
    //     //     return;
    //     // }
    //     // if ($res == 0 && $orUpdate) {
    //     //     return;
    //     // }
    //     // throw new DatabaseQueryException("Insert gave invalid result " . $res);
    // }

    // static function update(string $table, object $data): bool
    // {
    //     self::init();
    //     return false;
    // }
}
