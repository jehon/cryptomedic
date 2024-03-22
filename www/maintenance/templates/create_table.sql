CREATE TABLE `appointments` (
  `id` INT(10) UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` VARCHAR(50) DEFAULT NULL,
  `patient_id` INT(10) UNSIGNED NOT NULL,
  `Date` DATE NOT NULL DEFAULT '0000-00-00',
  `ExaminerName` VARCHAR(127) DEFAULT NULL,
  `Nextappointment` DATE NOT NULL,
  `NextCenter` VARCHAR(30) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;