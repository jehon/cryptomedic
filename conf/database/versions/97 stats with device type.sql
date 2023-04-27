
ALTER TABLE `server_stats` 
    CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `server_stats` 
    ADD `device` VARCHAR(25) NOT NULL AFTER `lastuser`;

ALTER TABLE `server_stats` 
    DROP INDEX `key_name`;
    
ALTER TABLE `server_stats` 
    ADD UNIQUE `record` (`key`, `params`, `device`) USING BTREE;

ALTER TABLE `server_stats` 
    DROP `lastuser`;

-- Reset the table since we are adding new filter
TRUNCATE TABLE `cryptomedic`.`server_stats`
