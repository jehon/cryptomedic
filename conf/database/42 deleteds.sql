
RENAME TABLE deleted TO deleteds;

ALTER TABLE `deleteds` DROP `modified` ;
ALTER TABLE `deleteds` ADD `patient_id` INT(10) UNSIGNED NOT NULL AFTER `updated_at`, ADD INDEX (`patient_id`) ; 
ALTER TABLE `deleteds` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 
ALTER TABLE `deleteds` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
