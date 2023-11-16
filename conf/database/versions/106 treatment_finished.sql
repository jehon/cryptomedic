ALTER TABLE `club_feet` CHANGE `TreatmentFinished` `treatment_finished` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `TreatmentFinished` `treatment_finished` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `TreatmentFinished` `treatment_finished` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `club_feet` CHANGE `TreatmentEvaluation` `treatment_evaluation` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `TreatmentEvaluation` `treatment_evaluation` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `TreatmentEvaluation` `treatment_evaluation` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `club_feet` CHANGE `suggestedForSurgery` `suggested_for_surgery` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `suggestedForSurgery` `suggested_for_surgery` TINYINT (1) NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `suggestedForSurgery` `suggested_for_surgery` TINYINT (1) NULL DEFAULT NULL;

DROP VIEW consults;

CREATE VIEW
  `consults` AS (
    select
      'ricket_consult' AS `type`,
      `ricket_consults`.`id` AS `id`,
      `ricket_consults`.`created_at` AS `created_at`,
      `ricket_consults`.`updated_at` AS `updated_at`,
      `ricket_consults`.`patient_id` AS `patient_id`,
      `ricket_consults`.`Date` AS `date`,
      `ricket_consults`.`ExaminerName` AS `examiner`,
      `ricket_consults`.`Center` AS `center`,
      `ricket_consults`.`Weightkg` AS `weight_kg`,
      `ricket_consults`.`Heightcm` AS `height_cm`,
      `ricket_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
      `ricket_consults`.`treatment_evaluation` AS `treatment_evaluation`,
      `ricket_consults`.`treatment_finished` AS `treatment_finished`,
      `ricket_consults`.`Comments` AS `comments`,
      `ricket_consults`.`suggested_for_surgery` AS `suggested_for_surgery`
    from
      `ricket_consults`
  )
union
(
  select
    'club_foot' AS `type`,
    `club_feet`.`id` AS `id`,
    `club_feet`.`created_at` AS `created_at`,
    `club_feet`.`updated_at` AS `updated_at`,
    `club_feet`.`patient_id` AS `patient_id`,
    `club_feet`.`Date` AS `date`,
    `club_feet`.`ExaminerName` AS `examiner`,
    `club_feet`.`Center` AS `center`,
    `club_feet`.`Weightkg` AS `weight_kg`,
    `club_feet`.`Heightcm` AS `height_cm`,
    `club_feet`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `club_feet`.`treatment_evaluation` AS `treatment_evaluation`,
    `club_feet`.`treatment_finished` AS `treatment_finished`,
    `club_feet`.`Comments` AS `comments`,
    `club_feet`.`suggested_for_surgery` AS `suggested_for_surgery`
  from
    `club_feet`
)
union
(
  select
    'other_consult' AS `type`,
    `other_consults`.`id` AS `id`,
    `other_consults`.`created_at` AS `created_at`,
    `other_consults`.`updated_at` AS `updated_at`,
    `other_consults`.`patient_id` AS `patient_id`,
    `other_consults`.`Date` AS `date`,
    `other_consults`.`ExaminerName` AS `examiner`,
    `other_consults`.`Center` AS `center`,
    `other_consults`.`Weightkg` AS `weight_kg`,
    `other_consults`.`Heightcm` AS `height_cm`,
    `other_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `other_consults`.`treatment_evaluation` AS `treatment_evaluation`,
    `other_consults`.`treatment_finished` AS `treatment_finished`,
    `other_consults`.`Comments` AS `comments`,
    `other_consults`.`suggested_for_surgery` AS `suggested_for_surgery`
  from
    `other_consults`
)
