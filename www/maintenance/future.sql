-- -> NOT NULL
ALTER TABLE `patients`
CHANGE `phone` `phone` VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
CHANGE `pathology` `pathology` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
CHANGE `address_comments` `address_comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
CHANGE `comments` `comments` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

-- Default date is today
ALTER TABLE `appointments`
CHANGE `date` `date` TIMESTAMP NOT NULL DEFAULT CURRENT_DATE;

ALTER TABLE `surgeries`
CHANGE `date` `date` TIMESTAMP NOT NULL DEFAULT CURRENT_DATE;
