
ALTER TABLE `server_stats` CHANGE `id` `id` INT(50) UNSIGNED NOT NULL AUTO_INCREMENT; 

ALTER TABLE `server_stats` CHANGE `counter` `counter` INT(11) UNSIGNED NOT NULL DEFAULT '0';
