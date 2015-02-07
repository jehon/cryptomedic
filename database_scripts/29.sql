update `club_foots` 
SET `MuscularInbalanceLeft` = 1
WHERE `MuscularInbalanceLeft` > 0;

update `club_foots` 
SET `MuscularInbalanceRight` = 1
WHERE `MuscularInbalanceRight` > 0;

ALTER TABLE `club_foots` CHANGE `MuscularInbalanceLeft` `MuscularInbalanceLeft` TINYINT(1) UNSIGNED NULL DEFAULT NULL; 
ALTER TABLE `club_foots` CHANGE `MuscularInbalanceRight` `MuscularInbalanceRight` TINYINT(1) UNSIGNED NULL DEFAULT NULL; 
