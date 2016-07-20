
ALTER TABLE `patients` ADD `Name` VARCHAR(255) NOT NULL AFTER `Lastname`, ADD INDEX (`Name`) ;

UPDATE patients SET `Name` = TRIM(CONCAT(Firstname, ' ', Lastname));

ALTER TABLE `patients`
  DROP `Firstname`,
  DROP `Lastname`;
