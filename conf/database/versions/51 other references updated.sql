ALTER TABLE `bills`              CHANGE `Center`     `Center`     VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `club_foots`         CHANGE `Center`     `Center`     VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `nonricket_consults` CHANGE `Center`     `Center` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `ricket_consults`    CHANGE `Center`     `Center` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `appointments`       CHANGE `NextCenter` `NextCenter` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `club_foots`         CHANGE `NextCenter` `NextCenter` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `nonricket_consults` CHANGE `NextCenter` `NextCenter` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `ricket_consults`    CHANGE `NextCenter` `NextCenter` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;


UPDATE bills              SET Center = 'Chakaria Disability Center' WHERE Center = 'Chakaria';
UPDATE club_foots         SET Center = 'Chakaria Disability Center' WHERE Center = 'Chakaria';
UPDATE nonricket_consults SET Center = 'Chakaria Disability Center' WHERE Center = 'Chakaria';
UPDATE ricket_consults    SET Center = 'Chakaria Disability Center' WHERE Center = 'Chakaria';

UPDATE appointments       SET NextCenter = 'Chakaria Disability Center' WHERE NextCenter = 'Chakaria';
UPDATE club_foots         SET NextCenter = 'Chakaria Disability Center' WHERE NextCenter = 'Chakaria';
UPDATE nonricket_consults SET NextCenter = 'Chakaria Disability Center' WHERE NextCenter = 'Chakaria';
UPDATE ricket_consults    SET NextCenter = 'Chakaria Disability Center' WHERE NextCenter = 'Chakaria';



UPDATE bills              SET Center = 'Other Field' WHERE Center = 'Other Place';
UPDATE club_foots         SET Center = 'Other Field' WHERE Center = 'Other Place';
UPDATE nonricket_consults SET Center = 'Other Field' WHERE Center = 'Other Place';
UPDATE ricket_consults    SET Center = 'Other Field' WHERE Center = 'Other Place';

UPDATE appointments       SET NextCenter = 'Other Field' WHERE NextCenter = 'Other Place';
UPDATE club_foots         SET NextCenter = 'Other Field' WHERE NextCenter = 'Other Place';
UPDATE nonricket_consults SET NextCenter = 'Other Field' WHERE NextCenter = 'Other Place';
UPDATE ricket_consults    SET NextCenter = 'Other Field' WHERE NextCenter = 'Other Place';
