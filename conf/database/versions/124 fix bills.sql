
ALTER TABLE `bills` 
    CHANGE `workshop_Compensation_sole_1cm` `workshop_compensation_sole_1cm` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_Compensation_sole_2cm` `workshop_compensation_sole_2cm` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole_3cm` `workshop_compensation_sole_3cm` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole_4cm` `workshop_compensation_sole_4cm` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole_5cm` `workshop_compensation_sole_5cm` INT(11) NOT NULL DEFAULT '0'; 

UPDATE bills SET workshop_Compensation_sole_1cm = 0 WHERE workshop_Compensation_sole_1cm = -1;
UPDATE bills SET workshop_Compensation_sole_2cm = 0 WHERE workshop_Compensation_sole_2cm = -1;
UPDATE bills SET workshop_Compensation_sole_3cm = 0 WHERE workshop_Compensation_sole_3cm = -1;
UPDATE bills SET workshop_Compensation_sole_4cm = 0 WHERE workshop_Compensation_sole_4cm = -1;
UPDATE bills SET workshop_Compensation_sole_5cm = 0 WHERE workshop_Compensation_sole_5cm = -1;
