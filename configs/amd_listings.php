<?php
global $model2controller;
$model2controller = array(
		"Bill" => "bills",
		"ClubFoot" => "club_foots",
		"NonricketConsult" => "nonricket_consults",
		"OrthopedicDevice" => "orthopedic_devices",
		"Patient" => "patients",
		"Picture" => "pictures",
		"RicketConsult" => "ricket_consults",
		"Surgery" => "surgeries",
		"SurgeryFollowup" => "surgery_followups"
);

global $amd_listing;
$amd_listing = array();

$amd_listing["Centers"] = array( 992, 993, 993, 994, 995, 996, 997, 1002 );
$amd_listing["Centers"]["labels"] = true;

$amd_listing["NullValue"] = array( 0, 302 );
$amd_listing["NullValue"]["labels"] = true;

$amd_listing["Surgery"] = array( 20, 312, 313, 314, 315, 316, 317, 318, 319 );
$amd_listing["Surgery"]["labels"] = true;

$amd_listing["CHO/27"] = array( 21, 22, 23, 24, 25 );
$amd_listing["CHO/27"]["labels"] = true;

$amd_listing["CHO/26"] = array( 26, 27, 28 );
$amd_listing["CHO/26"]["labels"] = true;

$amd_listing["Device"] = array( 42, 39, 37, 36, 33, 35, 38, 223, 40, 226, 232, 231, 225, 30, 224, 31, 234, 227, 230, 237, 235, 236, 29, 43 );
$amd_listing["Device"]["labels"] = true;

$amd_listing["Plaster"] = array( 51, 52, 53 );
$amd_listing["Plaster"]["labels"] = true;

$amd_listing["Unions"] = array( 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121 );
$amd_listing["Unions"]["labels"] = true;

$amd_listing["Upazilla"] = array( 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135 );
$amd_listing["Upazilla"]["labels"] = true;

$amd_listing["Districts"] = array( 136, 137, 138 );
$amd_listing["Districts"]["labels"] = true;

$amd_listing["CHO/29"] = array( 308, 309, 310, 311 );
$amd_listing["CHO/29"]["labels"] = true;

$amd_listing["Pain"] = array( 293, 294, 295 );
$amd_listing["Pain"]["labels"] = true;

$amd_listing["CHO/31"] = array( 210, 211, 212, 213, 303 );
$amd_listing["CHO/31"]["labels"] = true;

$amd_listing["CHO/4"] = array( 196, 197, 198, 199, 200, 201, 202, 287 );
$amd_listing["CHO/4"]["labels"] = true;

$amd_listing["WalkingCapacities"] = array( 288, 289, 290, 291, 292 );
$amd_listing["WalkingCapacities"]["labels"] = true;

$amd_listing["NutritionalAdvice"] = array( 139, 140 );
$amd_listing["NutritionalAdvice"]["labels"] = true;

$amd_listing["YesMediumNo"] = array( 275, 276, 277 );
$amd_listing["YesMediumNo"]["labels"] = true;

$amd_listing["Pathology"] = array( 278, 279, 280, 281, 282, 283, 284, 285, 286 );
$amd_listing["Pathology"]["labels"] = true;

$amd_listing["Religions"] = array( 141, 142, 143, 144, 145 );
$amd_listing["Religions"]["labels"] = true;

$amd_listing["Operation"] = array( 149, 150, 151, 152, 153, 154, 155, 156 );
$amd_listing["Operation"]["labels"] = true;

$amd_listing["LegAnalysis"] = array( 157, 158 );
$amd_listing["LegAnalysis"]["labels"] = true;

$amd_listing["Schools"] = array( 159, 160, 161, 162 );
$amd_listing["Schools"]["labels"] = true;

$amd_listing["Side"] = array( 163, 164, 165 );
$amd_listing["Side"]["labels"] = true;

$amd_listing["CHO/11"] = array( 166, 167, 168, 169, 170 );
$amd_listing["CHO/11"]["labels"] = true;

$amd_listing["Owning"] = array( 171, 172, 173 );
$amd_listing["Owning"]["labels"] = true;

$amd_listing["CHO/9"] = array( 174, 175, 176, 177, 178 );
$amd_listing["CHO/9"]["labels"] = true;

$amd_listing["SchoolAttendee"] = array( 203, 204, 205 );
$amd_listing["SchoolAttendee"]["labels"] = true;

$amd_listing["Gender"] = array( 206, 207 );
$amd_listing["Gender"]["labels"] = true;

$amd_listing["Frequency"] = array( 214, 215, 216, 217 );
$amd_listing["Frequency"]["labels"] = true;

$amd_listing["Eval03"] = array( 219, 220, 221, 222 );
$amd_listing["Eval03"]["labels"] = true;

$amd_listing["CHO/7"] = array( 185, 186, 187 );
$amd_listing["CHO/7"]["labels"] = true;

