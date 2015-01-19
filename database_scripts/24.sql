
-- Clean up old unused fields

ALTER TABLE `nonricket_consults` DROP `SchoolClass`;
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY nonricket_consults_ibfk_4; ALTER TABLE `nonricket_consults` DROP `Pathology`;
ALTER TABLE `nonricket_consults` DROP `Comment`;
ALTER TABLE `nonricket_consults` DROP `Undernutrited`;
ALTER TABLE `nonricket_consults` DROP `Physiotherapy61`;
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY nonricket_consults_ibfk_7; ALTER TABLE `nonricket_consults` DROP `Plaster62`;
ALTER TABLE `nonricket_consults` DROP FOREIGN KEY nonricket_consults_ibfk_8; ALTER TABLE `nonricket_consults` DROP `Orthopedicdevice65`;
ALTER TABLE `nonricket_consults` DROP `Worms`;

