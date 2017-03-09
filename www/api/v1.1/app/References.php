<?php

namespace App;

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

  static $lists = array();
  static $codes = array();
  static $model_listing = array();
  static $associations = array();

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
    return array_combine($list, $list);
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
    } else {
      self::$codes[$value] = $value;
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
  References::withCode("Cox's Bazar"                , "CB"),
  References::withCode("Ukhia"                      , "UK"),
  References::withCode("Ramu"                       , "RA"),
  References::withCode("Moheshkhali"                , "MO"),
  References::withCode("Lohagara"                   , "LOH"),
  References::withCode("CMOSH"                      , false),
  References::withCode("Other Field"                , "OF")
]);
References::$lists["Surgery"] = References::buildValueList(["~ Other ~", "Need to see surgeon", "Epiphysiodesis", "Osteotomy", "Little Burn release", "Big burn release", "Achileus lengthening", "Postero-medial release", "Pin removal"]);
References::$lists["Device"] = References::buildValueList(["BHKAFO for night", "BHKAFO", "UHKAFO for night", "UHKAFO", "U.K.A.F.O", "BAFO for night", "BAFO", "orthoshoes with bar", "orthoshoes without bar", "Compensation Sole", "Arch support", "Supinator Corner", "wirst splint", "Hand Splint", "finger splint (ext/flex)", "Walker with wheel", "Walker without wheel", "Crutch(a pair)", "Wheel Chair", "CP standing table", "cervical collar", "Abdominal Corset belt", "Repairing", "others ortho device"]);
References::$lists["Pain"] = References::buildValueList(["No", "Moderate", "Severe"]);
References::$lists["WalkingCapacities"] = References::buildValueList(["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]);
References::$lists["LegAnalysis"] = References::buildValueList(["Valgus", "Varus"]);
References::$lists["Side"] = References::buildValueList(["Right", "Left", "Bi"]);
References::$lists["examiner"] = References::buildValueList([
  // physio
  References::withCode("Ershad",     "Ers"),
  References::withCode("Murshed",    "Mur"),
  References::withCode("Shetou",     "She"),
  References::withCode("Rezaul",     "Res"),
  References::withCode("Sultana",    "Sul"),
  References::withCode("Raj",        "Raj"), // As of 02/2017

  // orthesis
  References::withCode("Hassan 1",   "Has 1"),
  References::withCode("Hassan 2",   "Has 2"),
  References::withCode("Debashish",  "Deb"),
  References::withCode("Rina",       "Rin"),
  References::withCode("Liton",      "Lit"),

  // Field monitors
  References::withCode("Prietush",   "Pri"),
  References::withCode("Rokeya",     "Ruk"),
  References::withCode("Nur Alam",   "Nur"),
  References::withCode("Shuhal",     "Shu"),
  References::withCode("Zia",        "Zia"),

  // Doctors
  References::withCode("Dr Monir",   "Mon"),
  References::withCode("Dr Taslim",  "Tas"),
  References::withCode("AMD doctor", "AMD"),
]);

// Not present anymore
References::withCode("Ferdawsi",   "Fer");
References::withCode("Ricta",      "Ric");
References::withCode("Asma",       "Asm");
References::withCode("Shudir",     "Shu");
References::withCode("Kobir",      "Kob");

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
References::$model_listing['*.Center']                          = References::$lists['Centers'];
References::$model_listing['*.NextCenter']                      = References::$lists["Centers"];
References::$model_listing['*.TreatmentEvaluation']             = References::$lists["Eval04"];
References::$model_listing['*.ExaminerName']                    = References::$lists["examiner"];

/*****************/
/**** By File ****/
/*****************/
References::$model_listing['Bill.Sociallevel']                  = References::$lists['SocialLevel'];

References::$model_listing['ClubFoot.CurvedLateralBorderLeft']  = References::$lists['Pirani'];
References::$model_listing['ClubFoot.CurvedLateralBorderRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.MedialCreaseLeft']         = References::$lists['Pirani'];
References::$model_listing['ClubFoot.MedialCreaseRight']        = References::$lists['Pirani'];
References::$model_listing['ClubFoot.TalarHeadCoverageLeft']    = References::$lists['Pirani'];
References::$model_listing['ClubFoot.TalarHeadCoverageRight']   = References::$lists['Pirani'];
References::$model_listing['ClubFoot.PosteriorCreaseLeft']      = References::$lists['Pirani'];
References::$model_listing['ClubFoot.PosteriorCreaseRight']     = References::$lists['Pirani'];
References::$model_listing['ClubFoot.RigidEquinusLeft']         = References::$lists['Pirani'];
References::$model_listing['ClubFoot.RigidEquinusRight']        = References::$lists['Pirani'];
References::$model_listing['ClubFoot.EmptyHeelLeft']            = References::$lists['Pirani'];
References::$model_listing['ClubFoot.EmptyHeelRight']           = References::$lists['Pirani'];
References::$model_listing['ClubFoot.PainLeft']                 = References::$lists["Eval02"];
References::$model_listing['ClubFoot.PainRight']                = References::$lists["Eval02"];
References::$model_listing['ClubFoot.WalkingFloorContactLeft']  = References::$lists["Eval02"];
References::$model_listing['ClubFoot.WalkingFloorContactRight'] = References::$lists["Eval02"];
References::$model_listing['ClubFoot.WalkingFirstContactLeft']  = References::$lists["Eval02"];
References::$model_listing['ClubFoot.WalkingFirstContactRight'] = References::$lists["Eval02"];
References::$model_listing['ClubFoot.JumpingOneLegLeft']        = References::$lists["Eval01"];
References::$model_listing['ClubFoot.JumpingOneLegRight']       = References::$lists["Eval01"];
References::$model_listing['ClubFoot.RunLeft']                  = References::$lists["Eval02"];
References::$model_listing['ClubFoot.RunRight']                 = References::$lists["Eval02"];
References::$model_listing['ClubFoot.Treatment']                = References::$lists["CPTreatment"];

References::$model_listing['OtherConsult.Pain']                 = References::$lists['Pain'];
References::$model_listing['OtherConsult.Side']                 = References::$lists['Side'];
References::$model_listing['OtherConsult.Surgery66']            = References::$lists['Surgery'];
References::$model_listing['OtherConsult.Walk']                 = References::$lists['WalkingCapacities'];

References::$model_listing['Patient.Pathology']                 = References::$lists['Pathologies'];
References::$model_listing['Patient.District']                  = References::$lists['Districts'];
References::$model_listing['Patient.Sex']                       = References::$lists['Sex'];
References::$model_listing['Patient.Union_']                    = References::$lists['Unions'];
References::$model_listing['Patient.Upazilla']                  = References::$lists['Upazilla'];

References::$model_listing['RicketConsult.Brace']               = References::$lists['Device'];
References::$model_listing['RicketConsult.LeftLeg']             = References::$lists['LegAnalysis'];
References::$model_listing['RicketConsult.Pain']                = References::$lists['Pain'];
References::$model_listing['RicketConsult.Ribbeading']          = References::$lists['Eval03'];
References::$model_listing['RicketConsult.RightLeg']            = References::$lists['LegAnalysis'];
References::$model_listing['RicketConsult.Surgery']             = References::$lists['Surgery'];
References::$model_listing['RicketConsult.WalkingDifficulties'] = References::$lists['WalkingCapacities'];
References::$model_listing['RicketConsult.Wristenlargement']    = References::$lists['Eval03'];


/*********************/
/**** Other codes ****/
/*********************/
