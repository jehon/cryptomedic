-- phpMyAdmin SQL Dump
-- version 4.2.12deb2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 25, 2015 at 09:52 PM
-- Server version: 5.6.24-0ubuntu2
-- PHP Version: 5.6.4-4ubuntu6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `amd_chakaria`
--
CREATE DATABASE IF NOT EXISTS `amd_chakaria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `amd_chakaria`;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `sl_familySalary` int(11) DEFAULT NULL,
  `sl_numberOfHouseholdMembers` int(11) DEFAULT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `price_id` int(10) unsigned NOT NULL DEFAULT '1',
  `Center` varchar(24) DEFAULT NULL,
  `ExaminerName` varchar(127) DEFAULT NULL,
  `total_real` int(11) NOT NULL DEFAULT '0',
  `Sociallevel` int(10) unsigned DEFAULT NULL,
  `total_asked` int(10) unsigned DEFAULT NULL,
  `total_paid` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_physio` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_Bengali_Doctor` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_Doctor` int(11) NOT NULL DEFAULT '0',
  `consult_field_visit` int(11) NOT NULL DEFAULT '0',
  `consult_home_visit` int(11) NOT NULL DEFAULT '0',
  `medecine_medecine` int(11) NOT NULL DEFAULT '0',
  `medecine_calcium_30x500mg` int(11) NOT NULL DEFAULT '0',
  `other_making_plaster` int(11) NOT NULL DEFAULT '0',
  `other_make_long_plaster` int(11) NOT NULL DEFAULT '0',
  `other_make_short_plaster` int(11) NOT NULL DEFAULT '0',
  `other_making_dressing` int(11) NOT NULL DEFAULT '0',
  `other_X_Ray` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `other_Other_consultation_care` int(11) NOT NULL DEFAULT '0',
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
  `medecine_vitamineD` int(11) NOT NULL DEFAULT '0',
  `other_nutritionalAdvice` int(11) NOT NULL DEFAULT '0',
  `other_nutritionalSupport` int(11) NOT NULL DEFAULT '0',
  `other_group_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy_child` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy_adult` int(11) NOT NULL DEFAULT '0',
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
  `surgical_burn_little_release` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=23030 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bug_reporting`
--

