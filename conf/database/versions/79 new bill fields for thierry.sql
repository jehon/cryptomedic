
-- Changing workshop_BKAFO_night to workshop_BKAFO_night_(plastic)
ALTER TABLE `bills` CHANGE `workshop_BKAFO_night` `workshop_BKAFO_night_(plastic)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_BKAFO_night` `workshop_BKAFO_night_(plastic)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_CP_chair to workshop_CP_chair (wooden)
ALTER TABLE `bills` CHANGE `workshop_CP_chair` `workshop_CP_chair_(wooden)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_CP_chair` `workshop_CP_chair_(wooden)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_CP_standing_table to workshop_CP_standing_table (wooden)
ALTER TABLE `bills` CHANGE `workshop_CP_standing_table` `workshop_CP_standing_table_(wooden)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_CP_standing_table` `workshop_CP_standing_table_(wooden)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Crutch_a_pair to workshop_Crutch_a_pair_(local)
ALTER TABLE `bills` CHANGE `workshop_Crutch_a_pair` `workshop_Crutch_a_pair_(local)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Crutch_a_pair` `workshop_Crutch_a_pair_(local)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Crutch_a_piece to workshop_Crutch_(Stainless_steel)
ALTER TABLE `bills` CHANGE `workshop_Crutch_a_piece` `workshop_Crutch_(Stainless_steel)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Crutch_a_piece` `workshop_Crutch_(Stainless_steel)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_DDB_splint to workshop_DB_splint
ALTER TABLE `bills` CHANGE `workshop_DDB_splint` `workshop_DB_splint` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_DDB_splint` `workshop_DB_splint` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Orthoshoes_with_bar to workshop_Orthoshoes_with_bar_(one_leg)
ALTER TABLE `bills` CHANGE `workshop_Orthoshoes_with_bar` `workshop_Orthoshoes_with_bar_(one_leg)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Orthoshoes_with_bar` `workshop_Orthoshoes_with_bar_(one_leg)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Orthoshoes_without_bar to workshop_Orthoshoes_without_bar (one leg)
ALTER TABLE `bills` CHANGE `workshop_Orthoshoes_without_bar` `workshop_Orthoshoes_without_bar_(one_leg)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Orthoshoes_without_bar` `workshop_Orthoshoes_without_bar_(one_leg)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_UAFO_night to workshop_AFO_night
ALTER TABLE `bills` CHANGE `workshop_UAFO_night` `workshop_AFO_night` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_UAFO_night` `workshop_AFO_night` INT(11) NULL DEFAULT '-1';

-- Changing workshop_UAFO_walking to workshop_AFO_walking
ALTER TABLE `bills` CHANGE `workshop_UAFO_walking` `workshop_AFO_walking` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_UAFO_walking` `workshop_AFO_walking` INT(11) NULL DEFAULT '-1';

-- Changing workshop_UKAFO_night to workshop_KAFO_night
ALTER TABLE `bills` CHANGE `workshop_UKAFO_night` `workshop_KAFO_night` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_UKAFO_night` `workshop_KAFO_night` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Walker_with_wheel to workshop_Walker_with_wheel (folding)
ALTER TABLE `bills` CHANGE `workshop_Walker_with_wheel` `workshop_Walker_with_wheel_(folding)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Walker_with_wheel` `workshop_Walker_with_wheel_(folding)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Walker_without_wheel to workshop_Walker_with_wheel (non folding)
ALTER TABLE `bills` CHANGE `workshop_Walker_without_wheel` `workshop_Walker_with_wheel_(non_folding)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Walker_without_wheel` `workshop_Walker_with_wheel_(non_folding)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_Wheel_chair to workshop_Wheel_chair (folding)
ALTER TABLE `bills` CHANGE `workshop_Wheel_chair` `workshop_Wheel_chair_(folding)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_Wheel_chair` `workshop_Wheel_chair_(folding)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_chair_china to workshop_wheel_chair_china
ALTER TABLE `bills` CHANGE `workshop_chair_china` `workshop_wheel_chair_china` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_chair_china` `workshop_wheel_chair_china` INT(11) NULL DEFAULT '-1';

-- Changing workshop_crutch_alumenium to workshop_crutch_alumenium (a pair)
ALTER TABLE `bills` CHANGE `workshop_crutch_alumenium` `workshop_crutch_alumenium_(a_pair)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_crutch_alumenium` `workshop_crutch_alumenium_(a_pair)` INT(11) NULL DEFAULT '-1';

-- Changing workshop_fracture_brace to workshop_fracture_brace (one leg)
ALTER TABLE `bills` CHANGE `workshop_fracture_brace` `workshop_fracture_brace_(one_leg)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` CHANGE `workshop_fracture_brace` `workshop_fracture_brace_(one_leg)` INT(11) NULL DEFAULT '-1';



-- Creating UHKAFO((Drop_lock_single_axis)_MI
ALTER TABLE `bills` ADD `workshop_UHKAFO_(Drop_lock_single_axis)_MI` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_UHKAFO_(Drop_lock_single_axis)_MI` INT(11) NULL DEFAULT '-1';

