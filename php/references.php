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

    static $amd_listing = array();
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
            if (!is_numeric($v)) continue;
            $res[$v] = self::unreference($v);
        }
        return $res;

    }
}

References::$amd_listing["Centers"] = array( 992, 993, 993, 994, 995, 996, 997, 1002 );
References::$amd_listing["Centers"]["labels"] = true;

References::$amd_listing["NullValue"] = array( 0, 302 );
References::$amd_listing["NullValue"]["labels"] = true;

References::$amd_listing["Surgery"] = array( 20, 312, 313, 314, 315, 316, 317, 318, 319 );
References::$amd_listing["Surgery"]["labels"] = true;

References::$amd_listing["CHO/27"] = array( 21, 22, 23, 24, 25 );
References::$amd_listing["CHO/27"]["labels"] = true;

References::$amd_listing["CHO/26"] = array( 26, 27, 28 );
References::$amd_listing["CHO/26"]["labels"] = true;

References::$amd_listing["Device"] = array( 42, 39, 37, 36, 33, 35, 38, 223, 40, 226, 232, 231, 225, 30, 224, 31, 234, 227, 230, 237, 235, 236, 29, 43 );
References::$amd_listing["Device"]["labels"] = true;

References::$amd_listing["Plaster"] = array( 51, 52, 53 );
References::$amd_listing["Plaster"]["labels"] = true;

References::$amd_listing["Unions"] = array( 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121 );
References::$amd_listing["Unions"]["labels"] = true;

References::$amd_listing["Upazilla"] = array( 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135 );
References::$amd_listing["Upazilla"]["labels"] = true;

References::$amd_listing["Districts"] = array( 136, 137, 138 );
References::$amd_listing["Districts"]["labels"] = true;

References::$amd_listing["CHO/29"] = array( 308, 309, 310, 311 );
References::$amd_listing["CHO/29"]["labels"] = true;

References::$amd_listing["Pain"] = array( 293, 294, 295 );
References::$amd_listing["Pain"]["labels"] = true;

References::$amd_listing["CHO/31"] = array( 210, 211, 212, 213, 303 );
References::$amd_listing["CHO/31"]["labels"] = true;

References::$amd_listing["CHO/4"] = array( 196, 197, 198, 199, 200, 201, 202, 287 );
References::$amd_listing["CHO/4"]["labels"] = true;

References::$amd_listing["WalkingCapacities"] = array( 288, 289, 290, 291, 292 );
References::$amd_listing["WalkingCapacities"]["labels"] = true;

References::$amd_listing["NutritionalAdvice"] = array( 139, 140 );
References::$amd_listing["NutritionalAdvice"]["labels"] = true;

References::$amd_listing["YesMediumNo"] = array( 275, 276, 277 );
References::$amd_listing["YesMediumNo"]["labels"] = true;

References::$amd_listing["Pathology"] = array( 278, 279, 280, 281, 282, 283, 284, 285, 286 );
References::$amd_listing["Pathology"]["labels"] = true;

References::$amd_listing["Religions"] = array( 141, 142, 143, 144, 145 );
References::$amd_listing["Religions"]["labels"] = true;

References::$amd_listing["Operation"] = array( 149, 150, 151, 152, 153, 154, 155, 156 );
References::$amd_listing["Operation"]["labels"] = true;

References::$amd_listing["LegAnalysis"] = array( 157, 158 );
References::$amd_listing["LegAnalysis"]["labels"] = true;

References::$amd_listing["Schools"] = array( 159, 160, 161, 162 );
References::$amd_listing["Schools"]["labels"] = true;

References::$amd_listing["Side"] = array( 163, 164, 165 );
References::$amd_listing["Side"]["labels"] = true;

References::$amd_listing["CHO/11"] = array( 166, 167, 168, 169, 170 );
References::$amd_listing["CHO/11"]["labels"] = true;

References::$amd_listing["Owning"] = array( 171, 172, 173 );
References::$amd_listing["Owning"]["labels"] = true;

References::$amd_listing["CHO/9"] = array( 174, 175, 176, 177, 178 );
References::$amd_listing["CHO/9"]["labels"] = true;

References::$amd_listing["SchoolAttendee"] = array( 203, 204, 205 );
References::$amd_listing["SchoolAttendee"]["labels"] = true;

References::$amd_listing["Gender"] = array( 206, 207 );
References::$amd_listing["Gender"]["labels"] = true;

References::$amd_listing["Frequency"] = array( 214, 215, 216, 217 );
References::$amd_listing["Frequency"]["labels"] = true;

References::$amd_listing["Eval03"] = array( 219, 220, 221, 222 );
References::$amd_listing["Eval03"]["labels"] = true;

References::$amd_listing["CHO/7"] = array( 185, 186, 187 );
References::$amd_listing["CHO/7"]["labels"] = true;

References::$amd_listing["CHO/6"] = array( 188, 189, 190, 191 );
References::$amd_listing["CHO/6"]["labels"] = true;

