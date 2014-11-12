
-- add the email for the user
ALTER TABLE `users` ADD `email` VARCHAR(255) NULL DEFAULT NULL AFTER `password`;

ALTER TABLE `users` ADD `notes` VARCHAR(255) NULL DEFAULT NULL AFTER `email`;

ALTER TABLE `users` ADD UNIQUE( `username`);