CREATE TABLE `bug_reporting` (
`id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(256) NOT NULL,
  `session` varchar(128) DEFAULT NULL,
  `username` varchar(64) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `description` text,
  `browser_useragent` varchar(256) DEFAULT NULL,
  `browser_state` longtext,
  `browser_console` longtext,
  `screenshot` longblob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `club_foots`
--

CREATE TABLE `club_foots` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` varchar(24) DEFAULT NULL,
  `Weightkg` int(4) DEFAULT NULL,
  `Heightcm` int(3) DEFAULT NULL,
  `PainLeft` int(5) unsigned DEFAULT NULL,
  `PainRight` int(5) unsigned DEFAULT NULL,
  `WalkingFloorContactLeft` int(5) unsigned DEFAULT NULL,
  `WalkingFloorContactRight` int(5) unsigned DEFAULT NULL,
  `WalkingFirstContactLeft` int(5) unsigned DEFAULT NULL,
  `WalkingFirstContactRight` int(5) unsigned DEFAULT NULL,
  `JumpingOneLegLeft` int(5) unsigned DEFAULT NULL,
  `JumpingOneLegRight` int(5) unsigned DEFAULT NULL,
  `RunLeft` int(5) unsigned DEFAULT NULL,
  `RunRight` int(5) unsigned DEFAULT NULL,
  `AdductionAngleLeft` int(5) DEFAULT NULL,
  `AdductionAngleRight` int(5) DEFAULT NULL,
  `HindFootAngleWLeft` int(5) DEFAULT NULL,
  `HindFootAngleWRight` int(5) DEFAULT NULL,
  `DorsalFlexionMaxLeft` int(5) DEFAULT NULL,
  `DorsalFlexionMaxRight` int(5) DEFAULT NULL,
  `PlantarFlexionMaxLeft` int(5) unsigned DEFAULT NULL,
  `PlantarFlexionMaxRight` int(5) unsigned DEFAULT NULL,
  `MuscularInbalanceLeft` tinyint(1) unsigned DEFAULT NULL,
  `MuscularInbalanceRight` tinyint(1) unsigned DEFAULT NULL,
  `CurvedLateralBorderLeft` decimal(5,2) unsigned DEFAULT NULL,
  `CurvedLateralBorderRight` decimal(5,2) unsigned DEFAULT NULL,
  `MedialCreaseLeft` decimal(5,2) unsigned DEFAULT NULL,
  `MedialCreaseRight` decimal(5,2) unsigned DEFAULT NULL,
  `TalarHeadCoverageLeft` decimal(5,2) unsigned DEFAULT NULL,
  `TalarHeadCoverageRight` decimal(5,2) unsigned DEFAULT NULL,
  `PosteriorCreaseLeft` decimal(5,2) unsigned DEFAULT NULL,
  `PosteriorCreaseRight` decimal(5,2) unsigned DEFAULT NULL,
  `RigidEquinusLeft` decimal(5,2) unsigned DEFAULT NULL,
  `RigidEquinusRight` decimal(5,2) unsigned DEFAULT NULL,
  `EmptyHeelLeft` decimal(5,2) unsigned DEFAULT NULL,
  `EmptyHeelRight` decimal(5,2) unsigned DEFAULT NULL,
  `Treatment` mediumtext,
  `Comments` mediumtext,
  `TreatmentEvaluation` int(11) DEFAULT NULL,
  `TreatmentFinished` tinyint(4) DEFAULT NULL,
  `Nextappointment` date DEFAULT NULL,
  `NextCenter` varchar(24) DEFAULT NULL,
  `Brachialcircumferencecm` int(3) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1516 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deleted`
--

CREATE TABLE `deleted` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `entity_type` varchar(20) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nonricket_consults`
--

CREATE TABLE `nonricket_consults` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` varchar(24) DEFAULT NULL,
  `Weightkg` int(4) DEFAULT NULL,
  `Heightcm` int(3) DEFAULT NULL,
  `Brachialcircumferencecm` int(3) DEFAULT NULL,
  `Side` varchar(24) DEFAULT NULL,
  `Jointsorbonesaffected` varchar(255) DEFAULT NULL,
  `Deformity` varchar(255) DEFAULT NULL,
  `Articulationmobility` varchar(255) DEFAULT NULL,
  `Musclestrength` varchar(255) DEFAULT NULL,
  `Pain` varchar(24) DEFAULT NULL,
  `Walk` varchar(24) DEFAULT NULL,
  `XRay` varchar(127) DEFAULT NULL,
  `Surgery66` varchar(24) DEFAULT NULL,
  `Comments` mediumtext,
  `TreatmentEvaluation` int(11) DEFAULT NULL,
  `TreatmentFinished` tinyint(4) DEFAULT NULL,
  `Nextappointment` date DEFAULT NULL,
  `NextCenter` varchar(24) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2306 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `entryyear` int(4) unsigned NOT NULL,
  `entryorder` int(4) DEFAULT NULL,
  `Firstname` varchar(255) DEFAULT '',
  `Lastname` varchar(255) DEFAULT '',
  `Sex` enum('Male','Female') DEFAULT NULL,
  `Yearofbirth` int(4) DEFAULT '0',
  `AddressNotes` mediumtext,
  `Telephone` varchar(127) DEFAULT NULL,
  `District` varchar(24) DEFAULT NULL,
  `Upazilla` varchar(24) DEFAULT NULL,
  `Union_` varchar(24) DEFAULT NULL,
  `pathology_Clubfoot` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Ricket` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_other` tinyint(1) NOT NULL DEFAULT '0',
  `historyofcomplaint` mediumtext,
  `pathology_Adult` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_CP` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Polio` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Burn` tinyint(1) NOT NULL DEFAULT '0',
  `pathology_Congenital` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=101169 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `OriginalName` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `comment` mediumtext
) ENGINE=InnoDB AUTO_INCREMENT=4013 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `datefrom` date DEFAULT NULL,
  `dateto` date DEFAULT NULL,
  `consult_CDC_consultation_physio` int(11) DEFAULT '-1',
  `consult_CDC_consultation_Bengali_Doctor` int(11) DEFAULT '-1',
  `consult_CDC_consultation_Doctor` int(11) DEFAULT '-1',
  `consult_field_visit` int(11) DEFAULT '-1',
  `consult_home_visit` int(11) DEFAULT '-1',
  `medecine_medecine` int(11) DEFAULT '-1',
  `medecine_calcium_30x500mg` int(11) DEFAULT '-1',
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
  `consult_give_appointment` int(11) DEFAULT '-1',
  `medecine_vitamineD` int(11) DEFAULT '-1',
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
  `other_physiotherapy_adult` int(11) NOT NULL DEFAULT '-1',
  `other_physiotherapy_child` int(11) NOT NULL DEFAULT '-1',
  `other_group_physiotherapy` int(11) DEFAULT '-1',
  `other_nutritionalSupport` int(11) DEFAULT '-1',
  `other_nutritionalAdvice` int(11) DEFAULT '-1',
  `other_CMOSH_follow_up` int(11) DEFAULT '-1',
  `other_microbus` int(11) DEFAULT '-1',
  `other_Other_consultation_care` int(11) DEFAULT '-1',
  `other_physiotherapy` int(11) DEFAULT '-1',
  `other_X_Ray` int(11) DEFAULT '-1',
  `other_making_dressing` int(11) DEFAULT '-1',
  `other_make_short_plaster` int(11) DEFAULT '-1',
  `other_make_long_plaster` int(11) DEFAULT '-1',
  `other_making_plaster` int(11) DEFAULT '-1',
  `socialLevelPercentage_4` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_3` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_2` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_1` float NOT NULL DEFAULT '-1',
  `socialLevelPercentage_0` float NOT NULL DEFAULT '-1'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ricket_consults`
