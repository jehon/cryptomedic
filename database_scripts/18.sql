
ALTER TABLE  `bills` ADD  `sl_familySalary` INT NULL DEFAULT NULL AFTER  `patient_id` ;

ALTER TABLE  `bills` ADD  `sl_numberOfHouseholdMembers` INT NULL DEFAULT NULL AFTER  `sl_familySalary` ;

UPDATE bills, patients SET sl_familySalary = patients.Familysalaryinamonth, sl_numberOfHouseholdMembers = patients.Numberofhouseholdmembers
WHERE bills.patient_id = patients.id;

