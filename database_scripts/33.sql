-- reorder
ALTER TABLE `nonricket_consults` 
	CHANGE `Walk` `Walk` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `Pain`;

ALTER TABLE `ricket_consults` 
	CHANGE `Commentary` `Comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
	
ALTER TABLE `nonricket_consults` 
	CHANGE `Othertreatment68` `Comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `club_foots` 
	CHANGE `Comment` `Comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `nonricket_consults` 
	ADD `TreatmentEvaluation` INT NULL DEFAULT NULL AFTER `Comments`, 
	ADD `TreatmentFinished` TINYINT NULL DEFAULT NULL AFTER `TreatmentEvaluation`;

ALTER TABLE `ricket_consults` 
	ADD `TreatmentEvaluation` INT NULL DEFAULT NULL AFTER `Comments`, 
	ADD `TreatmentFinished` TINYINT NULL DEFAULT NULL AFTER `TreatmentEvaluation`;

ALTER TABLE `club_foots` 
	ADD `TreatmentEvaluation` INT NULL DEFAULT NULL AFTER `Comments`, 
	ADD `TreatmentFinished` TINYINT NULL DEFAULT NULL AFTER `TreatmentEvaluation`;
	