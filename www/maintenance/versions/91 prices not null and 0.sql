-- Fix SocialLevel 0
ALTER TABLE `prices` CHANGE `socialLevelPercentage_0` `socialLevelPercentage_0` FLOAT NOT NULL DEFAULT '0';

UPDATE prices
SET
  `socialLevelPercentage_0` = 0
WHERE
  `socialLevelPercentage_0` = -1;

UPDATE prices
SET
  `consult_CDC_consultation_physio` = 0
WHERE
  `consult_CDC_consultation_physio` = -1;

UPDATE prices
SET
  `consult_CDC_consultation_Bengali_Doctor` = 0
WHERE
  `consult_CDC_consultation_Bengali_Doctor` = -1;

UPDATE prices
SET
  `consult_CDC_consultation_Doctor` = 0
WHERE
  `consult_CDC_consultation_Doctor` = -1;

UPDATE prices
SET
  `consult_field_visit` = 0
WHERE
  `consult_field_visit` = -1;

UPDATE prices
SET
  `consult_home_visit` = 0
WHERE
  `consult_home_visit` = -1;

UPDATE prices
SET
  `medecine_medecine` = 0
WHERE
  `medecine_medecine` = -1;

UPDATE prices
SET
  `medecine_calcium_30x500mg` = 0
WHERE
  `medecine_calcium_30x500mg` = -1;

UPDATE prices
SET
  `workshop_BHKAFO_night` = 0
WHERE
  `workshop_BHKAFO_night` = -1;

UPDATE prices
SET
  `workshop_BHKAFO_walking` = 0
WHERE
  `workshop_BHKAFO_walking` = -1;

UPDATE prices
SET
  `workshop_UHKAFO_night` = 0
WHERE
  `workshop_UHKAFO_night` = -1;

UPDATE prices
SET
  `workshop_UHKAFO_walking` = 0
WHERE
  `workshop_UHKAFO_walking` = -1;

UPDATE prices
SET
  `workshop_BKAFO_night_-_plastic` = 0
WHERE
  `workshop_BKAFO_night_-_plastic` = -1;

UPDATE prices
SET
  `workshop_BKAFO_walking` = 0
WHERE
  `workshop_BKAFO_walking` = -1;

UPDATE prices
SET
  `workshop_KAFO_night` = 0
WHERE
  `workshop_KAFO_night` = -1;

UPDATE prices
SET
  `workshop_UKAFO_walking` = 0
WHERE
  `workshop_UKAFO_walking` = -1;

UPDATE prices
SET
  `workshop_Knee_brace` = 0
WHERE
  `workshop_Knee_brace` = -1;

UPDATE prices
SET
  `workshop_BAFO_night` = 0
WHERE
  `workshop_BAFO_night` = -1;

UPDATE prices
SET
  `workshop_BAFO_walking` = 0
WHERE
  `workshop_BAFO_walking` = -1;

UPDATE prices
SET
  `workshop_AFO_night` = 0
WHERE
  `workshop_AFO_night` = -1;

UPDATE prices
SET
  `workshop_AFO_walking` = 0
WHERE
  `workshop_AFO_walking` = -1;

UPDATE prices
SET
  `workshop_Orthoshoes_with_bar_-_one_leg` = 0
WHERE
  `workshop_Orthoshoes_with_bar_-_one_leg` = -1;

UPDATE prices
SET
  `workshop_Orthoshoes_without_bar_-_one_leg` = 0
WHERE
  `workshop_Orthoshoes_without_bar_-_one_leg` = -1;

UPDATE prices
SET
  `workshop_DB_splint` = 0
WHERE
  `workshop_DB_splint` = -1;

UPDATE prices
SET
  `workshop_Compensation_sole` = 0
WHERE
  `workshop_Compensation_sole` = -1;

UPDATE prices
SET
  `workshop_Arch_support` = 0
WHERE
  `workshop_Arch_support` = -1;

UPDATE prices
SET
  `workshop_Matetarsal_pade` = 0
WHERE
  `workshop_Matetarsal_pade` = -1;

UPDATE prices
SET
  `workshop_Supinator_corner` = 0
WHERE
  `workshop_Supinator_corner` = -1;

UPDATE prices
SET
  `workshop_Wirst_splint` = 0
WHERE
  `workshop_Wirst_splint` = -1;

UPDATE prices
SET
  `workshop_Hand_splint` = 0
WHERE
  `workshop_Hand_splint` = -1;

UPDATE prices
SET
  `workshop_Finger_splint` = 0
WHERE
  `workshop_Finger_splint` = -1;

