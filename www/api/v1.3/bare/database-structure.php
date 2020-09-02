<?php

define('STORAGE_FILE', __DIR__ . '/../storage/framework/cache/database.json');

// 1. Connect to the database

// 2. Load the database structure

global $myconfig;
require_once(__DIR__ . '/../../../../config.php');

$pdoConnection = new PDO("mysql:host={$myconfig["database"]["host"]};dbname={$myconfig["database"]["schema"]}", $myconfig["database"]["username"], $myconfig["database"]["password"]);
$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

const TYPE_LIST         = "list";
const TYPE_TIMESTAMP    = "timestamp";
const TYPE_BOOLEAN      = "boolean";
const TYPE_INTEGER      = "numeric";
const TYPE_CHAR         = "char";
const TYPE_TEXT         = "text";
const TYPE_DATE         = "date";
const TYPE_BINARY       = "binary";

function parseColumn($sqlData) {

    $matches = array();
    $res = [
        'isList' => false,
        'isListLinked' => false,
        'isNullable' => $sqlData['IS_NULLABLE'] == "YES"
    ];

    // if (array_key_exists("list", $options) && $options['list']) {
    //     $res['type'] = TYPE_LIST;
    //     $this->isList = true;
    //     $this->listing = $options['list'];
    // } else if (array_key_exists($header, References::$model_listing)) {
    //     // Model.Field specific list
    //       $res['type'] = TYPE_LIST;
    //       $this->isList = true;
    //       $this->listingName = References::$model_listing[$header];
    //       $this->listing = References::getList($this->listingName);
    // } else if (array_key_exists("*.{$this->field}", References::$model_listing)) {
    //     // *.Field generic list
    //       $res['type'] = TYPE_LIST;
    //       $this->isList = true;
    //       $this->listingName = References::$model_listing["*.{$this->field}"];
    //       $this->listing = References::getList($this->listingName);
    // } else {
          /*
        * ==== $matches ====
        * 1: type natif
        * 3: length
        * 4: qualificatif (unsigned)
        *
        * All matches are lowercase
        */
        $res['type'] = $sqlData['DATA_TYPE'];
        $res['length'] = $sqlData['CHARACTER_MAXIMUM_LENGTH'];

        // Special case:
        switch($res['type']) {
            case "date":
                $res['type'] = TYPE_DATE;
                break;
            case "float":
            case "decimal":
            case "tinyint":
            case "int":
                $res['length'] = $sqlData['NUMERIC_PRECISION'];
                if ($res['length'] == 3) {
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
                if ($res['length'] >= 800) {
                    // Long text = blob
                    $res['type'] = TYPE_TEXT;
                } else {
                    $res['type'] = TYPE_CHAR;
                }
                break;
            case "mediumtext":
                $res['type'] = TYPE_TEXT;
                break;
            case "timestamp":
                $res['type'] = TYPE_TIMESTAMP;
                break;
            case "longblob":
                $res['type'] = TYPE_BINARY;
                break;
            default:
                var_dump($sqlData);
                throw new Exception("Unhandled type in __construct: {$res['type']}");
                break;
            
        }
        // var_dump($sqlData);
    // }
    return $res;
}

if (defined('PATCH_DB') || !file_exists(constant('STORAGE_FILE'))) {
    $dir = dirname(constant('STORAGE_FILE'));
    is_dir($dir) || mkdir($dir, 0777, true);

    $dataStructure = [];

    foreach($pdoConnection->query(
        "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '{$myconfig["database"]["schema"]}'") as $row) {

            $sqlTable = $row['TABLE_NAME'];
            $sqlField = $row['COLUMN_NAME'];

            if (in_array($sqlTable, [ 'bug_reporting' ])) {
                continue;
            }

            if (!in_array($sqlTable, $dataStructure)) {
                $dataStructure[$sqlTable] = [];
            }

            $dataStructure[$sqlTable][$sqlField] = parseColumn($row);
    }
    
    $export = 'define("DATABASE_STRUCTURE", ' . var_export($dataStructure, true) . ');';

    file_put_contents(constant('STORAGE_FILE'), "<?php $export") 
        || die("Could not save data to file " . constant('STORAGE_FILE'));
}

require(constant('STORAGE_FILE'));
