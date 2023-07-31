
ALTER TABLE `prices` 
    CHANGE `workshop_Knee_brace` `workshop_knee_brace` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole` `workshop_compensation_sole` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole_1cm` `workshop_compensation_sole_1cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_2cm` `workshop_compensation_sole_2cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_3cm` `workshop_compensation_sole_3cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_4cm` `workshop_compensation_sole_4cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_5cm` `workshop_compensation_sole_5cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Arch_support` `workshop_arch_support` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Matetarsal_pade` `workshop_matetarsal_pade` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Supinator_corner` `workshop_supinator_corner` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Wirst_splint` `workshop_wirst_splint` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Hand_splint` `workshop_hand_splint` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Finger_splint` `workshop_finger_splint` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Walker_with_wheel_-_folding` `workshop_walker_with_wheel_-_folding` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Walker_with_wheel_-_non_folding` `workshop_walker_with_wheel_-_non_folding` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Crutch_a_pair_-_local` `workshop_crutch_a_pair_-_local` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Crutch_-_Stainless_steel` `workshop_crutch_-_stainless_steel` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Wheel_chair_-_folding` `workshop_wheel_chair_-_folding` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Cervical_Collar` `workshop_cervical_collar` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Abdominal_corset_belt` `workshop_abdominal_corset_belt` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Reparing` `workshop_reparing` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Other_orthodevice` `workshop_other_orthodevice` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `surgical_Burn_release` `surgical_burn_release` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `surgical_Pin_removal` `surgical_pin_removal` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `other_X_Ray` `other_x-ray` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `socialLevelPercentage_4` `social_level_percentage_4` FLOAT NOT NULL DEFAULT '-1', 
    CHANGE `socialLevelPercentage_3` `social_level_percentage_3` FLOAT NOT NULL DEFAULT '-1', 
    CHANGE `socialLevelPercentage_2` `social_level_percentage_2` FLOAT NOT NULL DEFAULT '-1', 
    CHANGE `socialLevelPercentage_1` `social_level_percentage_1` FLOAT NOT NULL DEFAULT '-1', 
    CHANGE `socialLevelPercentage_0` `social_level_percentage_0` FLOAT NOT NULL DEFAULT '0', 
    CHANGE `other_Other_plaster` `other_other_plaster` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `other_Other_dressing` `other_other_dressing` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `consult_ClubFoot_Follow_up` `consult_club_foot_follow_up` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_BK_-_Exoskeleton` `workshop_artificial_limb_-_BK_-_exoskeleton` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_AK_-_Exoskeleton` `workshop_artificial_limb_-_AK_-_exoskeleton` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_BK_-_Endoskeleton_with_pylon_Std` `workshop_artificial_limb_-_BK_-_Endoskeleton_with_pylon_standard` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_AK_-_single_axis_standard` `workshop_artificial_limb_-_AK_-_single_axis_standard` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_Tr_radial_prosthesis_Alimco` `workshop_artificial_tr_radial_prosthesis_alimco` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_Tr_radial_prosthesis_jaipur` `workshop_artificial_tr_radial_prosthesis_jaipur` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Wheel_Chair_-_china_-_modified` `workshop_wheel_chair_-_china_-_modified` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_White_can` `workshop_white_can` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Hearing_aids` `workshop_hearing_aids` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Elbow_crutch` `workshop_elbow_crutch` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Lifspring_BAFO` `workshop_lifspring_BAFO` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Extension_brace_-_AFO` `workshop_extension_brace_-_AFO` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_Orthoshoes_with_bar_-_one_leg` `workshop_orthoshoes_with_bar_-_one_leg` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_Orthoshoes_without_bar_-_one_leg` `workshop_orthoshoes_without_bar_-_one_leg` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_BHKAFO_Drop_lock_single_axis` `workshop_BHKAFO_drop_lock_single_axis` INT(11) NOT NULL DEFAULT '0',
    CHANGE `surgical_polio_achileus_Achileus_lenthening_bi` `surgical_polio_achileus_achileus_lenthening_bi` INT(11) NOT NULL DEFAULT '0',
    CHANGE `other_Other_consultation_care` `other_other_consultation_care` INT(11) NOT NULL DEFAULT '0'; 

ALTER TABLE `bills` 
    CHANGE `workshop_Knee_brace` `workshop_knee_brace` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole` `workshop_compensation_sole` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Compensation_sole_1cm` `workshop_compensation_sole_1cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_2cm` `workshop_compensation_sole_2cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_3cm` `workshop_compensation_sole_3cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_4cm` `workshop_compensation_sole_4cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Compensation_sole_5cm` `workshop_compensation_sole_5cm` INT(11) NOT NULL DEFAULT '-1', 
    CHANGE `workshop_Arch_support` `workshop_arch_support` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Matetarsal_pade` `workshop_matetarsal_pade` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Supinator_corner` `workshop_supinator_corner` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Wirst_splint` `workshop_wirst_splint` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Hand_splint` `workshop_hand_splint` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Finger_splint` `workshop_finger_splint` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Walker_with_wheel_-_folding` `workshop_walker_with_wheel_-_folding` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Walker_with_wheel_-_non_folding` `workshop_walker_with_wheel_-_non_folding` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Crutch_a_pair_-_local` `workshop_crutch_a_pair_-_local` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Crutch_-_Stainless_steel` `workshop_crutch_-_stainless_steel` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Wheel_chair_-_folding` `workshop_wheel_chair_-_folding` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Cervical_Collar` `workshop_cervical_collar` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Abdominal_corset_belt` `workshop_abdominal_corset_belt` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Reparing` `workshop_reparing` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Other_orthodevice` `workshop_other_orthodevice` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `surgical_Burn_release` `surgical_burn_release` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `surgical_Pin_removal` `surgical_pin_removal` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `other_X_Ray` `other_x-ray` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `other_Other_plaster` `other_other_plaster` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `other_Other_dressing` `other_other_dressing` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `consult_ClubFoot_Follow_up` `consult_club_foot_follow_up` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_BK_-_Exoskeleton` `workshop_artificial_limb_-_BK_-_exoskeleton` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_AK_-_Exoskeleton` `workshop_artificial_limb_-_AK_-_exoskeleton` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_BK_-_Endoskeleton_with_pylon_Std` `workshop_artificial_limb_-_BK_-_Endoskeleton_with_pylon_standard` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_limb_-_AK_-_single_axis_standard` `workshop_artificial_limb_-_AK_-_single_axis_standard` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_Tr_radial_prosthesis_Alimco` `workshop_artificial_tr_radial_prosthesis_alimco` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Artificial_Tr_radial_prosthesis_jaipur` `workshop_artificial_tr_radial_prosthesis_jaipur` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Wheel_Chair_-_china_-_modified` `workshop_wheel_chair_-_china_-_modified` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_White_can` `workshop_white_can` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Hearing_aids` `workshop_hearing_aids` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Elbow_crutch` `workshop_elbow_crutch` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Lifspring_BAFO` `workshop_lifspring_BAFO` INT(11) NOT NULL DEFAULT '0', 
    CHANGE `workshop_Extension_brace_-_AFO` `workshop_extension_brace_-_AFO` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_Orthoshoes_with_bar_-_one_leg` `workshop_orthoshoes_with_bar_-_one_leg` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_Orthoshoes_without_bar_-_one_leg` `workshop_orthoshoes_without_bar_-_one_leg` INT(11) NOT NULL DEFAULT '0',
    CHANGE `workshop_BHKAFO_Drop_lock_single_axis` `workshop_BHKAFO_drop_lock_single_axis` INT(11) NOT NULL DEFAULT '0',
    CHANGE `surgical_polio_achileus_Achileus_lenthening_bi` `surgical_polio_achileus_achileus_lenthening_bi` INT(11) NOT NULL DEFAULT '0',
    CHANGE `other_Other_consultation_care` `other_other_consultation_care` INT(11) NOT NULL DEFAULT '0'; 

ALTER TABLE `prices`
    CHANGE `datefrom` `date_from` DATE NULL DEFAULT NULL,
    CHANGE `dateto` `date_to` DATE NULL DEFAULT NULL;

ALTER TABLE `bills` 
    CHANGE `sl_familySalary` `sl_family_salary` INT(11) NULL DEFAULT NULL,
    CHANGE `sl_numberOfHouseholdMembers` `sl_number_of_household_members` INT(11) NULL DEFAULT NULL, 
    CHANGE `Sociallevel` `social_level` INT(10) UNSIGNED NULL DEFAULT NULL;
