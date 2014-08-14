-- 4.4.1.sql

-- Adding "lastuser" where it was missing
ALTER TABLE `labels` ADD `lastuser` VARCHAR(50) NULL DEFAULT NULL AFTER `modified`;
ALTER TABLE `users` ADD `lastuser` VARCHAR(50) NULL DEFAULT NULL AFTER `modified`;