-- Creating Artificial limb (B.K) Exoskeleton
ALTER TABLE `bills` ADD `workshop_Artificial_limb_(BK)_Exoskeleton` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Artificial_limb_(BK)_Exoskeleton` INT(11) NULL DEFAULT '-1';

-- Creating Artificial limb(A.K) Exoskeleton
ALTER TABLE `bills` ADD `workshop_Artificial_limb(AK)_Exoskeleton` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Artificial_limb(AK)_Exoskeleton` INT(11) NULL DEFAULT '-1';

-- Creating Artificial limb (B.K) Endoskeleton With pylon Standard
ALTER TABLE `bills` ADD `workshop_Artificial_limb_(BK)_Endoskeleton_with_pylon_Std` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Artificial_limb_(BK)_Endoskeleton_with_pylon_Std` INT(11) NULL DEFAULT '-1';

-- Creating Artificial limb(A.K) single axis standard
ALTER TABLE `bills` ADD `workshop_Artificial_limb(AK)_single_axis_standard` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Artificial_limb(AK)_single_axis_standard` INT(11) NULL DEFAULT '-1';

-- Creating Artificial limb(A.K) 4 bar linkage polycentric knee joint standard
ALTER TABLE `bills` ADD `workshop_artificial_limb_(AK) polycentric_knee_joint` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_artificial_limb_(AK) polycentric_knee_joint` INT(11) NULL DEFAULT '-1';

-- Creating Artificial trans radial prosthesis with Alimco components
ALTER TABLE `bills` ADD `workshop_Artificial_ Tr_radial_prosthesis_Alimco` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Artificial_ Tr_radial_prosthesis_Alimco` INT(11) NULL DEFAULT '-1';

-- Creating Artificial trans radial prosthesis with jaipur  components
ALTER TABLE `bills` ADD `workshop_Artificial_ Tr_radial_prosthesis_jaipur` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Artificial_ Tr_radial_prosthesis_jaipur` INT(11) NULL DEFAULT '-1';

-- Creating Wheel Chair (china) modified
ALTER TABLE `bills` ADD `workshop_Wheel_Chair_(china)_modified` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Wheel_Chair_(china)_modified` INT(11) NULL DEFAULT '-1';

-- Creating White can
ALTER TABLE `bills` ADD `workshop_White_can` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_White_can` INT(11) NULL DEFAULT '-1';

-- Creating Hearing aids
ALTER TABLE `bills` ADD `workshop_Hearing_aids` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Hearing_aids` INT(11) NULL DEFAULT '-1';

-- Creating Elbow crutch
ALTER TABLE `bills` ADD `workshop_Elbow_crutch` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Elbow_crutch` INT(11) NULL DEFAULT '-1';

-- Creating Lifspring BAFO
ALTER TABLE `bills` ADD `workshop_Lifspring_BAFO` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Lifspring_BAFO` INT(11) NULL DEFAULT '-1';

-- Creating AFO (Articulated)
ALTER TABLE `bills` ADD `workshop_AFO_(Articulated)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_AFO_(Articulated)` INT(11) NULL DEFAULT '-1';

-- Creating Extension brace (AFO)
ALTER TABLE `bills` ADD `workshop_Extension_brace_(AFO)` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `prices` ADD `workshop_Extension_brace_(AFO)` INT(11) NULL DEFAULT '-1';

