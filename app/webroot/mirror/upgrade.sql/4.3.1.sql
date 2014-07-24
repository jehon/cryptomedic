-- Labels
UPDATE labels SET english="Home" WHERE reference = "Home-MainTitle";

-- Put some default to potentially unused fields
ALTER TABLE `patients` 
	CHANGE `Drinkingwaterfromtubewell` `Drinkingwaterfromtubewell` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Anyloanforfoodthisyear` `Anyloanforfoodthisyear` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `disease_diarrhoea` `disease_diarrhoea` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `disease_respiratory_infection` `disease_respiratory_infection` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `disease_malaria` `disease_malaria` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `disease_typhoid` `disease_typhoid` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `bills` 
	CHANGE `total_asked` `total_asked` INT(10) UNSIGNED NULL;

ALTER TABLE `club_foots` 
	CHANGE `Walking` `Walking` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `nonricket_consults` 
	CHANGE `Undernutrited` `Undernutrited` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Physiotherapy61` `Physiotherapy61` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Worms` `Worms` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `prices` 
	CHANGE `consult_X_Ray` `consult_X_Ray` INT(11) NULL DEFAULT '-1';

ALTER TABLE `ricket_consults` 
	CHANGE `HeightcmLying` `HeightcmLying` TINYINT(1) NULL DEFAULT '0', 
	CHANGE `Iodisedsalt` `Iodisedsalt` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Nutrisupport` `Nutrisupport` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Worms` `Worms` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Undernutrited` `Undernutrited` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `conclusion_medical_calcium500` `conclusion_medical_calcium500` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `conclusion_medical_calcium1000` `conclusion_medical_calcium1000` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `conclusion_medical_codLiverOil` `conclusion_medical_codLiverOil` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `conclusion_medical_vitaminD` `conclusion_medical_vitaminD` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `settings` 
	CHANGE `value` `value` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;

ALTER TABLE `surgeries` 
	CHANGE `BleedingExecive` `BleedingExecive` TINYINT(1) NOT NULL DEFAULT '0', 
	CHANGE `Worms` `Worms` TINYINT(1) NOT NULL DEFAULT '0';
