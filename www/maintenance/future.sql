-- -> NOT NULL
ALTER TABLE `patients`
CHANGE `phone` `phone` VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';

-- -> NOT NULL
ALTER TABLE `patients`
CHANGE `pathology` `pathology` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';

-- -> NOT NULL
ALTER TABLE `patients`
CHANGE `address_comments` `address_comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

-- -> NOT NULL
ALTER TABLE `patients`
CHANGE `comments` `comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
