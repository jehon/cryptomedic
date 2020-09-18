<?php

namespace App\Model;

# require_once(__DIR__ . '/../../public/app/Lib/Data.php');

use Illuminate\Support\Facades\DB;

class References {
  static $model2db = array(
    "Bill"             => "bills",
    "ClubFoot"         => "club_feet",
    "OtherConsult"     => "other_consults",
    "Patient"          => "patients",
    "Picture"          => "pictures",
    "Appointment"      => "appointments",
    "RicketConsult"    => "ricket_consults",
    "Surgery"          => "surgeries",
    "Payment"          => "payments",
  );

  static $_init = false;
  static $lists = array();
  static $codes = array();
  static $model_listing = array();
  static $associations = array();

  static function init() {
    if (self::$_init) {
      return ;
    }

    // Dynamic examiner names
    $list = [];
    $examiners = DB::select("SELECT username, `name`, codage, inExaminerList FROM users");
    foreach($examiners as $examiner) {
      $ec = References::withCode($examiner->name, $examiner->codage);
      if ($examiner->inExaminerList > 0) {
        $list[] = $ec;
      }
    }
    References::$lists["Examiner"] = References::buildValueList($list);
  }

  static function getList($name) {
    self::init();
    return self::$lists[$name];
  }

  static function getLists() {
    self::init();
    return self::$lists;
  }

  static function getCodes() {
    self::init();
    return self::$codes;
  }

  static function model2db($model) {
    if (array_key_exists($model, static::$model2db))
      return static::$model2db[$model];
    return false;
  }

  static function db2model($dbName) {
    if (array_search($dbName, static::$model2db) === false) {
      return false;
    } else {
      return array_search($dbName, static::$model2db);
    }
  }

  static function buildValueList($list) {
    return $list;
  }

  static function associate($from, $to) {
    if (!array_key_exists($to, self::$associations)) {
      self::$associations[$to] = array();
    }
    array_push(self::$associations[$to], $from);
    return $from;
  }

  static function sortNatural($array) {
    $narray = $array;
    natsort($narray);
    return $narray;
  }

  static function withCode($value, $code) {
    if ($code) {
      self::$codes[$value] = $code;
    // } else {
    //   self::$codes[$value] = $value;
    }
    return $value;
  }
}

/*****************************/
/*****************************/
/**** Build up the lists  ****/
/*****************************/
/*****************************/


/***********************/
/**** Common lists ****/
/***********************/
References::$lists['Pathologies'] = References::buildValueList([
  References::withCode("Ricket"          , "Ric"),
  References::withCode("ClubFoot"        , "CF"),
  References::withCode("Polio"           , "Po"),
  References::withCode("Burn retraction" , "BR"),
  References::withCode("Cerebral Palsy"  , "CP"),
  References::withCode("Fracture"        , "Fra"),
  References::withCode("Infection"       , "Inf"),
  References::withCode("Congenital"      , "Con"),
  References::withCode("Adult Physio"    , "AP"),
  References::withCode("Normal Patient"  , "NP"),
  References::withCode("Other"           , "Oth")
]);

References::$lists["Districts"] = References::buildValueList([ "Chittagong", "Cox's Bazar", "Bandarban", "~ Other ~" ]);

References::$lists["Upazilla"] = References::buildValueList(
  array_merge(
    References::sortNatural([
      References::associate("Chakaria"           , "district.Cox's Bazar"),
      References::associate("Cox's Bazar Sadar"  , "district.Cox's Bazar"),
      References::associate("Chandanish"         , "district.Chittagong"),
      References::associate("Patia"              , "district.Chittagong"),
      References::associate("Shatkania"          , "district.Chittagong"),
      References::associate("Lohagora"           , "district.Chittagong"),
      References::associate("Ukhia"              , "district.Cox's Bazar"),
      References::associate("Ramu"               , "district.Cox's Bazar"),
      References::associate("Pekua"              , "district.Cox's Bazar"),
      References::associate("Kutubdia"           , "district.Cox's Bazar"),
      References::associate("Moheshkhali"        , "district.Cox's Bazar"),
      References::associate("Teknaf"             , "district.Cox's Bazar"),
    ]),
    [
      References::associate("~ Other ~"          , "district.other"),
    ])
  );

