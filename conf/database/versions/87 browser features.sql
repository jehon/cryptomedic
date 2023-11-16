RENAME TABLE `cryptomedic`.`features` TO `cryptomedic`.`browser_features`;

ALTER TABLE `browser_features` ADD `browser_name` VARCHAR(125) NOT NULL AFTER `feat_module`,
ADD `browser_version` VARCHAR(10) NOT NULL AFTER `browser_name`,
ADD `browser_full_name` VARCHAR(125) NOT NULL AFTER `browser_version`,
ADD `screen_width` INT NOT NULL AFTER `browser_full_name`,
ADD `screen_height` INT NOT NULL AFTER `screen_width`;

ALTER TABLE `browser_features`
DROP `feat_module`;

ALTER TABLE `browser_features` ADD `browser_uuid` VARCHAR(125) NOT NULL AFTER `lastuser`;

CREATE TABLE
  `browser_login` (
    `id` INT (10) NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `lastuser` VARCHAR(50) NOT NULL,
    `browser_uuid` VARCHAR(128) NOT NULL,
    `login` VARCHAR(128) NOT NULL,
    UNIQUE KEY `id` (`id`),
    UNIQUE KEY `browser_login` (`browser_uuid`, `login`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8
