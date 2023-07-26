DROP VIEW consults;

CREATE VIEW `consults` AS (
    select
        'ricket_consult' AS `type`,
        `ricket_consults`.`id` AS `id`,
        `ricket_consults`.`created_at` AS `created_at`,
        `ricket_consults`.`updated_at` AS `updated_at`,
        `ricket_consults`.`patient_id` AS `patient_id`,
        `ricket_consults`.`Date` AS `Date`,
        `ricket_consults`.`ExaminerName` AS `ExaminerName`,
        `ricket_consults`.`Center` AS `Center`,
        `ricket_consults`.`Weightkg` AS `Weightkg`,
        `ricket_consults`.`Heightcm` AS `Heightcm`,
        `ricket_consults`.`Brachialcircumferencecm` AS `Brachialcircumferencecm`,
        `ricket_consults`.`TreatmentEvaluation` AS `TreatmentEvaluation`,
        `ricket_consults`.`TreatmentFinished` AS `TreatmentFinished`,
        `ricket_consults`.`Comments` AS `Comments`,
        `ricket_consults`.`suggestedForSurgery` AS `suggestedForSurgery`
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
        `club_feet`.`Date` AS `Date`,
        `club_feet`.`ExaminerName` AS `ExaminerName`,
        `club_feet`.`Center` AS `Center`,
        `club_feet`.`Weightkg` AS `Weightkg`,
        `club_feet`.`Heightcm` AS `Heightcm`,
        `club_feet`.`Brachialcircumferencecm` AS `Brachialcircumferencecm`,
        `club_feet`.`TreatmentEvaluation` AS `TreatmentEvaluation`,
        `club_feet`.`TreatmentFinished` AS `TreatmentFinished`,
        `club_feet`.`Comments` AS `Comments`,
        `club_feet`.`suggestedForSurgery` AS `suggestedForSurgery`
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
        `other_consults`.`Date` AS `Date`,
        `other_consults`.`ExaminerName` AS `ExaminerName`,
        `other_consults`.`Center` AS `Center`,
        `other_consults`.`Weightkg` AS `Weightkg`,
        `other_consults`.`Heightcm` AS `Heightcm`,
        `other_consults`.`Brachialcircumferencecm` AS `Brachialcircumferencecm`,
        `other_consults`.`TreatmentEvaluation` AS `TreatmentEvaluation`,
        `other_consults`.`TreatmentFinished` AS `TreatmentFinished`,
        `other_consults`.`Comments` AS `Comments`,
        `other_consults`.`suggestedForSurgery` AS `suggestedForSurgery`
   from
        `other_consults`
)