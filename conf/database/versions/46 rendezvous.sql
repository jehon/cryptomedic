CREATE TABLE `rendez_vous` (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NULL DEFAULT NULL,
 `lastuser` varchar(50) DEFAULT NULL,
 `patient_id` int(10) unsigned NOT NULL,
 `Date` date NOT NULL DEFAULT '0000-00-00',
 `ExaminerName` varchar(127) DEFAULT NULL,
 `Center` varchar(24) DEFAULT NULL,
 `Nextappointment` date DEFAULT NULL,
 `NextCenter` varchar(24) DEFAULT NULL,
 `Brachialcircumferencecm` int(3) DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `entity_name` (`patient_id`),
 CONSTRAINT `rendez_vous_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1516 DEFAULT CHARSET=utf8
