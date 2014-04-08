Alter table Bills
	add column `ExaminerName` varchar(127) DEFAULT NULL after `Date`,
	add column `Center` int(10) unsigned DEFAULT NULL after `Date`;

ALTER TABLE  `bills` ADD INDEX (  `Center` );

ALTER TABLE  `bills` ADD FOREIGN KEY (  `Center` ) REFERENCES  `amd_chakaria`.`labels` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE ;
