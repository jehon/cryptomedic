
RENAME TABLE `amd_chakaria`.`nonricket_consults` TO `amd_chakaria`.`other_consults`;

ALTER TABLE `other_consults`
  ADD `Performed` MEDIUMTEXT NULL AFTER `XRay`,
  ADD `NotPerformed` MEDIUMTEXT NULL AFTER `performed`;


-- ricket consults
ALTER TABLE `ricket_consults` CHANGE `IMICDistance` `IMICDistance` VARCHAR(64) NULL DEFAULT NULL;
