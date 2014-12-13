-- We don't have these rights @ oxito !!!

-- DROP PROCEDURE IF EXISTS create_price;

-- CREATE PROCEDURE create_price()
-- BEGIN
--   	START TRANSACTION WITH CONSISTENT SNAPSHOT @#@
--
--	-- duplicate the entry
--	CREATE TEMPORARY TABLE tmptable_1 SELECT * FROM prices WHERE dateto IS NULL ORDER BY id DESC LIMIT 1 @#@
--	
--	-- get a new id
--	UPDATE tmptable_1 SET id = NULL @#@
--
--	
--	-- set the date_from (new price) and date_to (old price)
--	UPDATE tmptable_1 SET datefrom = NOW() @#@
--	UPDATE prices SET dateto = NOW() WHERE dateto IS NULL @#@
--
--	-- push back the new price into prices
--	INSERT INTO prices SELECT * FROM tmptable_1 @#@
--	DROP TEMPORARY TABLE IF EXISTS tmptable_1 @#@
--	
--	COMMIT @#@
-- END;

select 1;