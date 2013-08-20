-- Risque: avant, c'etait un text field !!!

-- Check: if 14 rows, than it is ok
ALTER TABLE  `orthopedic_devices` CHANGE  `Date`  `Date` DATE NULL DEFAULT NULL;
