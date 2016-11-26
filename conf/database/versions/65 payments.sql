
CREATE TABLE `payments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `bill_id` int(10) UNSIGNED NOT NULL,
  `Date` date NULL,
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Amount` decimal NOT NULL DEFAULT 0,
  `Notes` Text NULL,
  PRIMARY KEY (`id`),
  KEY `bill_id` (`bill_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
