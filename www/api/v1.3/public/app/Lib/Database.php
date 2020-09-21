<?php

namespace Cryptomedic\Lib;

use Exception;
use PDO;
use function App\Cryptomedic\Lib\Cache;

class DatabaseQueryException extends \Exception {
}

class DatabaseUndefinedException extends \Exception {
    function __construct($table, $field = '') {
        parent::__construct("Table undefined: $table" . ($field ? "#$field" : ""));
    }
}


function getDefinitionForTable($table) {
    Cache::load();

    if (!array_key_exists($table, Cache::get()['dataStructure'])) {
        throw new DatabaseUndefinedException($table);
    }

    return Cache::get()['dataStructure'][$table];
}

function getDefinitionForField($table, $field) {
    $tableDef = getDefinitionForTable($table);

    if (!array_key_exists($field, $tableDef)) {
        throw new DatabaseUndefinedException($table, $field);
    }

    return $tableDef[$field];
}

function parseColumn($sqlData) {
    // TODO: normalize and test this function

    $name = $sqlData['COLUMN_NAME'];

    $res = [
        'protected'  => in_array($name, ['id', 'created_at', 'updated_at', 'lastuser'])
    ];

    if (!$res['protected']) {
        $res['optional']   = ($sqlData['IS_NULLABLE'] == "YES");

        if (!$res['optional']) {
            // Only mandatory fields can be insertOnly (e.g. patient_id)
            $res['insertOnly'] = (preg_match('/^.+_id$/', $name) > 0);
        }
    }

    // if (array_key_exists("list", $options) && $options['list']) {
    //     $res['type'] = Database::TYPE_LIST;
    //     $this->listing = $options['list'];
    // } else if (array_key_exists($header, References::$model_listing)) {
    //     // Model.Field specific list
    //       $res['type'] = Database::TYPE_LIST;
    //       $this->listingName = References::$model_listing[$header];
    //       $this->listing = References::getList($this->listingName);
    // } else if (array_key_exists("*.{$this->field}", References::$model_listing)) {
    //     // *.Field generic list
    //       $res['type'] = Database::TYPE_LIST;
    //       $this->listingName = References::$model_listing["*.{$this->field}"];
    //       $this->listing = References::getList($this->listingName);
    // } else {
    $res['type'] = $sqlData['DATA_TYPE'];

    // Special case:
    switch ($res['type']) {
        case "date":
            $res['type'] = Database::TYPE_DATE;
            break;
        case "float":
        case "decimal":
        case "tinyint":
        case "int":
            $length = $sqlData['NUMERIC_PRECISION'];
            if ($length == 3) {
                $res['type'] = Database::TYPE_BOOLEAN;
            } else {
                $res['type'] = Database::TYPE_INTEGER;
            }
            break;
        case "enum":
        case "longtext":
        case "text":
        case "char":
        case "varchar":
            $res['length'] = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
            if ($res['length'] >= 800) {
                // Long text = blob
                $res['type'] = Database::TYPE_TEXT;
            } else {
                $res['type'] = Database::TYPE_CHAR;
            }
            break;
        case "mediumtext":
            $res['length'] = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
            $res['type'] = Database::TYPE_TEXT;
            break;
        case "timestamp":
            $res['type'] = Database::TYPE_TIMESTAMP;
            break;
        case "longblob":
            $res['length'] = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
            $res['type'] = Database::TYPE_BINARY;
            break;
        default:
            var_dump($sqlData);
            throw new \Exception("Unhandled type in __construct: {$res['type']}");
            break;
    }
    // }
    return $res;
}

function normalizeRecord(string $table, array $data): array {
    return $data;
}

class Database {
    const TYPE_LIST         = "list";
    const TYPE_TIMESTAMP    = "timestamp";
    const TYPE_BOOLEAN      = "boolean";
    const TYPE_INTEGER      = "numeric";
    const TYPE_CHAR         = "char";
    const TYPE_TEXT         = "text";
    const TYPE_DATE         = "date";
    const TYPE_BINARY       = "binary";

    static private $pdoConnection = null;

    static function buildSetStatement(string $table, array $data) {
        $data = array_intersect_key($data, getDefinitionForTable($table));

        $escapedData = array_map(function ($value, $key) {
            return "$key = " . self::$pdoConnection->quote($value);
        }, $data, array_keys($data));

        $sql = implode(", ", $escapedData);

        return $sql;
    }

    static function init() {
        if (Database::$pdoConnection !== null) {
            return;
        }

        global $myconfig;
        Database::$pdoConnection = new PDO("mysql:host={$myconfig["database"]["host"]};dbname={$myconfig["database"]["schema"]}", $myconfig["database"]["username"], $myconfig["database"]["password"]);
        Database::$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    static function exec(string $request): int {
        self::init();
        // Log::error($request);
        return self::$pdoConnection->exec($request);
    }

    static function startTransaction() {
        return self::exec('START TRANSACTION');
    }

    static function cancelTransaction() {
        return self::exec('ROLLBACK');
    }

    static function select(string $request): \PDOStatement {
        self::init();
        return self::$pdoConnection->query($request);
    }

    static function selectAsArray(string $request, string $field): array {
        $res = [];
        foreach (self::select($request) as $line) {
            $res[$line[$field]] = $line;
        }
        return $res;
    }

    static function selectInTable(string $table, string $where): array {
        return array_map(
            function ($rec) use ($table) {
                return normalizeRecord($table, $rec);
            },
            self::selectAsArray("SELECT * FROM `$table` where $where", "id")
        );
    }

    static function selectIdInTable(string $table, string $id): array {
        $list = self::selectInTable($table, "id = " . self::$pdoConnection->quote($id));
        if (array_key_exists($id, $list)) {
            return $list[$id];
        }
        throw new DatabaseQueryException("Id not found: $table#$id");
    }

    static function insert(string $table, array $data, bool $orUpdate = false) {
        self::init();

        $validData = [];
        $updateOnlyData = [];
        foreach ($data as $key => $value) {
            try {
                $def = getDefinitionForField($table, $key);
                $validData[$key] = $value;
                if (!$def['protected'] && !$def['insertOnly']) {
                    $updateOnlyData[$key] = $value;
                }
            } catch (DatabaseUndefinedException $e) {
                // TODO: what to do with undefined columns?
            }
        }

        $sql = self::buildSetStatement($table, $validData);

        // INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE name="A", age=19
        $sql = "INSERT INTO $table SET $sql";
        if ($orUpdate) {
            $sqlUpdate = self::buildSetStatement($table, $updateOnlyData);
            $sql .= " ON DUPLICATE KEY UPDATE $sqlUpdate";
        }
        self::exec($sql);

        // if ($res == 1) {
        //     return;
        // }
        // if ($res == 0 && $orUpdate) {
        //     return;
        // }
        // throw new DatabaseQueryException("Insert gave invalid result " . $res);
    }

    // static function update(string $table, object $data): bool
    // {
    //     self::init();
    //     return false;
    // }

    static function generateStructureData(): array {
        global $myconfig;

        $databaseStructure = [];

        foreach (Database::select("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '{$myconfig["database"]["schema"]}'") as $row) {
            $sqlTable = $row['TABLE_NAME'];
            $sqlField = $row['COLUMN_NAME'];

            if (!array_key_exists($sqlTable, $databaseStructure)) {
                $databaseStructure[$sqlTable] = [];
            }

            $databaseStructure[$sqlTable][$sqlField] = parseColumn($row);
        }

        return $databaseStructure;
    }
}