UPDATE prices
SET
  `workshop_Walker_with_wheel_-_folding` = 0
WHERE
  `workshop_Walker_with_wheel_-_folding` = -1;

UPDATE prices
SET
  `workshop_Walker_with_wheel_-_non_folding` = 0
WHERE
  `workshop_Walker_with_wheel_-_non_folding` = -1;

UPDATE prices
SET
  `workshop_Crutch_a_pair_-_local` = 0
WHERE
  `workshop_Crutch_a_pair_-_local` = -1;

UPDATE prices
SET
  `workshop_Crutch_-_Stainless_steel` = 0
WHERE
  `workshop_Crutch_-_Stainless_steel` = -1;

UPDATE prices
SET
  `workshop_Wheel_chair_-_folding` = 0
WHERE
  `workshop_Wheel_chair_-_folding` = -1;

UPDATE prices
SET
  `workshop_CP_chair_-_wooden` = 0
WHERE
  `workshop_CP_chair_-_wooden` = -1;

UPDATE prices
SET
  `workshop_CP_standing_table_-_wooden` = 0
WHERE
  `workshop_CP_standing_table_-_wooden` = -1;

UPDATE prices
SET
  `workshop_Cervical_Collar` = 0
WHERE
  `workshop_Cervical_Collar` = -1;

UPDATE prices
SET
  `workshop_Abdominal_corset_belt` = 0
WHERE
  `workshop_Abdominal_corset_belt` = -1;

UPDATE prices
SET
  `workshop_Reparing` = 0
WHERE
  `workshop_Reparing` = -1;

UPDATE prices
SET
  `workshop_Other_orthodevice` = 0
WHERE
  `workshop_Other_orthodevice` = -1;

UPDATE prices
SET
  `surgical_osteotomy` = 0
WHERE
  `surgical_osteotomy` = -1;

UPDATE prices
SET
  `surgical_epiphysiodesis` = 0
WHERE
  `surgical_epiphysiodesis` = -1;

UPDATE prices
SET
  `surgical_polio_AL` = 0
WHERE
  `surgical_polio_AL` = -1;

UPDATE prices
SET
  `surgical_percutaneous_AL_club_foot` = 0
WHERE
  `surgical_percutaneous_AL_club_foot` = -1;

UPDATE prices
SET
  `surgical_PMR_club_foot` = 0
WHERE
  `surgical_PMR_club_foot` = -1;

UPDATE prices
SET
  `surgical_Burn_release` = 0
WHERE
  `surgical_Burn_release` = -1;

UPDATE prices
SET
  `surgical_Pin_removal` = 0
WHERE
  `surgical_Pin_removal` = -1;

UPDATE prices
SET
  `surgical_other_operation` = 0
WHERE
  `surgical_other_operation` = -1;

UPDATE prices
SET
  `consult_give_appointment` = 0
WHERE
  `consult_give_appointment` = -1;

UPDATE prices
SET
  `medecine_vitamineD` = 0
WHERE
  `medecine_vitamineD` = -1;

UPDATE prices
SET
  `workshop_BHKAFO_Drop_lock_single_axis` = 0
WHERE
  `workshop_BHKAFO_Drop_lock_single_axis` = -1;

UPDATE prices
SET
  `workshop_crutch_alumenium_-_a_pair` = 0
WHERE
  `workshop_crutch_alumenium_-_a_pair` = -1;

UPDATE prices
SET
  `workshop_wheel_chair_china` = 0
WHERE
  `workshop_wheel_chair_china` = -1;

UPDATE prices
SET
  `workshop_mailwalke_brace` = 0
WHERE
  `workshop_mailwalke_brace` = -1;

UPDATE prices
SET
  `workshop_leg_truction` = 0
WHERE
  `workshop_leg_truction` = -1;

UPDATE prices
SET
  `workshop_thoracic_brace` = 0
WHERE
  `workshop_thoracic_brace` = -1;

UPDATE prices
SET
  `workshop_samainto_brace` = 0
WHERE
  `workshop_samainto_brace` = -1;

UPDATE prices
SET
  `workshop_fracture_brace_-_one_leg` = 0
WHERE
  `workshop_fracture_brace_-_one_leg` = -1;

UPDATE prices
SET
  `workshop_smo` = 0
WHERE
  `workshop_smo` = -1;

UPDATE prices
SET
  `workshop_lifspring_afo` = 0
WHERE
  `workshop_lifspring_afo` = -1;

UPDATE prices
SET
  `surgical_osteotomy_bi` = 0
WHERE
  `surgical_osteotomy_bi` = -1;

