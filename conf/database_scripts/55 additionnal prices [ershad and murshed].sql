
ALTER TABLE `bills`  ADD `other_Other_plaster` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `other_Other_plaster` INT(11) NOT NULL DEFAULT '-1';

ALTER TABLE `bills`  ADD `other_Other_dressing` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `other_Other_dressing` INT(11) NOT NULL DEFAULT '-1';

ALTER TABLE `bills`  ADD `consult_ClubFoot_Follow_up` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `consult_ClubFoot_Follow_up` INT(11) NOT NULL DEFAULT '-1';

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

UPDATE prices SET created_at = NOW(), updated_at = NOW() WHERE dateto is NULL;

-- modification to prices elements
UPDATE `prices`
  SET
    other_Other_plaster = 1,
    other_Other_dressing = 1,
    consult_ClubFoot_Follow_up = 100
  WHERE dateto is NULL;

