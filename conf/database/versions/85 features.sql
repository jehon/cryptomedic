CREATE TABLE
  `features` (
    `uid` VARCHAR(32) NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `lastuser` VARCHAR(50) NOT NULL,
    `feat_module` tinyint (4) NOT NULL DEFAULT '0',
    UNIQUE KEY `uid` (`uid`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8
