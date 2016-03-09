
ALTER TABLE `rendez_vous` DROP `Brachialcircumferencecm`;
ALTER TABLE `rendez_vous` DROP `Center`;
ALTER TABLE `rendez_vous` CHANGE `Nextappointment` `Nextappointment` DATE NOT NULL;

RENAME TABLE `amd_chakaria`.`rendez_vous` TO `amd_chakaria`.`appointments`;
