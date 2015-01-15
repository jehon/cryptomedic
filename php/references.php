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

    static function unreference($value, $table = "", $field = "") {
        global $server;
        $labels = $server->getDatabase()->getTable("labels");
        if ($table != "") {
            if (!array_key_exists("$table.$field", References::$model_listing)) {
                return $value;
            }       
        }
        $res = $labels->rowGet($value);
        if ($res) {
            return $res["english"];
        }
        return $value;
    }

    static function unreferenceObject($table, array $array) {
        foreach($array as $f => $v) {
            $array[$f] = self::unreference($v, $table, $f);
        }
        return $array;
    }

    static function buildLinkedList($list) {
        global $server;
        $labels = $server->getDatabase()->getTable("labels");

        $res = array();
        foreach($list as $k => $v){
            if (is_numeric($v)) {
            	$res[$v] = self::unreference($v);
            } else {
            	$res[$v] = $v;
            }
        }
        return $res;
    }
    
    static function buildValueList($list) {
    	return array_combine($list, $list);
    }
    
    static function sortNatural($array) {
    	$narray = $array;
    	natsort($narray);
    	return $narray;
    }
}


// Helper: http://localhost/rest/reports/listings/Centers

// References::$lists["CHO/27"] = References::buildLinkedList(array( 21, 22, 23, 24, 25 ));
// References::$lists["CHO/26"] = References::buildLinkedList(array( 26, 27, 28 ));
// References::$lists["CHO/29"] = References::buildLinkedList(array( 308, 309, 310, 311 ));
// References::$lists["CHO/31"] = References::buildLinkedList(array( 210, 211, 212, 213, 303 ));
// References::$lists["CHO/9"] = References::buildLinkedList(array( 174, 175, 176, 177, 178 ));
// References::$lists["CHO/7"] = References::buildLinkedList(array( 185, 186, 187 ));
// References::$lists["CHO/6"] = References::buildLinkedList(array( 188, 189, 190, 191 ));

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
References::$lists["Gender"] = References::buildValueList([ "Male", "Female" ]);
// References::$lists["Centers"] = References::buildLinkedList(array( 992, 993, 994, 995, 996, 997, 1002 ));
References::$lists["Centers"] = References::buildValueList(["Chakaria", "Moeshkali", "Ukhia", "Ramu", "Cox's Bazar", "Other place", "CMOSH"]);

