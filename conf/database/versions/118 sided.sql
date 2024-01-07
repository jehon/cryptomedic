-- -- See www/api/app/Http/Controllers/templates-t.php#242 (trSided)
ALTER TABLE `ricket_consults` CHANGE `CrossLeftT` `cross_left_T` VARCHAR(255) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  CHANGE `CrossRightT` `cross_right_T` VARCHAR(255) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  CHANGE `CrossLeftF` `cross_left_F` VARCHAR(255) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  CHANGE `CrossRightF` `cross_right_F` VARCHAR(255) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  CHANGE `LeftLeg` `left_leg` VARCHAR(24) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  CHANGE `RightLeg` `right_leg` VARCHAR(24) CHARACTER
SET
  utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  CHANGE `LeftlegAngle` `left_leg_angle` INT(11) NULL DEFAULT NULL,
  CHANGE `RightlegAngle` `right_leg_angle` INT(11) NULL DEFAULT NULL;

ALTER TABLE `club_feet` CHANGE `PainLeft` `pain_left` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `PainRight` `pain_right` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `WalkingFloorContactLeft` `walking_floor_contact_left` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `WalkingFloorContactRight` `walking_floor_contact_right` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `WalkingFirstContactLeft` `walking_first_contact_left` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `WalkingFirstContactRight` `walking_first_contact_right` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `JumpingOneLegLeft` `jumping_one_leg_left` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `JumpingOneLegRight` `jumping_one_leg_right` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `RunLeft` `run_left` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `RunRight` `run_right` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `AdductionAngleLeft` `adduction_angle_left` INT(5) NULL DEFAULT NULL,
CHANGE `AdductionAngleRight` `adduction_angle_right` INT(5) NULL DEFAULT NULL,
CHANGE `HindFootAngleWLeft` `hind_foot_angle_W_left` INT(5) NULL DEFAULT NULL,
CHANGE `HindFootAngleWRight` `hind_foot_angle_W_right` INT(5) NULL DEFAULT NULL,
CHANGE `DorsalFlexionMaxLeft` `dorsal_flexion_max_left` INT(5) NULL DEFAULT NULL,
CHANGE `DorsalFlexionMaxRight` `dorsal_flexion_max_right` INT(5) NULL DEFAULT NULL,
CHANGE `PlantarFlexionMaxLeft` `plantar_flexion_max_left` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `PlantarFlexionMaxRight` `plantar_flexion_max_right` INT(5) UNSIGNED NULL DEFAULT NULL,
CHANGE `MuscularInbalanceLeft` `muscular_inbalance_left` TINYINT (1) UNSIGNED NULL DEFAULT NULL,
CHANGE `MuscularInbalanceRight` `muscular_inbalance_right` TINYINT (1) UNSIGNED NULL DEFAULT NULL,
CHANGE `CurvedLateralBorderLeft` `curved_lateral_border_left` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `CurvedLateralBorderRight` `curved_lateral_border_right` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `MedialCreaseLeft` `medial_crease_left` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `MedialCreaseRight` `medial_crease_right` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `TalarHeadCoverageLeft` `talar_head_coverage_left` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `TalarHeadCoverageRight` `talar_head_coverage_right` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `PosteriorCreaseLeft` `posterior_crease_left` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `PosteriorCreaseRight` `posterior_crease_right` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `RigidEquinusLeft` `rigid_equinus_left` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `RigidEquinusRight` `rigid_equinus_right` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `EmptyHeelLeft` `empty_heel_left` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL,
CHANGE `EmptyHeelRight` `empty_heel_right` DECIMAL(5, 2) UNSIGNED NULL DEFAULT NULL;