UPDATE prices
SET
  `surgical_epiphysiodesis_bi` = 0
WHERE
  `surgical_epiphysiodesis_bi` = -1;

UPDATE prices
SET
  `surgical_polio_achileus_Achileus_lenthening_bi` = 0
WHERE
  `surgical_polio_achileus_Achileus_lenthening_bi` = -1;

UPDATE prices
SET
  `surgical_percutaneous_achil_tenotomy_bi_cmosh` = 0
WHERE
  `surgical_percutaneous_achil_tenotomy_bi_cmosh` = -1;

UPDATE prices
SET
  `surgical_percutaneous_achil_tenotomy_uni_cdc` = 0
WHERE
  `surgical_percutaneous_achil_tenotomy_uni_cdc` = -1;

UPDATE prices
SET
  `surgical_percutaneous_achil_tenotomy_bi_cdc` = 0
WHERE
  `surgical_percutaneous_achil_tenotomy_bi_cdc` = -1;

UPDATE prices
SET
  `surgical_PMR_club_club_foot_bi` = 0
WHERE
  `surgical_PMR_club_club_foot_bi` = -1;

UPDATE prices
SET
  `surgical_burn_little_release` = 0
WHERE
  `surgical_burn_little_release` = -1;

UPDATE prices
SET
  `other_physiotherapy_adult` = 0
WHERE
  `other_physiotherapy_adult` = -1;

UPDATE prices
SET
  `other_physiotherapy_child` = 0
WHERE
  `other_physiotherapy_child` = -1;

UPDATE prices
SET
  `other_group_physiotherapy` = 0
WHERE
  `other_group_physiotherapy` = -1;

UPDATE prices
SET
  `other_nutritionalSupport` = 0
WHERE
  `other_nutritionalSupport` = -1;

UPDATE prices
SET
  `other_nutritionalAdvice` = 0
WHERE
  `other_nutritionalAdvice` = -1;

UPDATE prices
SET
  `other_CMOSH_follow_up` = 0
WHERE
  `other_CMOSH_follow_up` = -1;

UPDATE prices
SET
  `other_microbus` = 0
WHERE
  `other_microbus` = -1;

UPDATE prices
SET
  `other_Other_consultation_care` = 0
WHERE
  `other_Other_consultation_care` = -1;

UPDATE prices
SET
  `other_physiotherapy` = 0
WHERE
  `other_physiotherapy` = -1;

UPDATE prices
SET
  `other_X_Ray` = 0
WHERE
  `other_X_Ray` = -1;

UPDATE prices
SET
  `other_making_dressing` = 0
WHERE
  `other_making_dressing` = -1;

UPDATE prices
SET
  `other_make_short_plaster` = 0
WHERE
  `other_make_short_plaster` = -1;

UPDATE prices
SET
  `other_make_long_plaster` = 0
WHERE
  `other_make_long_plaster` = -1;

UPDATE prices
SET
  `other_making_plaster` = 0
WHERE
  `other_making_plaster` = -1;

UPDATE prices
SET
  `other_Other_plaster` = 0
WHERE
  `other_Other_plaster` = -1;

UPDATE prices
SET
  `other_Other_dressing` = 0
WHERE
  `other_Other_dressing` = -1;

UPDATE prices
SET
  `consult_ClubFoot_Follow_up` = 0
WHERE
  `consult_ClubFoot_Follow_up` = -1;

UPDATE prices
SET
  `workshop_UHKAFO_-_Drop_lock_single_axis_-_MI` = 0
WHERE
  `workshop_UHKAFO_-_Drop_lock_single_axis_-_MI` = -1;

UPDATE prices
SET
  `workshop_Artificial_limb_-_BK_-_Exoskeleton` = 0
WHERE
  `workshop_Artificial_limb_-_BK_-_Exoskeleton` = -1;

UPDATE prices
SET
  `workshop_Artificial_limb_-_AK_-_Exoskeleton` = 0
WHERE
  `workshop_Artificial_limb_-_AK_-_Exoskeleton` = -1;

UPDATE prices
SET
  `workshop_Artificial_limb_-_BK_-_Endoskeleton_with_pylon_Std` = 0
WHERE
  `workshop_Artificial_limb_-_BK_-_Endoskeleton_with_pylon_Std` = -1;

UPDATE prices
SET
  `workshop_Artificial_limb_-_AK_-_single_axis_standard` = 0
WHERE
  `workshop_Artificial_limb_-_AK_-_single_axis_standard` = -1;

UPDATE prices
SET
  `workshop_artificial_limb_-_AK_-_polycentric_knee_joint` = 0