--

CREATE TABLE `ricket_consults` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` varchar(24) DEFAULT NULL,
  `Weightkg` int(4) DEFAULT NULL,
  `Heightcm` int(4) unsigned DEFAULT NULL,
  `CrossLeftT` varchar(255) DEFAULT NULL,
  `RightLeg` varchar(24) DEFAULT NULL,
  `Pain` varchar(24) DEFAULT NULL,
  `Wristenlargement` int(5) DEFAULT NULL,
  `Ribbeading` int(5) DEFAULT NULL,
  `RightlegAngle` int(11) DEFAULT NULL,
  `LeftlegAngle` int(11) DEFAULT NULL,
  `CrossRightT` varchar(255) DEFAULT NULL,
  `CrossRightF` varchar(255) DEFAULT NULL,
  `IMICDistance` int(4) unsigned DEFAULT NULL,
  `LeftLeg` varchar(24) DEFAULT NULL,
  `CrossLeftF` varchar(255) DEFAULT NULL,
  `Surgery` varchar(24) DEFAULT NULL,
  `XRay` varchar(127) DEFAULT NULL,
  `Brace` varchar(24) DEFAULT NULL,
  `Nutrisupport` tinyint(1) NOT NULL DEFAULT '0',
  `Brachialcircumferencecm` int(3) DEFAULT NULL,
  `WalkingDifficulties` varchar(24) DEFAULT NULL,
  `Comments` mediumtext,
  `TreatmentEvaluation` int(11) DEFAULT NULL,
  `TreatmentFinished` tinyint(4) DEFAULT NULL,
  `Nextappointment` date DEFAULT NULL,
  `NextCenter` varchar(24) DEFAULT NULL,
  `conclusion_medical_calcium500` tinyint(1) NOT NULL DEFAULT '0',
  `conclusion_medical_calcium1000` tinyint(1) NOT NULL DEFAULT '0',
  `conclusion_medical_vitaminD` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=9103 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` varchar(50) NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `value` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `surgeries`
--

CREATE TABLE `surgeries` (
`id` int(10) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date DEFAULT NULL,
  `ReportDiagnostic` varchar(100) DEFAULT NULL,
  `ReportSurgeon` varchar(100) DEFAULT NULL,
  `ReportSideR` tinyint(1) DEFAULT NULL,
  `ReportSideL` tinyint(1) DEFAULT NULL,
  `report_procedure` varchar(250) DEFAULT NULL,
  `FollowUpComplication` mediumtext
) ENGINE=InnoDB AUTO_INCREMENT=558 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(127) DEFAULT NULL,
  `password` char(40) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `group` char(10) DEFAULT '',
  `created` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastuser` varchar(50) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`), ADD KEY `price_id_fk` (`price_id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `bug_reporting`
--
ALTER TABLE `bug_reporting`
 ADD PRIMARY KEY (`id`), ADD KEY `url` (`url`,`session`,`username`);

--
-- Indexes for table `club_foots`
--
ALTER TABLE `club_foots`
 ADD PRIMARY KEY (`id`), ADD KEY `entity_name` (`patient_id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `deleted`
--
ALTER TABLE `deleted`
 ADD PRIMARY KEY (`id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `patients_entrynumber` (`entryyear`,`entryorder`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
 ADD PRIMARY KEY (`id`), ADD KEY `entity_name` (`patient_id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
 ADD PRIMARY KEY (`id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
 ADD PRIMARY KEY (`id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `surgeries`
--
ALTER TABLE `surgeries`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`), ADD KEY `modified` (`modified`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `username` (`username`), ADD KEY `group` (`group`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23030;
--
-- AUTO_INCREMENT for table `bug_reporting`
--
ALTER TABLE `bug_reporting`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `club_foots`
--
ALTER TABLE `club_foots`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1516;
--
-- AUTO_INCREMENT for table `deleted`
--
ALTER TABLE `deleted`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2306;
--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101169;
--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4013;
--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9103;
--
-- AUTO_INCREMENT for table `surgeries`
--
ALTER TABLE `surgeries`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=558;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `club_foots`
--
ALTER TABLE `club_foots`
ADD CONSTRAINT `club_foots_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
ADD CONSTRAINT `nonricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
ADD CONSTRAINT `ricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `surgeries`
--
ALTER TABLE `surgeries`
ADD CONSTRAINT `surgeries_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
