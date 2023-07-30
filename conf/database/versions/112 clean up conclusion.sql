
ALTER TABLE `ricket_consults` 
	CHANGE `Brace` `x_Brace` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
	CHANGE `Nutrisupport` `x_Nutrisupport` TINYINT(1) NOT NULL DEFAULT '0',
	CHANGE `conclusion_medical_calcium500` `x_conclusion_medical_calcium500` TINYINT(1) NOT NULL DEFAULT '0',
	CHANGE `conclusion_medical_calcium1000` `x_conclusion_medical_calcium1000` TINYINT(1) NOT NULL DEFAULT '0',
	CHANGE `conclusion_medical_vitaminD` `x_conclusion_medical_vitaminD` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `club_feet`
	CHANGE `Treatment` `x_Treatment` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `other_consults`
	CHANGE `Surgery66` `x_Surgery66` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
