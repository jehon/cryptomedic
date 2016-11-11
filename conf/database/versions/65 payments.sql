
CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `bill_id` int(10) UNSIGNED NOT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Amount` decimal NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
