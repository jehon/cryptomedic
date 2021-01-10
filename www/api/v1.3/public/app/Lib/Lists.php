<?php

namespace Cryptomedic\Lib;

use Cryptomedic\Lib\Database;
use Cryptomedic\Lib\CachedTrait;
use Exception;

function buildValueList(string $name, array $list): array {
    global $dataListings;
    $dataListings['lists'][$name] = $list;
    return $list;
}

function withCode(string $value, string $code = null): string {
    global $dataListings;
    if ($code) {
        $dataListings['codes'][$value] = $code;
    }
    return $value;
}

function associate(string $from, string $to): string {
    global $dataListings;
    if (!array_key_exists($to, $dataListings['associations'])) {
        $dataListings['associations'][$to] = array();
    }
    array_push($dataListings['associations'][$to], $from);
    return $from;
}

function sortNatural(array $array): array {
    $narray = $array;
    natsort($narray);
    return $narray;
}

function resetDataListing() {
    global $dataListings;

    $dataListings = [
        "lists" => [],        // List[name] => array(values)
        "codes" => [],        // array(code => translation/value)
        "associations" => [], // key => list of associated values (ex: upazilla => [ districts ])
    ];
}

resetDataListing();

class Lists {
    use CachedTrait;

    static function cacheName(): string {
        return "lists";
    }

