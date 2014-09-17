ALTER TABLE `club_foots` 
	ADD `WalkingFirstContactRight` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `WalkingFloorContactRight`,
	ADD `WalkingFirstContactLeft` INT(5) UNSIGNED NULL DEFAULT NULL AFTER `WalkingFloorContactRight`;
