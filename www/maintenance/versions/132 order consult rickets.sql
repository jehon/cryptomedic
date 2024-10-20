ALTER TABLE `ricket_consults`
CHANGE `walking_difficulties` `walking_difficulties` VARCHAR(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `weight_kg`;

ALTER TABLE `ricket_consults`
CHANGE `brachial_circumference_cm` `brachial_circumference_cm` INT NULL DEFAULT NULL AFTER `height_cm`;

ALTER TABLE `ricket_consults`
CHANGE `walking_difficulties` `walking_difficulties` VARCHAR(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `brachial_circumference_cm`;

ALTER TABLE `ricket_consults`
CHANGE `pain` `pain` VARCHAR(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `walking_difficulties`;

ALTER TABLE `ricket_consults`
CHANGE `wrist_enlargement` `wrist_enlargement` INT NULL DEFAULT NULL AFTER `pain`;

ALTER TABLE `ricket_consults`
CHANGE `rib_heading` `rib_heading` INT NULL DEFAULT NULL AFTER `wrist_enlargement`;

ALTER TABLE `ricket_consults`
CHANGE `IMIC_distance` `IMIC_distance` VARCHAR(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `rib_heading`;

ALTER TABLE `ricket_consults`
CHANGE `xray` `xray` VARCHAR(127) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `IMIC_distance`;

ALTER TABLE `ricket_consults`
CHANGE `right_leg` `right_leg` VARCHAR(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `xray`;

ALTER TABLE `ricket_consults`
CHANGE `right_leg_angle` `right_leg_angle` INT NULL DEFAULT NULL AFTER `right_leg`;

ALTER TABLE `ricket_consults`
CHANGE `cross_right_T` `cross_right_T` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `right_leg_angle`;

ALTER TABLE `ricket_consults`
CHANGE `cross_right_F` `cross_right_F` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `cross_right_T`;

ALTER TABLE `ricket_consults`
CHANGE `left_leg` `left_leg` VARCHAR(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER `cross_right_F`;

ALTER TABLE `ricket_consults`
CHANGE `left_leg_angle` `left_leg_angle` INT NULL DEFAULT NULL AFTER `left_leg`;