    static function cacheGenerate(): array {
        resetDataListing();

        /***********************/
        /**** Common lists ****/
        /***********************/
        buildValueList('Pathologies', [
            withCode("Ricket", "Ric"),
            withCode("ClubFoot", "CF"),
            withCode("Polio", "Po"),
            withCode("Burn retraction", "BR"),
            withCode("Cerebral Palsy", "CP"),
            withCode("Fracture", "Fra"),
            withCode("Infection", "Inf"),
            withCode("Congenital", "Con"),
            withCode("Adult Physio", "AP"),
            withCode("Normal Patient", "NP"),
            withCode("Other", "Oth")
        ]);

        buildValueList("Districts", ["Chittagong", "Cox's Bazar", "Bandarban", "~ Other ~"]);

        buildValueList(
            "Upazilla",
            array_merge(
                sortNatural([
                    associate("Chakaria", "district.Cox's Bazar"),
                    associate("Cox's Bazar Sadar", "district.Cox's Bazar"),
                    associate("Chandanish", "district.Chittagong"),
                    associate("Patia", "district.Chittagong"),
                    associate("Shatkania", "district.Chittagong"),
                    associate("Lohagora", "district.Chittagong"),
                    associate("Ukhia", "district.Cox's Bazar"),
                    associate("Ramu", "district.Cox's Bazar"),
                    associate("Pekua", "district.Cox's Bazar"),
                    associate("Kutubdia", "district.Cox's Bazar"),
                    associate("Moheshkhali", "district.Cox's Bazar"),
                    associate("Teknaf", "district.Cox's Bazar"),
                ]),
                [
                    associate("~ Other ~", "district.other"),
                ]
            )
        );

        buildValueList(
            "Unions",
            array_merge(
                sortNatural([
                    associate("Senmartin", "upazilla.Teknaf"),
                    associate("Shabrang", "upazilla.Teknaf"),
                    associate("Teknaf Sadar", "upazilla.Teknaf"),
                    associate("Phourashava", "upazilla.Teknaf"),
                    associate("Bahar Chara", "upazilla.Teknaf"),
                    associate("Nhila", "upazilla.Teknaf"),
                    associate("Hakkan", "upazilla.Teknaf"),

                    associate("Pekua", "upazilla.Pekua"),
                    associate("Barobakia", "upazilla.Pekua"),
                    associate("Shilkhali", "upazilla.Pekua"),
                    associate("Taytang", "upazilla.Pekua"),
                    associate("Magnama", "upazilla.Pekua"),
                    associate("Rajakhali", "upazilla.Pekua"),
                    associate("Ujantia", "upazilla.Pekua"),

                    associate("Halodia Palang", "upazilla.Ukhia"),
                    associate("Ratna Palang", "upazilla.Ukhia"),
                    associate("Raja Palang", "upazilla.Ukhia"),
                    associate("Jalia Palang", "upazilla.Ukhia"),
                    associate("Palang Khali", "upazilla.Ukhia"),

                    associate("Chakmar Kul", "upazilla.Ramu"),
                    associate("Kawar Kup", "upazilla.Ramu"),
                    associate("Dakkin Mitachari", "upazilla.Ramu"),
                    associate("Juaria Nala", "upazilla.Ramu"),
                    associate("Photekarkul", "upazilla.Ramu"),
                    associate("Kochchapia", "upazilla.Ramu"),
                    associate("Rasid Nagar", "upazilla.Ramu"),
                    associate("Gorjania", "upazilla.Ramu"),
                    associate("RajarKool", "upazilla.Ramu"),
                    associate("Eidgar", "upazilla.Ramu"),
                    associate("Khonia Palang", "upazilla.Ramu"),

                    associate("Varoakhali", "upazilla.Cox's Bazar Sadar"),
                    associate("Chafuldhandi", "upazilla.Cox's Bazar Sadar"),
                    associate("Eidgha", "upazilla.Cox's Bazar Sadar"),
                    associate("Islamabad", "upazilla.Cox's Bazar Sadar"),
                    associate("Jalalabad", "upazilla.Cox's Bazar Sadar"),
                    associate("Jilongja", "upazilla.Cox's Bazar Sadar"),
                    associate("Khoroshkhol", "upazilla.Cox's Bazar Sadar"),
                    associate("Masuakhali", "upazilla.Cox's Bazar Sadar"),
                    associate("P.M. Khali", "upazilla.Cox's Bazar Sadar"),
                    associate("Pukkhali", "upazilla.Cox's Bazar Sadar"),
                    associate("Cos'x Bazar Sadar", "upazilla.Cox's Bazar Sadar"),
                    associate("Islampur", "upazilla.Cox's Bazar Sadar"),

                    associate("Dhalghat", "upazilla.Moheshkhali"),
                    associate("Kalamar Chara", "upazilla.Moheshkhali"),
                    associate("Bara Moheshkhali", "upazilla.Moheshkhali"),
                    associate("Hoanak", "upazilla.Moheshkhali"),
                    associate("Shaplapur", "upazilla.Moheshkhali"),
                    associate("Kutobzom", "upazilla.Moheshkhali"),
                    associate("Chota Moheshkhali", "upazilla.Moheshkhali"),
                    associate("Phour Shava", "upazilla.Moheshkhali"),
                    associate("Matarbari", "upazilla.Moheshkhali"),

                    associate("Harbang", "upazilla.Chakaria"),
                    associate("Baraitoly", "upazilla.Chakaria"),
                    associate("Kayarbil", "upazilla.Chakaria"),
                    associate("Lakkar Char", "upazilla.Chakaria"),
                    associate("Kakara", "upazilla.Chakaria"),
                    associate("Surajpur", "upazilla.Chakaria"),
                    associate("Chiringa", "upazilla.Chakaria"),
                    associate("Bomobil Chory", "upazilla.Chakaria"),
                    associate("Fashia Khali", "upazilla.Chakaria"),
                    associate("Dulahazara", "upazilla.Chakaria"),
                    associate("Khutakhali", "upazilla.Chakaria"),
                    associate("Shaharbil", "upazilla.Chakaria"),
                    associate("Purbaboroveola", "upazilla.Chakaria"),
                    associate("Passim .B Veola", "upazilla.Chakaria"),
                    associate("B.M. Char", "upazilla.Chakaria"),
                    associate("Badar Khali", "upazilla.Chakaria"),
                    associate("Kona Khali", "upazilla.Chakaria"),
                    associate("Demoshia", "upazilla.Chakaria"),
                    associate("Phourashava", "upazilla.Chakaria"),
                ]),
                [
                    associate("~ Other ~", "upazilla.other"),
                ]
            )
        );

        buildValueList("Sex", ["Male", "Female"]);

        buildValueList("Centers", [
            withCode("Chakaria Disability Center", "CDC"),
            withCode("Chakaria Device Center", "CDev"),
            withCode("Chakaria XRay Center", "CXR"),
            //   withCode("Cox's Bazar"                , "CB"),
            //   withCode("Cox's Bazar Device Center"  , "CBDC"),
            withCode("Ukhia", "UK"),
            withCode("Ukhiya Device Center", "UKDC"),
            withCode("Ramu", "RA"),
            withCode("Moheshkhali", "MO"),
            withCode("Moheshkhali Device Center", "MODC"),
            //   withCode("Lohagara"                   , "LOH"),
            withCode("Pakua"), // since 07-2020
            withCode("Rohinga Camp"), // since 07-2020
            withCode("CMOSH"),
            withCode("CMOSH Device Center"),
            withCode("Other Field", "OF"),
            withCode("Virtual Consultation")
        ]);

        buildValueList("Surgery",     [
            "~ Other ~",
            "Need to see surgeon",
            "Epiphysiodesis",
            "Osteotomy",
            "Little Burn release",
            "Big burn release",
            "Achileus lengthening",
            "Postero-medial release",
            "Pin removal",
            "No surgery"
        ]);
        buildValueList("Device",      ["BHKAFO for night", "BHKAFO", "UHKAFO for night", "UHKAFO", "U.K.A.F.O", "BAFO for night", "BAFO", "orthoshoes with bar", "orthoshoes without bar", "Compensation Sole", "Arch support", "Supinator Corner", "wirst splint", "Hand Splint", "finger splint (ext/flex)", "Walker with wheel", "Walker without wheel", "Crutch(a pair)", "Wheel Chair", "CP standing table", "cervical collar", "Abdominal Corset belt", "Repairing", "others ortho device"]);
        buildValueList("Pain",        ["No", "Moderate", "Severe"]);
        buildValueList("WalkingCapacities", ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]);
        buildValueList("LegAnalysis", ["Valgus", "Varus"]);
        buildValueList("Side",        ["Right", "Left", "Bi"]);
        buildValueList("CPTreatment", ["plaster", "tenotomy", "DB splint", "surgery"]);

