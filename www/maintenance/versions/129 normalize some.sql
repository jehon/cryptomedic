ALTER TABLE `patients`
CHANGE `updated_at` `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `patients`
CHANGE `entry_order` `entry_order` INT(5) UNSIGNED NOT NULL;

ALTER TABLE `patients`
CHANGE `entry_year` `entry_year` INT(5) UNSIGNED NOT NULL;

ALTER TABLE `surgeries`
CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `surgeries`
CHANGE `last_user` `last_user` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';

ALTER TABLE `surgeries`
CHANGE `date` `date` DATE NOT NULL;

ALTER TABLE `surgeries`
CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `appointments`
CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `appointments`
CHANGE `last_user` `last_user` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';

ALTER TABLE `appointments`
CHANGE `updated_at` `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `appointments`
CHANGE `date` `date` DATE NOT NULL AFTER `patient_id`;

ALTER TABLE `appointments`
CHANGE `purpose` `purpose` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `center`;

ALTER TABLE `appointments`
CHANGE `center` `center` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `date`;
