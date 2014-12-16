CREATE TEMPORARY TABLE tmptable_1 SELECT * FROM prices WHERE dateto IS NULL ORDER BY id DESC LIMIT 1;

-- get a new id
UPDATE tmptable_1 SET id = NULL;
	
-- set the date_from (new price) and date_to (old price)
UPDATE tmptable_1 SET datefrom = NOW();
UPDATE prices SET dateto = NOW() WHERE dateto IS NULL;

-- push back the new price into prices
INSERT INTO prices SELECT * FROM tmptable_1;
DROP TEMPORARY TABLE IF EXISTS tmptable_1;

UPDATE prices SET workshop_Other_orthodevice = -1,
	surgical_other_operation = -1,
	surgical_percutaneous_achil_tenotomy_bi_cmosh = -1,
	surgical_percutaneous_AL_club_foot = -1,
	surgical_burn_little_release = 15000,
	surgical_Burn_release = 25000,
	surgical_Pin_removal = 8000
	WHERE dateto is NULL