$amd_listing["CHO/6"] = array( 188, 189, 190, 191 );
$amd_listing["CHO/6"]["labels"] = true;

$amd_listing["ParentalStatus"] = array( 192, 193, 194, 195 );
$amd_listing["ParentalStatus"]["labels"] = true;

$amd_listing["MedicalProblem"] = array( 239, 240, 241, 242, 245, 246, 247, 248 );
$amd_listing["MedicalProblem"]["labels"] = true;

$amd_listing["GoodBad"] = array( 249, 250 );
$amd_listing["GoodBad"]["labels"] = true;

$amd_listing["HeartBeat"] = array( 251, 252, 253, 254 );
$amd_listing["HeartBeat"]["labels"] = true;

$amd_listing["ChestAuscultation"] = array( 255, 256, 257, 258 );
$amd_listing["ChestAuscultation"]["labels"] = true;

$amd_listing["Skin"] = array( 259, 260, 261 );
$amd_listing["Skin"]["labels"] = true;

$amd_listing["Teeth"] = array( 262, 263 );
$amd_listing["Teeth"]["labels"] = true;

$amd_listing["OrthopedicGoal"] = array( 264, 265, 266, 267, 268 );
$amd_listing["OrthopedicGoal"]["labels"] = true;

$amd_listing["OrthopedicUsage"] = array( 269, 270, 271 );
$amd_listing["OrthopedicUsage"]["labels"] = true;

$amd_listing["Material"] = array( 272, 273, 274 );
$amd_listing["Material"]["labels"] = true;

$amd_listing["SocialLevel"] = array( 0, 1, 2, 3, 4 );
$amd_listing["Pirani"] = array(0, 0.5, 1);
$amd_listing["0-10"] = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);


global $model_listing;
$model_listing = array();
$model_listing['Bill.Center'] = $amd_listing['Centers'];
$model_listing['Bill.Sociallevel'] = $amd_listing['SocialLevel'];

