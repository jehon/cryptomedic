-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 30, 2014 at 05:02 AM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE IF NOT EXISTS `bills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date NOT NULL,
  `price_id` int(10) unsigned NOT NULL DEFAULT '1',
  `Center` int(10) unsigned DEFAULT NULL,
  `ExaminerName` varchar(127) DEFAULT NULL,
  `total_real` int(11) NOT NULL DEFAULT '0',
  `Sociallevel` int(10) unsigned DEFAULT NULL,
  `total_asked` int(10) unsigned NOT NULL,
  `total_paid` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_physio` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_Bengali_Doctor` int(11) NOT NULL DEFAULT '0',
  `consult_field_visit` int(11) NOT NULL DEFAULT '0',
  `consult_home_visit` int(11) NOT NULL DEFAULT '0',
  `consult_medecine` int(11) NOT NULL DEFAULT '0',
  `consult_making_plaster` int(11) NOT NULL DEFAULT '0',
  `consult_making_dressing` int(11) NOT NULL DEFAULT '0',
  `consult_X_Ray` int(11) NOT NULL DEFAULT '0',
  `consult_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `consult_Other_consultation_care` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_BKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_UKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_Knee_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_UAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_Orthoshoes_with_bar` int(11) NOT NULL DEFAULT '0',
  `workshop_Orthoshoes_without_bar` int(11) NOT NULL DEFAULT '0',
  `workshop_DDB_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_Compensation_sole` int(11) NOT NULL DEFAULT '0',
  `workshop_Arch_support` int(11) NOT NULL DEFAULT '0',
  `workshop_Matetarsal_pade` int(11) NOT NULL DEFAULT '0',
  `workshop_Supinator_corner` int(11) NOT NULL DEFAULT '0',
  `workshop_Wirst_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_Hand_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_Finger_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_Walker_with_wheel` int(11) NOT NULL DEFAULT '0',
  `workshop_Walker_without_wheel` int(11) NOT NULL DEFAULT '0',
  `workshop_Crutch_a_pair` int(11) NOT NULL DEFAULT '0',
  `workshop_Crutch_a_piece` int(11) NOT NULL DEFAULT '0',
  `workshop_Wheel_chair` int(11) NOT NULL DEFAULT '0',
  `workshop_CP_chair` int(11) NOT NULL DEFAULT '0',
  `workshop_CP_standing_table` int(11) NOT NULL DEFAULT '0',
  `workshop_Cervical_Collar` int(11) NOT NULL DEFAULT '0',
  `workshop_Abdominal_corset_belt` int(11) NOT NULL DEFAULT '0',
  `workshop_Reparing` int(11) NOT NULL DEFAULT '0',
  `workshop_Other_orthodevice` int(11) NOT NULL DEFAULT '0',
  `surgical_osteotomy` int(11) NOT NULL DEFAULT '0',
  `surgical_epiphysiodesis` int(11) NOT NULL DEFAULT '0',
  `surgical_polio_AL` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_AL_club_foot` int(11) NOT NULL DEFAULT '0',
  `surgical_PMR_club_foot` int(11) NOT NULL DEFAULT '0',
  `surgical_Burn_release` int(11) NOT NULL DEFAULT '0',
  `surgical_Pin_removal` int(11) NOT NULL DEFAULT '0',
  `surgical_other_operation` int(11) NOT NULL DEFAULT '0',
  `other_microbus` int(11) NOT NULL DEFAULT '0',
  `other_CMOSH_follow_up` int(11) NOT NULL DEFAULT '0',
  `consult_give_appointment` int(11) NOT NULL DEFAULT '0',
  `consult_vitamineD` int(11) NOT NULL DEFAULT '0',
  `consult_nutritionalAdvice` int(11) NOT NULL DEFAULT '0',
  `consult_nutritionalSupport` int(11) NOT NULL DEFAULT '0',
  `consult_group_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_Drop_lock_single_axis` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_alumenium` int(11) NOT NULL DEFAULT '0',
  `workshop_chair_china` int(11) NOT NULL DEFAULT '0',
  `workshop_mailwalke_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_leg_truction` int(11) NOT NULL DEFAULT '0',
  `workshop_thoracic_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_samainto_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_fracture_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_smo` int(11) NOT NULL DEFAULT '0',
  `workshop_lifspring_afo` int(11) NOT NULL DEFAULT '0',
  `surgical_osteotomy_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_epiphysiodesis_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_polio_achileus_Achileus_lenthening_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_bi_cmosh` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_uni_cdc` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_bi_cdc` int(11) NOT NULL DEFAULT '0',
  `surgical_PMR_club_club_foot_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_burn_little_release` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `Center` (`Center`),
  KEY `price_id_fk` (`price_id`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12623 ;

-- --------------------------------------------------------

--
-- Table structure for table `club_foots`
--

CREATE TABLE IF NOT EXISTS `club_foots` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date DEFAULT NULL,
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` int(10) unsigned DEFAULT NULL,
  `SchoolClass` varchar(255) DEFAULT NULL,
  `Weightkg` int(4) DEFAULT NULL,
  `Heightcm` int(3) DEFAULT NULL,
  `MUAC` int(3) DEFAULT NULL,
  `Side` int(10) unsigned DEFAULT NULL,
  `Walking` tinyint(1) NOT NULL,
  `Pain` int(10) unsigned DEFAULT NULL,
  `Sport` int(3) unsigned DEFAULT NULL,
  `WalkingFloorContact` int(3) unsigned DEFAULT NULL,
  `WalkingFirstContact` int(3) unsigned DEFAULT NULL,
  `JumpingOneLeg` tinyint(1) unsigned DEFAULT NULL,
  `JumpingReception` tinyint(1) unsigned DEFAULT NULL,
  `Run` int(3) unsigned DEFAULT NULL,
  `Adduction` int(3) unsigned DEFAULT NULL,
  `HindFootAngleD` int(3) unsigned DEFAULT NULL,
  `ThighFoot` int(3) unsigned DEFAULT NULL,
  `AdductionAngle` int(3) unsigned DEFAULT NULL,
  `HindFootAngleW` int(3) unsigned DEFAULT NULL,
  `ThighFootAngle` int(11) DEFAULT NULL,
  `DorsalFlexionMax` int(3) unsigned DEFAULT NULL,
  `PlantarFlexionMax` int(3) unsigned DEFAULT NULL,
  `SupinationMax` int(3) unsigned DEFAULT NULL,
  `PronationMax` int(3) unsigned DEFAULT NULL,
  `EquinusReduc` int(10) unsigned DEFAULT NULL,
  `VarusReduc` int(10) unsigned DEFAULT NULL,
  `CPBRotation` int(10) unsigned DEFAULT NULL,
  `AdductionReduc` int(10) unsigned DEFAULT NULL,
  `CavusFoot` int(3) unsigned DEFAULT NULL,
  `DeepPosteriorCrease` tinyint(1) unsigned DEFAULT NULL,
  `DeepMedialCrease` tinyint(1) unsigned DEFAULT NULL,
  `AbnormalMuscle` tinyint(1) unsigned DEFAULT NULL,
  `DIMEGLIO` int(3) unsigned DEFAULT NULL,
  `Treatment` mediumtext,
  `Comment` mediumtext,
  `Nextappointment` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nonricket_consults_Side` (`Side`),
  KEY `Pain` (`Pain`),
  KEY `entity_name` (`patient_id`),
  KEY `Center` (`Center`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=696 ;

-- --------------------------------------------------------

--
-- Table structure for table `deleted`
--

CREATE TABLE IF NOT EXISTS `deleted` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `entity_type` varchar(20) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `labels`
--

CREATE TABLE IF NOT EXISTS `labels` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reference` varchar(100) DEFAULT NULL,
  `english` varchar(255) DEFAULT NULL,
  `french` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1002 ;

