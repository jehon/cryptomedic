<?php

namespace Cryptomedic\Lib;

use PDO;
use function App\Cryptomedic\Lib\Cache;

function getDefinitionForTable($table) {
    Cache::load();

    if (!array_key_exists($table, Cache::get()['dataStructure'])) {
        return false;
    }

    return Cache::get()['dataStructure'][$table];
}

function getDefinitionForField($table, $field) {
    $tableDef = getDefinitionForTable($table);

    if (!$tableDef) {
        return false;
    }

    if (!array_key_exists($field, $tableDef)) {
        return false;
    }

    return $tableDef[$field];
}

function parseColumn($sqlData) {
    $name = $sqlData['COLUMN_NAME'];

    $res = [
        'protected'  => in_array($name, [ 'id', 'created_at', 'updated_at', 'lastuser'])
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
        switch($res['type']) {
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

class Database {
    const TYPE_LIST         = "list";
    const TYPE_TIMESTAMP    = "timestamp";
    const TYPE_BOOLEAN      = "boolean";
    const TYPE_INTEGER      = "numeric";
    const TYPE_CHAR         = "char";
    const TYPE_TEXT         = "text";
    const TYPE_DATE         = "date";
    const TYPE_BINARY       = "binary";

    static private $pdoConnection = false;

    static function buildSetStatement(string $table, array $data) {
        $data = array_intersect_key($data, getDefinitionForTable($table));
    
        $escapedData = array_map(function($value, $key) { return "$key = " . self::$pdoConnection->quote($value); }, $data, array_keys($data));
    
        $sql = implode(", ", $escapedData);
    
        return $sql;
    }
    
    static function init() {
        if (Database::$pdoConnection !== false) {
            return;
        }

        global $myconfig;
        Database::$pdoConnection = new PDO("mysql:host={$myconfig["database"]["host"]};dbname={$myconfig["database"]["schema"]}", $myconfig["database"]["username"], $myconfig["database"]["password"]);
        Database::$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    static function exec(string $request): int {
        self::init();
        return self::$pdoConnection->exec($request);
    }

    static function select(string $request): \PDOStatement {
        self::init();
        return self::$pdoConnection->query($request);
    }

    static function selectAsArray(string $request, string $field): array {
        $res = [];
        foreach(self::select($request) as $line) {
            $res[$line[$field]] = $line;
        }
        return $res;
    }

    static function insert(string $table, array $data): bool {
        self::init();

        $validData = [];
        foreach($data as $key => $value) {
            if (!getDefinitionForField($table, $key)) {
                continue;
            }
            if (getDefinitionForField($table, $key)['protected']) {
                continue;
            }
            $validData[$key] = $value;
        }

        $sql = self::buildSetStatement($table, $validData);

        // INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE name="A", age=19
        $res = self::exec("INSERT INTO $table SET $sql");
        return ($res == 1);
    }

    static function update(string $table, object $data): bool {
        self::init();
    }

    static function generateStructureData(): array {
        global $myconfig;

        $databaseStructure = [];

        foreach(Database::select("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '{$myconfig["database"]["schema"]}'") as $row) {
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
