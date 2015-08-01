
UPDATE bills SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE bills SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `bills`  DROP `modified`,  DROP `created`;
  
UPDATE `club_foots` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `club_foots` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `club_foots` DROP `modified`, DROP `created`;

UPDATE `deleted` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `deleted` DROP `modified`;
  
UPDATE `nonricket_consults` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `nonricket_consults` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `nonricket_consults` DROP `modified`, DROP `created`;

UPDATE `patients` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `patients` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `patients` DROP `modified`, DROP `created`;

UPDATE `pictures` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `pictures` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `pictures` DROP `modified`, DROP `created`;

UPDATE `prices` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `prices` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `prices` DROP `modified`, DROP `created`;

UPDATE `settings` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `settings` DROP `modified`;

UPDATE `surgeries` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `surgeries` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `surgeries` DROP `modified`, DROP `created`;

UPDATE `ricket_consults` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `ricket_consults` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `ricket_consults` DROP `modified`, DROP `created`;

UPDATE `users` SET created_at = created  WHERE created_at IS NULL or created_at = 0;
UPDATE `users` SET updated_at = modified WHERE updated_at IS NULL or updated_at = 0;
ALTER TABLE `users` DROP `modified`, DROP `created`;
