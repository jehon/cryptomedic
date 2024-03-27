UPDATE patients
SET
  updated_at = NOW()
WHERE
  updated_at = NULL;

UPDATE patients
SET
  last_user = ""
WHERE
  last_user = NULL;

UPDATE patients
SET
  phone = ""
WHERE
  phone = NULL;

UPDATE patients
SET
  address_comments = ""
WHERE
  address_comments = NULL;

UPDATE patients
SET
  pathology = ""
WHERE
  pathology = NULL;

UPDATE patients
SET
  comments = ""
WHERE
  comments = NULL;

ALTER TABLE `cryptomedic`.`patients`
DROP INDEX `patients_entrynumber`,
DROP INDEX `Pathology`,
DROP INDEX `Name`;

ALTER TABLE `patients`
CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `patients`
CHANGE `last_user` `last_user` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';

ALTER TABLE `patients`
CHANGE `entry_order` `entry_order` INT(4) NOT NULL;

ALTER TABLE `patients`
CHANGE `phone` `phone` VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '';

ALTER TABLE `patients`
CHANGE `pathology` `pathology` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '';

ALTER TABLE `patients`
CHANGE `address_comments` `address_comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE `patients`
CHANGE `comments` `comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE `cryptomedic`.`patients`
ADD UNIQUE `patients_entrynumber` (`entry_year`, `entry_order`) USING BTREE,
ADD INDEX `Pathology` (`pathology`) USING BTREE,
ADD INDEX `Name` (`name`) USING BTREE;
