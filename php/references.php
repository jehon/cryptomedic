<?php

class References {
  static $model2db = array(
    "Bill" => "bills",
    "ClubFoot" => "club_foots",
    "NonricketConsult" => "nonricket_consults",
    "Patient" => "patients",
    "Picture" => "pictures",
    "Appointment" => "appointments",
    "RicketConsult" => "ricket_consults",
    "Surgery" => "surgeries",
  );

  static $lists = array();
  static $codes = array();
  static $model_listing = array();

  static function model2db($model) {
    if (array_key_exists($model, static::$model2db))
      return static::$model2db[$model];
    return $model;
  }

  static function db2model($dbName) {
    if (array_search($dbName, static::$model2db) === false) {
      return $dbName;
    } else {
      return array_search($dbName, static::$model2db);
    }
  }

  static function buildValueList($list) {
    return array_combine($list, $list);
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

/***********************/
/**** Common lists ****/
/***********************/
References::$lists["Upazilla"] = References::buildValueList(
  array_merge(
    References::sortNatural([ "Chakaria", "Cox's Bazar Shadar", "Chandanish", "Patia", "Shatkania", "Lohagora", "Teknaf", "Ukhia", "Ramo", "Pekua", "Kutubdia", "Moheshkhali" ]),
    [ "~ Other ~" ])
  );

References::$lists["Unions"] = References::buildValueList(
  array_merge(
    References::sortNatural([ "Palong Khali", "Jalia palong", "Raza Palong", "Ratna palong", "Holodia Palong", "Sabrang",
      "Saint martin", "Teknaf Paurashava", "Teknaf sadar", "Baharchara", "Hnila", "Hoaikkong", "Pukkhali",
      "Chaufal Dandi", "Bharua khali", "Eidgaon", "Islampur", "Islamabad", "Jalalabad", "PM Khali",
      "Cox's bazar Paurashava", "Khurushkhul", "Jhilongga", "Khunia Palong", "Joaria nala", "Dakkin MithaChari",
      "Chakmarkul", "Rashid Nagar", "Fotekharkul", "Eidgon", "Kossapia", "Gorjania", "Kauarkhop",
      "Razarkul", "Kotobjum", "Shaplapur", "Chota Moheshkhali", "Bara Moheshkhli", "Hoanok", "Matarbari",
      "Dhalghat", "Kalarmarchara", "Chakaria purashova", "Khutakhali", "Dulahazara", "Fashiakhali",
      "Shaharbil", "Pashchimbara Veula", "Badarkhali", "Dhemoshia", "Konakhaly", "Veulaminikchar",
      "Purbabara Veula", "Bomobil chari", "Manikpur", "Shurazpur", "Kakara", "Kayerbil", "Baraitaly",
      "Harbang", "Chiringa" ]),
    [ "~ Other ~" ])
  );

References::$lists["Districts"] = References::buildValueList([ "Chittagong", "Cox's Bazar", "~ Other ~" ]);
References::$lists["Sex"] = References::buildValueList([ "Male", "Female" ]);
References::$lists["Centers"] = References::buildValueList([
  References::withCode("Chakaria",      "CDC"),
  References::withCode("Cox's Bazar",   "CB"),
  References::withCode("Ukhia",         "UK"),
  References::withCode("Ramu",          "RA"),
  References::withCode("Moeshkali",     "MO"),
  References::withCode("CMOSH",         false),
  References::withCode("Other place",   "OF")
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
  References::withCode("Rina",       ""), // ???
  References::withCode("Ferdawsi",   ""), // ???

  // orthesis
  References::withCode("Hassan 1",   "Has 1"),
  References::withCode("Hassan 2",   "Has 2"),
  References::withCode("Debashish",  "Deb"),
  References::withCode("Liton",      "Lit"),
  References::withCode("Monir",      ""),     //???

  // Field monitors
  References::withCode("Prytosh",    "Pri"), // ??? Prietush
  References::withCode("Kobir",      "Kob"),
  References::withCode("Rokeya",     "Ruk"), // ??? Rukea
  References::withCode("Nur Alam",   "Nur"),
  References::withCode("Zia",        ""), // ???

  // Doctors
  References::withCode("Taslim",     "Tas"),
  References::withCode("AMD doctor", "AMD") // ???
]);
// Not present anymore
References::withCode("Ricta", "Ric");
References::withCode("Asma", "Asm");
References::withCode("Shudir", "Shu");

References::$lists["SocialLevel"] = References::buildValueList(array( 0, 1, 2, 3, 4 ));
References::$lists["Pirani"] = References::buildValueList(array(0, 0.5, 1));
References::$lists["0-10"] = References::buildValueList(array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
References::$lists["Eval03"] = References::buildValueList([0, 1, 2, 3]);

/***********************/
/**** Common fields ****/
/***********************/
References::$model_listing['*.Center'] = References::$lists['Centers'];
References::$model_listing['*.NextCenter'] = References::$lists["Centers"];
References::$model_listing['*.TreatmentEvaluation'] = References::buildValueList(array(0, 1, 2, 3, 4));
References::$model_listing['*.ExaminerName'] = References::$lists["examiner"];

/*****************/
/**** By File ****/
/*****************/
References::$model_listing['Bill.Sociallevel'] = References::$lists['SocialLevel'];

References::$model_listing['ClubFoot.CurvedLateralBorderLeft'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.CurvedLateralBorderRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.MedialCreaseLeft'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.MedialCreaseRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.TalarHeadCoverageLeft'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.TalarHeadCoverageRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.PosteriorCreaseLeft'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.PosteriorCreaseRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.RigidEquinusLeft'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.RigidEquinusRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.EmptyHeelLeft'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.EmptyHeelRight'] = References::$lists['Pirani'];
References::$model_listing['ClubFoot.PainLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.PainRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFloorContactLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFloorContactRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFirstContactLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFirstContactRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.JumpingOneLegLeft'] = References::buildValueList(array(0, 1));
References::$model_listing['ClubFoot.JumpingOneLegRight'] = References::buildValueList(array(0, 1));
References::$model_listing['ClubFoot.RunLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.RunRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.Treatment'] = References::buildValueList(array("plaster", "tenotomy", "DB splint", "surgery"));

References::$model_listing['NonricketConsult.Pain'] = References::$lists['Pain'];
References::$model_listing['NonricketConsult.Side'] = References::$lists['Side'];
References::$model_listing['NonricketConsult.Surgery66'] = References::$lists['Surgery'];
References::$model_listing['NonricketConsult.Walk'] = References::$lists['WalkingCapacities'];

References::$model_listing['Patient.District'] = References::$lists['Districts'];
References::$model_listing['Patient.Sex'] = References::$lists['Sex'];
References::$model_listing['Patient.Union_'] = References::$lists['Unions'];
References::$model_listing['Patient.Upazilla'] = References::$lists['Upazilla'];

References::$model_listing['RicketConsult.Brace'] = References::$lists['Device'];
References::$model_listing['RicketConsult.LeftLeg'] = References::$lists['LegAnalysis'];
References::$model_listing['RicketConsult.Pain'] = References::$lists['Pain'];
References::$model_listing['RicketConsult.Ribbeading'] = References::$lists['Eval03'];
References::$model_listing['RicketConsult.RightLeg'] = References::$lists['LegAnalysis'];
References::$model_listing['RicketConsult.Surgery'] = References::$lists['Surgery'];
References::$model_listing['RicketConsult.WalkingDifficulties'] = References::$lists['WalkingCapacities'];
References::$model_listing['RicketConsult.Wristenlargement'] = References::$lists['Eval03'];


/*********************/
/**** Other codes ****/
/*********************/
References::withCode("Ricket"          , "Ric");
References::withCode("ClubFoot"        , "CF");
References::withCode("Polio"           , "Po");
References::withCode("Burn retraction" , "BR");
References::withCode("Cerebral Palsy"  , "CP");
References::withCode("Fracture"        , "Fra");
References::withCode("Infection"       , "Inf");
References::withCode("Congenital"      , "Con");
References::withCode("Adult Physio"    , "AP");
References::withCode("Normal Patient"  , "NP");
References::withCode("Other"           , "Oth");
