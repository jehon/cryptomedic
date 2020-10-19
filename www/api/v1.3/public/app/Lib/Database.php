<?php

namespace Cryptomedic\Lib;

use App\Model\Payment;
use Exception;
use PDO;

use Cryptomedic\Lib\CachedTrait;
use Cryptomedic\Lib\StringsOps;

define('MODEL_TO_DB', array(
    "Bill"             => "bills",
    "ClubFoot"         => "club_feet",
    "OtherConsult"     => "other_consults",
    "Patient"          => "patients",
    "Picture"          => "pictures",
    "Appointment"      => "appointments",
    "RicketConsult"    => "ricket_consults",
    "Surgery"          => "surgeries",
    "Payment"          => "payments",
));

define('DB_DEPENDANTS', [
    "patients" => [
        "appointments" => "patient_id",
        "bills" => "patient_id",
        "club_feet" => "patient_id",
        "other_consults" => "patient_id",
        "pictures" => "patient_id",
        "ricket_consults" => "patient_id",
        "surgeries" => "patient_id",
    ],
    "bills" => [
        "payments" => "bill_id"
    ]
]);

class DatabaseQueryException extends \Exception {
}

class DatabaseUndefinedException extends \Exception {
    function __construct($table, $field = '') {
        parent::__construct("Table undefined: $table" . ($field ? "#$field" : ""));
    }
}