        buildValueList("SocialLevel", [0, 1, 2, 3, 4]);
        buildValueList("Pirani",      [0, 0.5, 1]);
        buildValueList("0-10",        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        buildValueList("Eval01",      [0, 1]);
        buildValueList("Eval02",      [0, 1, 2]);
        buildValueList("Eval03",      [0, 1, 2, 3]);
        buildValueList("Eval04",      [0, 1, 2, 3, 4]);


        /*****************************/
        /*****************************/
        /**** Attribute the lists ****/
        /*****************************/
        /*****************************/

        global $dataListings;
        return $dataListings;
    }

    static $dynamicCache = null;

    static function dynamicDataInit() {
        self::cacheInit();
        if (!self::$dynamicCache) {
            global $dataListings;

            resetDataListing();
            $dynamicData = unserialize(serialize(self::$cached));

            $examiners = Database::selectAsArray("SELECT username, `name`, codage, inExaminerList FROM users", 'username');
            foreach ($examiners as $examiner) {
                if ($examiner['codage'] > '') {

                    // This will modify $dataListings
                    withCode($examiner['name'], $examiner['codage']);
                }
                if ($examiner['inExaminerList'] > 0) {
                    $list[] = $examiner['name'];
                }
            }

            $dynamicData['lists']['Examiner'] = $list;
            $dynamicData['codes'] = array_merge($dynamicData['codes'], $dataListings['codes']);

            self::$dynamicCache = $dynamicData;
        }
    }

    static function getAllLists() {
        self::dynamicDataInit();
        return self::$dynamicCache['lists'];
    }

    static function getList(string $name): array {
        $cachedLists = self::getAllLists();

        if (array_key_exists($name, $cachedLists)) {
            return $cachedLists[$name];
        }

        throw new Exception('List does not exists: ' . $name);
    }

    static function getCodes(): array {
        self::dynamicDataInit();

        return self::$dynamicCache['codes'];
    }

    static function getAssociations(): array {
        self::dynamicDataInit();
        return self::$dynamicCache['associations'];
    }
}
