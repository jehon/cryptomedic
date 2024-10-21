ALTER TABLE `other_consults`
ADD `examination_data` MEDIUMTEXT NULL DEFAULT NULL AFTER `xray`;

UPDATE other_consults
SET
  examination_data = concat(
    COALESCE(`examination_data`, ''),
    "performed:\n",
    performed
  )
WHERE
  performed > "";

UPDATE other_consults
SET
  examination_data = concat(examination_data, "\n")
WHERE
  performed > ""
  AND not_performed > "";

UPDATE other_consults
SET
  examination_data = concat(
    COALESCE(`examination_data`, ''),
    "not performed:\n",
    not_performed
  )
WHERE
  not_performed > "";

ALTER TABLE `other_consults`
CHANGE `performed` `x_performed` MEDIUMTEXT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
CHANGE `not_performed` `x_not_performed` MEDIUMTEXT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL;
