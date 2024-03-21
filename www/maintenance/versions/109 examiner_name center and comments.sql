-- Center
ALTER TABLE `bills` CHANGE `Center` `center` VARCHAR(40) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `club_feet` CHANGE `Center` `center` VARCHAR(40) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `Center` `center` VARCHAR(40) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `Center` `center` VARCHAR(40) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

-- ExaminerName
ALTER TABLE `appointments` CHANGE `ExaminerName` `examiner` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `bills` CHANGE `ExaminerName` `examiner` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `club_feet` CHANGE `ExaminerName` `examiner` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `ExaminerName` `examiner` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `payments` CHANGE `ExaminerName` `examiner` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `ExaminerName` `examiner` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

-- Comments
ALTER TABLE `club_feet` CHANGE `Comments` `comments` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `Comments` `comments` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `payments` CHANGE `Notes` `comments` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `pictures` CHANGE `Comment` `comments` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `Comments` `comments` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

DROP VIEW consults;

CREATE VIEW `consults` AS (
  SELECT
    'ricket_consult' AS `type`,
    `ricket_consults`.`id` AS `id`,
    `ricket_consults`.`created_at` AS `created_at`,
    `ricket_consults`.`updated_at` AS `updated_at`,
    `ricket_consults`.`patient_id` AS `patient_id`,
    `ricket_consults`.`Date` AS `date`,
    `ricket_consults`.`examiner` AS `examiner`,
    `ricket_consults`.`center` AS `center`,
    `ricket_consults`.`Weightkg` AS `weight_kg`,
    `ricket_consults`.`Heightcm` AS `height_cm`,
    `ricket_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `ricket_consults`.`treatment_evaluation` AS `treatment_evaluation`,
    `ricket_consults`.`treatment_finished` AS `treatment_finished`,
    `ricket_consults`.`comments` AS `comments`,
    `ricket_consults`.`suggested_for_surgery` AS `suggested_for_surgery`
  FROM
    `ricket_consults`
)
UNION
(
  SELECT
    'club_foot' AS `type`,
    `club_feet`.`id` AS `id`,
    `club_feet`.`created_at` AS `created_at`,
    `club_feet`.`updated_at` AS `updated_at`,
    `club_feet`.`patient_id` AS `patient_id`,
    `club_feet`.`Date` AS `date`,
    `club_feet`.`examiner` AS `examiner`,
    `club_feet`.`center` AS `center`,
    `club_feet`.`Weightkg` AS `weight_kg`,
    `club_feet`.`Heightcm` AS `height_cm`,
    `club_feet`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `club_feet`.`treatment_evaluation` AS `treatment_evaluation`,
    `club_feet`.`treatment_finished` AS `treatment_finished`,
    `club_feet`.`comments` AS `comments`,
    `club_feet`.`suggested_for_surgery` AS `suggested_for_surgery`
  FROM
    `club_feet`
)
UNION
(
  SELECT
    'other_consult' AS `type`,
    `other_consults`.`id` AS `id`,
    `other_consults`.`created_at` AS `created_at`,
    `other_consults`.`updated_at` AS `updated_at`,
    `other_consults`.`patient_id` AS `patient_id`,
    `other_consults`.`Date` AS `date`,
    `other_consults`.`examiner` AS `examiner`,
    `other_consults`.`center` AS `center`,
    `other_consults`.`Weightkg` AS `weight_kg`,
    `other_consults`.`Heightcm` AS `height_cm`,
    `other_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `other_consults`.`treatment_evaluation` AS `treatment_evaluation`,
    `other_consults`.`treatment_finished` AS `treatment_finished`,
    `other_consults`.`comments` AS `comments`,
    `other_consults`.`suggested_for_surgery` AS `suggested_for_surgery`
  FROM
    `other_consults`
)
