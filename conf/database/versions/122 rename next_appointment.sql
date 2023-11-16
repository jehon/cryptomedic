ALTER TABLE `appointments` CHANGE `next_appointment` `date` DATE NOT NULL;

ALTER TABLE `appointments` CHANGE `next_center` `center` VARCHAR(40) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
