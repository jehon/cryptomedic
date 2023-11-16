CREATE TABLE
  `features` (
    `uid` varchar(32) NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `lastuser` varchar(50) NOT NULL,
    `feat_module` tinyint (4) NOT NULL DEFAULT '0',
    UNIQUE KEY `uid` (`uid`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8
