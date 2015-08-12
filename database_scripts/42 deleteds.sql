
RENAME TABLE deleted TO deleteds;

ALTER TABLE `deleteds` ADD `patient_id` INT(10) UNSIGNED NOT NULL AFTER `updated_at`, ADD INDEX (`patient_id`) ; 
