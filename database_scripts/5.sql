--
-- 30/09/2015: Change plaster to long and short plaster
-- Il faudrait pouvoir rajouter l’item « Making Long plaster »  (600 tk)
-- et à la place de « making plaster » mettre « making short plaster » (400).
--

ALTER TABLE `bills` 
	ADD `consult_make_long_plaster` INT(11) NOT NULL DEFAULT '0' AFTER `consult_making_plaster`, 
	ADD `consult_make_short_plaster` INT(11) NOT NULL DEFAULT '0' AFTER `consult_make_long_plaster`;

ALTER TABLE `prices` 
	ADD `consult_make_long_plaster` INT(11) NULL DEFAULT '0' AFTER `consult_making_plaster`, 
	ADD `consult_make_short_plaster` INT(11) NULL DEFAULT '0' AFTER `consult_make_long_plaster`;

UPDATE prices 
	SET consult_make_long_plaster = 600,
		consult_make_short_plaster = 400
	WHERE dateto is NULL;

--
-- 30/09/2015: à la place de « bill consult medecine » mettre « bill consult calcium 30*500mg »
--
ALTER TABLE `bills` 
	ADD `consult_calcium_30x500mg` INT(11) NOT NULL DEFAULT '0' AFTER `consult_medecine`;

ALTER TABLE `prices` 
	ADD `consult_calcium_30x500mg` INT(11) NULL DEFAULT '0' AFTER `consult_medecine`;

UPDATE prices 
	SET consult_calcium_30x500mg = consult_medecine
	WHERE dateto is NULL;
