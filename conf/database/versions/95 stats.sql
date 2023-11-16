CREATE TABLE
  `server_stats` (
    `id` INT (50) AUTO_INCREMENT,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
    `lastuser` VARCHAR(50) DEFAULT NULL,
    `key` VARCHAR(50) NOT NULL,
    `params` VARCHAR(100) DEFAULT "",
    `counter` INT DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE `key_name` (`key`, `params`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
