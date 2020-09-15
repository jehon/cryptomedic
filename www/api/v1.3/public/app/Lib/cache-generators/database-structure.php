<?php

namespace App\Cryptomedic\Lib\CacheGenerators\DatabaseStructure;

// 1. Load the database structure

global $pdoConnection;

use Cryptomedic\Lib\Database;

const TYPE_LIST         = "list";
const TYPE_TIMESTAMP    = "timestamp";
const TYPE_BOOLEAN      = "boolean";
const TYPE_INTEGER      = "numeric";
const TYPE_CHAR         = "char";
const TYPE_TEXT         = "text";
const TYPE_DATE         = "date";
const TYPE_BINARY       = "binary";

function parseColumn($sqlData) {
    $name = $sqlData['COLUMN_NAME'];

    $res = [
        'protected'  => in_array($name, [ 'id', 'create_at', 'updated_at', 'lastuser']),
        'optional'   => ($sqlData['IS_NULLABLE'] == "YES"),
        'insertOnly' => preg_match('/^.+_id$/', $name)
    ];


    // if (array_key_exists("list", $options) && $options['list']) {
    //     $res['type'] = TYPE_LIST;
    //     $this->listing = $options['list'];
    // } else if (array_key_exists($header, References::$model_listing)) {
    //     // Model.Field specific list
    //       $res['type'] = TYPE_LIST;
    //       $this->listingName = References::$model_listing[$header];
    //       $this->listing = References::getList($this->listingName);
    // } else if (array_key_exists("*.{$this->field}", References::$model_listing)) {
    //     // *.Field generic list
    //       $res['type'] = TYPE_LIST;
    //       $this->listingName = References::$model_listing["*.{$this->field}"];
    //       $this->listing = References::getList($this->listingName);
    // } else {
        $res['type'] = $sqlData['DATA_TYPE'];

        // Special case:
        switch($res['type']) {
            case "date":
                $res['type'] = TYPE_DATE;
                break;
            case "float":
            case "decimal":
            case "tinyint":
            case "int":
                $length = $sqlData['NUMERIC_PRECISION'];
                if ($length == 3) {
                    $res['type'] = TYPE_BOOLEAN;
                } else {
                    $res['type'] = TYPE_INTEGER;
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
                    $res['type'] = TYPE_TEXT;
                } else {
                    $res['type'] = TYPE_CHAR;
                }
                break;
            case "mediumtext":
                $res['length'] = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
                $res['type'] = TYPE_TEXT;
                break;
            case "timestamp":
                $res['type'] = TYPE_TIMESTAMP;
                break;
            case "longblob":
                $res['length'] = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
                $res['type'] = TYPE_BINARY;
                break;
            default:
                var_dump($sqlData);
                throw new Exception("Unhandled type in __construct: {$res['type']}");
                break;
            
        }
    // }
    return $res;
}

global $databaseStructure;
$databaseStructure = [];

global $myconfig;
foreach(Database::select("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '{$myconfig["database"]["schema"]}'") as $row) {
    $sqlTable = $row['TABLE_NAME'];
    $sqlField = $row['COLUMN_NAME'];

    if (!array_key_exists($sqlTable, $databaseStructure)) {
        $databaseStructure[$sqlTable] = [];
    }

    $databaseStructure[$sqlTable][$sqlField] = parseColumn($row);
}
