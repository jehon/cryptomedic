
-- == club foots == --

-- to migrate
-- update `club_foots` SET WalkingFloorContactLeft = WalkingFloorContact WHERE (Side = 165 or Side = 163 or Side is NULL) AND WalkingFloorContact > 0 AND (WalkingFloorContactLeft is null OR WalkingFloorContactLeft = 0);
-- update `club_foots` SET WalkingFirstContactLeft = WalkingFirstContact WHERE (Side = 165 or Side = 163 or Side is NULL) AND WalkingFirstContact > 0 AND (WalkingFirstContactLeft is null OR WalkingFirstContactLeft = 0);
-- update `club_foots` SET AdductionAngleLeft = AdductionAngle WHERE (Side = 165 or Side = 163 or Side is NULL) AND AdductionAngle > 0 AND (AdductionAngleLeft is null OR AdductionAngleLeft = 0);
-- update `club_foots` SET HindFootAngleWLeft = HindFootAngleW WHERE (Side = 165 or Side = 163 or Side is NULL) AND HindFootAngleW > 0 AND (HindFootAngleWLeft is null OR HindFootAngleWLeft = 0);
-- update `club_foots` SET DorsalFlexionMaxLeft = DorsalFlexionMax WHERE (Side = 165 or Side = 163 or Side is NULL) AND DorsalFlexionMax > 0 AND (DorsalFlexionMaxLeft is null OR DorsalFlexionMaxLeft = 0);
-- update `club_foots` SET PlantarFlexionMaxLeft = PlantarFlexionMax WHERE (Side = 165 or Side = 163 or Side is NULL) AND PlantarFlexionMax > 0 AND (PlantarFlexionMaxLeft is null OR PlantarFlexionMaxLeft = 0);
--
-- update `club_foots` SET WalkingFloorContactRight = WalkingFloorContact WHERE (Side = 165 or Side = 164 or Side is NULL) AND WalkingFloorContact > 0 AND (WalkingFloorContactRight is null OR WalkingFloorContactRight = 0);
-- update `club_foots` SET WalkingFirstContactRight = WalkingFirstContact WHERE (Side = 165 or Side = 164 or Side is NULL) AND WalkingFirstContact > 0 AND (WalkingFirstContactRight is null OR WalkingFirstContactRight = 0);
-- update `club_foots` SET AdductionAngleRight = AdductionAngle WHERE (Side = 165 or Side = 164 or Side is NULL) AND AdductionAngle > 0 AND (AdductionAngleRight is null OR AdductionAngleRight = 0);
-- update `club_foots` SET HindFootAngleWRight = HindFootAngleW WHERE (Side = 165 or Side = 164 or Side is NULL) AND HindFootAngleW > 0 AND (HindFootAngleWRight is null OR HindFootAngleWRight = 0);
-- update `club_foots` SET DorsalFlexionMaxRight = DorsalFlexionMax WHERE (Side = 165 or Side = 164 or Side is NULL) AND DorsalFlexionMax > 0 AND (DorsalFlexionMaxRight is null OR DorsalFlexionMaxRight = 0);
-- update `club_foots` SET PlantarFlexionMaxRight = PlantarFlexionMax WHERE (Side = 165 or Side = 164 or Side is NULL) AND PlantarFlexionMax > 0 AND (PlantarFlexionMaxRight is null OR PlantarFlexionMaxRight = 0);
--
-- update `club_foots` SET WalkingFloorContact = NULL WHERE WalkingFloorContact=WalkingFloorContactLeft;
-- update `club_foots` SET WalkingFirstContact = NULL WHERE WalkingFirstContact=WalkingFirstContactLeft;
-- update `club_foots` SET AdductionAngle = NULL WHERE AdductionAngle=AdductionAngleLeft;
-- update `club_foots` SET HindFootAngleW = NULL WHERE HindFootAngleW=HindFootAngleWLeft;
-- update `club_foots` SET DorsalFlexionMax = NULL WHERE DorsalFlexionMax=DorsalFlexionMaxLeft;
-- update `club_foots` SET PlantarFlexionMax = NULL WHERE PlantarFlexionMax=PlantarFlexionMaxLeft;
--
-- update `club_foots` SET WalkingFloorContact = NULL WHERE WalkingFloorContact=WalkingFloorContactRight;
-- update `club_foots` SET WalkingFirstContact = NULL WHERE WalkingFirstContact=WalkingFirstContactRight;
-- update `club_foots` SET AdductionAngle = NULL WHERE AdductionAngle=AdductionAngleRight;
-- update `club_foots` SET HindFootAngleW = NULL WHERE HindFootAngleW=HindFootAngleWRight;
-- update `club_foots` SET DorsalFlexionMax = NULL WHERE DorsalFlexionMax=DorsalFlexionMaxRight;
-- update `club_foots` SET PlantarFlexionMax = NULL WHERE PlantarFlexionMax=PlantarFlexionMaxRight;

ALTER TABLE `club_foots` 
    DROP FOREIGN KEY `club_foots_ibfk_1`;

ALTER TABLE `club_foots` 
    DROP FOREIGN KEY `club_foots_ibfk_2`;

