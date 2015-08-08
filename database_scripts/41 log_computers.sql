
CREATE TABLE `log_computers` (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `modified_at` timestamp NULL DEFAULT NULL,
 `user_id` int(10) unsigned NOT NULL,
 `computer_id` varchar(64) NOT NULL,
 `useragent` varchar(255) DEFAULT NULL,
 	PRIMARY KEY (`id`),
 	UNIQUE KEY `computer_id` (`computer_id`),
 	KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

