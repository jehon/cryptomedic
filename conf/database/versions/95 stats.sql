CREATE TABLE
  `server_stats` (
    `id` INT (50) AUTO_INCREMENT,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
    `lastuser` varchar(50) DEFAULT NULL,
    `key` varchar(50) NOT NULL,
    `params` varchar(100) DEFAULT "",
    `counter` INT DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE `key_name` (`key`, `params`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