References::$lists["Unions"] = References::buildValueList(
  array_merge(
    References::sortNatural([
      References::associate("Senmartin"         , "upazilla.Teknaf"),
      References::associate("Shabrang"          , "upazilla.Teknaf"),
      References::associate("Teknaf Sadar"      , "upazilla.Teknaf"),
      References::associate("Phourashava"       , "upazilla.Teknaf"),
      References::associate("Bahar Chara"       , "upazilla.Teknaf"),
      References::associate("Nhila"             , "upazilla.Teknaf"),
      References::associate("Hakkan"            , "upazilla.Teknaf"),

      References::associate("Pekua"             , "upazilla.Pekua"),
      References::associate("Barobakia"         , "upazilla.Pekua"),
      References::associate("Shilkhali"         , "upazilla.Pekua"),
      References::associate("Taytang"           , "upazilla.Pekua"),
      References::associate("Magnama"           , "upazilla.Pekua"),
      References::associate("Rajakhali"         , "upazilla.Pekua"),
      References::associate("Ujantia"           , "upazilla.Pekua"),

      References::associate("Halodia Palang"    , "upazilla.Ukhia"),
      References::associate("Ratna Palang"      , "upazilla.Ukhia"),
      References::associate("Raja Palang"       , "upazilla.Ukhia"),
      References::associate("Jalia Palang"      , "upazilla.Ukhia"),
      References::associate("Palang Khali"      , "upazilla.Ukhia"),

      References::associate("Chakmar Kul"       , "upazilla.Ramu"),
      References::associate("Kawar Kup"         , "upazilla.Ramu"),
      References::associate("Dakkin Mitachari"  , "upazilla.Ramu"),
      References::associate("Juaria Nala"       , "upazilla.Ramu"),
      References::associate("Photekarkul"       , "upazilla.Ramu"),
      References::associate("Kochchapia"        , "upazilla.Ramu"),
      References::associate("Rasid Nagar"       , "upazilla.Ramu"),
      References::associate("Gorjania"          , "upazilla.Ramu"),
      References::associate("RajarKool"         , "upazilla.Ramu"),
      References::associate("Eidgar"            , "upazilla.Ramu"),
      References::associate("Khonia Palang"     , "upazilla.Ramu"),

      References::associate("Varoakhali"        , "upazilla.Cox's Bazar Sadar"),
      References::associate("Chafuldhandi"      , "upazilla.Cox's Bazar Sadar"),
      References::associate("Eidgha"            , "upazilla.Cox's Bazar Sadar"),
      References::associate("Islamabad"         , "upazilla.Cox's Bazar Sadar"),
      References::associate("Jalalabad"         , "upazilla.Cox's Bazar Sadar"),
      References::associate("Jilongja"          , "upazilla.Cox's Bazar Sadar"),
      References::associate("Khoroshkhol"       , "upazilla.Cox's Bazar Sadar"),
      References::associate("Masuakhali"        , "upazilla.Cox's Bazar Sadar"),
      References::associate("P.M. Khali"        , "upazilla.Cox's Bazar Sadar"),
      References::associate("Pukkhali"          , "upazilla.Cox's Bazar Sadar"),
      References::associate("Cos'x Bazar Sadar" , "upazilla.Cox's Bazar Sadar"),
      References::associate("Islampur"          , "upazilla.Cox's Bazar Sadar"),

      References::associate("Dhalghat"          , "upazilla.Moheshkhali"),
      References::associate("Kalamar Chara"     , "upazilla.Moheshkhali"),
      References::associate("Bara Moheshkhali"  , "upazilla.Moheshkhali"),
      References::associate("Hoanak"            , "upazilla.Moheshkhali"),
      References::associate("Shaplapur"         , "upazilla.Moheshkhali"),
      References::associate("Kutobzom"          , "upazilla.Moheshkhali"),
      References::associate("Chota Moheshkhali" , "upazilla.Moheshkhali"),
      References::associate("Phour Shava"       , "upazilla.Moheshkhali"),
      References::associate("Matarbari"         , "upazilla.Moheshkhali"),

      References::associate("Harbang"           , "upazilla.Chakaria"),
      References::associate("Baraitoly"         , "upazilla.Chakaria"),
      References::associate("Kayarbil"          , "upazilla.Chakaria"),
      References::associate("Lakkar Char"       , "upazilla.Chakaria"),
      References::associate("Kakara"            , "upazilla.Chakaria"),
      References::associate("Surajpur"          , "upazilla.Chakaria"),
      References::associate("Chiringa"          , "upazilla.Chakaria"),
      References::associate("Bomobil Chory"     , "upazilla.Chakaria"),
      References::associate("Fashia Khali"      , "upazilla.Chakaria"),
      References::associate("Dulahazara"        , "upazilla.Chakaria"),
      References::associate("Khutakhali"        , "upazilla.Chakaria"),
      References::associate("Shaharbil"         , "upazilla.Chakaria"),
      References::associate("Purbaboroveola"    , "upazilla.Chakaria"),
      References::associate("Passim .B Veola"   , "upazilla.Chakaria"),
      References::associate("B.M. Char"         , "upazilla.Chakaria"),
      References::associate("Badar Khali"       , "upazilla.Chakaria"),
      References::associate("Kona Khali"        , "upazilla.Chakaria"),
      References::associate("Demoshia"          , "upazilla.Chakaria"),
      References::associate("Phourashava"       , "upazilla.Chakaria"),
    ]),
    [
      References::associate("~ Other ~"         , "upazilla.other"),
    ])
  );

