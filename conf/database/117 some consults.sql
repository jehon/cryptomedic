
ALTER TABLE `other_consults` 
    CHANGE `Side` `side` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Jointsorbonesaffected` `joints_or_bones_affected` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Deformity` `deformity` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Articulationmobility` `articulation_mobility` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Musclestrength` `muscle_strength` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Pain` `pain` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Walk` `walk` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `XRay` `x-ray` VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `Performed` `performed` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, 
    CHANGE `NotPerformed` `not_performed` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 

ALTER TABLE `ricket_consults`
    CHANGE `Pain` `pain` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    CHANGE `XRay` `x-ray` VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    CHANGE `Wristenlargement` `wrist_enlargement` INT(5) NULL DEFAULT NULL,
    CHANGE `Ribbeading` `rib_heading` INT(5) NULL DEFAULT NULL,
    CHANGE `IMICDistance` `IMIC_distance` VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    CHANGE `WalkingDifficulties` `walking_difficulties` VARCHAR(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 
