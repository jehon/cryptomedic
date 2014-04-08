CREATE TABLE prices ( 
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
	modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
	created timestamp NOT NULL DEFAULT '0000-00-00 00:00:00', 
	lastuser varchar(50) DEFAULT NULL, 
	datefrom datetime NOT NULL DEFAULT '0000-00-00 00:00:00', 
	dateto datetime NOT NULL DEFAULT '0000-00-00 00:00:00', 
	consult_CDC_consultation_physio tinyint(4) DEFAULT -1, 
	consult_CDC_consultation_Bengali_Doctor tinyint(4) DEFAULT -1, 
	consult_field_visit tinyint(4) DEFAULT -1, 
	consult_home_visit tinyint(4) DEFAULT -1, 
	consult_medecine tinyint(4) DEFAULT -1, 
	consult_making_plaster tinyint(4) DEFAULT -1, 
	consult_making_dressing tinyint(4) DEFAULT -1, 
	consult_physiotherapy tinyint(4) DEFAULT -1, 
	consult_Other_consultation_care tinyint(4) DEFAULT -1, 
	workshop_BHKAFO_night tinyint(4) DEFAULT -1, 
	workshop_BHKAFO_walking tinyint(4) DEFAULT -1, 
	workshop_UHKAFO_night tinyint(4) DEFAULT -1, 
	workshop_UHKAFO_walking tinyint(4) DEFAULT -1, 
	workshop_BKAFO_night tinyint(4) DEFAULT -1, 
	workshop_BKAFO_walking tinyint(4) DEFAULT -1, 
	workshop_UKAFO_night tinyint(4) DEFAULT -1, 
	workshop_UKAFO_walking tinyint(4) DEFAULT -1, 
	workshop_Knee_brace tinyint(4) DEFAULT -1, 
	workshop_BAFO_night tinyint(4) DEFAULT -1, 
	workshop_BAFO_walking tinyint(4) DEFAULT -1, 
	workshop_UAFO_night tinyint(4) DEFAULT -1, 
	workshop_UAFO_walking tinyint(4) DEFAULT -1, 
	workshop_Orthoshoes_with_bar tinyint(4) DEFAULT -1, 
	workshop_Orthoshoes_without_bar tinyint(4) DEFAULT -1, 
	workshop_DDB_splint tinyint(4) DEFAULT -1, 
	workshop_Compensation_sole tinyint(4) DEFAULT -1, 
	workshop_Arch_support tinyint(4) DEFAULT -1, 
	workshop_Matetarsal_pade tinyint(4) DEFAULT -1, 
	workshop_Supinator_corner tinyint(4) DEFAULT -1, 
	workshop_Wirst_splint tinyint(4) DEFAULT -1, 
	workshop_Hand_splint tinyint(4) DEFAULT -1, 
	workshop_Finger_splint tinyint(4) DEFAULT -1, 
	workshop_Walker_with_wheel tinyint(4) DEFAULT -1, 
	workshop_Walker_without_wheel tinyint(4) DEFAULT -1, 
	workshop_Crutch_a_pair tinyint(4) DEFAULT -1, 
	workshop_Crutch_a_piece tinyint(4) DEFAULT -1, 
	workshop_Wheel_chair tinyint(4) DEFAULT -1, 
	workshop_CP_chair tinyint(4) DEFAULT -1, 
	workshop_CP_standing_table tinyint(4) DEFAULT -1, 
	workshop_Cervical_Collar tinyint(4) DEFAULT -1, 
	workshop_Abdominal_corset_belt tinyint(4) DEFAULT -1, 
	workshop_Reparing tinyint(4) DEFAULT -1, 
	workshop_Other_orthodevice tinyint(4) DEFAULT -1, 
	surgical_osteotomy tinyint(4) DEFAULT -1, 
	surgical_epiphysiodesis tinyint(4) DEFAULT -1, 
	surgical_polio_AL tinyint(4) DEFAULT -1, 
	surgical_percutaneous_AL_club_foot tinyint(4) DEFAULT -1, 
	surgical_PMR_club_foot tinyint(4) DEFAULT -1, 
	surgical_Burn_release tinyint(4) DEFAULT -1, 
	surgical_Pin_removal tinyint(4) DEFAULT -1, 
	surgical_other_operation tinyint(4) DEFAULT -1, 
	other_microbus tinyint(4) DEFAULT -1, 
	other_CMOSH_follow_up tinyint(4) DEFAULT -1, 
	PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3585 DEFAULT CHARSET=utf8;


ALTER TABLE  `prices` ADD  `socialLevelPercentage_0` FLOAT NOT NULL DEFAULT  '	-1',
ADD  `socialLevelPercentage_1` FLOAT NOT NULL DEFAULT  '	-1',
ADD  `socialLevelPercentage_2` FLOAT NOT NULL DEFAULT  '	-1',
ADD  `socialLevelPercentage_3` FLOAT NOT NULL DEFAULT  '	-1',
ADD  `socialLevelPercentage_4` FLOAT NOT NULL DEFAULT  '	-1',
ADD  `consult_X_Ray` INT NOT NULL DEFAULT  '-1' AFTER  `consult_making_dressing`;

INSERT INTO prices (id, consult_CDC_consultation_physio,consult_CDC_consultation_Bengali_Doctor,consult_field_visit,consult_home_visit,consult_medecine,consult_making_plaster,consult_making_dressing,consult_X_Ray,consult_physiotherapy,workshop_BHKAFO_night,workshop_BHKAFO_walking,workshop_UHKAFO_night,workshop_UHKAFO_walking,workshop_BKAFO_night,workshop_BKAFO_walking,workshop_UKAFO_night,workshop_UKAFO_walking,workshop_Knee_brace,workshop_BAFO_night,workshop_BAFO_walking,workshop_UAFO_night,workshop_UAFO_walking,workshop_Orthoshoes_with_bar,workshop_Orthoshoes_without_bar,workshop_DDB_splint,workshop_Compensation_sole,workshop_Arch_support,workshop_Matetarsal_pade,workshop_Supinator_corner,workshop_Wirst_splint,workshop_Hand_splint,workshop_Finger_splint,workshop_Walker_with_wheel,workshop_Walker_without_wheel,workshop_Crutch_a_pair,workshop_Crutch_a_piece,workshop_Wheel_chair,workshop_CP_chair,workshop_CP_standing_table,workshop_Cervical_Collar,workshop_Abdominal_corset_belt,workshop_Reparing,surgical_osteotomy,surgical_epiphysiodesis,surgical_polio_AL,surgical_percutaneous_AL_club_foot,surgical_PMR_club_foot,surgical_Burn_release,surgical_Pin_removal,other_microbus,other_CMOSH_follow_up,consult_Other_consultation_care,workshop_Other_orthodevice,surgical_other_operation,socialLevelPercentage_1,socialLevelPercentage_2,socialLevelPercentage_3,socialLevelPercentage_4)
 VALUE (1, 200,200,100,150,100,200,100,120,200,4200,4950,2420,2420,3200,3200,1600,1600,800,2400,2400,1100,1100,1000,1000,820,200,150,150,150,300,800,600,1320,1000,390,195,7500,5000,5000,150,1500,300,18000,8000,14000,5000,18000,14000,8000,200,200,1,1,1,0.1,0.3,0.7,1);
 
UPDATE  `amd_chakaria`.`prices` SET  `dateto` =  '2013-01-01 00:00:00' WHERE  `prices`.`id` =1;

ALTER TABLE  `bills` ADD  `price_id` INT(10) UNSIGNED NOT NULL DEFAULT  1 AFTER `Date`;
ALTER TABLE  `amd_chakaria`.`bills` ADD INDEX  `price_id_fk` (  `price_id` );
ALTER TABLE  `bills` ADD FOREIGN KEY (  `price_id` ) REFERENCES  `amd_chakaria`.`prices` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE ;
