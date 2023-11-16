ALTER TABLE `other_consults` CHANGE `x-ray` `xray` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `ricket_consults` CHANGE `x-ray` `xray` VARCHAR(127) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
