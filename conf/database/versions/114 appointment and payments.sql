
ALTER TABLE `appointments` CHANGE `Nextappointment` `next_appointment` DATE NOT NULL; 

ALTER TABLE `appointments` CHANGE `NextCenter` `next_center` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 

ALTER TABLE `payments` CHANGE `Amount` `amount` INT(11) NOT NULL; 
