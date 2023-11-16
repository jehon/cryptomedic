ALTER TABLE `patients` CHANGE `Yearofbirth` `year_of_birth` VARCHAR(7) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `AddressNotes` `address_notes` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `Telephone` `phone` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `entryyear` `entry_year` INT (4) UNSIGNED NOT NULL;

ALTER TABLE `patients` CHANGE `entryorder` `entry_order` INT (4) NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `Name` `name` VARCHAR(255) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NOT NULL;

ALTER TABLE `patients` CHANGE `Sex` `sex` ENUM ('Male', 'Female') CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `Pathology` `pathology` VARCHAR(20) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `District` `address_district` VARCHAR(24) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `Upazilla` `address_upazilla` VARCHAR(24) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `Union_` `address_union` VARCHAR(24) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `patients` CHANGE `phone` `phone` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `year_of_birth`;

ALTER TABLE `patients` CHANGE `other_comments` `comments` MEDIUMTEXT CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
