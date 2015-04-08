
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

UPDATE prices SET created = NOW(), modified = NOW() WHERE dateto is NULL

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

