ALTER TABLE `bills` DROP FOREIGN KEY `bills_ibfk_1`;

ALTER TABLE `bills`
	ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `bills` DROP FOREIGN KEY `bills_ibfk_3`;

ALTER TABLE `bills`
	ADD CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `amd_chakaria`.`prices`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `club_foots` DROP FOREIGN KEY `club_foots_ibfk_3`;

ALTER TABLE `club_foots`
	ADD CONSTRAINT `club_foots_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `other_consults` DROP FOREIGN KEY `other_consults_ibfk_1`;

ALTER TABLE `other_consults`
	ADD CONSTRAINT `other_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `pictures` DROP FOREIGN KEY `pictures_ibfk_1`;

ALTER TABLE `pictures`
	ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `rendez_vous` DROP FOREIGN KEY `rendez_vous_ibfk_1`;

ALTER TABLE `rendez_vous`
	ADD CONSTRAINT `rendez_vous_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_1`;

ALTER TABLE `ricket_consults`
	ADD CONSTRAINT `ricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`)
	ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `surgeries`
	DROP FOREIGN KEY `surgeries_ibfk_1`; ALTER TABLE `surgeries`
	ADD CONSTRAINT `surgeries_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `amd_chakaria`.`patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
