ALTER TABLE  `bills` DROP FOREIGN KEY  `bills_ibfk_1` ;
ALTER TABLE  `bills` ADD CONSTRAINT  `bills_ibfk_1` FOREIGN KEY (  `patient_id` ) REFERENCES  `amd_chakaria`.`patients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE ;

ALTER TABLE  `club_foots` DROP FOREIGN KEY  `club_foots_ibfk_3` ;
ALTER TABLE  `club_foots` ADD CONSTRAINT  `club_foots_ibfk_3` FOREIGN KEY (  `patient_id` ) REFERENCES  `amd_chakaria`.`patients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE ;

ALTER TABLE  `club_foots` DROP FOREIGN KEY  `club_foots_ibfk_4` ;
ALTER TABLE  `club_foots` ADD CONSTRAINT  `club_foots_ibfk_4` FOREIGN KEY (  `Center` ) REFERENCES  `amd_chakaria`.`labels` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE ;

ALTER TABLE `nonricket_consults` DROP FOREIGN KEY `nonricket_consults_ibfk_11`;
ALTER TABLE `nonricket_consults` ADD  CONSTRAINT `nonricket_consults_ibfk_11` FOREIGN KEY (`Center`) REFERENCES `amd_chakaria`.`labels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `pictures` DROP FOREIGN KEY `pictures_ibfk_1`;
ALTER TABLE `pictures` ADD  CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_25`;
ALTER TABLE `ricket_consults` ADD  CONSTRAINT `ricket_consults_ibfk_25` FOREIGN KEY (`Center`) REFERENCES `amd_chakaria`.`labels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE  `surgery_followups` ADD FOREIGN KEY (  `patient_id` ) REFERENCES  `amd_chakaria`.`patients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE ;