References::$amd_listing["ParentalStatus"] = array( 192, 193, 194, 195 );
References::$amd_listing["ParentalStatus"]["labels"] = true;

References::$amd_listing["MedicalProblem"] = array( 239, 240, 241, 242, 245, 246, 247, 248 );
References::$amd_listing["MedicalProblem"]["labels"] = true;

References::$amd_listing["GoodBad"] = array( 249, 250 );
References::$amd_listing["GoodBad"]["labels"] = true;

References::$amd_listing["HeartBeat"] = array( 251, 252, 253, 254 );
References::$amd_listing["HeartBeat"]["labels"] = true;

References::$amd_listing["ChestAuscultation"] = array( 255, 256, 257, 258 );
References::$amd_listing["ChestAuscultation"]["labels"] = true;

References::$amd_listing["Skin"] = array( 259, 260, 261 );
References::$amd_listing["Skin"]["labels"] = true;

References::$amd_listing["Teeth"] = array( 262, 263 );
References::$amd_listing["Teeth"]["labels"] = true;

References::$amd_listing["OrthopedicGoal"] = array( 264, 265, 266, 267, 268 );
References::$amd_listing["OrthopedicGoal"]["labels"] = true;

References::$amd_listing["OrthopedicUsage"] = array( 269, 270, 271 );
References::$amd_listing["OrthopedicUsage"]["labels"] = true;

References::$amd_listing["Material"] = array( 272, 273, 274 );
References::$amd_listing["Material"]["labels"] = true;

References::$amd_listing["SocialLevel"] = array( 0, 1, 2, 3, 4 );
References::$amd_listing["Pirani"] = array(0, 0.5, 1);
References::$amd_listing["0-10"] = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

References::$model_listing['Bill.Center'] = References::$amd_listing['Centers'];
References::$model_listing['Bill.Sociallevel'] = References::$amd_listing['SocialLevel'];