WHERE
  `workshop_artificial_limb_-_AK_-_polycentric_knee_joint` = -1;

UPDATE prices
SET
  `workshop_Artificial_Tr_radial_prosthesis_Alimco` = 0
WHERE
  `workshop_Artificial_Tr_radial_prosthesis_Alimco` = -1;

UPDATE prices
SET
  `workshop_Artificial_Tr_radial_prosthesis_jaipur` = 0
WHERE
  `workshop_Artificial_Tr_radial_prosthesis_jaipur` = -1;

UPDATE prices
SET
  `workshop_Wheel_Chair_-_china_-_modified` = 0
WHERE
  `workshop_Wheel_Chair_-_china_-_modified` = -1;

UPDATE prices
SET
  `workshop_White_can` = 0
WHERE
  `workshop_White_can` = -1;

UPDATE prices
SET
  `workshop_Hearing_aids` = 0
WHERE
  `workshop_Hearing_aids` = -1;

UPDATE prices
SET
  `workshop_Elbow_crutch` = 0
WHERE
  `workshop_Elbow_crutch` = -1;

UPDATE prices
SET
  `workshop_Lifspring_BAFO` = 0
WHERE
  `workshop_Lifspring_BAFO` = -1;

UPDATE prices
SET
  `workshop_AFO_-_Articulated` = 0
WHERE
  `workshop_AFO_-_Articulated` = -1;

UPDATE prices
SET
  `workshop_Extension_brace_-_AFO` = 0
WHERE
  `workshop_Extension_brace_-_AFO` = -1;

UPDATE prices
SET
  `workshop_other` = 0
WHERE
  `workshop_other` = -1;

