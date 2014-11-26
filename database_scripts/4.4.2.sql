ALTER TABLE `club_foots` 
	ADD `WalkingFirstContactRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `WalkingFloorContactRight`,
	ADD `WalkingFirstContactLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `WalkingFloorContactRight`;

ALTER TABLE `users` ADD `name` VARCHAR(127) NULL DEFAULT NULL AFTER `username`;

UPDATE users SET `username` = trim(lower(username)), `name` = `username`;

UPDATE `amd_chakaria`.`users` SET `name` = 'Thierry Craviari' WHERE `users`.`id` = 3;
UPDATE `amd_chakaria`.`users` SET `name` = 'Guillaume Schoubben' WHERE `users`.`id` = 4;
UPDATE `amd_chakaria`.`users` SET `name` = 'Jean Honlet' WHERE `users`.`id` = 7;
UPDATE `amd_chakaria`.`users` SET `name` = 'Bernard Parent' WHERE `users`.`id` = 30;
