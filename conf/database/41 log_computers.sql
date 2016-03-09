
CREATE TABLE `sync_computers` (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NULL DEFAULT NULL,
 `lastuser` VARCHAR(50) NULL,
 `user_list` varchar(500) NOT NULL,
 `computer_id` varchar(64) NOT NULL,
 `useragent` varchar(255) DEFAULT NULL,
 	PRIMARY KEY (`id`),
 	UNIQUE KEY `computer_id` (`computer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `sync_computers` ADD `cryptomedic_version` VARCHAR(255) NOT NULL DEFAULT '0' ; 
ALTER TABLE `sync_computers` ADD `last_sync` VARCHAR(100) NULL ; 
ALTER TABLE `sync_computers` ADD `last_sync_final` TINYINT(1) NOT NULL DEFAULT '0' ; 
ALTER TABLE `sync_computers` ADD `queue_size` INT(16) NULL; 