ALTER TABLE `prices` CHANGE `consult_CDC_consultation_physio` `consult_CDC_consultation_physio` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `consult_CDC_consultation_Bengali_Doctor` `consult_CDC_consultation_Bengali_Doctor` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `consult_CDC_consultation_Doctor` `consult_CDC_consultation_Doctor` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `consult_field_visit` `consult_field_visit` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `consult_home_visit` `consult_home_visit` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `medecine_medecine` `medecine_medecine` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `medecine_calcium_30x500mg` `medecine_calcium_30x500mg` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BHKAFO_night` `workshop_BHKAFO_night` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BHKAFO_walking` `workshop_BHKAFO_walking` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_UHKAFO_night` `workshop_UHKAFO_night` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_UHKAFO_walking` `workshop_UHKAFO_walking` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BKAFO_night_-_plastic` `workshop_BKAFO_night_-_plastic` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BKAFO_walking` `workshop_BKAFO_walking` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_KAFO_night` `workshop_KAFO_night` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_UKAFO_walking` `workshop_UKAFO_walking` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Knee_brace` `workshop_Knee_brace` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BAFO_night` `workshop_BAFO_night` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BAFO_walking` `workshop_BAFO_walking` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_AFO_night` `workshop_AFO_night` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_AFO_walking` `workshop_AFO_walking` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Orthoshoes_with_bar_-_one_leg` `workshop_Orthoshoes_with_bar_-_one_leg` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Orthoshoes_without_bar_-_one_leg` `workshop_Orthoshoes_without_bar_-_one_leg` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_DB_splint` `workshop_DB_splint` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Compensation_sole` `workshop_Compensation_sole` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Arch_support` `workshop_Arch_support` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Matetarsal_pade` `workshop_Matetarsal_pade` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Supinator_corner` `workshop_Supinator_corner` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Wirst_splint` `workshop_Wirst_splint` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Hand_splint` `workshop_Hand_splint` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Finger_splint` `workshop_Finger_splint` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Walker_with_wheel_-_folding` `workshop_Walker_with_wheel_-_folding` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Walker_with_wheel_-_non_folding` `workshop_Walker_with_wheel_-_non_folding` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Crutch_a_pair_-_local` `workshop_Crutch_a_pair_-_local` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Crutch_-_Stainless_steel` `workshop_Crutch_-_Stainless_steel` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Wheel_chair_-_folding` `workshop_Wheel_chair_-_folding` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_CP_chair_-_wooden` `workshop_CP_chair_-_wooden` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_CP_standing_table_-_wooden` `workshop_CP_standing_table_-_wooden` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Cervical_Collar` `workshop_Cervical_Collar` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Abdominal_corset_belt` `workshop_Abdominal_corset_belt` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Reparing` `workshop_Reparing` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Other_orthodevice` `workshop_Other_orthodevice` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_osteotomy` `surgical_osteotomy` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_epiphysiodesis` `surgical_epiphysiodesis` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_polio_AL` `surgical_polio_AL` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_percutaneous_AL_club_foot` `surgical_percutaneous_AL_club_foot` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_PMR_club_foot` `surgical_PMR_club_foot` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_Burn_release` `surgical_Burn_release` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_Pin_removal` `surgical_Pin_removal` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_other_operation` `surgical_other_operation` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `consult_give_appointment` `consult_give_appointment` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `medecine_vitamineD` `medecine_vitamineD` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_BHKAFO_Drop_lock_single_axis` `workshop_BHKAFO_Drop_lock_single_axis` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_crutch_alumenium_-_a_pair` `workshop_crutch_alumenium_-_a_pair` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_wheel_chair_china` `workshop_wheel_chair_china` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_mailwalke_brace` `workshop_mailwalke_brace` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_leg_truction` `workshop_leg_truction` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_thoracic_brace` `workshop_thoracic_brace` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_samainto_brace` `workshop_samainto_brace` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_fracture_brace_-_one_leg` `workshop_fracture_brace_-_one_leg` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_smo` `workshop_smo` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_lifspring_afo` `workshop_lifspring_afo` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_osteotomy_bi` `surgical_osteotomy_bi` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_epiphysiodesis_bi` `surgical_epiphysiodesis_bi` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_polio_achileus_Achileus_lenthening_bi` `surgical_polio_achileus_Achileus_lenthening_bi` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_percutaneous_achil_tenotomy_bi_cmosh` `surgical_percutaneous_achil_tenotomy_bi_cmosh` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_percutaneous_achil_tenotomy_uni_cdc` `surgical_percutaneous_achil_tenotomy_uni_cdc` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_percutaneous_achil_tenotomy_bi_cdc` `surgical_percutaneous_achil_tenotomy_bi_cdc` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_PMR_club_club_foot_bi` `surgical_PMR_club_club_foot_bi` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `surgical_burn_little_release` `surgical_burn_little_release` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_physiotherapy_adult` `other_physiotherapy_adult` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_physiotherapy_child` `other_physiotherapy_child` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_group_physiotherapy` `other_group_physiotherapy` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_nutritionalSupport` `other_nutritionalSupport` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_nutritionalAdvice` `other_nutritionalAdvice` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_CMOSH_follow_up` `other_CMOSH_follow_up` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_microbus` `other_microbus` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_Other_consultation_care` `other_Other_consultation_care` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_physiotherapy` `other_physiotherapy` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_X_Ray` `other_X_Ray` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_making_dressing` `other_making_dressing` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_make_short_plaster` `other_make_short_plaster` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_make_long_plaster` `other_make_long_plaster` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_making_plaster` `other_making_plaster` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_Other_plaster` `other_Other_plaster` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `other_Other_dressing` `other_Other_dressing` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `consult_ClubFoot_Follow_up` `consult_ClubFoot_Follow_up` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_UHKAFO_-_Drop_lock_single_axis_-_MI` `workshop_UHKAFO_-_Drop_lock_single_axis_-_MI` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Artificial_limb_-_BK_-_Exoskeleton` `workshop_Artificial_limb_-_BK_-_Exoskeleton` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Artificial_limb_-_AK_-_Exoskeleton` `workshop_Artificial_limb_-_AK_-_Exoskeleton` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Artificial_limb_-_BK_-_Endoskeleton_with_pylon_Std` `workshop_Artificial_limb_-_BK_-_Endoskeleton_with_pylon_Std` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Artificial_limb_-_AK_-_single_axis_standard` `workshop_Artificial_limb_-_AK_-_single_axis_standard` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_artificial_limb_-_AK_-_polycentric_knee_joint` `workshop_artificial_limb_-_AK_-_polycentric_knee_joint` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Artificial_Tr_radial_prosthesis_Alimco` `workshop_Artificial_Tr_radial_prosthesis_Alimco` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Artificial_Tr_radial_prosthesis_jaipur` `workshop_Artificial_Tr_radial_prosthesis_jaipur` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Wheel_Chair_-_china_-_modified` `workshop_Wheel_Chair_-_china_-_modified` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_White_can` `workshop_White_can` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Hearing_aids` `workshop_Hearing_aids` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Elbow_crutch` `workshop_Elbow_crutch` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Lifspring_BAFO` `workshop_Lifspring_BAFO` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_AFO_-_Articulated` `workshop_AFO_-_Articulated` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_Extension_brace_-_AFO` `workshop_Extension_brace_-_AFO` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `prices` CHANGE `workshop_other` `workshop_other` INT(11) NOT NULL DEFAULT '0';
