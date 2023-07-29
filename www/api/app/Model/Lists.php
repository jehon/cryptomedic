<?php

namespace App\Model;

use DB;
use Exception;

class Lists {
    static $dataListings = [
        "lists" => [],        // List[name] => array(values)
        "codes" => [],        // array(code => translation/value)
        "associations" => [], // key => list of associated values (ex: upazilla => [ districts ])
    ];
    
    static function getAll(): array {
        return self::$dataListings;
    }

    static function getLists(): array {
        return self::getAll()['lists'];
    }

    static function getList(string $name): array {
        $lists = self::getLists();
        if ($name && !array_key_exists($name, $lists)) {
            throw new \Exception('List does not exists: ' . $name);
        }
        return $lists[$name];
    }

    static function getCodes(): array {
        return self::getAll()['codes'];
    }

    static function getAssociations(): array {
        return self::getAll()['associations'];
    }
}


function buildValueList(string $name, array $list): array {
    Lists::$dataListings['lists'][$name] = $list;
    return $list;
}

function withCode(string $value, string $code = null): string {
    if ($code) {
        Lists::$dataListings['codes'][$value] = $code;
    }
    return $value;
}

function associate(string $from, string $to): string {
    if (!array_key_exists($to, Lists::$dataListings['associations'])) {
        Lists::$dataListings['associations'][$to] = array();
    }
    array_push(Lists::$dataListings['associations'][$to], $from);
    return $from;
}

function sortNatural(array $array): array {
    $narray = $array;
    natsort($narray);
    return $narray;
}

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
    "Upazillas",
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

buildValueList("sex", ["Male", "Female"]);

buildValueList("Centers", [
    withCode("Chakaria Disability Center", "CDC"),
    withCode("Chakaria Device Center", "CDev"),
    withCode("Chakaria XRay Center", "CXR"),
    withCode("Cox's Bazar"                , "CB"), // Back since 01-2022
    withCode("Cox's Bazar Device Center"  , "CBDC"), // Back since 09-2022
    withCode("Ukhia", "UK"),
    withCode("Ukhiya Device Center", "UKDC"),
    withCode("Ramu", "RA"),
    withCode("Moheshkhali", "MO"),
    withCode("Moheshkhali Device Center", "MODC"),
    //   withCode("Lohagara"                   , "LOH"),
    withCode("Pakua"), // since 07-2020
    // withCode("Rohinga Camp"), // since 07-2020 merged into FDMN on 01-2022
    withCode("CMOSH"),
    withCode("CMOSH Device Center"),
    withCode("Forcibly Displaced Myanmar Nationals", "FDMN"),
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

buildValueList("SocialLevel",  [0, 1, 2, 3, 4]);
buildValueList("Pirani",       [0, 0.5, 1]);
buildValueList("0-10",         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
buildValueList("Eval01",       [0, 1]);
buildValueList("Eval02",       [0, 1, 2]);
buildValueList("Eval03",       [0, 1, 2, 3]);
buildValueList("Eval14",       [1, 2, 3, 4]);
buildValueList("PictureType",  ["x-ray", "picture", "other"]);

/*****************************/
/*****************************/
/**** Dynamic data        ****/
/*****************************/
/*****************************/

$examinersList = [];
$examiners = DB::select("SELECT username, `name`, codage, in_examiner_list FROM users");
// TODO: regroup around "username"
foreach ($examiners as $examiner) {
    if ($examiner->codage > '') {

        // This will modify $dataListings
        withCode($examiner->name, $examiner->codage);
    }
    if ($examiner->in_examiner_list > 0) {
        $examinersList[] = $examiner->name;
    }
}

Lists::$dataListings['lists']['Examiner'] = $examinersList;
