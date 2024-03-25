TRUNCATE `server_stats`;

ALTER TABLE `server_stats`
DROP `last_user`,
DROP `device`,
ADD `counter_computer` INT NOT NULL DEFAULT 0,
ADD `counter_mobile` INT NOT NULL DEFAULT 0;