function parseColumn($sqlData) {
    // TODO: normalize and test this function

    $name = $sqlData['COLUMN_NAME'];
    $res = new \stdClass;

    $res->protected = in_array($name, ['id', 'created_at', 'updated_at', 'lastuser']);

    if (!$res->protected) {
        $res->optional = ($sqlData['IS_NULLABLE'] == "YES");

        if (!$res->optional) {
            // Only mandatory fields can be insertOnly (e.g. patient_id)
            $res->insertOnly = (preg_match('/^.+_id$/', $name) > 0);
        }
    }

    $res->type = $sqlData['DATA_TYPE'];

    // Special case:
    switch ($res->type) {
        case "date":
            $res->type = Database::TYPE_DATE;
            break;
        case "float":
        case "decimal":
        case "tinyint":
        case "int":
            $length = $sqlData['NUMERIC_PRECISION'];
            if ($length == 3) {
                $res->type = Database::TYPE_BOOLEAN;
            } else {
                $res->type = Database::TYPE_INTEGER;
            }
            break;
        case "enum":
        case "longtext":
        case "text":
        case "char":
        case "varchar":
            $res->length = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
            if ($res->length >= 800) {
                // Long text = blob
                $res->type = Database::TYPE_TEXT;
            } else {
                $res->type = Database::TYPE_CHAR;
            }
            break;
        case "mediumtext":
            $res->length = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
            $res->type = Database::TYPE_TEXT;
            break;
        case "timestamp":
            $res->type = Database::TYPE_TIMESTAMP;
            break;
        case "longblob":
            $res->length = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
            $res->type = Database::TYPE_BINARY;
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
    use CachedTrait;

    const TYPE_LIST         = "list";
    const TYPE_TIMESTAMP    = "timestamp";
    const TYPE_BOOLEAN      = "boolean";
    const TYPE_INTEGER      = "numeric";
    const TYPE_CHAR         = "char";
    const TYPE_TEXT         = "text";
    const TYPE_DATE         = "date";
    const TYPE_BINARY       = "binary";

    static private $pdoConnection = null;

    static function cacheName(): string {
        return "database";
    }

    static function cacheGenerate(): array {
        global $myconfig;

        $databaseStructure = [];

        /*****************************/
        /* Structure of the database */
        /*****************************/

        foreach (Database::select("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '{$myconfig["database"]["schema"]}'") as $row) {
            $sqlTable = $row['TABLE_NAME'];
            $sqlField = $row['COLUMN_NAME'];

            if (!array_key_exists($sqlTable, $databaseStructure)) {
                $databaseStructure[$sqlTable] = [];
            }

            $databaseStructure[$sqlTable][$sqlField] = parseColumn($row);

            // if (StringsOps::endsWith($sqlField, '_id')) {
            //     $targetTable = substr($sqlField, 0, -3);
            //     if (!array_key_exists($targetTable, $databaseStructure['_relations'])) {

            //         // TODO: translate $targetTable into model ?

            //         $databaseStructure['_relations'][$targetTable] = [];
            //     }
            //     $databaseStructure['_relations'][$targetTable][$sqlTable] = $sqlField;
            // }
        }

        /**********************/
        /* Hardcoded generics */
        /**********************/

        foreach (constant('HARDCODED_LISTINGS')['all'] as $targetField => $listData) {
            foreach ($databaseStructure as $table => $data) {
                if (array_key_exists($targetField, $databaseStructure[$table])) {
                    $databaseStructure[$table][$targetField]->type = self::TYPE_LIST;
                    $databaseStructure[$table][$targetField]->listing = $listData;
                }
            }
        }

        foreach (constant('HARDCODED_LISTINGS') as $table => $tableListData) {
            if (!array_key_exists($table, $databaseStructure)) {
                // Skip table that does not exists
                // This will also skip 'all' definition :-)
                continue;
            }
            foreach ($tableListData as $targetField => $listData) {
                if (array_key_exists($targetField, $databaseStructure[$table])) {
                    $databaseStructure[$table][$targetField]->type = self::TYPE_LIST;
                    $databaseStructure[$table][$targetField]->listing = $listData;
                }
            }
        }

        return $databaseStructure;
    }

    static function getDefinitionForTable($table) {
        self::cacheInit();

        if (!array_key_exists($table, self::$cached)) {
            throw new DatabaseUndefinedException($table);
        }

        return Database::$cached[$table];
    }

    static function getDefinitionForField($table, $field) {
        $tableDef = self::getDefinitionForTable($table);

        if (!array_key_exists($field, $tableDef)) {
            throw new DatabaseUndefinedException($table, $field);
        }

        return $tableDef[$field];
    }

    static function getDependantsOfTable($table) {
        return DB_DEPENDANTS[$table];
    }

    static function getModelForTable($table) {
        return array_search($table, MODEL_TO_DB);
    }

    static function getTableForModel($model) {
        return MODEL_TO_DB[$model];
    }

    static function init() {
        if (Database::$pdoConnection !== null) {
            return;
        }

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
        // Database::$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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

    static function buildSetStatement(string $table, array $data) {
        self::cacheInit();

        $data = array_intersect_key($data, self::getDefinitionForTable($table));

        $escapedData = array_map(function ($value, $key) {
            return "$key = " . self::$pdoConnection->quote($value);
        }, $data, array_keys($data));

        $sql = implode(", ", $escapedData);

        return $sql;
    }

    static function insert(string $table, array $data, bool $orUpdate = false) {
        self::init();

        $validData = [];
        $updateOnlyData = [];
        foreach ($data as $key => $value) {
            try {
                $def = self::getDefinitionForField($table, $key);
                $validData[$key] = $value;
                if (!$def->protected && !$def->insertOnly) {
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
}


define("HARDCODED_LISTINGS", [
    /***********************/
    /**** Common fields ****/
    /***********************/
    "all" => [
        "Center"                   => "Centers",
        "NextCenter"               => "Centers",
        "TreatmentEvaluation"      => "Eval04",
        "ExaminerName"             => "Examiner"
    ],
    "bills" => [
        "Sociallevel"              => "SocialLevel"
    ],

    "club_feet" => [
        "CurvedLateralBorderLeft"  => "Pirani",
        "CurvedLateralBorderRight" => "Pirani",
        "MedialCreaseLeft"         => "Pirani",
        "MedialCreaseRight"        => "Pirani",
        "TalarHeadCoverageLeft"    => "Pirani",
        "TalarHeadCoverageRight"   => "Pirani",
        "PosteriorCreaseLeft"      => "Pirani",
        "PosteriorCreaseRight"     => "Pirani",
        "RigidEquinusLeft"         => "Pirani",
        "RigidEquinusRight"        => "Pirani",
        "EmptyHeelLeft"            => "Pirani",
        "EmptyHeelRight"           => "Pirani",
        "PainLeft"                 => "Eval02",
        "PainRight"                => "Eval02",
        "WalkingFloorContactLeft"  => "Eval02",
        "WalkingFloorContactRight" => "Eval02",
        "WalkingFirstContactLeft"  => "Eval02",
        "WalkingFirstContactRight" => "Eval02",
        "JumpingOneLegLeft"        => "Eval01",
        "JumpingOneLegRight"       => "Eval01",
        "RunLeft"                  => "Eval02",
        "RunRight"                 => "Eval02",
        "Treatment"                => "CPTreatment"
    ],
    "other_consults" => [
        "Pain"                     => "Pain",
        "Side"                     => "Side",
        "Surgery66"                => "Surgery",
        "Walk"                     => "WalkingCapacities"
    ],
    "patients" => [
        "Pathology"                => "Pathologies",
        "District"                 => "Districts",
        "Sex"                      => "Sex",
        "Union_"                   => "Unions",
        "Upazilla"                 => "Upazilla"
    ],
    "ricket_consults" => [
        "Brace"                    => "Device",
        "LeftLeg"                  => "LegAnalysis",
        "Pain"                     => "Pain",
        "Ribbeading"               => "Eval03",
        "RightLeg"                 => "LegAnalysis",
        "Surgery"                  => "Surgery",
        "WalkingDifficulties"      => "WalkingCapacities",
        "Wristenlargement"         => "Eval03"
    ]
]);
