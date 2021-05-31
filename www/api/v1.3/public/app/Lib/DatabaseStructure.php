<?php

namespace Cryptomedic\Lib;

/**
 * Structure
 *  - {boolean}       protected (read-only)
 *  - {boolean}       optional
 *  - {enum}          type (see static TYPE_ below)
 *  - {string}        listing (listing name)
 *  - {Array<string>} list
 *  - {number}        length (type char & text)
 */

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

class DatabaseStructure extends CachedAbstract {
    public const TYPE_LIST         = "list";
    public const TYPE_TIMESTAMP    = "timestamp";
    public const TYPE_BOOLEAN      = "boolean";
    public const TYPE_INTEGER      = "numeric";
    public const TYPE_CHAR         = "char";
    public const TYPE_TEXT         = "text";
    public const TYPE_DATE         = "date";
    public const TYPE_BINARY       = "binary";

    static public function cacheGenerate(): array {
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

            $databaseStructure[$sqlTable][$sqlField] = self::parseColumn($row);

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
                    $databaseStructure[$table][$targetField]['type'] = self::TYPE_LIST;
                    $databaseStructure[$table][$targetField]['listing'] = $listData;
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
                    $databaseStructure[$table][$targetField]['type'] = self::TYPE_LIST;
                    $databaseStructure[$table][$targetField]['listing'] = $listData;
                }
            }
        }

        return $databaseStructure;
    }

    static private function parseColumn(array $sqlData): array {
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
                $res->type = self::TYPE_DATE;
                break;
            case "float":
            case "decimal":
            case "tinyint":
            case "int":
                $length = $sqlData['NUMERIC_PRECISION'];
                if ($length == 3) {
                    $res->type = self::TYPE_BOOLEAN;
                } else {
                    $res->type = self::TYPE_INTEGER;
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
                    $res->type = self::TYPE_TEXT;
                } else {
                    $res->type = self::TYPE_CHAR;
                }
                break;
            case "mediumtext":
                $res->length = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
                $res->type = self::TYPE_TEXT;
                break;
            case "timestamp":
                $res->type = self::TYPE_TIMESTAMP;
                break;
            case "longblob":
                $res->length = $sqlData['CHARACTER_MAXIMUM_LENGTH'];
                $res->type = self::TYPE_BINARY;
                break;
            default:
                var_dump($sqlData);
                throw new \Exception("Unhandled type in __construct: {$res['type']}");
                break;
        }
        return (array) $res;
    }

    static public function getDatabaseStructure(): array {
        return self::getCachedData();
    }

    static public function checkTableExistsAndGetDefinition(string $table): array {
        if (!array_key_exists($table, self::getCachedData())) {
            throw new DatabaseInvalidStructureException($table);
        }
        return self::getCachedData()[$table];
    }

    static public function checkFieldExistsInTableAndGetDefinition(string $table, string $field): array {
        $tableDef = self::checkTableExistsAndGetDefinition($table);
        if (!array_key_exists($field, $tableDef)) {
            throw new DatabaseInvalidStructureException($table, $field);
        }
        return $tableDef[$field];
    }

    static public function doesFieldExistsInTable(string $table, string $field): bool {
        try {
            self::checkFieldExistsInTableAndGetDefinition($table, $field);
            return true;
        } catch (DatabaseInvalidStructureException $e) {
            return false;
        }
    }

    static public function protectData(string $table, array $data): array {
        // TODO
        return $data;
    }

    /**
     * Transform number, dates, boolean
     */
    static public function normalizeRecord(string $table, array $data): array {
        // TODO
        return $data;
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
}

DatabaseStructure::init();
