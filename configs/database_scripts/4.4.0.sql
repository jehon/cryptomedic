
-- Surgery.diagnostic = varchar
ALTER TABLE `surgeries` CHANGE `ReportDiagnostic` `ReportDiagnostic` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

INSERT INTO `amd_chakaria`.`labels` (`id`, `modified`, `reference`, `english`, `french`) VALUES (NULL, CURRENT_TIMESTAMP, NULL, 'CMOSH', NULL);

-- Create a new price
UPDATE `amd_chakaria`.`prices` SET `dateto` = CURRENT_DATE() WHERE `prices`.`id` = 2;

INSERT INTO `prices` (`id`, `lastuser`, `datefrom`, `dateto`, `consult_CDC_consultation_physio`, `consult_CDC_consultation_Bengali_Doctor`, `consult_field_visit`, `consult_home_visit`, `consult_medecine`, `consult_making_plaster`, `consult_making_dressing`, `consult_X_Ray`, `consult_physiotherapy`, `consult_Other_consultation_care`, `workshop_BHKAFO_night`, `workshop_BHKAFO_walking`, `workshop_UHKAFO_night`, `workshop_UHKAFO_walking`, `workshop_BKAFO_night`, `workshop_BKAFO_walking`, `workshop_UKAFO_night`, `workshop_UKAFO_walking`, `workshop_Knee_brace`, `workshop_BAFO_night`, `workshop_BAFO_walking`, `workshop_UAFO_night`, `workshop_UAFO_walking`, `workshop_Orthoshoes_with_bar`, `workshop_Orthoshoes_without_bar`, `workshop_DDB_splint`, `workshop_Compensation_sole`, `workshop_Arch_support`, `workshop_Matetarsal_pade`, `workshop_Supinator_corner`, `workshop_Wirst_splint`, `workshop_Hand_splint`, `workshop_Finger_splint`, `workshop_Walker_with_wheel`, `workshop_Walker_without_wheel`, `workshop_Crutch_a_pair`, `workshop_Crutch_a_piece`, `workshop_Wheel_chair`, `workshop_CP_chair`, `workshop_CP_standing_table`, `workshop_Cervical_Collar`, `workshop_Abdominal_corset_belt`, `workshop_Reparing`, `workshop_Other_orthodevice`, `surgical_osteotomy`, `surgical_epiphysiodesis`, `surgical_polio_AL`, `surgical_percutaneous_AL_club_foot`, `surgical_PMR_club_foot`, `surgical_Burn_release`, `surgical_Pin_removal`, `surgical_other_operation`, `other_microbus`, `other_CMOSH_follow_up`, `socialLevelPercentage_0`, `socialLevelPercentage_1`, `socialLevelPercentage_2`, `socialLevelPercentage_3`, `socialLevelPercentage_4`, `consult_give_appointment`, `consult_vitamineD`, `consult_nutritionalAdvice`, `consult_nutritionalSupport`, `consult_group_physiotherapy`, `workshop_BHKAFO_Drop_lock_single_axis`, `workshop_crutch_alumenium`, `workshop_chair_china`, `workshop_mailwalke_brace`, `workshop_leg_truction`, `workshop_thoracic_brace`, `workshop_samainto_brace`, `workshop_fracture_brace`, `workshop_smo`, `workshop_lifspring_afo`, `surgical_osteotomy_bi`, `surgical_epiphysiodesis_bi`, `surgical_polio_achileus_Achileus_lenthening_bi`, `surgical_percutaneous_achil_tenotomy_bi_cmosh`, `surgical_percutaneous_achil_tenotomy_uni_cdc`, `surgical_percutaneous_achil_tenotomy_bi_cdc`, `surgical_PMR_club_club_foot_bi`, `surgical_burn_little_release`) 
VALUES (3, 'jehon', null, null, 100, 300, -1, 150, 100, 400, 200, 150, 200, 1, 4500, 6670, 3500, 4400, 3200, 3200, 1600, 1600, 2200, 2750, 3000, -1, 1800, 1620, 1250, 1200, 600, 360, 200, 300, 600, 1200, 800, 1620, 1320, -1, 400, 7700, 1500, 5000, 350, 450, 300, 1, 20000, 10000, 15000, 5000, 15000, 20000, 5000, 1, -1, -1, 0, 0.2, 0.4, 0.7, 1, 150, 100, 100, 1000, 100, 8800, 1800, 6600, 3500, 460, 2500, 3800, 3200, 1600, 1000, 25000, 15000, 18000, 6000, 2000, 2500, 18000, 10000);

update prices 
	set datefrom = (select x.dateto from (select dateto from prices where id = 2) x)
	where id = 3;

UPDATE `amd_chakaria`.`prices` 
SET 
	`consult_Other_consultation_care` = '-1', 
	`surgical_other_operation` = '-1', 
	`consult_nutritionalAdvice` = '-1' 
WHERE `prices`.`id` = 3;

ALTER TABLE `bills` ADD `consult_CDC_consultation_Doctor` INT(11) NOT NULL DEFAULT '0' 
	AFTER `consult_CDC_consultation_Bengali_Doctor`;

ALTER TABLE `prices` ADD `consult_CDC_consultation_Doctor` INT(11) NOT NULL DEFAULT '-1'
	AFTER `consult_CDC_consultation_Bengali_Doctor`;

UPDATE `amd_chakaria`.`prices` SET 
	`consult_CDC_consultation_Bengali_Doctor` = '-1', 
	`consult_CDC_consultation_Doctor` = '300' WHERE `prices`.`id` = 3;

ALTER TABLE `club_foots` 
	ADD `MuscularInbalanceRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `MuscularInbalanceLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `PlantarFlexionMaxRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `PlantarFlexionMaxLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `DorsalFlexionMaxRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `DorsalFlexionMaxLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `HindFootAngleWRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `HindFootAngleWLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `AdductionAngleRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `AdductionAngleLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `RunRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `RunLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `JumpingOneLegRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `JumpingOneLegLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `WalkingFirstContactRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `WalkingFirstContactLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `WalkingFloorContactRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `WalkingFloorContactLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `PainRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`,
	ADD `PainLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `MUAC`;


ALTER TABLE `club_foots` 
	ADD `EmptyHeelRight` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `EmptyHeelLeft` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `RigidEquinusRight` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `RigidEquinusLeft` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `PosteriorCreaseRight` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `PosteriorCreaseLeft` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `TalarHeadCoverageRight` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `TalarHeadCoverageLeft` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `MedialCreaseRight` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `MedialCreaseLeft` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `CurvedLateralBorderRight` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`,
	ADD `CurvedLateralBorderLeft` DECIMAL(5) UNSIGNED NULL DEFAULT NULL AFTER `MuscularInbalanceRight`;

UPDATE patients SET Sex = null WHERE Sex = 0;


ALTER TABLE `bills` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `club_foots` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `nonricket_consults` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `orthopedic_devices` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `patients` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `pictures` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `prices` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `ricket_consults` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `surgeries` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `surgery_followups` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
