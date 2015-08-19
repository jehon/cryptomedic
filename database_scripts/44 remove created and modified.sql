
ALTER TABLE `bills` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE bills SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE bills SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `bills`  DROP `modified`,  DROP `created`;
ALTER TABLE `bills` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `bills` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `club_foots` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `club_foots` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `club_foots` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `club_foots` DROP `modified`, DROP `created`;
ALTER TABLE `club_foots` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `club_foots` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `deleteds` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `deleteds` DROP `modified`;
-- ALTER TABLE `deleteds` CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT NULL; 
  
ALTER TABLE `nonricket_consults` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `nonricket_consults` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `nonricket_consults` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `nonricket_consults` DROP `modified`, DROP `created`;
ALTER TABLE `nonricket_consults` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `nonricket_consults` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `patients` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `patients` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `patients` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `patients` DROP `modified`, DROP `created`;
ALTER TABLE `patients` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `patients` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `pictures` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `pictures` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `pictures` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `pictures` DROP `modified`, DROP `created`;
ALTER TABLE `pictures` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `pictures` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `prices` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `prices` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `prices` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `prices` DROP `modified`, DROP `created`;
ALTER TABLE `prices` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `prices` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

-- 7115
ALTER TABLE `ricket_consults` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `ricket_consults` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `ricket_consults` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `ricket_consults` DROP `modified`, DROP `created`;
ALTER TABLE `ricket_consults` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `ricket_consults` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `settings` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `settings` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `settings` DROP `modified`;
ALTER TABLE `settings` CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `surgeries` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `surgeries` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `surgeries` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `surgeries` DROP `modified`, DROP `created`;
ALTER TABLE `surgeries` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `surgeries` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

ALTER TABLE `users` CHANGE `modified` `modified` TIMESTAMP NULL DEFAULT NULL; 
UPDATE `users` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `users` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `users` DROP `modified`, DROP `created`;
ALTER TABLE `users` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `users` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 
