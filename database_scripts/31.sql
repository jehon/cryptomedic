ALTER TABLE `club_foots` 
	CHANGE `AdductionAngleLeft` `AdductionAngleLeft` INT(5) NULL DEFAULT NULL, 
	CHANGE `AdductionAngleRight` `AdductionAngleRight` INT(5) NULL DEFAULT NULL, 
	CHANGE `HindFootAngleWLeft` `HindFootAngleWLeft` INT(5) NULL DEFAULT NULL,
	CHANGE `HindFootAngleWRight` `HindFootAngleWRight` INT(5) NULL DEFAULT NULL,
	CHANGE `DorsalFlexionMaxLeft` `DorsalFlexionMaxLeft` INT(5) NULL DEFAULT NULL, 
	CHANGE `DorsalFlexionMaxRight` `DorsalFlexionMaxRight` INT(5) NULL DEFAULT NULL;
