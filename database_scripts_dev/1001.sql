ALTER TABLE `patients` DROP FOREIGN KEY patients_ibfk_2; ALTER TABLE `patients` DROP `Family`;
ALTER TABLE `patients` DROP FOREIGN KEY patients_ibfk_4; ALTER TABLE `patients` DROP `Home`;
ALTER TABLE `patients` DROP FOREIGN KEY patients_ibfk_5; ALTER TABLE `patients` DROP `Wall`;
ALTER TABLE `patients` DROP `Numberofpregnacy`;
ALTER TABLE `patients` DROP `Numberofbrothersandsisters`;
ALTER TABLE `patients` DROP `Numberofbrothersandsistersaffectedbyrickets`;
ALTER TABLE `patients` DROP `Rowofthechildreninthefamily`;
ALTER TABLE `patients` DROP `Ageofweaningmonth`;
ALTER TABLE `patients` DROP `Ageofdiversificationofthefoodmonth`;
ALTER TABLE `patients` DROP `Fathersname`;
ALTER TABLE `patients` DROP `Sociallevel`;
ALTER TABLE `patients` DROP FOREIGN KEY patients_ibfk_12; ALTER TABLE `patients` DROP `Roof`;

-- migrated to bill
ALTER TABLE `patients` DROP `Numberofhouseholdmembers`;
ALTER TABLE `patients` DROP `Familysalaryinamonth`;
