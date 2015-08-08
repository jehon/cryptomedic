
UPDATE bills SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE bills SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `bills`  DROP `modified`,  DROP `created`;
ALTER TABLE `bills` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `bills` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `club_foots` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `club_foots` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `club_foots` DROP `modified`, DROP `created`;
ALTER TABLE `club_foots` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `club_foots` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `deleted` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `deleted` DROP `modified`;
ALTER TABLE `deleted` CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT NULL; 
  
UPDATE `nonricket_consults` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `nonricket_consults` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `nonricket_consults` DROP `modified`, DROP `created`;
ALTER TABLE `nonricket_consults` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `nonricket_consults` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `patients` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `patients` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `patients` DROP `modified`, DROP `created`;
ALTER TABLE `patients` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `patients` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `pictures` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `pictures` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `pictures` DROP `modified`, DROP `created`;
ALTER TABLE `pictures` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `pictures` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `prices` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `prices` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `prices` DROP `modified`, DROP `created`;
ALTER TABLE `prices` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `prices` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `ricket_consults` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `ricket_consults` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `ricket_consults` DROP `modified`, DROP `created`;
ALTER TABLE `ricket_consults` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `ricket_consults` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `settings` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `settings` DROP `modified`;
ALTER TABLE `settings` CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT NULL; 

UPDATE `surgeries` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `surgeries` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `surgeries` DROP `modified`, DROP `created`;
ALTER TABLE `surgeries` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `surgeries` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 

UPDATE `users` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `users` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `users` DROP `modified`, DROP `created`;
ALTER TABLE `users` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP; 
ALTER TABLE `users` CHANGE `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL; 
