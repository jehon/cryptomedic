
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
ALTER TABLE `bills` 
	ADD `other_physiotherapy_child` INT(11) NOT NULL DEFAULT '0' AFTER `other_group_physiotherapy`, 
	ADD `other_physiotherapy_adult` INT(11) NOT NULL DEFAULT '0' AFTER `other_physiotherapy_child`;

ALTER TABLE `prices`
	ADD `other_physiotherapy_child` INT(11) NOT NULL DEFAULT '-1' AFTER `other_group_physiotherapy`, 
	ADD `other_physiotherapy_adult` INT(11) NOT NULL DEFAULT '-1' AFTER `other_physiotherapy_child`;

-- modification to prices elements
UPDATE `prices`
	SET 
		other_physiotherapy_child = 100, 
		other_physiotherapy_adult = 200,
		other_physiotherapy = -1,
		other_group_physiotherapy = -1
	WHERE dateto is NULL;

	
-- reorder
ALTER TABLE `prices` CHANGE `other_making_plaster` `other_making_plaster` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_make_long_plaster` `other_make_long_plaster` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_make_short_plaster` `other_make_short_plaster` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_making_dressing` `other_making_dressing` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_X_Ray` `other_X_Ray` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_physiotherapy` `other_physiotherapy` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_Other_consultation_care` `other_Other_consultation_care` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_microbus` `other_microbus` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_CMOSH_follow_up` `other_CMOSH_follow_up` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_nutritionalAdvice` `other_nutritionalAdvice` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_nutritionalSupport` `other_nutritionalSupport` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_group_physiotherapy` `other_group_physiotherapy` INT(11) NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_physiotherapy_child` `other_physiotherapy_child` INT(11) NOT NULL DEFAULT '-1' AFTER `surgical_burn_little_release`, CHANGE `other_physiotherapy_adult` `other_physiotherapy_adult` INT(11) NOT NULL DEFAULT '-1' AFTER `surgical_burn_little_release`;

ALTER TABLE `prices` CHANGE `socialLevelPercentage_0` `socialLevelPercentage_0` FLOAT NOT NULL DEFAULT '-1' AFTER `other_making_plaster`, CHANGE `socialLevelPercentage_1` `socialLevelPercentage_1` FLOAT NOT NULL DEFAULT '-1' AFTER `other_making_plaster`, CHANGE `socialLevelPercentage_2` `socialLevelPercentage_2` FLOAT NOT NULL DEFAULT '-1' AFTER `other_making_plaster`, CHANGE `socialLevelPercentage_3` `socialLevelPercentage_3` FLOAT NOT NULL DEFAULT '-1' AFTER `other_making_plaster`, CHANGE `socialLevelPercentage_4` `socialLevelPercentage_4` FLOAT NOT NULL DEFAULT '-1' AFTER `other_making_plaster`;
