-- Date
ALTER TABLE `appointments` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `bills` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `club_feet` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `other_consults` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `payments` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `pictures` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

ALTER TABLE `surgeries` CHANGE `Date` `date` DATE NULL DEFAULT NULL;

DROP VIEW consults;

CREATE VIEW
  `consults` AS (
    SELECT
      'ricket_consult' AS `type`,
      `ricket_consults`.`id`,
      `ricket_consults`.`created_at`,
      `ricket_consults`.`updated_at`,
      `ricket_consults`.`patient_id`,
      `ricket_consults`.`date`,
      `ricket_consults`.`examiner`,
      `ricket_consults`.`center`,
      `ricket_consults`.`Weightkg` AS `weight_kg`,
      `ricket_consults`.`Heightcm` AS `height_cm`,
      `ricket_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
      `ricket_consults`.`treatment_evaluation`,
      `ricket_consults`.`treatment_finished`,
      `ricket_consults`.`comments`,
      `ricket_consults`.`suggested_for_surgery`
    FROM
      `ricket_consults`
  )
UNION
(
  SELECT
    'club_foot' AS `type`,
    `club_feet`.`id`,
    `club_feet`.`created_at`,
    `club_feet`.`updated_at`,
    `club_feet`.`patient_id`,
    `club_feet`.`date`,
    `club_feet`.`examiner`,
    `club_feet`.`center`,
    `club_feet`.`Weightkg` AS `weight_kg`,
    `club_feet`.`Heightcm` AS `height_cm`,
    `club_feet`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `club_feet`.`treatment_evaluation`,
    `club_feet`.`treatment_finished`,
    `club_feet`.`comments` AS `comments`,
    `club_feet`.`suggested_for_surgery`
  FROM
    `club_feet`
)
UNION
(
  SELECT
    'other_consult' AS `type`,
    `other_consults`.`id`,
    `other_consults`.`created_at`,
    `other_consults`.`updated_at`,
    `other_consults`.`patient_id`,
    `other_consults`.`date`,
    `other_consults`.`examiner`,
    `other_consults`.`center`,
    `other_consults`.`Weightkg` AS `weight_kg`,
    `other_consults`.`Heightcm` AS `height_cm`,
    `other_consults`.`Brachialcircumferencecm` AS `brachial_circumference_cm`,
    `other_consults`.`treatment_evaluation`,
    `other_consults`.`treatment_finished`,
    `other_consults`.`comments`,
    `other_consults`.`suggested_for_surgery`
  FROM
    `other_consults`
)