References::$lists["Sex"] = References::buildValueList([ "Male", "Female" ]);
References::$lists["Centers"] = References::buildValueList([
  References::withCode("Chakaria Disability Center" , "CDC"),
  References::withCode("Chakaria Device Center"     , "CDev"),
  References::withCode("Chakaria XRay Center"       , "CXR"),
//   References::withCode("Cox's Bazar"                , "CB"),
//   References::withCode("Cox's Bazar Device Center"  , "CBDC"),
  References::withCode("Ukhia"                      , "UK"),
  References::withCode("Ukhiya Device Center"       , "UKDC"),
  References::withCode("Ramu"                       , "RA"),
  References::withCode("Moheshkhali"                , "MO"),
  References::withCode("Moheshkhali Device Center"  , "MODC"),
//   References::withCode("Lohagara"                   , "LOH"),
  References::withCode("Pakua"                      , false), // since 07-2020
  References::withCode("Rohinga Camp"               , false), // since 07-2020
  References::withCode("CMOSH"                      , false),
  References::withCode("CMOSH Device Center"        , false),
  References::withCode("Other Field"                , "OF")
]);
References::$lists["Surgery"] = References::buildValueList(["~ Other ~", "Need to see surgeon", "Epiphysiodesis", "Osteotomy", "Little Burn release", "Big burn release", "Achileus lengthening", "Postero-medial release", "Pin removal"]);
References::$lists["Device"] = References::buildValueList(["BHKAFO for night", "BHKAFO", "UHKAFO for night", "UHKAFO", "U.K.A.F.O", "BAFO for night", "BAFO", "orthoshoes with bar", "orthoshoes without bar", "Compensation Sole", "Arch support", "Supinator Corner", "wirst splint", "Hand Splint", "finger splint (ext/flex)", "Walker with wheel", "Walker without wheel", "Crutch(a pair)", "Wheel Chair", "CP standing table", "cervical collar", "Abdominal Corset belt", "Repairing", "others ortho device"]);
References::$lists["Pain"] = References::buildValueList(["No", "Moderate", "Severe"]);
References::$lists["WalkingCapacities"] = References::buildValueList(["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]);
References::$lists["LegAnalysis"] = References::buildValueList(["Valgus", "Varus"]);
References::$lists["Side"] = References::buildValueList(["Right", "Left", "Bi"]);

References::$lists["SocialLevel"]                               = References::buildValueList(array( 0, 1, 2, 3, 4 ));
References::$lists["Pirani"]                                    = References::buildValueList(array(0, 0.5, 1));
References::$lists["0-10"]                                      = References::buildValueList(array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
References::$lists["Eval01"]                                    = References::buildValueList([0, 1]);
References::$lists["Eval02"]                                    = References::buildValueList([0, 1, 2]);
References::$lists["Eval03"]                                    = References::buildValueList([0, 1, 2, 3]);
References::$lists["Eval04"]                                    = References::buildValueList([0, 1, 2, 3, 4]);

References::$lists["CPTreatment"]                               = References::buildValueList(array("plaster", "tenotomy", "DB splint", "surgery"));

/*****************************/
/*****************************/
/**** Attribute the lists ****/
/*****************************/
/*****************************/



/***********************/
/**** Common fields ****/
/***********************/
References::$model_listing['*.Center']                          = "Centers";
References::$model_listing['*.NextCenter']                      = "Centers";
References::$model_listing['*.TreatmentEvaluation']             = "Eval04";
References::$model_listing['*.ExaminerName']                    = "Examiner";

/*****************/
/**** By File ****/
/*****************/
References::$model_listing['Bill.Sociallevel']                  = "SocialLevel";

References::$model_listing['ClubFoot.CurvedLateralBorderLeft']  = "Pirani";
References::$model_listing['ClubFoot.CurvedLateralBorderRight'] = "Pirani";
References::$model_listing['ClubFoot.MedialCreaseLeft']         = "Pirani";
References::$model_listing['ClubFoot.MedialCreaseRight']        = "Pirani";
References::$model_listing['ClubFoot.TalarHeadCoverageLeft']    = "Pirani";
References::$model_listing['ClubFoot.TalarHeadCoverageRight']   = "Pirani";
References::$model_listing['ClubFoot.PosteriorCreaseLeft']      = "Pirani";
References::$model_listing['ClubFoot.PosteriorCreaseRight']     = "Pirani";
References::$model_listing['ClubFoot.RigidEquinusLeft']         = "Pirani";
References::$model_listing['ClubFoot.RigidEquinusRight']        = "Pirani";
References::$model_listing['ClubFoot.EmptyHeelLeft']            = "Pirani";
References::$model_listing['ClubFoot.EmptyHeelRight']           = "Pirani";
References::$model_listing['ClubFoot.PainLeft']                 = "Eval02";
References::$model_listing['ClubFoot.PainRight']                = "Eval02";
References::$model_listing['ClubFoot.WalkingFloorContactLeft']  = "Eval02";
References::$model_listing['ClubFoot.WalkingFloorContactRight'] = "Eval02";
References::$model_listing['ClubFoot.WalkingFirstContactLeft']  = "Eval02";
References::$model_listing['ClubFoot.WalkingFirstContactRight'] = "Eval02";
References::$model_listing['ClubFoot.JumpingOneLegLeft']        = "Eval01";
References::$model_listing['ClubFoot.JumpingOneLegRight']       = "Eval01";
References::$model_listing['ClubFoot.RunLeft']                  = "Eval02";
References::$model_listing['ClubFoot.RunRight']                 = "Eval02";
References::$model_listing['ClubFoot.Treatment']                = "CPTreatment";

References::$model_listing['OtherConsult.Pain']                 = "Pain";
References::$model_listing['OtherConsult.Side']                 = "Side";
References::$model_listing['OtherConsult.Surgery66']            = "Surgery";
References::$model_listing['OtherConsult.Walk']                 = "WalkingCapacities";

References::$model_listing['Patient.Pathology']                 = "Pathologies";
References::$model_listing['Patient.District']                  = "Districts";
References::$model_listing['Patient.Sex']                       = "Sex";
References::$model_listing['Patient.Union_']                    = "Unions";
References::$model_listing['Patient.Upazilla']                  = "Upazilla";

References::$model_listing['RicketConsult.Brace']               = "Device";
References::$model_listing['RicketConsult.LeftLeg']             = "LegAnalysis";
References::$model_listing['RicketConsult.Pain']                = "Pain";
References::$model_listing['RicketConsult.Ribbeading']          = "Eval03";
References::$model_listing['RicketConsult.RightLeg']            = "LegAnalysis";
References::$model_listing['RicketConsult.Surgery']             = "Surgery";
References::$model_listing['RicketConsult.WalkingDifficulties'] = "WalkingCapacities";
References::$model_listing['RicketConsult.Wristenlargement']    = "Eval03";


/*********************/
/**** Other codes ****/
/*********************/