-- empty values (or nearly empty values)
ALTER TABLE `club_foots`
  DROP `SchoolClass`,
  DROP `MUAC`,
  DROP `Walking`,
  DROP `Sport`,
  DROP `JumpingReception`,
  DROP `Adduction`,
  DROP `HindFootAngleD`,
  DROP `ThighFoot`,
  DROP `ThighFootAngle`,
  DROP `SupinationMax`,
  DROP `PronationMax`,
  DROP `EquinusReduc`,
  DROP `VarusReduc`,
  DROP `CPBRotation`,
  DROP `CavusFoot`,
  DROP `AbnormalMuscle`,
  DROP `DeepPosteriorCrease`,
  DROP `DeepMedialCrease`,
  DROP `DIMEGLIO`,
  DROP `Run`,
  DROP `Pain`,
  DROP `JumpingOneLeg`,
  DROP `Side`,
  DROP `WalkingFloorContact`,
  DROP `WalkingFirstContact`,
  DROP `AdductionAngle`,
  DROP `HindFootAngleW`,
  DROP `DorsalFlexionMax`,
  DROP `AdductionReduc`,
  DROP `PlantarFlexionMax`;
  
  
ALTER TABLE `nonricket_consults` DROP `SchoolClass`;
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY nonricket_consults_ibfk_4; ALTER TABLE `nonricket_consults` DROP `Pathology`;
ALTER TABLE `nonricket_consults` DROP `Comment`;
ALTER TABLE `nonricket_consults` DROP `Undernutrited`;
ALTER TABLE `nonricket_consults` DROP `Physiotherapy61`;
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY nonricket_consults_ibfk_7; ALTER TABLE `nonricket_consults` DROP `Plaster62`;
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY nonricket_consults_ibfk_8; ALTER TABLE `nonricket_consults` DROP `Orthopedicdevice65`;
ALTER TABLE `nonricket_consults` DROP `Worms`;

ALTER TABLE `ricket_consults` DROP `HeightcmLying`;
ALTER TABLE `ricket_consults` DROP `Sittingheightcm`;
ALTER TABLE `ricket_consults` DROP `Ageofbeginningofthedeformitiesyear`;
ALTER TABLE `ricket_consults` DROP `Treatmenttaken`;
ALTER TABLE `ricket_consults` DROP `Worms`;
ALTER TABLE `ricket_consults` DROP `Moneygivenbythefamily`;
ALTER TABLE `ricket_consults` DROP `Undernutrited`;
ALTER TABLE `ricket_consults` DROP `conclusion_medical_other`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_9; ALTER TABLE `ricket_consults` DROP `Onebowlvegetables`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_10; ALTER TABLE `ricket_consults` DROP `Twospoonsesamseedgrounded`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_8; ALTER TABLE `ricket_consults` DROP `Ricewithchun`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_11; ALTER TABLE `ricket_consults` DROP `Littlefishbowl`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_12; ALTER TABLE `ricket_consults` DROP `Milkglass`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_17; ALTER TABLE `ricket_consults` DROP `Bossingforehead`;
ALTER TABLE `ricket_consults` DROP `Cubitusvarus`;
ALTER TABLE `ricket_consults` DROP `KneeMobilityE`;
ALTER TABLE `ricket_consults` DROP `Iodisedsalt`;
ALTER TABLE `ricket_consults` DROP `SchoolClass`;
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_22; ALTER TABLE `ricket_consults` DROP `Nutritionaladvice`;
ALTER TABLE `ricket_consults` DROP `KneeMobilityF`;
ALTER TABLE `ricket_consults` DROP `Medical`;
ALTER TABLE `ricket_consults` DROP `conclusion_medical_codLiverOil`;

ALTER TABLE `surgeries` DROP `ReportDate`;
ALTER TABLE `surgeries` DROP `PASurgeon`;
ALTER TABLE `surgeries` DROP `PAOk`;
ALTER TABLE `surgeries` DROP `BTCough`;
ALTER TABLE `surgeries` DROP `BTSkin`;
ALTER TABLE `surgeries` DROP `BTTempF`;
ALTER TABLE `surgeries` DROP `NeedTreatment`;
ALTER TABLE `surgeries` DROP `OkForSurgery`;
ALTER TABLE `surgeries` DROP `RadiologicalExam`;
ALTER TABLE `surgeries` DROP `Worms`;
ALTER TABLE `surgeries` DROP FOREIGN KEY  `surgeries_ibfk_10` ; ALTER TABLE `surgeries` DROP `MouthAndTeeth`;
ALTER TABLE `surgeries` DROP FOREIGN KEY  `surgeries_ibfk_9` ; ALTER TABLE `surgeries` DROP `Skin`;
ALTER TABLE `surgeries` DROP FOREIGN KEY  `surgeries_ibfk_8` ; ALTER TABLE `surgeries` DROP `ChestAuscultation`;
ALTER TABLE `surgeries` DROP FOREIGN KEY  `surgeries_ibfk_7` ; ALTER TABLE `surgeries` DROP `HeartAuscultation`;
ALTER TABLE `surgeries` DROP `BloodPresureL`;
ALTER TABLE `surgeries` DROP `BloodPresureH`;
ALTER TABLE `surgeries` DROP `Pulsemin`;
ALTER TABLE `surgeries` DROP `TemperatureF`;
ALTER TABLE `surgeries` DROP `BleedingExecive`;
ALTER TABLE `surgeries` DROP FOREIGN KEY  `surgeries_ibfk_5` ; ALTER TABLE `surgeries` DROP `MedicalProblem`;
ALTER TABLE `surgeries` DROP `TransferChittagong`;
ALTER TABLE `surgeries` DROP `Lastrevisiondate`;
ALTER TABLE `surgeries` DROP `Complication`;
ALTER TABLE `surgeries` DROP `Surgeon`;
ALTER TABLE `surgeries` DROP `Notes`;
ALTER TABLE `surgeries` DROP FOREIGN KEY surgeries_ibfk_6; ALTER TABLE `surgeries` DROP `GeneralCondition`;
ALTER TABLE `surgeries` DROP `Treatment`;
ALTER TABLE `surgeries` DROP `ReportProcedure`;