References::$model_listing['ClubFoot.CavusFoot'] = References::$amd_listing['Pain'];
References::$model_listing['ClubFoot.Side'] = References::$amd_listing['Side'];
References::$model_listing['ClubFoot.Run'] = array(0, 1, 2);
References::$model_listing['ClubFoot.Pain'] = array(0, 1, 2);
References::$model_listing['ClubFoot.Sport'] = array(1, 2, 3);
References::$model_listing['ClubFoot.WalkingFloorContact'] = array(1, 2, 3);
References::$model_listing['ClubFoot.WalkingFirstContact'] = array(1, 2, 3);
References::$model_listing['ClubFoot.EquinusReduc'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.VarusReduc'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.CPBRotation'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.AdductionReduc'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.DIMEGLIO'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.Center'] = References::$amd_listing['Centers'];
References::$model_listing['ClubFoot.EquinusReduc'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.VarusReduc'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.CPBRotation'] = array(1, 2, 3, 4);
References::$model_listing['ClubFoot.AdductionReduc'] = array(1, 2, 3, 4);

/* new one */
References::$model_listing['ClubFoot.CurvedLateralBorderLeft'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.CurvedLateralBorderRight'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.MedialCreaseLeft'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.MedialCreaseRight'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.TalarHeadCoverageLeft'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.TalarHeadCoverageRight'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.PosteriorCreaseLeft'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.PosteriorCreaseRight'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.RigidEquinusLeft'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.RigidEquinusRight'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.EmptyHeelLeft'] = References::$amd_listing['Pirani'];
References::$model_listing['ClubFoot.EmptyHeelRight'] = References::$amd_listing['Pirani'];

References::$model_listing['ClubFoot.PainLeft'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.PainRight'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.WalkingFloorContactLeft'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.WalkingFloorContactRight'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.WalkingFirstContactLeft'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.WalkingFirstContactRight'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.JumpingOneLegLeft'] = [ 0, 1 ];
References::$model_listing['ClubFoot.JumpingOneLegRight'] = [ 0, 1 ];
References::$model_listing['ClubFoot.RunLeft'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.RunRight'] = [ 0, 1, 2 ];
References::$model_listing['ClubFoot.MuscularInbalanceLeft'] = References::$amd_listing["0-10"];
References::$model_listing['ClubFoot.MuscularInbalanceRight'] = References::$amd_listing["0-10"];
References::$model_listing['ClubFoot.NextCenter'] = References::$amd_listing["Centers"];


References::$model_listing['NonricketConsult.Orthopedicdevice65'] = References::$amd_listing['Device'];
References::$model_listing['NonricketConsult.Pain'] = References::$amd_listing['Pain'];
References::$model_listing['NonricketConsult.Pathology'] = References::$amd_listing['Pathology'];
References::$model_listing['NonricketConsult.Plaster62'] = References::$amd_listing['Plaster'];
References::$model_listing['NonricketConsult.Side'] = References::$amd_listing['Side'];
References::$model_listing['NonricketConsult.Surgery66'] = References::$amd_listing['Surgery'];
References::$model_listing['NonricketConsult.Walk'] = References::$amd_listing['WalkingCapacities'];
References::$model_listing['NonricketConsult.Center'] = References::$amd_listing['Centers'];
References::$model_listing['NonricketConsult.NextCenter'] = References::$amd_listing["Centers"];

// References::$model_listing['OrthopedicDevice.Device'] = References::$amd_listing['Device'];
// References::$model_listing['OrthopedicDevice.Goal'] = References::$amd_listing['OrthopedicGoal'];
// References::$model_listing['OrthopedicDevice.Orthopedicdevice'] = References::$amd_listing['CHO/29'];
// References::$model_listing['OrthopedicDevice.Result'] = References::$amd_listing['CHO/26'];
// References::$model_listing['OrthopedicDevice.TypeOfMaterial'] = References::$amd_listing['Material'];
// References::$model_listing['OrthopedicDevice.UsingProposal'] = References::$amd_listing['OrthopedicUsage'];

References::$model_listing['Patient.District'] = References::$amd_listing['Districts'];
References::$model_listing['Patient.Doesthechildrengotoschool'] = References::$amd_listing['SchoolAttendee'];
References::$model_listing['Patient.Family'] = References::$amd_listing['ParentalStatus'];
References::$model_listing['Patient.Fatherseducation'] = References::$amd_listing['Schools'];
References::$model_listing['Patient.Home'] = References::$amd_listing['Owning'];
References::$model_listing['Patient.Motherseducation'] = References::$amd_listing['Schools'];
References::$model_listing['Patient.Religion'] = References::$amd_listing['Religions'];
References::$model_listing['Patient.Roof'] = References::$amd_listing['CHO/4'];
References::$model_listing['Patient.Sex'] = References::$amd_listing['Gender'];
References::$model_listing['Patient.Sociallevel'] = References::$amd_listing['SocialLevel'];
References::$model_listing['Patient.Union_'] = References::$amd_listing['Unions'];
References::$model_listing['Patient.Upazilla'] = References::$amd_listing['Upazilla'];
References::$model_listing['Patient.Wall'] = References::$amd_listing['CHO/4'];

References::$model_listing['RicketConsult.Bossingforehead'] = References::$amd_listing['Eval03'];
References::$model_listing['RicketConsult.Brace'] = References::$amd_listing['Device'];
References::$model_listing['RicketConsult.LaxityLeft'] = References::$amd_listing['Eval03'];
References::$model_listing['RicketConsult.LaxityRight'] = References::$amd_listing['Eval03'];
References::$model_listing['RicketConsult.LeftLeg'] = References::$amd_listing['LegAnalysis'];
References::$model_listing['RicketConsult.Littlefishbowl'] = References::$amd_listing['Frequency'];
References::$model_listing['RicketConsult.Milkglass'] = References::$amd_listing['Frequency'];
References::$model_listing['RicketConsult.Nutritionaladvice'] = References::$amd_listing['NutritionalAdvice'];
References::$model_listing['RicketConsult.Onebowlvegetables'] = References::$amd_listing['Frequency'];
References::$model_listing['RicketConsult.Pain'] = References::$amd_listing['Pain'];
References::$model_listing['RicketConsult.Ribbeading'] = References::$amd_listing['Eval03'];
References::$model_listing['RicketConsult.Ricewithchun'] = References::$amd_listing['Frequency'];
References::$model_listing['RicketConsult.RightLeg'] = References::$amd_listing['LegAnalysis'];
References::$model_listing['RicketConsult.SocialLevel'] = References::$amd_listing['SocialLevel'];
References::$model_listing['RicketConsult.Surgery'] = References::$amd_listing['Surgery'];
References::$model_listing['RicketConsult.Twospoonsesamseedgrounded'] = References::$amd_listing['Frequency'];
References::$model_listing['RicketConsult.WalkingDifficulties'] = References::$amd_listing['WalkingCapacities'];
References::$model_listing['RicketConsult.Wristenlargement'] = References::$amd_listing['Eval03'];
References::$model_listing['RicketConsult.Center'] = References::$amd_listing['Centers'];
References::$model_listing['RicketConsult.NextCenter'] = References::$amd_listing["Centers"];

References::$model_listing['Surgery.ChestAuscultation'] = References::$amd_listing['ChestAuscultation'];
References::$model_listing['Surgery.GeneralCondition'] = References::$amd_listing['GoodBad'];
References::$model_listing['Surgery.HeartAuscultation'] = References::$amd_listing['HeartBeat'];
References::$model_listing['Surgery.Location'] = References::$amd_listing['CHO/11'];
References::$model_listing['Surgery.MedicalProblem'] = References::$amd_listing['MedicalProblem'];
References::$model_listing['Surgery.MouthAndTeeth'] = References::$amd_listing['Teeth'];
References::$model_listing['Surgery.Operation'] = References::$amd_listing['Operation'];
References::$model_listing['Surgery.Side'] = References::$amd_listing['Side'];
References::$model_listing['Surgery.Skin'] = References::$amd_listing['Skin'];
