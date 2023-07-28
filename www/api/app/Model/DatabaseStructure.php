<?php

namespace App\Model;

use DB;

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
        "TreatmentEvaluation"      => "Eval14",
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
        "address_district"         => "Districts",
        "address_union"            => "Unions",
        "address_upazilla"         => "Upazillas",
        "pathology"                => "Pathologies",
        "sex"                      => "sex"
    ],
    "pictures" => [
        "type"                     => "PictureType"
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
    "Patient" => [
        "Appointment" => "patient_id",
        "Bill" => "patient_id",
        "ClubFoot" => "patient_id",
        "OtherConsult" => "patient_id",
        "Picture" => "patient_id",
        "RicketConsult" => "patient_id",
        "Surgery" => "patient_id",
    ],
    "Bill" => [
        "Payment" => "bill_id"
    ]
]);

class DatabaseStructure {
    public const TYPE_LIST         = "list";
    public const TYPE_TIMESTAMP    = "timestamp";
    public const TYPE_BOOLEAN      = "boolean";
    public const TYPE_INTEGER      = "numeric";
    public const TYPE_CHAR         = "char";
    public const TYPE_TEXT         = "text";
    public const TYPE_DATE         = "date";
    public const TYPE_BINARY       = "binary";

    static $databaseStructure;

    static public function load() {
        global $myconfig;

        self::$databaseStructure = [];

        /*****************************/
        /* Structure of the database */
        /*****************************/

        foreach (DB::select("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '{$myconfig["database"]["schema"]}'") as $row) {
            $sqlTable = $row->TABLE_NAME;
            $sqlField = $row->COLUMN_NAME;

            if (!array_key_exists($sqlTable, self::$databaseStructure)) {
                self::$databaseStructure[$sqlTable] = [];
            }

            self::$databaseStructure[$sqlTable][$sqlField] = self::parseColumn($row);
        }

        /**********************/
        /* Hardcoded generics */
        /**********************/

        foreach (constant('HARDCODED_LISTINGS')['all'] as $targetField => $listData) {
            foreach (self::$databaseStructure as $table => $data) {
                if (array_key_exists($targetField, self::$databaseStructure[$table])) {
                    self::$databaseStructure[$table][$targetField]['type'] = self::TYPE_LIST;
                    self::$databaseStructure[$table][$targetField]['listing'] = $listData;
                }
            }
        }

        foreach (constant('HARDCODED_LISTINGS') as $table => $tableListData) {
            if (!array_key_exists($table, self::$databaseStructure)) {
                // Skip table that does not exists
                // This will also skip 'all' definition :-)
                continue;
            }
            foreach ($tableListData as $targetField => $listData) {
                if (array_key_exists($targetField, self::$databaseStructure[$table])) {
                    self::$databaseStructure[$table][$targetField]['type'] = self::TYPE_LIST;
                    self::$databaseStructure[$table][$targetField]['listing'] = $listData;
                }
            }
        }

        return response()->json(self::$databaseStructure)->setEncodingOptions(JSON_NUMERIC_CHECK);
    }

    static private function parseColumn(object $sqlData): array {
        // TODO: normalize and test this function

        $name = $sqlData->COLUMN_NAME;
        $res = new \stdClass;

        $res->protected = in_array($name, ['id', 'created_at', 'updated_at', 'lastuser']);

        if (!$res->protected) {
            $res->optional = ($sqlData->IS_NULLABLE == "YES");

            if (!$res->optional) {
                // Only mandatory fields can be insertOnly (e.g. patient_id)
                $res->insertOnly = (preg_match('/^.+_id$/', $name) > 0);
            }
        }

        $res->type = $sqlData->DATA_TYPE;

        // Special case:
        switch ($res->type) {
            case "date":
                $res->type = self::TYPE_DATE;
                break;
            case "float":
            case "decimal":
            case "tinyint":
            case "int":
                $length = $sqlData->NUMERIC_PRECISION;
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
                $res->length = $sqlData->CHARACTER_MAXIMUM_LENGTH;
                if ($res->length >= 800) {
                    // Long text = blob
                    $res->type = self::TYPE_TEXT;
                } else {
                    $res->type = self::TYPE_CHAR;
                }
                break;
            case "mediumtext":
                $res->length = $sqlData->CHARACTER_MAXIMUM_LENGTH;
                $res->type = self::TYPE_TEXT;
                break;
            case "timestamp":
                $res->type = self::TYPE_TIMESTAMP;
                break;
            case "longblob":
                $res->length = $sqlData->CHARACTER_MAXIMUM_LENGTH;
                $res->type = self::TYPE_BINARY;
                break;
            default:
                var_dump($sqlData);
                throw new \Exception("Unhandled type in __construct: {$res['type']}");
                break;
        }
        return (array) $res;
    }

    static function getModelFieldDescription($model, $field) {
        if (!array_key_exists($model, MODEL_TO_DB)) {
            throw new \Exception("DatabaseStructure: Model '$model' is unknown");
        }
        $table = MODEL_TO_DB[$model];
        if (! array_key_exists($table, self::$databaseStructure)) {
            throw new \Exception("DatabaseStructure: Table '$table' does not exists");
        }
        if (! array_key_exists($field, self::$databaseStructure[$table])) {
            throw new \Exception("DatabaseStructure: Field '$field' does not exists in '$table'");
        }

        return self::$databaseStructure[$table][$field];
    }

    static function getDependantsOfTable($model) {
        if (!array_key_exists($model, DB_DEPENDANTS)) {
            return [];
        }
        return DB_DEPENDANTS[$model];
    }
}

DatabaseStructure::load();
