<?php

class References {
    static $model2db = array(
            "Bill" => "bills",
            "ClubFoot" => "club_foots",
            "NonricketConsult" => "nonricket_consults",
            "Patient" => "patients",
            "Picture" => "pictures",
            "RicketConsult" => "ricket_consults",
            "Surgery" => "surgeries",
        );

	static $lists = array();
    static $model_listing = array();

    static function model2db($model) {
        if (array_key_exists($model, self::$model2db))
            return self::$model2db[$model];
        return $model;
    }

    static function db2model($dbName) {
        if (array_search($dbName, self::$model2db) === false) {
            return $dbName;
        }
        else {
            return array_search($dbName, self::$model2db);
        }
    }

//     static function unreference($value, $table = "", $field = "") {
//         global $server;
//         $labels = $server->getDatabase()->getTable("labels");
//         if ($table != "") {
//             if (!array_key_exists("$table.$field", References::$model_listing)) {
//                 return $value;
//             }       
//         }
//         $res = $labels->rowGet($value);
//         if ($res) {
//             return $res["english"];
//         }
//         return $value;
//     }

//     static function unreferenceObject($table, array $array) {
//         foreach($array as $f => $v) {
//             $array[$f] = self::unreference($v, $table, $f);
//         }
//         return $array;
//     }

//     static function buildLinkedList($list) {
//         global $server;
//         $labels = $server->getDatabase()->getTable("labels");

//         $res = array();
//         foreach($list as $k => $v){
//             if (is_numeric($v)) {
//             	$res[$v] = self::unreference($v);
//             } else {
//             	$res[$v] = $v;
//             }
//         }
//         return $res;
//     }
    
    static function buildValueList($list) {
    	return array_combine($list, $list);
    }
    
    static function sortNatural($array) {
    	$narray = $array;
    	natsort($narray);
    	return $narray;
    }
}


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
References::$lists["Centers"] = References::buildValueList(["Chakaria", "Moeshkali", "Ukhia", "Ramu", "Cox's Bazar", "Other place", "CMOSH"]);
References::$lists["Surgery"] = References::buildValueList(["~ Other ~", "Need to see surgeon", "Epiphysiodesis", "Osteotomy", "Little Burn release", "Big burn release", "Achileus lengthening", "Postero-medial release", "Pin removal"]);
References::$lists["Device"] = References::buildValueList(["BHKAFO for night", "BHKAFO", "UHKAFO for night", "UHKAFO", "U.K.A.F.O", "BAFO for night", "BAFO", "orthoshoes with bar", "orthoshoes without bar", "Compensation Sole", "Arch support", "Supinator Corner", "wirst splint", "Hand Splint", "finger splint (ext/flex)", "Walker with wheel", "Walker without wheel", "Crutch(a pair)", "Wheel Chair", "CP standing table", "cervical collar", "Abdominal Corset belt", "Repairing", "others ortho device"]);
References::$lists["Pain"] = References::buildValueList(["No", "Moderate", "Severe"]);
References::$lists["WalkingCapacities"] = References::buildValueList(["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]);
References::$lists["LegAnalysis"] = References::buildValueList(["Valgus", "Varus"]);
References::$lists["Side"] = References::buildValueList(["Right", "Left", "Bi"]);
References::$lists["examiner"] = References::buildValueList([
	"Ershad", "Rezaul", "Ricta", "Shetou", "Murshed", "Rina", // physio
	"Debashish", "Hassan 1", "Hassan 2", "Liton", // orthesis
	"Shudir", "Rokeya", "Prytosh", "Kobir", "Nur Alam", "Zia", // Field monitors
	"Taslim", "Monir", "AMD doctor" // Doctors
]);


References::$lists["SocialLevel"] = References::buildValueList(array( 0, 1, 2, 3, 4 ));
References::$lists["Pirani"] = References::buildValueList(array(0, 0.5, 1));
References::$lists["0-10"] = References::buildValueList(array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
References::$lists["Eval03"] = References::buildValueList([0, 1, 2, 3]);

// References::$lists["oSurgery"] = References::buildLinkedList(array( 20, 312, 313, 314, 315, 316, 317, 318, 319 ));
// References::$lists["oDevice"] = References::buildLinkedList(array( 42, 39, 37, 36, 33, 35, 38, 223, 40, 226, 232, 231, 225, 30, 224, 31, 234, 227, 230, 237, 235, 236, 29, 43 ));
// References::$lists["oPain"] = References::buildLinkedList(array( 293, 294, 295 ));
// References::$lists["oWalkingCapacities"] = References::buildLinkedList(array( 288, 289, 290, 291, 292 ));
// References::$lists["oLegAnalysis"] = References::buildLinkedList(array( 157, 158 ));
// References::$lists["oSide"] = References::buildLinkedList(array( 163, 164, 165 ));
// References::$lists["oEval03"] = References::buildLinkedList(array( 219, 220, 221, 222 ));

References::$model_listing['Bill.Center'] = References::$lists['Centers'];
References::$model_listing['Bill.Sociallevel'] = References::$lists['SocialLevel'];

References::$model_listing['ClubFoot.Center'] = References::$lists['Centers'];
References::$model_listing['ClubFoot.NextCenter'] = References::$lists["Centers"];
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
References::$model_listing['ClubFoot.ExaminerName'] = References::$lists["examiner"];
References::$model_listing['ClubFoot.PainLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.PainRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFloorContactLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFloorContactRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFirstContactLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.WalkingFirstContactRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.JumpingOneLegLeft'] = References::buildValueList(array(0, 1)); // TODO: what is this?
References::$model_listing['ClubFoot.JumpingOneLegRight'] = References::buildValueList(array(0, 1)); // TODO: what is this?
References::$model_listing['ClubFoot.RunLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.RunRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.MuscularInbalanceLeft'] = References::$lists["0-10"];
References::$model_listing['ClubFoot.MuscularInbalanceRight'] = References::$lists["0-10"];

References::$model_listing['NonricketConsult.Pain'] = References::$lists['Pain'];
References::$model_listing['NonricketConsult.Side'] = References::$lists['Side'];
References::$model_listing['NonricketConsult.Surgery66'] = References::$lists['Surgery'];
References::$model_listing['NonricketConsult.Walk'] = References::$lists['WalkingCapacities'];
References::$model_listing['NonricketConsult.Center'] = References::$lists['Centers'];
References::$model_listing['NonricketConsult.NextCenter'] = References::$lists["Centers"];
References::$model_listing['NonricketConsult.ExaminerName'] = References::$lists["examiner"];

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
References::$model_listing['RicketConsult.Center'] = References::$lists['Centers'];
References::$model_listing['RicketConsult.NextCenter'] = References::$lists["Centers"];
References::$model_listing['RicketConsult.ExaminerName'] = References::$lists["examiner"];
