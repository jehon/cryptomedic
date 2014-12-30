
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

ALTER TABLE `patients` DROP FOREIGN KEY  `patients_ibfk_7` ; ALTER TABLE `patients` DROP `Fatherswork`;
ALTER TABLE `patients` DROP FOREIGN KEY  `patients_ibfk_8` ; ALTER TABLE `patients` DROP `Motherswork`;
ALTER TABLE `patients` DROP `Homesteadgarden`;
ALTER TABLE `patients` DROP `Drinkingwaterfromtubewell`;
ALTER TABLE `patients` DROP `Anyloanforfoodthisyear`;
ALTER TABLE `patients` DROP `Consanguineousfamily`;
ALTER TABLE `patients` DROP `Fatherseducation`;
ALTER TABLE `patients` DROP `Motherseducation`;
ALTER TABLE `patients` DROP `Howmanymealperday`;
ALTER TABLE `patients` DROP `Notesforthepatient`;
ALTER TABLE `patients` DROP FOREIGN KEY patients_ibfk_3; ALTER TABLE `patients` DROP `Religion`;
ALTER TABLE `patients` DROP FOREIGN KEY patients_ibfk_6; ALTER TABLE `patients` DROP `Doesthechildrengotoschool`;
ALTER TABLE `patients` DROP `disease_diarrhoea`;
ALTER TABLE `patients` DROP `disease_respiratory_infection`;
ALTER TABLE `patients` DROP `disease_malaria`;
ALTER TABLE `patients` DROP `disease_typhoid`;