// References::$lists["NullValue"] = References::buildLinkedList(array( 0, 302));
References::$lists["Surgery"] = References::buildLinkedList(array( 20, 312, 313, 314, 315, 316, 317, 318, 319 ));
References::$lists["Device"] = References::buildLinkedList(array( 42, 39, 37, 36, 33, 35, 38, 223, 40, 226, 232, 231, 225, 30, 224, 31, 234, 227, 230, 237, 235, 236, 29, 43 ));
References::$lists["Plaster"] = References::buildLinkedList(array( 51, 52, 53 ));
References::$lists["Pain"] = References::buildLinkedList(array( 293, 294, 295 ));
// References::$lists["ConstructionMaterial"] = References::buildLinkedList(array( 196, 197, 198, 199, 200, 201, 202, 287 )); // CHO/4
References::$lists["WalkingCapacities"] = References::buildLinkedList(array( 288, 289, 290, 291, 292 ));
References::$lists["NutritionalAdvice"] = References::buildLinkedList(array( 139, 140 ));
// References::$lists["YesMediumNo"] = References::buildLinkedList(array( 275, 276, 277 ));
References::$lists["Pathology"] = References::buildLinkedList(array( 278, 279, 280, 281, 282, 283, 284, 285, 286 ));
// References::$lists["Religions"] = References::buildLinkedList(array( 141, 142, 143, 144, 145 ));
// References::$lists["Operation"] = References::buildLinkedList(array( 149, 150, 151, 152, 153, 154, 155, 156 ));
References::$lists["LegAnalysis"] = References::buildLinkedList(array( 157, 158 ));
// References::$lists["Schools"] = References::buildLinkedList(array( 159, 160, 161, 162 ));
References::$lists["Side"] = References::buildLinkedList(array( 163, 164, 165 ));
// References::$lists["BodyLocation"] = References::buildLinkedList(array( 166, 167, 168, 169, 170 )); // Was CHO/11
// References::$lists["Owning"] = References::buildLinkedList(array( 171, 172, 173 ));
// References::$lists["SchoolAttendee"] = References::buildLinkedList(array( 203, 204, 205 ));
References::$lists["Frequency"] = References::buildLinkedList(array( 214, 215, 216, 217 ));
References::$lists["Eval03"] = References::buildLinkedList(array( 219, 220, 221, 222 ));
// References::$lists["ParentalStatus"] = References::buildLinkedList(array( 192, 193, 194, 195 ));
// References::$lists["MedicalProblem"] = References::buildLinkedList(array( 239, 240, 241, 242, 245, 246, 247, 248 ));
// References::$lists["GoodBad"] = References::buildLinkedList(array( 249, 250 ));
// References::$lists["HeartBeat"] = References::buildLinkedList(array( 251, 252, 253, 254 ));
// References::$lists["ChestAuscultation"] = References::buildLinkedList(array( 255, 256, 257, 258 ));
// References::$lists["Skin"] = References::buildLinkedList(array( 259, 260, 261 ));
// References::$lists["Teeth"] = References::buildLinkedList(array( 262, 263 ));
References::$lists["OrthopedicGoal"] = References::buildLinkedList(array( 264, 265, 266, 267, 268 ));
References::$lists["OrthopedicUsage"] = References::buildLinkedList(array( 269, 270, 271 ));
References::$lists["Material"] = References::buildLinkedList(array( 272, 273, 274 ));
References::$lists["SocialLevel"] = References::buildValueList(array( 0, 1, 2, 3, 4 ));
References::$lists["Pirani"] = References::buildValueList(array(0, 0.5, 1));
References::$lists["0-10"] = References::buildValueList(array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

References::$lists["examiner"] = References::buildValueList([ 
	"Ershad", "Rezaul", "Ricta", "Shetou", "Murshed", "Rina", // physio 
	"Debashish", "Hassan 1", "Hassan 2", "Liton", // orthesis
	"Shudir", "Rokeya", "Prytosh", "Kobir", "Nur Alam", "Zia", // Field monitors
	"Taslim", "Monir", "AMD doctor" // Doctors
	]);

References::$model_listing['Bill.Center'] = References::$lists['Centers'];
References::$model_listing['Bill.Sociallevel'] = References::$lists['SocialLevel'];

References::$model_listing['ClubFoot.CavusFoot'] = References::$lists['Pain'];
References::$model_listing['ClubFoot.Side'] = References::$lists['Side'];
References::$model_listing['ClubFoot.Run'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.Pain'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.Sport'] = References::buildValueList(array(1, 2, 3));
References::$model_listing['ClubFoot.WalkingFloorContact'] = References::buildValueList(array(1, 2, 3));
References::$model_listing['ClubFoot.WalkingFirstContact'] = References::buildValueList(array(1, 2, 3));
References::$model_listing['ClubFoot.EquinusReduc'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.VarusReduc'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.CPBRotation'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.AdductionReduc'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.DIMEGLIO'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.EquinusReduc'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.VarusReduc'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.CPBRotation'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.AdductionReduc'] = References::buildValueList(array(1, 2, 3, 4));
References::$model_listing['ClubFoot.Center'] = References::$lists['Centers'];
References::$model_listing['ClubFoot.NextCenter'] = References::$lists["Centers"];

/* new one */
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
References::$model_listing['ClubFoot.JumpingOneLegLeft'] = References::buildValueList(array(0, 1));
References::$model_listing['ClubFoot.JumpingOneLegRight'] = References::buildValueList(array(0, 1));
References::$model_listing['ClubFoot.RunLeft'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.RunRight'] = References::buildValueList(array(0, 1, 2));
References::$model_listing['ClubFoot.MuscularInbalanceLeft'] = References::$lists["0-10"];
References::$model_listing['ClubFoot.MuscularInbalanceRight'] = References::$lists["0-10"];


References::$model_listing['NonricketConsult.Orthopedicdevice65'] = References::$lists['Device'];
References::$model_listing['NonricketConsult.Pain'] = References::$lists['Pain'];
References::$model_listing['NonricketConsult.Pathology'] = References::$lists['Pathology'];
References::$model_listing['NonricketConsult.Plaster62'] = References::$lists['Plaster'];
References::$model_listing['NonricketConsult.Side'] = References::$lists['Side'];
References::$model_listing['NonricketConsult.Surgery66'] = References::$lists['Surgery'];
References::$model_listing['NonricketConsult.Walk'] = References::$lists['WalkingCapacities'];
References::$model_listing['NonricketConsult.Center'] = References::$lists['Centers'];
References::$model_listing['NonricketConsult.NextCenter'] = References::$lists["Centers"];
References::$model_listing['NonricketConsult.ExaminerName'] = References::$lists["examiner"];

References::$model_listing['Patient.District'] = References::$lists['Districts'];
// References::$model_listing['Patient.Doesthechildrengotoschool'] = References::$lists['SchoolAttendee'];
// References::$model_listing['Patient.Family'] = References::$lists['ParentalStatus'];
// References::$model_listing['Patient.Fatherseducation'] = References::$lists['Schools'];
// References::$model_listing['Patient.Home'] = References::$lists['Owning'];
// References::$model_listing['Patient.Motherseducation'] = References::$lists['Schools'];
// References::$model_listing['Patient.Religion'] = References::$lists['Religions'];
// References::$model_listing['Patient.Roof'] = References::$lists['ConstructionMaterial'];
References::$model_listing['Patient.Sex'] = References::$lists['Gender'];
// References::$model_listing['Patient.Sociallevel'] = References::$lists['SocialLevel'];
References::$model_listing['Patient.Union_'] = References::$lists['Unions'];
References::$model_listing['Patient.Upazilla'] = References::$lists['Upazilla'];
// References::$model_listing['Patient.Wall'] = References::$lists['ConstructionMaterial'];

References::$model_listing['RicketConsult.Bossingforehead'] = References::$lists['Eval03'];
References::$model_listing['RicketConsult.Brace'] = References::$lists['Device'];
References::$model_listing['RicketConsult.LaxityLeft'] = References::$lists['Eval03'];
References::$model_listing['RicketConsult.LaxityRight'] = References::$lists['Eval03'];
References::$model_listing['RicketConsult.LeftLeg'] = References::$lists['LegAnalysis'];
References::$model_listing['RicketConsult.Littlefishbowl'] = References::$lists['Frequency'];
References::$model_listing['RicketConsult.Milkglass'] = References::$lists['Frequency'];
References::$model_listing['RicketConsult.Nutritionaladvice'] = References::$lists['NutritionalAdvice'];
References::$model_listing['RicketConsult.Onebowlvegetables'] = References::$lists['Frequency'];
References::$model_listing['RicketConsult.Pain'] = References::$lists['Pain'];
References::$model_listing['RicketConsult.Ribbeading'] = References::$lists['Eval03'];
References::$model_listing['RicketConsult.Ricewithchun'] = References::$lists['Frequency'];
References::$model_listing['RicketConsult.RightLeg'] = References::$lists['LegAnalysis'];
References::$model_listing['RicketConsult.SocialLevel'] = References::$lists['SocialLevel'];
References::$model_listing['RicketConsult.Surgery'] = References::$lists['Surgery'];
References::$model_listing['RicketConsult.Twospoonsesamseedgrounded'] = References::$lists['Frequency'];
References::$model_listing['RicketConsult.WalkingDifficulties'] = References::$lists['WalkingCapacities'];
References::$model_listing['RicketConsult.Wristenlargement'] = References::$lists['Eval03'];
References::$model_listing['RicketConsult.Center'] = References::$lists['Centers'];
References::$model_listing['RicketConsult.NextCenter'] = References::$lists["Centers"];
References::$model_listing['RicketConsult.ExaminerName'] = References::$lists["examiner"];

// References::$model_listing['Surgery.ChestAuscultation'] = References::$lists['ChestAuscultation'];
// References::$model_listing['Surgery.GeneralCondition'] = References::$lists['GoodBad'];
// References::$model_listing['Surgery.HeartAuscultation'] = References::$lists['HeartBeat'];
// References::$model_listing['Surgery.Location'] = References::$lists['BodyLocation'];
// References::$model_listing['Surgery.MedicalProblem'] = References::$lists['MedicalProblem'];
// References::$model_listing['Surgery.MouthAndTeeth'] = References::$lists['Teeth'];
// References::$model_listing['Surgery.Operation'] = References::$lists['Operation'];
// References::$model_listing['Surgery.Side'] = References::$lists['Side'];
// References::$model_listing['Surgery.Skin'] = References::$lists['Skin'];
