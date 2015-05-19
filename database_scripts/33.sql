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
	
	
-- New price


-- create a temporary table
CREATE TEMPORARY TABLE tmptable_1 SELECT * FROM prices WHERE dateto IS NULL ORDER BY id DESC LIMIT 1;

-- get a new id
UPDATE tmptable_1 SET id = (SELECT max(id) FROM prices) + 1;
	
-- set the date_from (new price) and date_to (old price)
UPDATE tmptable_1 SET datefrom = NOW();
UPDATE prices SET dateto = NOW() WHERE dateto IS NULL;

-- push back the new price into prices
INSERT INTO prices SELECT * FROM tmptable_1;

-- drop the temporary table
DROP TEMPORARY TABLE IF EXISTS tmptable_1;

UPDATE prices SET created = NOW(), modified = NOW() WHERE dateto is NULL;

-- add fields
-- modification to prices elements
UPDATE `prices`
	SET surgical_other_operation = 1
	WHERE dateto is NULL;

