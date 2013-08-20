ALTER TABLE  `prices` CHANGE  `datefrom`  `datefrom` DATE NULL DEFAULT NULL;
ALTER TABLE  `prices` CHANGE  `dateto`  `dateto` DATE NULL DEFAULT NULL;

UPDATE  `amd_chakaria`.`prices` SET  `datefrom` = NULL WHERE  `prices`.`id` =1;

insert into prices(id, datefrom) values (2, '2013-01-01');

UPDATE  `amd_chakaria`.`prices` SET  `socialLevelPercentage_0` =  '0',
`socialLevelPercentage_1` =  '0.20',
`socialLevelPercentage_2` =  '0.40',
`socialLevelPercentage_3` =  '0.70',
`socialLevelPercentage_4` =  '1' WHERE  `prices`.`id` =2;

