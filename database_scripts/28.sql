
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_18; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY ricket_consults_ibfk_19; 
ALTER TABLE `ricket_consults` DROP `LaxityRight`;
ALTER TABLE `ricket_consults` DROP `LaxityLeft`;

ALTER TABLE pictures DROP INDEX files;

ALTER TABLE `nonricket_consults` DROP FOREIGN KEY `nonricket_consults_ibfk_5`; 
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY `nonricket_consults_ibfk_6`; 
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY `nonricket_consults_ibfk_9`; 
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY `nonricket_consults_ibfk_10`;

ALTER TABLE nonricket_consults DROP INDEX nonricket_consults_Side;
ALTER TABLE nonricket_consults DROP INDEX nonricket_consults_Surgery66;
ALTER TABLE nonricket_consults DROP INDEX nonricket_consults_Walk;
ALTER TABLE nonricket_consults DROP INDEX Pain;

UPDATE nonricket_consults SET Pain = NULL WHERE nonricket_consults.Pain = 0;
ALTER TABLE `nonricket_consults` CHANGE COLUMN Pain Pain VARCHAR(24) NULL; 
UPDATE nonricket_consults, labels SET Pain = labels.english  WHERE nonricket_consults.Pain = labels.id;
UPDATE nonricket_consults SET Pain = NULL WHERE nonricket_consults.Pain = "??";

UPDATE nonricket_consults SET Side = NULL WHERE nonricket_consults.Side = 0;
ALTER TABLE `nonricket_consults` CHANGE COLUMN Side Side VARCHAR(24) NULL; 
UPDATE nonricket_consults, labels SET Side = labels.english  WHERE nonricket_consults.Side = labels.id;
UPDATE nonricket_consults SET Side = NULL WHERE nonricket_consults.Side = "??";

UPDATE nonricket_consults SET Surgery66 = NULL WHERE nonricket_consults.Surgery66 = 0;
ALTER TABLE `nonricket_consults` CHANGE COLUMN Surgery66 Surgery66 VARCHAR(24) NULL; 
UPDATE nonricket_consults, labels SET Surgery66 = labels.english  WHERE nonricket_consults.Surgery66 = labels.id;
UPDATE nonricket_consults SET Surgery66 = NULL WHERE nonricket_consults.Surgery66 = "??";

UPDATE nonricket_consults SET Walk = NULL WHERE nonricket_consults.Walk = 0;
ALTER TABLE `nonricket_consults` CHANGE COLUMN Walk Walk VARCHAR(24) NULL; 
UPDATE nonricket_consults, labels SET Walk = labels.english  WHERE nonricket_consults.Walk = labels.id;
UPDATE nonricket_consults SET Walk = NULL WHERE nonricket_consults.Walk = "??";

ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_13`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_14`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_15`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_16`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_20`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_21`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_23`; 
ALTER TABLE `ricket_consults` DROP FOREIGN KEY `ricket_consults_ibfk_24`;

ALTER TABLE ricket_consults DROP INDEX ricket_consults_Surgery;
ALTER TABLE ricket_consults DROP INDEX ricket_consults_Walk;
ALTER TABLE ricket_consults DROP INDEX ricket_consults_Rightleg27;
ALTER TABLE ricket_consults DROP INDEX ricket_consults_Leftleg28;
ALTER TABLE ricket_consults DROP INDEX ricket_consults_Orthopedicdevice65;
ALTER TABLE ricket_consults DROP INDEX ricket_consults_Wristenlargement;
ALTER TABLE ricket_consults DROP INDEX ricket_consults_Ribbeading;
ALTER TABLE ricket_consults DROP INDEX Pain;
ALTER TABLE ricket_consults DROP INDEX Pain_2;

UPDATE ricket_consults SET Brace = NULL WHERE ricket_consults.Brace = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN Brace Brace VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET Brace = labels.english  WHERE ricket_consults.Brace = labels.id;
UPDATE ricket_consults SET Brace = NULL WHERE ricket_consults.Brace = "??";

UPDATE ricket_consults SET LeftLeg = NULL WHERE ricket_consults.LeftLeg = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN LeftLeg LeftLeg VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET LeftLeg = labels.english  WHERE ricket_consults.LeftLeg = labels.id;
UPDATE ricket_consults SET LeftLeg = NULL WHERE ricket_consults.LeftLeg = "??";

UPDATE ricket_consults SET Pain = NULL WHERE ricket_consults.Pain = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN Pain Pain VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET Pain = labels.english  WHERE ricket_consults.Pain = labels.id;
UPDATE ricket_consults SET Pain = NULL WHERE ricket_consults.Pain = "??";

UPDATE ricket_consults SET RightLeg = NULL WHERE ricket_consults.RightLeg = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN RightLeg RightLeg VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET RightLeg = labels.english  WHERE ricket_consults.RightLeg = labels.id;
UPDATE ricket_consults SET RightLeg = NULL WHERE ricket_consults.RightLeg = "??";

UPDATE ricket_consults SET Surgery = NULL WHERE ricket_consults.Surgery = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN Surgery Surgery VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET Surgery = labels.english  WHERE ricket_consults.Surgery = labels.id;
UPDATE ricket_consults SET Surgery = NULL WHERE ricket_consults.Surgery = "??";

UPDATE ricket_consults SET WalkingDifficulties = NULL WHERE ricket_consults.WalkingDifficulties = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN WalkingDifficulties WalkingDifficulties VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET WalkingDifficulties = labels.english  WHERE ricket_consults.WalkingDifficulties = labels.id;
UPDATE ricket_consults SET WalkingDifficulties = NULL WHERE ricket_consults.WalkingDifficulties = "??";

UPDATE ricket_consults SET Ribbeading = NULL WHERE ricket_consults.Ribbeading = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN Ribbeading Ribbeading VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET Ribbeading = labels.english  WHERE ricket_consults.Ribbeading = labels.id;
UPDATE ricket_consults SET Ribbeading = NULL WHERE ricket_consults.Ribbeading = "??";

UPDATE ricket_consults SET Wristenlargement = NULL WHERE ricket_consults.Wristenlargement = 0;
ALTER TABLE `ricket_consults` CHANGE COLUMN Wristenlargement Wristenlargement VARCHAR(24) NULL; 
UPDATE ricket_consults, labels SET Wristenlargement = labels.english  WHERE ricket_consults.Wristenlargement = labels.id;
UPDATE ricket_consults SET Wristenlargement = NULL WHERE ricket_consults.Wristenlargement = "??";

-- Clean up type
ALTER TABLE `ricket_consults` CHANGE `Wristenlargement` `Wristenlargement` INT(5) NULL DEFAULT NULL; 
ALTER TABLE `ricket_consults` CHANGE `Ribbeading` `Ribbeading` INT(5) NULL DEFAULT NULL; 
