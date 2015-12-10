
RENAME TABLE `amd_chakaria`.`nonricket_consults` TO `amd_chakaria`.`other_consults`;

ALTER TABLE `other_consults`
  ADD `Performed` MEDIUMTEXT NULL AFTER `XRay`,
  ADD `NotPerformed` MEDIUMTEXT NULL AFTER `performed`;
