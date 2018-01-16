
-- move column
ALTER TABLE `users` CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL AFTER `id`;
ALTER TABLE `users` CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-01-01 00:00:00' AFTER `created_at`;
ALTER TABLE `users` CHANGE `lastuser` `lastuser` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `updated_at`;
ALTER TABLE `users` CHANGE `group` `group` CHAR(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `email`;

-- add columns
ALTER TABLE `users` ADD `codage` VARCHAR(16) NULL AFTER `email`;
ALTER TABLE `users` ADD `inExaminerList` TINYINT(1) NOT NULL DEFAULT '0' AFTER `group`;
