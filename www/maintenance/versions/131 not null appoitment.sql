UPDATE appointments
SET
  center = ""
WHERE
  center IS NULL;

UPDATE appointments
SET
  purpose = ""
WHERE
  purpose IS NULL;

ALTER TABLE `appointments`
CHANGE `center` `center` VARCHAR(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL;

ALTER TABLE `appointments`
CHANGE `purpose` `purpose` MEDIUMTEXT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL;
