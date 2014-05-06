-- Manage the indexes
-- ALTER TABLE  `labels` ADD  `modified` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER  `id` ,
-- ADD INDEX (  `modified` ) ;

-- ALTER TABLE  `settings` ADD  `modified` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER  `id` ,
-- ADD INDEX (  `modified` ) ;

-- ALTER TABLE  `bills` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `club_foots` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `nonricket_consults` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `orthopedic_devices` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `patients` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `pictures` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `prices` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `ricket_consults` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `surgeries` ADD INDEX (  `modified` ) ;
-- ALTER TABLE  `surgery_followups` ADD INDEX (  `modified` ) ;

-- Create the structure_version field for structure synchronization
-- ALTER TABLE  `settings` CHANGE  `id`  `id` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ;
-- INSERT INTO `settings`(id, value) VALUE('structure_version', '')
