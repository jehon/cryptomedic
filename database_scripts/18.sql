
ALTER TABLE  `bills` ADD  `sl_familySalary` INT NULL DEFAULT NULL AFTER  `patient_id` ;

ALTER TABLE  `bills` ADD  `sl_numberOfHouseholdMembers` INT NULL DEFAULT NULL AFTER  `sl_familySalary` ;
