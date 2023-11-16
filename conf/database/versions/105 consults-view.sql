DROP VIEW consults;

CREATE VIEW
  `consults` AS (
    SELECT
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
      `ricket_consults`.`TreatmentEvaluation` AS `treatment_evaluation`,
      `ricket_consults`.`TreatmentFinished` AS `treatment_finished`,
      `ricket_consults`.`Comments` AS `comments`,
      `ricket_consults`.`suggestedForSurgery` AS `suggested_for_surgery`
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
    `club_feet`.`ExaminerName` AS `examiner`,
    `club_feet`.`Center` AS `center`,
    `club_feet`.`Weightkg` AS `weight_kg`,
    `club_feet`.`Heightcm` AS `height_cm`,
    `club_feet`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `club_feet`.`TreatmentEvaluation` AS `treatment_evaluation`,
    `club_feet`.`TreatmentFinished` AS `treatment_finished`,
    `club_feet`.`Comments` AS `comments`,
    `club_feet`.`suggestedForSurgery` AS `suggested_for_surgery`
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
    `other_consults`.`ExaminerName` AS `examiner`,
    `other_consults`.`Center` AS `center`,
    `other_consults`.`Weightkg` AS `weight_kg`,
    `other_consults`.`Heightcm` AS `height_cm`,
    `other_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `other_consults`.`TreatmentEvaluation` AS `treatment_evaluation`,
    `other_consults`.`TreatmentFinished` AS `treatment_finished`,
    `other_consults`.`Comments` AS `comments`,
    `other_consults`.`suggestedForSurgery` AS `suggested_for_surgery`
  FROM
    `other_consults`
)
