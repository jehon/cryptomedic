CREATE TABLE `bug_reporting` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `url` varchar(256) NOT NULL,
 `session` varchar(128) DEFAULT NULL,
 `username` varchar(64) DEFAULT NULL,
 `browser_state` longtext NOT NULL,
 PRIMARY KEY (`id`),
 KEY `url` (`url`,`session`,`username`)
) ENGINE=InnoDB;

ALTER TABLE `bug_reporting` ADD `description` TEXT NULL ;
ALTER TABLE `bug_reporting` ADD `email` VARCHAR(256) NULL AFTER `username`;
ALTER TABLE `bug_reporting` CHANGE `browser_state` `browser_state` LONGTEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL;
ALTER TABLE `bug_reporting` CHANGE `description` `description` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL AFTER `email`;
ALTER TABLE `bug_reporting` ADD `browser_console` LONGTEXT NULL ;
