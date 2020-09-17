<?php

namespace Cryptomedic\Lib;

use PDO;
use function App\Cryptomedic\Lib\Cache;

function getDefinitionFor($table, $field) {
    Cache::load();
    
    if (!array_key_exists($table, Cache::get()['dataStructure'])) {
        return false;
    }
    if (!array_key_exists($field, Cache::get()['dataStructure'][$table])) {
        return false;
    }
    return Cache::get()['dataStructure'][$table][$field];
}

class Database {
    static $pdoConnection = false;

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

    static function insert(string $table, array $data, bool $onDuplicateKeyUpdate = false): bool {
        self::init();

        global $cture;
        $validFields = array_filter(array_keys($data),
            function ($key) use ($table) { 
                $desc = getDefinitionFor($table, $key);
                if ($desc === false) {
                    return false;
                }
                return !$desc['protected'];
            }        
        );

        // INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE name="A", age=19
        $sql = "INSERT INTO $table ";

        var_dump($sql, $validFields);
    }

    static function update(string $table, object $data): bool {
        self::init();
    }
}
