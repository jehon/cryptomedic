ALTER TABLE `appointments`
CHANGE `NextCenter` `NextCenter` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

UPDATE `appointments`
SET
  NextCenter = "Forcibly Displaced Myanmar Nationals"
WHERE
  NextCenter = "Forcibly Displaced Myanmar Nat";

ALTER TABLE `bills`
CHANGE `Center` `Center` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

UPDATE bills
SET
  Center = "Forcibly Displaced Myanmar Nationals"
WHERE
  Center = "Forcibly Displaced Myanmar Nat";

ALTER TABLE `club_feet`
CHANGE `Center` `Center` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

UPDATE `club_feet`
SET
  Center = "Forcibly Displaced Myanmar Nationals"
WHERE
  Center = "Forcibly Displaced Myanmar Nat";

ALTER TABLE `other_consults`
CHANGE `Center` `Center` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

UPDATE `other_consults`
SET
  Center = "Forcibly Displaced Myanmar Nationals"
WHERE
  Center = "Forcibly Displaced Myanmar Nat";

ALTER TABLE `ricket_consults`
CHANGE `Center` `Center` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

UPDATE `ricket_consults`
SET
  Center = "Forcibly Displaced Myanmar Nationals"
WHERE
  Center = "Forcibly Displaced Myanmar Nat";