$model_listing['ClubFoot.CavusFoot'] = $amd_listing['Pain'];
$model_listing['ClubFoot.Side'] = $amd_listing['Side'];
$model_listing['ClubFoot.Run'] = array(0, 1, 2);
$model_listing['ClubFoot.Pain'] = array(0, 1, 2);
$model_listing['ClubFoot.Sport'] = array(1, 2, 3);
$model_listing['ClubFoot.WalkingFloorContact'] = array(1, 2, 3);
$model_listing['ClubFoot.WalkingFirstContact'] = array(1, 2, 3);
$model_listing['ClubFoot.EquinusReduc'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.VarusReduc'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.CPBRotation'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.AdductionReduc'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.DIMEGLIO'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.Center'] = $amd_listing['Centers'];
$model_listing['ClubFoot.EquinusReduc'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.VarusReduc'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.CPBRotation'] = array(1, 2, 3, 4);
$model_listing['ClubFoot.AdductionReduc'] = array(1, 2, 3, 4);

/* new one */
$model_listing['ClubFoot.CurvedLateralBorderLeft'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.CurvedLateralBorderRight'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.MedialCreaseLeft'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.MedialCreaseRight'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.TalarHeadCoverageLeft'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.TalarHeadCoverageRight'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.PosteriorCreaseLeft'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.PosteriorCreaseRight'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.RigidEquinusLeft'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.RigidEquinusRight'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.EmptyHeelLeft'] = $amd_listing['Pirani'];
$model_listing['ClubFoot.EmptyHeelRight'] = $amd_listing['Pirani'];

$model_listing['ClubFoot.PainLeft'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.PainRight'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.WalkingFloorContactLeft'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.WalkingFloorContactRight'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.WalkingFirstContactLeft'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.WalkingFirstContactRight'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.JumpingOneLegLeft'] = [ 0, 1 ];
$model_listing['ClubFoot.JumpingOneLegRight'] = [ 0, 1 ];
$model_listing['ClubFoot.RunLeft'] = [ 0, 1, 2 ];
$model_listing['ClubFoot.RunRight'] = [ 0, 1, 2 ];
// $model_listing['ClubFoot.AdductionAngleLeft'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.AdductionAngleRight'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.HindFootAngleWLeft'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.HindFootAngleWRight'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.DorsalFlexionMaxLeft'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.DorsalFlexionMaxRight'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.PlantarFlexionMaxLeft'] = $amd_listing["0-10"];
// $model_listing['ClubFoot.PlantarFlexionMaxRight'] = $amd_listing["0-10"];
$model_listing['ClubFoot.MuscularInbalanceLeft'] = $amd_listing["0-10"];
$model_listing['ClubFoot.MuscularInbalanceRight'] = $amd_listing["0-10"];
$model_listing['ClubFoot.NextCenter'] = $amd_listing["Centers"];


$model_listing['NonricketConsult.Orthopedicdevice65'] = $amd_listing['Device'];
$model_listing['NonricketConsult.Pain'] = $amd_listing['Pain'];
$model_listing['NonricketConsult.Pathology'] = $amd_listing['Pathology'];
$model_listing['NonricketConsult.Plaster62'] = $amd_listing['Plaster'];
$model_listing['NonricketConsult.Side'] = $amd_listing['Side'];
$model_listing['NonricketConsult.Surgery66'] = $amd_listing['Surgery'];
$model_listing['NonricketConsult.Walk'] = $amd_listing['WalkingCapacities'];
$model_listing['NonricketConsult.Center'] = $amd_listing['Centers'];
$model_listing['NonricketConsult.NextCenter'] = $amd_listing["Centers"];

$model_listing['OrthopedicDevice.Device'] = $amd_listing['Device'];
$model_listing['OrthopedicDevice.Goal'] = $amd_listing['OrthopedicGoal'];
$model_listing['OrthopedicDevice.Orthopedicdevice'] = $amd_listing['CHO/29'];
$model_listing['OrthopedicDevice.Result'] = $amd_listing['CHO/26'];
$model_listing['OrthopedicDevice.TypeOfMaterial'] = $amd_listing['Material'];
$model_listing['OrthopedicDevice.UsingProposal'] = $amd_listing['OrthopedicUsage'];

$model_listing['Patient.District'] = $amd_listing['Districts'];
$model_listing['Patient.Doesthechildrengotoschool'] = $amd_listing['SchoolAttendee'];
$model_listing['Patient.Family'] = $amd_listing['ParentalStatus'];
$model_listing['Patient.Fatherseducation'] = $amd_listing['Schools'];
$model_listing['Patient.Home'] = $amd_listing['Owning'];
$model_listing['Patient.Motherseducation'] = $amd_listing['Schools'];
$model_listing['Patient.Religion'] = $amd_listing['Religions'];
$model_listing['Patient.Roof'] = $amd_listing['CHO/4'];
$model_listing['Patient.Sex'] = $amd_listing['Gender'];
$model_listing['Patient.Sociallevel'] = $amd_listing['SocialLevel'];
$model_listing['Patient.Union_'] = $amd_listing['Unions'];
$model_listing['Patient.Upazilla'] = $amd_listing['Upazilla'];
$model_listing['Patient.Wall'] = $amd_listing['CHO/4'];

$model_listing['RicketConsult.Bossingforehead'] = $amd_listing['Eval03'];
$model_listing['RicketConsult.Brace'] = $amd_listing['Device'];
$model_listing['RicketConsult.LaxityLeft'] = $amd_listing['Eval03'];
$model_listing['RicketConsult.LaxityRight'] = $amd_listing['Eval03'];
$model_listing['RicketConsult.Leftleg'] = $amd_listing['LegAnalysis'];
$model_listing['RicketConsult.Littlefishbowl'] = $amd_listing['Frequency'];
$model_listing['RicketConsult.Milkglass'] = $amd_listing['Frequency'];
$model_listing['RicketConsult.Nutritionaladvice'] = $amd_listing['NutritionalAdvice'];
$model_listing['RicketConsult.Onebowlvegetables'] = $amd_listing['Frequency'];
$model_listing['RicketConsult.Pain'] = $amd_listing['Pain'];
$model_listing['RicketConsult.Ribbeading'] = $amd_listing['Eval03'];
$model_listing['RicketConsult.Ricewithchun'] = $amd_listing['Frequency'];
$model_listing['RicketConsult.Rightleg'] = $amd_listing['LegAnalysis'];
$model_listing['RicketConsult.SocialLevel'] = $amd_listing['SocialLevel'];
$model_listing['RicketConsult.Surgery'] = $amd_listing['Surgery'];
$model_listing['RicketConsult.Twospoonsesamseedgrounded'] = $amd_listing['Frequency'];
$model_listing['RicketConsult.WalkingDifficulties'] = $amd_listing['WalkingCapacities'];
$model_listing['RicketConsult.Wristenlargement'] = $amd_listing['Eval03'];
$model_listing['RicketConsult.Center'] = $amd_listing['Centers'];
$model_listing['RicketConsult.NextCenter'] = $amd_listing["Centers"];

$model_listing['Surgery.ChestAuscultation'] = $amd_listing['ChestAuscultation'];
$model_listing['Surgery.GeneralCondition'] = $amd_listing['GoodBad'];
$model_listing['Surgery.HeartAuscultation'] = $amd_listing['HeartBeat'];
$model_listing['Surgery.Location'] = $amd_listing['CHO/11'];
$model_listing['Surgery.MedicalProblem'] = $amd_listing['MedicalProblem'];
$model_listing['Surgery.MouthAndTeeth'] = $amd_listing['Teeth'];
$model_listing['Surgery.Operation'] = $amd_listing['Operation'];
$model_listing['Surgery.Side'] = $amd_listing['Side'];
$model_listing['Surgery.Skin'] = $amd_listing['Skin'];