-- --------------------------------------------------------

--
-- Table structure for table `nonricket_consults`
--

CREATE TABLE IF NOT EXISTS `nonricket_consults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date DEFAULT NULL,
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` int(10) unsigned DEFAULT NULL,
  `SchoolClass` varchar(255) DEFAULT NULL,
  `Pathology` int(10) unsigned DEFAULT NULL,
  `Weightkg` int(4) DEFAULT NULL,
  `Heightcm` int(3) DEFAULT NULL,
  `Brachialcircumferencecm` int(3) DEFAULT NULL,
  `Side` int(10) unsigned DEFAULT NULL,
  `Jointsorbonesaffected` varchar(255) DEFAULT NULL,
  `Deformity` varchar(255) DEFAULT NULL,
  `Articulationmobility` varchar(255) DEFAULT NULL,
  `Musclestrength` varchar(255) DEFAULT NULL,
  `Pain` int(10) unsigned DEFAULT NULL,
  `Comment` mediumtext,
  `Undernutrited` tinyint(1) NOT NULL,
  `Physiotherapy61` tinyint(1) NOT NULL,
  `Plaster62` int(10) unsigned DEFAULT NULL,
  `XRay` varchar(127) DEFAULT NULL,
  `Orthopedicdevice65` int(10) unsigned DEFAULT NULL,
  `Surgery66` int(10) unsigned DEFAULT NULL,
  `Othertreatment68` mediumtext,
  `Walk` int(10) unsigned DEFAULT NULL,
  `Worms` tinyint(1) NOT NULL,
  `Nextappointment` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `nonricket_consults_Side` (`Side`),
  KEY `nonricket_consults_Plaster62` (`Plaster62`),
  KEY `nonricket_consults_Orthopedicdevice65` (`Orthopedicdevice65`),
  KEY `nonricket_consults_Surgery66` (`Surgery66`),
  KEY `nonricket_consults_Walk` (`Walk`),
  KEY `Pathology` (`Pathology`),
  KEY `Pain` (`Pain`),
  KEY `Center` (`Center`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1987 ;

-- --------------------------------------------------------

--
-- Table structure for table `orthopedic_devices`
--

CREATE TABLE IF NOT EXISTS `orthopedic_devices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Device` int(10) unsigned DEFAULT NULL,
  `Orthoname` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Result` int(10) unsigned DEFAULT NULL,
  `Commentary` mediumtext,
  `Orthopedicdevice` int(10) unsigned DEFAULT NULL,
  `Goal` int(10) unsigned DEFAULT NULL,
  `UsingProposal` int(10) unsigned DEFAULT NULL,
  `TypeOfMaterial` int(10) unsigned DEFAULT NULL,
  `LeftHipJoint` varchar(100) DEFAULT NULL,
  `LeftHipType` varchar(100) DEFAULT NULL,
  `LeftHipROM` varchar(100) DEFAULT NULL,
  `LeftKneeJoint` varchar(100) DEFAULT NULL,
  `LeftKneeLock` tinyint(1) DEFAULT '0',
  `LeftKneeType` varchar(100) DEFAULT NULL,
  `LeftKneeROM` varchar(100) DEFAULT NULL,
  `LeftAnkleJoint` varchar(100) DEFAULT NULL,
  `LeftAnkleType` varchar(100) DEFAULT NULL,
  `LeftAnkleLimited` varchar(100) DEFAULT NULL,
  `LeftAnkleBelt` varchar(100) DEFAULT NULL,
  `LeftAnkleROM` varchar(100) DEFAULT NULL,
  `LeftFootSupinatorPronator` varchar(100) DEFAULT NULL,
  `LeftFootArchSupportCompensation` varchar(100) DEFAULT NULL,
  `RightHipJoint` varchar(100) DEFAULT NULL,
  `RightHipType` varchar(100) DEFAULT NULL,
  `RightHipROM` varchar(100) DEFAULT NULL,
  `RightKneeJoint` varchar(100) DEFAULT NULL,
  `RightKneeLock` tinyint(1) DEFAULT '0',
  `RightKneeType` varchar(100) DEFAULT NULL,
  `RightKneeROM` varchar(100) DEFAULT NULL,
  `RightAnkleJoint` varchar(100) DEFAULT NULL,
  `RightAnkleType` varchar(100) DEFAULT NULL,
  `RightAnkleLimited` varchar(100) DEFAULT NULL,
  `RightAnkleBelt` varchar(100) DEFAULT NULL,
  `RightAnkleROM` varchar(100) DEFAULT NULL,
  `RightFootSupinatorPronator` varchar(100) DEFAULT NULL,
  `RightFootArchSupportCompensation` varchar(100) DEFAULT NULL,
  `OtherTypeOfDevice` varchar(100) DEFAULT NULL,
  `MeasureDate` date DEFAULT NULL,
  `MeasurePerson` varchar(100) DEFAULT NULL,
  `MeasureComments` mediumtext,
  `FittingDate` date DEFAULT NULL,
  `FittingPerson` varchar(100) DEFAULT NULL,
  `FittingComments` mediumtext,
  `DeliveryDate` date DEFAULT NULL,
  `DeliveryPerson` varchar(100) DEFAULT NULL,
  `DeliveryComments` mediumtext,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `orthopedic_devices_Device` (`Device`),
  KEY `orthopedic_devices_Result` (`Result`),
  KEY `orthopedic_devices_Orthopedicdevice` (`Orthopedicdevice`),
  KEY `orthopedic_devices_Goal` (`Goal`),
  KEY `orthopedic_devices_UsingProposal` (`UsingProposal`),
  KEY `orthopedic_devices_TypeOfMaterial` (`TypeOfMaterial`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `entryyear` int(4) unsigned NOT NULL,
  `entryorder` int(4) DEFAULT NULL,
  `Firstname` varchar(255) DEFAULT '',
  `Lastname` varchar(255) DEFAULT '',
  `Sex` int(10) unsigned DEFAULT '0',
  `Yearofbirth` int(4) DEFAULT '0',
  `AddressNotes` mediumtext,
  `Telephone` varchar(127) DEFAULT NULL,
  `Notesforthepatient` mediumtext,
  `Numberofhouseholdmembers` int(2) DEFAULT NULL,
  `Family` int(10) unsigned DEFAULT NULL,
  `Fatherswork` varchar(127) DEFAULT NULL,
  `Motherswork` varchar(127) DEFAULT NULL,
  `Familysalaryinamonth` int(8) DEFAULT NULL,
  `Homesteadgarden` tinyint(1) DEFAULT NULL,
  `Drinkingwaterfromtubewell` tinyint(1) NOT NULL,
  `Anyloanforfoodthisyear` tinyint(1) NOT NULL,
  `Home` int(10) unsigned DEFAULT NULL,
  `Wall` int(10) unsigned DEFAULT NULL,
  `Religion` int(10) unsigned DEFAULT NULL,
  `Consanguineousfamily` tinyint(1) NOT NULL,
  `Numberofpregnacy` int(2) DEFAULT NULL,
  `Numberofbrothersandsisters` int(2) DEFAULT NULL,
  `Numberofbrothersandsistersaffectedbyrickets` int(2) DEFAULT NULL,
  `Rowofthechildreninthefamily` int(2) DEFAULT NULL,
  `Ageofweaningmonth` int(2) DEFAULT NULL,
  `Ageofdiversificationofthefoodmonth` int(2) DEFAULT NULL,
  `Doesthechildrengotoschool` int(10) unsigned DEFAULT NULL,
  `Fathersname` varchar(255) DEFAULT '',
  `Fatherseducation` int(10) unsigned DEFAULT NULL,
  `Motherseducation` int(10) unsigned DEFAULT NULL,
  `District` int(10) unsigned DEFAULT NULL,
  `Upazilla` int(10) unsigned DEFAULT NULL,
  `Union_` int(10) unsigned DEFAULT NULL,
  `Howmanymealperday` int(2) DEFAULT NULL,
  `Sociallevel` int(10) unsigned DEFAULT NULL,
  `Roof` int(10) unsigned DEFAULT NULL,
  `pathology_Clubfoot` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Ricket` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_other` mediumtext,
  `historyofcomplaint` mediumtext,
  `pathology_Adult` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_CP` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Polio` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Burn` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Congenital` tinyint(1) NOT NULL DEFAULT '0',
  `disease_diarrhoea` tinyint(1) NOT NULL,
  `disease_respiratory_infection` tinyint(1) NOT NULL,
  `disease_malaria` tinyint(1) NOT NULL,
  `disease_typhoid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `patients_entrynumber` (`entryyear`,`entryorder`),
  KEY `patients_Sex` (`Sex`),
  KEY `patients_Family` (`Family`),
  KEY `patients_Home` (`Home`),
  KEY `patients_Wall` (`Wall`),
  KEY `patients_Religion` (`Religion`),
  KEY `patients_Doesthechildrengotoschool` (`Doesthechildrengotoschool`),
  KEY `patients_Fatherseducation` (`Fatherseducation`),
  KEY `patients_Motherseducation` (`Motherseducation`),
  KEY `patients_District` (`District`),
  KEY `patients_Upazilla` (`Upazilla`),
  KEY `patients_Union_` (`Union_`),
  KEY `patients_Roof` (`Roof`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=98404 ;

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `OriginalName` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `comment` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `files` (`file`),
  KEY `entity_name` (`patient_id`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3088 ;

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE IF NOT EXISTS `prices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `datefrom` date DEFAULT NULL,
  `dateto` date DEFAULT NULL,
  `consult_CDC_consultation_physio` int(11) DEFAULT '-1',
  `consult_CDC_consultation_Bengali_Doctor` int(11) DEFAULT '-1',
  `consult_field_visit` int(11) DEFAULT '-1',
  `consult_home_visit` int(11) DEFAULT '-1',
  `consult_medecine` int(11) DEFAULT '-1',
  `consult_making_plaster` int(11) DEFAULT '-1',
  `consult_making_dressing` int(11) DEFAULT '-1',
  `consult_X_Ray` int(11) NOT NULL DEFAULT '-1',
  `consult_physiotherapy` int(11) DEFAULT '-1',
  `consult_Other_consultation_care` int(11) DEFAULT '-1',
  `workshop_BHKAFO_night` int(11) DEFAULT '-1',
  `workshop_BHKAFO_walking` int(11) DEFAULT '-1',
  `workshop_UHKAFO_night` int(11) DEFAULT '-1',
  `workshop_UHKAFO_walking` int(11) DEFAULT '-1',
  `workshop_BKAFO_night` int(11) DEFAULT '-1',
  `workshop_BKAFO_walking` int(11) DEFAULT '-1',
  `workshop_UKAFO_night` int(11) DEFAULT '-1',
  `workshop_UKAFO_walking` int(11) DEFAULT '-1',
  `workshop_Knee_brace` int(11) DEFAULT '-1',
  `workshop_BAFO_night` int(11) DEFAULT '-1',
  `workshop_BAFO_walking` int(11) DEFAULT '-1',
  `workshop_UAFO_night` int(11) DEFAULT '-1',
  `workshop_UAFO_walking` int(11) DEFAULT '-1',
  `workshop_Orthoshoes_with_bar` int(11) DEFAULT '-1',
  `workshop_Orthoshoes_without_bar` int(11) DEFAULT '-1',
  `workshop_DDB_splint` int(11) DEFAULT '-1',
  `workshop_Compensation_sole` int(11) DEFAULT '-1',
  `workshop_Arch_support` int(11) DEFAULT '-1',
  `workshop_Matetarsal_pade` int(11) DEFAULT '-1',
  `workshop_Supinator_corner` int(11) DEFAULT '-1',
  `workshop_Wirst_splint` int(11) DEFAULT '-1',
  `workshop_Hand_splint` int(11) DEFAULT '-1',
  `workshop_Finger_splint` int(11) DEFAULT '-1',
  `workshop_Walker_with_wheel` int(11) DEFAULT '-1',
  `workshop_Walker_without_wheel` int(11) DEFAULT '-1',
  `workshop_Crutch_a_pair` int(11) DEFAULT '-1',
  `workshop_Crutch_a_piece` int(11) DEFAULT '-1',
  `workshop_Wheel_chair` int(11) DEFAULT '-1',
  `workshop_CP_chair` int(11) DEFAULT '-1',
  `workshop_CP_standing_table` int(11) DEFAULT '-1',
  `workshop_Cervical_Collar` int(11) DEFAULT '-1',
  `workshop_Abdominal_corset_belt` int(11) DEFAULT '-1',
  `workshop_Reparing` int(11) DEFAULT '-1',
  `workshop_Other_orthodevice` int(11) DEFAULT '-1',
  `surgical_osteotomy` int(11) DEFAULT '-1',
  `surgical_epiphysiodesis` int(11) DEFAULT '-1',
  `surgical_polio_AL` int(11) DEFAULT '-1',
  `surgical_percutaneous_AL_club_foot` int(11) DEFAULT '-1',
  `surgical_PMR_club_foot` int(11) DEFAULT '-1',
  `surgical_Burn_release` int(11) DEFAULT '-1',
  `surgical_Pin_removal` int(11) DEFAULT '-1',
  `surgical_other_operation` int(11) DEFAULT '-1',
  `other_microbus` int(11) DEFAULT '-1',
  `other_CMOSH_follow_up` int(11) DEFAULT '-1',
  `socialLevelPercentage_0` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_1` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_2` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_3` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_4` float NOT NULL DEFAULT '-1',
  `consult_give_appointment` int(11) DEFAULT '-1',
  `consult_vitamineD` int(11) DEFAULT '-1',
  `consult_nutritionalAdvice` int(11) DEFAULT '-1',
  `consult_nutritionalSupport` int(11) DEFAULT '-1',
  `consult_group_physiotherapy` int(11) DEFAULT '-1',
  `workshop_BHKAFO_Drop_lock_single_axis` int(11) DEFAULT '-1',
  `workshop_crutch_alumenium` int(11) DEFAULT '-1',
  `workshop_chair_china` int(11) DEFAULT '-1',
  `workshop_mailwalke_brace` int(11) DEFAULT '-1',
  `workshop_leg_truction` int(11) DEFAULT '-1',
  `workshop_thoracic_brace` int(11) DEFAULT '-1',
  `workshop_samainto_brace` int(11) DEFAULT '-1',
  `workshop_fracture_brace` int(11) DEFAULT '-1',
  `workshop_smo` int(11) DEFAULT '-1',
  `workshop_lifspring_afo` int(11) DEFAULT '-1',
  `surgical_osteotomy_bi` int(11) DEFAULT '-1',
  `surgical_epiphysiodesis_bi` int(11) DEFAULT '-1',
  `surgical_polio_achileus_Achileus_lenthening_bi` int(11) DEFAULT '-1',
  `surgical_percutaneous_achil_tenotomy_bi_cmosh` int(11) DEFAULT '-1',
  `surgical_percutaneous_achil_tenotomy_uni_cdc` int(11) DEFAULT '-1',
  `surgical_percutaneous_achil_tenotomy_bi_cdc` int(11) DEFAULT '-1',
  `surgical_PMR_club_club_foot_bi` int(11) DEFAULT '-1',
  `surgical_burn_little_release` int(11) DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `ricket_consults`
--

CREATE TABLE IF NOT EXISTS `ricket_consults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date DEFAULT NULL,
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` int(10) unsigned DEFAULT NULL,
  `Ricewithchun` int(10) unsigned DEFAULT NULL,
  `Onebowlvegetables` int(10) unsigned DEFAULT NULL,
  `Twospoonsesamseedgrounded` int(10) unsigned DEFAULT NULL,
  `Littlefishbowl` int(10) unsigned DEFAULT NULL,
  `Milkglass` int(10) unsigned DEFAULT NULL,
  `Weightkg` int(4) DEFAULT NULL,
  `Heightcm` int(4) unsigned DEFAULT NULL,
  `HeightcmLying` tinyint(1) NOT NULL DEFAULT '0',
  `Sittingheightcm` int(4) unsigned DEFAULT NULL,
  `CrossLeftT` varchar(255) DEFAULT NULL,
  `Rightleg` int(10) unsigned DEFAULT NULL,
  `Ageofbeginningofthedeformitiesyear` varchar(255) DEFAULT NULL,
  `Pain` int(10) unsigned DEFAULT NULL,
  `Treatmenttaken` varchar(255) DEFAULT NULL,
  `Wristenlargement` int(10) unsigned DEFAULT NULL,
  `Ribbeading` int(10) unsigned DEFAULT NULL,
  `Bossingforehead` int(10) unsigned DEFAULT NULL,
  `Cubitusvarus` int(3) DEFAULT NULL,
  `RightlegAngle` int(11) DEFAULT NULL,
  `LeftlegAngle` int(11) DEFAULT NULL,
  `CrossRightT` varchar(255) DEFAULT NULL,
  `CrossRightF` varchar(255) DEFAULT NULL,
  `IMICDistance` int(4) unsigned DEFAULT NULL,
  `LaxityRight` int(10) unsigned DEFAULT NULL,
  `LaxityLeft` int(10) unsigned DEFAULT NULL,
  `PatelladislocationLeft` tinyint(1) DEFAULT NULL,
  `PatelladislocationRight` tinyint(1) DEFAULT NULL,
  `KneeMobilityE` varchar(255) DEFAULT NULL,
  `Leftleg` int(10) unsigned DEFAULT NULL,
  `Iodisedsalt` tinyint(1) NOT NULL,
  `SchoolClass` varchar(127) DEFAULT NULL,
  `CrossLeftF` varchar(255) DEFAULT NULL,
  `Surgery` int(10) unsigned DEFAULT NULL,
  `Nutritionaladvice` int(10) unsigned DEFAULT NULL,
  `KneeMobilityF` varchar(255) DEFAULT NULL,
  `XRay` varchar(127) DEFAULT NULL,
  `Brace` int(10) unsigned DEFAULT NULL,
  `Nutrisupport` tinyint(1) NOT NULL,
  `Moneygivenbythefamily` varchar(255) DEFAULT NULL,
  `Brachialcircumferencecm` int(3) DEFAULT NULL,
  `WalkingDifficulties` int(10) unsigned DEFAULT NULL,
  `Commentary` mediumtext,
  `Worms` tinyint(1) NOT NULL,
  `Undernutrited` tinyint(1) NOT NULL,
  `Nextappointment` date DEFAULT NULL,
  `Medical` varchar(127) DEFAULT NULL,
  `conclusion_medical_calcium500` tinyint(1) NOT NULL,
  `conclusion_medical_calcium1000` tinyint(1) NOT NULL,
  `conclusion_medical_codLiverOil` tinyint(1) NOT NULL,
  `conclusion_medical_vitaminD` tinyint(1) NOT NULL,
  `conclusion_medical_other` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `ricket_consults_Ricewithchun` (`Ricewithchun`),
  KEY `ricket_consults_Onebowlvegetables` (`Onebowlvegetables`),
  KEY `ricket_consults_Twospoonsesamseedgrounded` (`Twospoonsesamseedgrounded`),
  KEY `ricket_consults_Littlefishbowl` (`Littlefishbowl`),
  KEY `ricket_consults_Milkglass` (`Milkglass`),
  KEY `ricket_consults_Surgery` (`Surgery`),
  KEY `ricket_consults_Nutritionaladvice` (`Nutritionaladvice`),
  KEY `ricket_consults_Walk` (`WalkingDifficulties`),
  KEY `ricket_consults_Rightleg27` (`Rightleg`),
  KEY `ricket_consults_Leftleg28` (`Leftleg`),
  KEY `ricket_consults_Orthopedicdevice65` (`Brace`),
  KEY `ricket_consults_LaxityRight` (`LaxityRight`),
  KEY `ricket_consults_LaxityLeft` (`LaxityLeft`),
  KEY `ricket_consults_Wristenlargement` (`Wristenlargement`),
  KEY `ricket_consults_Ribbeading` (`Ribbeading`),
  KEY `ricket_consults_Bossingforehead` (`Bossingforehead`),
  KEY `Pain` (`Pain`),
  KEY `Pain_2` (`Pain`),
  KEY `Center` (`Center`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8819 ;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` varchar(50) NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `surgeries`
--

CREATE TABLE IF NOT EXISTS `surgeries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` datetime DEFAULT NULL,
  `Operation` int(10) unsigned DEFAULT NULL,
  `Complication` mediumtext,
  `Location` int(10) unsigned DEFAULT NULL,
  `Side` int(10) unsigned DEFAULT NULL,
  `Lastrevisiondate` mediumtext,
  `Surgeon` varchar(255) DEFAULT NULL,
  `Notes` mediumtext,
  `TransferChittagong` date DEFAULT NULL,
  `MedicalProblem` int(10) unsigned DEFAULT '0',
  `BleedingExecive` tinyint(1) NOT NULL,
  `GeneralCondition` int(10) unsigned DEFAULT NULL,
  `Weight` int(3) unsigned DEFAULT NULL,
  `Heightcm` int(3) unsigned DEFAULT NULL,
  `TemperatureF` int(3) unsigned DEFAULT NULL,
  `Pulsemin` int(3) unsigned DEFAULT NULL,
  `BloodPresureH` int(3) unsigned DEFAULT NULL,
  `BloodPresureL` int(3) unsigned DEFAULT NULL,
  `HeartAuscultation` int(10) unsigned DEFAULT NULL,
  `ChestAuscultation` int(10) unsigned DEFAULT NULL,
  `Skin` int(10) unsigned DEFAULT NULL,
  `MouthAndTeeth` int(10) unsigned DEFAULT NULL,
  `Worms` tinyint(1) NOT NULL,
  `Treatment` mediumtext,
  `RadiologicalExam` varchar(100) DEFAULT NULL,
  `OkForSurgery` tinyint(1) NOT NULL DEFAULT '0',
  `NeedTreatment` mediumtext,
  `BTTempF` int(10) unsigned DEFAULT NULL,
  `BTSkin` tinyint(1) DEFAULT NULL,
  `BTCough` tinyint(1) DEFAULT NULL,
  `PAOk` tinyint(1) DEFAULT NULL,
  `PASurgeon` varchar(100) DEFAULT NULL,
  `ReportDate` date DEFAULT NULL,
  `ReportDiagnostic` mediumtext,
  `ReportSurgeon` varchar(100) DEFAULT NULL,
  `ReportProcedure` varchar(100) DEFAULT NULL,
  `ReportSideR` tinyint(1) DEFAULT NULL,
  `ReportSideL` tinyint(1) DEFAULT NULL,
  `report_procedure` varchar(250) DEFAULT NULL,
  `FollowUpComplication` mediumtext,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `surgeries_Operation` (`Operation`),
  KEY `surgeries_Location` (`Location`),
  KEY `surgeries_Side` (`Side`),
  KEY `surgeries_MedicalProblem` (`MedicalProblem`),
  KEY `surgeries_GeneralCondition` (`GeneralCondition`),
  KEY `surgeries_HeartAuscultation` (`HeartAuscultation`),
  KEY `surgeries_ChestAuscultation` (`ChestAuscultation`),
  KEY `surgeries_Skin` (`Skin`),
  KEY `surgeries_MouthAndTeeth` (`MouthAndTeeth`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=491 ;

-- --------------------------------------------------------

--
-- Table structure for table `surgery_followups`
--

CREATE TABLE IF NOT EXISTS `surgery_followups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date DEFAULT NULL,
  `Paracetamol` int(10) unsigned DEFAULT '0',
  `ParacetamolDays` int(10) unsigned DEFAULT NULL,
  `cloxacilline` int(10) unsigned DEFAULT NULL,
  `CloxacillineDays` int(10) unsigned DEFAULT NULL,
  `Calcium` int(10) unsigned DEFAULT NULL,
  `CalciumDays` int(10) unsigned DEFAULT NULL,
  `CodLiverOil` int(10) unsigned DEFAULT NULL,
  `NextAppointment` date DEFAULT NULL,
  `StitchOffDate` date DEFAULT NULL,
  `PlasterDays` int(10) unsigned DEFAULT NULL,
  `TreatmentAfterPlasterWalkingBrace` tinyint(1) DEFAULT '0',
  `TreatmentAfterPlasterOrthopedicShoes` tinyint(1) DEFAULT '0',
  `TreatmentAfterPlasterNightSplint` tinyint(1) DEFAULT '0',
  `TreatmentAfterPlasterPhysioTherapy` tinyint(1) DEFAULT '0',
  `Examiner` varchar(100) DEFAULT NULL,
  `SkinCicatrisation` tinyint(1) DEFAULT '0',
  `BoneConsolidation` int(10) unsigned DEFAULT NULL,
  `DeformityAxis` int(11) DEFAULT NULL,
  `ArticulationMobility` varchar(100) DEFAULT NULL,
  `WalkingDifficulties` varchar(100) DEFAULT NULL,
  `TreatmentPhysiotherapy` tinyint(1) DEFAULT '0',
  `TreatmentOrthopedicDevice` tinyint(1) DEFAULT '0',
  `TreatmentPlaster` tinyint(1) DEFAULT '0',
  `TreatmentOther` mediumtext,
  `ResultImprovement` int(10) unsigned DEFAULT NULL,
  `ResultFamilyHappy` tinyint(1) DEFAULT '0',
  `ResultChildrenHappy` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `surgery_followups_BoneConsolidation` (`BoneConsolidation`),
  KEY `surgery_followups_ResultImprovement` (`ResultImprovement`),
  KEY `patient_id` (`patient_id`),
  KEY `modified` (`modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=54 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` char(40) DEFAULT NULL,
  `group` char(10) DEFAULT '',
  `created` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `group` (`group`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`Center`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `club_foots`
--
ALTER TABLE `club_foots`
  ADD CONSTRAINT `club_foots_ibfk_1` FOREIGN KEY (`Side`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `club_foots_ibfk_2` FOREIGN KEY (`Pain`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `club_foots_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `club_foots_ibfk_4` FOREIGN KEY (`Center`) REFERENCES `labels` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
  ADD CONSTRAINT `nonricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_10` FOREIGN KEY (`Walk`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_11` FOREIGN KEY (`Center`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_4` FOREIGN KEY (`Pathology`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_5` FOREIGN KEY (`Side`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_6` FOREIGN KEY (`Pain`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_7` FOREIGN KEY (`Plaster62`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_8` FOREIGN KEY (`Orthopedicdevice65`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nonricket_consults_ibfk_9` FOREIGN KEY (`Surgery66`) REFERENCES `labels` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orthopedic_devices`
--
ALTER TABLE `orthopedic_devices`
  ADD CONSTRAINT `orthopedic_devices_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orthopedic_devices_ibfk_2` FOREIGN KEY (`Device`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orthopedic_devices_ibfk_3` FOREIGN KEY (`Result`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orthopedic_devices_ibfk_4` FOREIGN KEY (`Orthopedicdevice`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orthopedic_devices_ibfk_5` FOREIGN KEY (`Goal`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orthopedic_devices_ibfk_6` FOREIGN KEY (`UsingProposal`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orthopedic_devices_ibfk_7` FOREIGN KEY (`TypeOfMaterial`) REFERENCES `labels` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`Sex`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_10` FOREIGN KEY (`Upazilla`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_11` FOREIGN KEY (`Union_`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_12` FOREIGN KEY (`Roof`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_2` FOREIGN KEY (`Family`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_3` FOREIGN KEY (`Religion`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_4` FOREIGN KEY (`Home`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_5` FOREIGN KEY (`Wall`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_6` FOREIGN KEY (`Doesthechildrengotoschool`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_7` FOREIGN KEY (`Fatherseducation`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_8` FOREIGN KEY (`Motherseducation`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_9` FOREIGN KEY (`District`) REFERENCES `labels` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
  ADD CONSTRAINT `ricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_10` FOREIGN KEY (`Twospoonsesamseedgrounded`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_11` FOREIGN KEY (`Littlefishbowl`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_12` FOREIGN KEY (`Milkglass`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_13` FOREIGN KEY (`Rightleg`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_14` FOREIGN KEY (`Pain`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_15` FOREIGN KEY (`Wristenlargement`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_16` FOREIGN KEY (`Ribbeading`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_17` FOREIGN KEY (`Bossingforehead`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_18` FOREIGN KEY (`LaxityRight`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_19` FOREIGN KEY (`LaxityLeft`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_20` FOREIGN KEY (`Leftleg`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_21` FOREIGN KEY (`Surgery`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_22` FOREIGN KEY (`Nutritionaladvice`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_23` FOREIGN KEY (`Brace`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_24` FOREIGN KEY (`WalkingDifficulties`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_25` FOREIGN KEY (`Center`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_8` FOREIGN KEY (`Ricewithchun`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ricket_consults_ibfk_9` FOREIGN KEY (`Onebowlvegetables`) REFERENCES `labels` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `surgeries`
--
ALTER TABLE `surgeries`
  ADD CONSTRAINT `surgeries_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_10` FOREIGN KEY (`MouthAndTeeth`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_2` FOREIGN KEY (`Operation`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_3` FOREIGN KEY (`Location`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_4` FOREIGN KEY (`Side`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_5` FOREIGN KEY (`MedicalProblem`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_6` FOREIGN KEY (`GeneralCondition`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_7` FOREIGN KEY (`HeartAuscultation`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_8` FOREIGN KEY (`ChestAuscultation`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgeries_ibfk_9` FOREIGN KEY (`Skin`) REFERENCES `labels` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `surgery_followups`
--
ALTER TABLE `surgery_followups`
  ADD CONSTRAINT `surgery_followups_ibfk_2` FOREIGN KEY (`BoneConsolidation`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgery_followups_ibfk_3` FOREIGN KEY (`ResultImprovement`) REFERENCES `labels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `surgery_followups_ibfk_4` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
