-- 4.4.1.sql

-- Adding "lastuser" where it was missing
ALTER TABLE `labels` ADD `lastuser` VARCHAR(50) NULL DEFAULT NULL AFTER `modified`;
ALTER TABLE `users` ADD `lastuser` VARCHAR(50) NULL DEFAULT NULL AFTER `modified`;

ALTER TABLE `club_foots` ADD `NextCenter` int(10) unsigned DEFAULT NULL AFTER `Nextappointment`;
ALTER TABLE `ricket_consults` ADD `NextCenter` int(10) unsigned DEFAULT NULL AFTER `Nextappointment`;
ALTER TABLE `nonricket_consults` ADD `NextCenter` int(10) unsigned DEFAULT NULL AFTER `Nextappointment`;

ALTER TABLE `club_foots` 
	CHANGE `EmptyHeelRight` `EmptyHeelRight` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `EmptyHeelLeft` `EmptyHeelLeft` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `RigidEquinusRight` `RigidEquinusRight` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `RigidEquinusLeft` `RigidEquinusLeft` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `PosteriorCreaseRight` `PosteriorCreaseRight` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `PosteriorCreaseLeft` `PosteriorCreaseLeft` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `TalarHeadCoverageRight` `TalarHeadCoverageRight` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `TalarHeadCoverageLeft` `TalarHeadCoverageLeft` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `MedialCreaseRight` `MedialCreaseRight` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `MedialCreaseLeft` `MedialCreaseLeft` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `CurvedLateralBorderRight` `CurvedLateralBorderRight` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL,
	CHANGE `CurvedLateralBorderLeft` `CurvedLateralBorderLeft` DECIMAL(5,2) UNSIGNED NULL DEFAULT NULL;

-- Insert new price
INSERT INTO `prices` (`id`, `lastuser`, `datefrom`, `dateto`, `consult_CDC_consultation_physio`, `consult_CDC_consultation_Bengali_Doctor`, `consult_field_visit`, `consult_home_visit`, `consult_medecine`, `consult_making_plaster`, `consult_making_dressing`, `consult_X_Ray`, `consult_physiotherapy`, `consult_Other_consultation_care`, `workshop_BHKAFO_night`, `workshop_BHKAFO_walking`, `workshop_UHKAFO_night`, `workshop_UHKAFO_walking`, `workshop_BKAFO_night`, `workshop_BKAFO_walking`, `workshop_UKAFO_night`, `workshop_UKAFO_walking`, `workshop_Knee_brace`, `workshop_BAFO_night`, `workshop_BAFO_walking`, `workshop_UAFO_night`, `workshop_UAFO_walking`, `workshop_Orthoshoes_with_bar`, `workshop_Orthoshoes_without_bar`, `workshop_DDB_splint`, `workshop_Compensation_sole`, `workshop_Arch_support`, `workshop_Matetarsal_pade`, `workshop_Supinator_corner`, `workshop_Wirst_splint`, `workshop_Hand_splint`, `workshop_Finger_splint`, `workshop_Walker_with_wheel`, `workshop_Walker_without_wheel`, `workshop_Crutch_a_pair`, `workshop_Crutch_a_piece`, `workshop_Wheel_chair`, `workshop_CP_chair`, `workshop_CP_standing_table`, `workshop_Cervical_Collar`, `workshop_Abdominal_corset_belt`, `workshop_Reparing`, `workshop_Other_orthodevice`, `surgical_osteotomy`, `surgical_epiphysiodesis`, `surgical_polio_AL`, `surgical_percutaneous_AL_club_foot`, `surgical_PMR_club_foot`, `surgical_Burn_release`, `surgical_Pin_removal`, `surgical_other_operation`, `other_microbus`, `other_CMOSH_follow_up`, `socialLevelPercentage_0`, `socialLevelPercentage_1`, `socialLevelPercentage_2`, `socialLevelPercentage_3`, `socialLevelPercentage_4`, `consult_give_appointment`, `consult_vitamineD`, `consult_nutritionalAdvice`, `consult_nutritionalSupport`, `consult_group_physiotherapy`, `workshop_BHKAFO_Drop_lock_single_axis`, `workshop_crutch_alumenium`, `workshop_chair_china`, `workshop_mailwalke_brace`, `workshop_leg_truction`, `workshop_thoracic_brace`, `workshop_samainto_brace`, `workshop_fracture_brace`, `workshop_smo`, `workshop_lifspring_afo`, `surgical_osteotomy_bi`, `surgical_epiphysiodesis_bi`, `surgical_polio_achileus_Achileus_lenthening_bi`, `surgical_percutaneous_achil_tenotomy_bi_cmosh`, `surgical_percutaneous_achil_tenotomy_uni_cdc`, `surgical_percutaneous_achil_tenotomy_bi_cdc`, `surgical_PMR_club_club_foot_bi`, `surgical_burn_little_release`) 
VALUES (4, 'jehon', NOW(), null, 100, 300, -1, 150, 100, 400, 200, 150, 200, 1, 4500, 6670, 3500, 4400, 3200, 3200, 1600, 1600, 2200, 2750, 3000, -1, 1800, 1620, 1250, 1200, 600, 360, 200, 300, 600, 1200, 800, 1620, 1320, -1, 400, 7700, 1500, 5000, 350, 450, 300, 1, 20000, 10000, 15000, 5000, 15000, 20000, 5000, 1, -1, -1, 0, 0.2, 0.4, 0.7, 1, 150, 100, 100, 1000, 100, 8800, 1800, 6600, 3500, 460, 2500, 3800, 3200, 1600, 1000, 25000, 15000, 18000, 6000, 2000, 2500, 18000, 10000);

UPDATE `amd_chakaria`.`prices` SET `consult_X_Ray` = '200', `consult_nutritionalAdvice` = '-1' WHERE `prices`.`id` = 4;

-- Set date From on previous price
UPDATE prices 
	SET dateto = (select x.datefrom from (select max(datefrom) as datefrom from prices) x)
	WHERE (dateto IS null) AND (id <> (select x.id from (select max(id) as id from prices) x));

UPDATE `amd_chakaria`.`prices` SET `consult_CDC_consultation_Doctor` = '300' WHERE `prices`.`id` = 4;
UPDATE `amd_chakaria`.`prices` SET `consult_CDC_consultation_Bengali_Doctor` = '-1' WHERE `prices`.`id` = 4;
