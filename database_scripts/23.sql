
ALTER TABLE `bills` DROP FOREIGN KEY `bills_ibfk_2` ;
ALTER TABLE bills DROP INDEX Center;
ALTER TABLE `bills` CHANGE COLUMN Center Center VARCHAR(24) NULL; 
UPDATE bills, labels SET Center = labels.english 
WHERE bills.Center = labels.id;

ALTER TABLE `club_foots` DROP FOREIGN KEY `club_foots_ibfk_4` ;
ALTER TABLE club_foots DROP INDEX Center;
ALTER TABLE `club_foots` CHANGE COLUMN Center Center VARCHAR(24) NULL; 
UPDATE club_foots, labels SET Center = labels.english  WHERE club_foots.Center = labels.id;
UPDATE club_foots SET Center = NULL WHERE club_foots.Center = 0;
UPDATE club_foots SET Center = NULL WHERE club_foots.Center = "??";

ALTER TABLE `club_foots` CHANGE COLUMN NextCenter NextCenter VARCHAR(24) NULL; 
UPDATE club_foots, labels SET NextCenter = labels.english  WHERE club_foots.NextCenter = labels.id;
UPDATE club_foots SET NextCenter = NULL WHERE club_foots.NextCenter = 0;
UPDATE club_foots SET NextCenter = NULL WHERE club_foots.NextCenter = "??";

ALTER TABLE `nonricket_consults` DROP FOREIGN KEY `nonricket_consults_ibfk_11` ;
ALTER TABLE nonricket_consults DROP INDEX Center;
ALTER TABLE `nonricket_consults` CHANGE COLUMN Center Center VARCHAR(24) NULL; 
UPDATE nonricket_consults, labels SET Center = labels.english WHERE nonricket_consults.Center = labels.id;
UPDATE nonricket_consults SET Center = NULL WHERE nonricket_consults.Center = 0;
UPDATE nonricket_consults SET Center = NULL WHERE nonricket_consults.Center = "??";

ALTER TABLE `nonricket_consults` CHANGE COLUMN NextCenter NextCenter VARCHAR(24) NULL; 
UPDATE nonricket_consults, labels SET NextCenter = labels.english WHERE nonricket_consults.NextCenter = labels.id;
UPDATE nonricket_consults SET NextCenter = NULL WHERE nonricket_consults.NextCenter = 0;
UPDATE nonricket_consults SET NextCenter = NULL WHERE nonricket_consults.NextCenter = "??";

ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_25` ;
ALTER TABLE ricket_consults DROP INDEX Center;
ALTER TABLE `ricket_consults` CHANGE COLUMN Center Center VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET Center = labels.english WHERE ricket_consults.Center = labels.id;
UPDATE ricket_consults SET Center = NULL WHERE ricket_consults.Center = 0;
UPDATE ricket_consults SET Center = NULL WHERE ricket_consults.Center = "??";

ALTER TABLE `ricket_consults` CHANGE COLUMN NextCenter NextCenter VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET NextCenter = labels.english WHERE ricket_consults.NextCenter = labels.id;
UPDATE ricket_consults SET NextCenter = NULL WHERE ricket_consults.NextCenter = 0;
UPDATE ricket_consults SET NextCenter = NULL WHERE ricket_consults.NextCenter = "??";
