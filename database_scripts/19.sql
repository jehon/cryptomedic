
ALTER TABLE `patients` DROP FOREIGN KEY  `patients_ibfk_10` ;
ALTER TABLE patients DROP INDEX patients_Upazilla;
ALTER TABLE `patients` CHANGE COLUMN Upazilla Upazilla VARCHAR(24) NULL; 
UPDATE patients, labels SET Upazilla = labels.english 
WHERE patients.Upazilla = labels.id;

ALTER TABLE `patients` DROP FOREIGN KEY  `patients_ibfk_11` ;
ALTER TABLE patients DROP INDEX patients_Union_;
ALTER TABLE `patients` CHANGE COLUMN Union_ Union_ VARCHAR(24) NULL; 
UPDATE patients, labels SET Union_ = labels.english 
WHERE patients.Union_ = labels.id;

ALTER TABLE `patients` DROP FOREIGN KEY  `patients_ibfk_9` ;
ALTER TABLE patients DROP INDEX patients_District;
ALTER TABLE `patients` CHANGE COLUMN District District VARCHAR(24) NULL; 
UPDATE patients, labels SET District = labels.english 
WHERE patients.District = labels.id;
