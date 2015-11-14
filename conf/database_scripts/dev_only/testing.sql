-- phpMyAdmin SQL Dump
-- version 4.2.12deb2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 14, 2015 at 11:07 AM
-- Server version: 5.6.27-0ubuntu0.15.04.1
-- PHP Version: 5.6.4-4ubuntu6.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `amd_chakaria`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE IF NOT EXISTS `bills` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `created_at`, `updated_at`, `lastuser`, `patient_id`, `sl_familySalary`, `sl_numberOfHouseholdMembers`, `Date`, `price_id`, `Center`, `ExaminerName`, `total_real`, `Sociallevel`, `total_asked`, `total_paid`, `consult_CDC_consultation_physio`, `consult_CDC_consultation_Bengali_Doctor`, `consult_CDC_consultation_Doctor`, `consult_field_visit`, `consult_home_visit`, `medecine_medecine`, `medecine_calcium_30x500mg`, `other_making_plaster`, `other_make_long_plaster`, `other_make_short_plaster`, `other_making_dressing`, `other_X_Ray`, `other_physiotherapy`, `other_Other_consultation_care`, `workshop_BHKAFO_night`, `workshop_BHKAFO_walking`, `workshop_UHKAFO_night`, `workshop_UHKAFO_walking`, `workshop_BKAFO_night`, `workshop_BKAFO_walking`, `workshop_UKAFO_night`, `workshop_UKAFO_walking`, `workshop_Knee_brace`, `workshop_BAFO_night`, `workshop_BAFO_walking`, `workshop_UAFO_night`, `workshop_UAFO_walking`, `workshop_Orthoshoes_with_bar`, `workshop_Orthoshoes_without_bar`, `workshop_DDB_splint`, `workshop_Compensation_sole`, `workshop_Arch_support`, `workshop_Matetarsal_pade`, `workshop_Supinator_corner`, `workshop_Wirst_splint`, `workshop_Hand_splint`, `workshop_Finger_splint`, `workshop_Walker_with_wheel`, `workshop_Walker_without_wheel`, `workshop_Crutch_a_pair`, `workshop_Crutch_a_piece`, `workshop_Wheel_chair`, `workshop_CP_chair`, `workshop_CP_standing_table`, `workshop_Cervical_Collar`, `workshop_Abdominal_corset_belt`, `workshop_Reparing`, `workshop_Other_orthodevice`, `surgical_osteotomy`, `surgical_epiphysiodesis`, `surgical_polio_AL`, `surgical_percutaneous_AL_club_foot`, `surgical_PMR_club_foot`, `surgical_Burn_release`, `surgical_Pin_removal`, `surgical_other_operation`, `other_microbus`, `other_CMOSH_follow_up`, `consult_give_appointment`, `medecine_vitamineD`, `other_nutritionalAdvice`, `other_nutritionalSupport`, `other_group_physiotherapy`, `other_physiotherapy_child`, `other_physiotherapy_adult`, `workshop_BHKAFO_Drop_lock_single_axis`, `workshop_crutch_alumenium`, `workshop_chair_china`, `workshop_mailwalke_brace`, `workshop_leg_truction`, `workshop_thoracic_brace`, `workshop_samainto_brace`, `workshop_fracture_brace`, `workshop_smo`, `workshop_lifspring_afo`, `surgical_osteotomy_bi`, `surgical_epiphysiodesis_bi`, `surgical_polio_achileus_Achileus_lenthening_bi`, `surgical_percutaneous_achil_tenotomy_bi_cmosh`, `surgical_percutaneous_achil_tenotomy_uni_cdc`, `surgical_percutaneous_achil_tenotomy_bi_cdc`, `surgical_PMR_club_club_foot_bi`, `surgical_burn_little_release`) VALUES
(1, '2011-06-10 14:46:57', '2014-12-29 19:57:33', 'Thierry', 1, 3000, 7, '2011-06-09', 1, NULL, '', 22400, 2, 6720, 1500, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, '2014-02-28 15:11:38', '2015-01-19 15:12:59', 'josiane', 3, 4500, 9, '2014-01-14', 2, 'Chakaria', 'Ershad', 500, 2, 200, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(3, '2014-03-01 07:03:33', '2015-01-19 15:12:59', 'josiane', 4, 7000, 10, '2014-01-18', 2, 'Ukhia', 'Ershad', 500, 2, 200, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, '2014-03-01 07:05:25', '2015-01-19 15:12:59', 'josiane', 5, 5000, 5, '2014-01-18', 2, 'Ukhia', 'Ershad', 500, 2, 200, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, '2014-03-01 07:17:21', '2015-01-19 15:12:59', 'josiane', 2, 20000, 8, '2014-01-19', 2, 'Chakaria', 'Ershad', 500, 4, 500, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, '2014-03-02 07:44:13', '2015-01-19 15:12:59', 'Thierry', 3, 4500, 9, '2014-01-25', 2, 'Ukhia', 'Ershad', 4056697, 2, 1622679, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, '2014-03-02 07:45:42', '2015-01-19 15:12:59', 'josiane', 5, 5000, 5, '2014-01-25', 2, 'Ukhia', 'Ershad', 500, 2, 200, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, '2014-03-02 07:50:43', '2015-01-19 15:12:59', 'josiane', 4, 7000, 10, '2014-01-25', 2, 'Ukhia', 'Ershad', 500, 2, 200, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, '2014-06-20 05:58:08', '2015-01-19 15:12:59', 'josiane', 5, 5000, 5, '2014-05-31', 2, 'Chakaria', 'Ershad', 100, 2, 40, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, '2014-06-21 08:44:48', '2015-01-19 15:12:59', 'josiane', 3, 4500, 9, '2014-05-25', 2, 'Moeshkali', 'Rezaul', 100, 2, 40, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(11, '2014-06-22 15:45:37', '2015-01-19 15:12:59', 'josiane', 3, 4500, 9, '2014-05-20', 2, 'Ramu', 'Ershad', 500, 2, 200, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, '2014-06-25 05:20:49', '2015-10-15 04:29:50', 'josiane', 2, 20000, 8, '2014-05-20', 2, 'Chakaria', 'Ershad', 500, 2, 200, 300, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(13, '2014-07-05 07:52:07', '2015-01-19 15:12:59', 'josiane', 2, 20000, 8, '2014-05-20', 2, 'Chakaria', 'Hassan 1', 3000, 2, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bug_reporting`
--

CREATE TABLE IF NOT EXISTS `bug_reporting` (
`id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fixed` timestamp NULL DEFAULT NULL,
  `url` varchar(256) NOT NULL,
  `session` varchar(128) DEFAULT NULL,
  `username` varchar(64) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `description` text CHARACTER SET latin1,
  `browser_useragent` varchar(256) DEFAULT NULL,
  `browser_state` longtext CHARACTER SET latin1,
  `browser_console` longtext,
  `screenshot` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `club_foots`
--

CREATE TABLE IF NOT EXISTS `club_foots` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `club_foots`
--

INSERT INTO `club_foots` (`id`, `created_at`, `updated_at`, `lastuser`, `patient_id`, `Date`, `ExaminerName`, `Center`, `Weightkg`, `Heightcm`, `PainLeft`, `PainRight`, `WalkingFloorContactLeft`, `WalkingFloorContactRight`, `WalkingFirstContactLeft`, `WalkingFirstContactRight`, `JumpingOneLegLeft`, `JumpingOneLegRight`, `RunLeft`, `RunRight`, `AdductionAngleLeft`, `AdductionAngleRight`, `HindFootAngleWLeft`, `HindFootAngleWRight`, `DorsalFlexionMaxLeft`, `DorsalFlexionMaxRight`, `PlantarFlexionMaxLeft`, `PlantarFlexionMaxRight`, `MuscularInbalanceLeft`, `MuscularInbalanceRight`, `CurvedLateralBorderLeft`, `CurvedLateralBorderRight`, `MedialCreaseLeft`, `MedialCreaseRight`, `TalarHeadCoverageLeft`, `TalarHeadCoverageRight`, `PosteriorCreaseLeft`, `PosteriorCreaseRight`, `RigidEquinusLeft`, `RigidEquinusRight`, `EmptyHeelLeft`, `EmptyHeelRight`, `Treatment`, `Comments`, `TreatmentEvaluation`, `TreatmentFinished`, `Nextappointment`, `NextCenter`, `Brachialcircumferencecm`) VALUES
(1, '0000-00-00 00:00:00', '2015-05-10 08:03:59', 'murshed', 5, '2015-01-10', 'Ershad', 'Ukhia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DB splint', NULL, NULL, NULL, '2015-04-28', 'Ukhia', NULL),
(2, '0000-00-00 00:00:00', '2015-05-10 08:02:40', 'murshed', 5, '2014-09-27', 'Ershad', 'Ukhia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DB splint', NULL, NULL, NULL, '2015-01-10', 'Ukhia', NULL),
(3, '0000-00-00 00:00:00', '2015-05-10 08:01:10', 'murshed', 5, '2014-06-21', 'Ershad', 'Ukhia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DB splint', 'Use no 10 db splint', NULL, NULL, '2014-09-27', 'Ukhia', NULL),
(4, '0000-00-00 00:00:00', '2015-05-10 04:29:15', 'murshed', 5, '2014-04-21', 'Ershad', 'Chakaria', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'DB splint', 'No 7 used', NULL, NULL, '2014-05-31', 'Ukhia', 0),
(5, '0000-00-00 00:00:00', '2015-05-07 16:53:30', 'murshed', 5, '2014-03-29', 'Ershad', 'Ukhia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, NULL, 0.00, NULL, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'DB splint', 'No 7 given', NULL, NULL, '2014-04-21', 'Ukhia', NULL),
(6, '0000-00-00 00:00:00', '2015-05-07 16:49:28', 'murshed', 5, '2014-03-01', 'AMD doctor', 'Chakaria', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.50, 0.00, 0.50, 0.00, 1.00, 'tenotomy', '7th plaster done', NULL, NULL, '2014-03-21', 'Ukhia', 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `consults`
--
CREATE TABLE IF NOT EXISTS `consults` (
`source` varchar(18)
,`id` int(11) unsigned
,`created_at` timestamp
,`updated_at` timestamp
,`lastuser` varchar(50)
,`patient_id` int(11) unsigned
,`Date` date
,`ExaminerName` varchar(127)
,`Center` varchar(24)
,`TreatmentEvaluation` int(11)
,`TreatmentFinished` tinyint(4)
,`Nextappointment` date
,`NextCenter` varchar(24)
);
-- --------------------------------------------------------

--
-- Table structure for table `deleteds`
--

CREATE TABLE IF NOT EXISTS `deleteds` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `entity_type` varchar(20) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `deleteds`
--

INSERT INTO `deleteds` (`id`, `created_at`, `updated_at`, `patient_id`, `entity_type`, `entity_id`) VALUES
(25, '2015-08-21 12:32:35', '2015-08-21 12:32:35', 9, 'patient', 9);

-- --------------------------------------------------------

--
-- Table structure for table `nonricket_consults`
--

CREATE TABLE IF NOT EXISTS `nonricket_consults` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nonricket_consults`
--

INSERT INTO `nonricket_consults` (`id`, `created_at`, `updated_at`, `lastuser`, `patient_id`, `Date`, `ExaminerName`, `Center`, `Weightkg`, `Heightcm`, `Brachialcircumferencecm`, `Side`, `Jointsorbonesaffected`, `Deformity`, `Articulationmobility`, `Musclestrength`, `Pain`, `Walk`, `XRay`, `Surgery66`, `Comments`, `TreatmentEvaluation`, `TreatmentFinished`, `Nextappointment`, `NextCenter`) VALUES
(1, '0000-00-00 00:00:00', '2015-02-19 13:52:16', 'Thierry', 1, '2007-09-21', 'Ershad', NULL, 29, 134, 0, NULL, 'PBVE', '', '', '', 'No', NULL, '', 'Postero-medial release', '', NULL, NULL, '2015-04-28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE IF NOT EXISTS `patients` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `created_at`, `updated_at`, `lastuser`, `entryyear`, `entryorder`, `Firstname`, `Lastname`, `Sex`, `Yearofbirth`, `AddressNotes`, `Telephone`, `District`, `Upazilla`, `Union_`, `pathology_Clubfoot`, `pathology_Ricket`, `pathology_other`, `historyofcomplaint`, `pathology_Adult`, `pathology_CP`, `pathology_Polio`, `pathology_Burn`, `pathology_Congenital`) VALUES
(1, '2014-10-29 08:04:03', '2014-12-31 12:47:09', 'Thierry', 2000, 1, 'rezaul', 'islam', 'Male', 1998, '', '', 'Chittagong', NULL, NULL, 1, 0, 0, '', 0, 0, 0, 0, 0),
(2, '2014-02-28 11:56:41', '2014-12-31 12:47:09', 'josiane', 2014, 107, 'RIFATH', 'MOHAMED', 'Male', 2002, '', '', NULL, NULL, NULL, 1, 0, 0, '', 0, 0, 0, 0, 0),
(3, '2014-02-28 15:10:19', '2014-12-31 12:47:09', 'josiane', 2014, 103, 'OSMAN', '', 'Male', 2009, '', '', NULL, NULL, NULL, 1, 0, 0, '', 0, 0, 0, 0, 0),
(4, '2014-03-01 07:01:39', '2014-12-31 12:47:09', 'josiane', 2014, 104, 'RAHAMAN', 'MOHAMED', 'Male', 2007, '', '', NULL, NULL, NULL, 1, 0, 0, '', 0, 0, 0, 0, 0),
(5, '2014-03-01 07:03:47', '2015-05-07 16:26:38', 'murshed', 2014, 105, 'MD', 'Noman', 'Male', 2013, '', '1813247984', 'Cox''s Bazar', 'Ukhia', 'Jalia palong', 1, 0, 0, 'Right leg metatarsus varus.', 0, 0, 0, 0, 0),
(6, '2014-10-28 07:13:29', '2015-04-24 05:28:14', 'jehon', 2001, 1, 'al', 'abdul koium', '', 1995, '', '', '', '', '', 0, 0, 1, '', 0, 0, 0, 0, 0),
(7, '2014-08-04 18:31:40', '2014-08-04 18:31:40', 'transfer', 2001, 4, 'mozahar', 'ahamed', NULL, 1996, '', NULL, NULL, NULL, NULL, 0, 0, 0, '', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `OriginalName` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `comment` mediumtext
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`id`, `created_at`, `updated_at`, `lastuser`, `patient_id`, `OriginalName`, `file`, `Date`, `comment`) VALUES
(1, '2014-06-01 14:51:42', '2014-06-17 14:52:18', 'Thierry', 3, 'IMG_4702 (Copy) (Copy).JPG', '98141_2014-06-01_16-51-42.JPG', '2014-01-14', ''),
(2, '2014-11-06 14:32:45', '2014-11-06 14:32:45', 'thierry', 1, '03.09 a.JPG', '10_2014-11-06_15-32-45.JPG', '2014-11-04', ''),
(3, '0000-00-00 00:00:00', '2015-01-18 17:58:19', 'ershad', 3, '01 [1600x1200].JPG', '3288.JPG', '2015-01-18', NULL),
(4, '0000-00-00 00:00:00', '2015-05-17 08:31:28', 'catherine', 5, 'MD Noman 14 0105 (1).JPG', '98146_2015-04-28_3952.jpg', '2015-04-28', 'follow up 1y4m good compliance');

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE IF NOT EXISTS `prices` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `created_at`, `updated_at`, `lastuser`, `datefrom`, `dateto`, `consult_CDC_consultation_physio`, `consult_CDC_consultation_Bengali_Doctor`, `consult_CDC_consultation_Doctor`, `consult_field_visit`, `consult_home_visit`, `medecine_medecine`, `medecine_calcium_30x500mg`, `workshop_BHKAFO_night`, `workshop_BHKAFO_walking`, `workshop_UHKAFO_night`, `workshop_UHKAFO_walking`, `workshop_BKAFO_night`, `workshop_BKAFO_walking`, `workshop_UKAFO_night`, `workshop_UKAFO_walking`, `workshop_Knee_brace`, `workshop_BAFO_night`, `workshop_BAFO_walking`, `workshop_UAFO_night`, `workshop_UAFO_walking`, `workshop_Orthoshoes_with_bar`, `workshop_Orthoshoes_without_bar`, `workshop_DDB_splint`, `workshop_Compensation_sole`, `workshop_Arch_support`, `workshop_Matetarsal_pade`, `workshop_Supinator_corner`, `workshop_Wirst_splint`, `workshop_Hand_splint`, `workshop_Finger_splint`, `workshop_Walker_with_wheel`, `workshop_Walker_without_wheel`, `workshop_Crutch_a_pair`, `workshop_Crutch_a_piece`, `workshop_Wheel_chair`, `workshop_CP_chair`, `workshop_CP_standing_table`, `workshop_Cervical_Collar`, `workshop_Abdominal_corset_belt`, `workshop_Reparing`, `workshop_Other_orthodevice`, `surgical_osteotomy`, `surgical_epiphysiodesis`, `surgical_polio_AL`, `surgical_percutaneous_AL_club_foot`, `surgical_PMR_club_foot`, `surgical_Burn_release`, `surgical_Pin_removal`, `surgical_other_operation`, `consult_give_appointment`, `medecine_vitamineD`, `workshop_BHKAFO_Drop_lock_single_axis`, `workshop_crutch_alumenium`, `workshop_chair_china`, `workshop_mailwalke_brace`, `workshop_leg_truction`, `workshop_thoracic_brace`, `workshop_samainto_brace`, `workshop_fracture_brace`, `workshop_smo`, `workshop_lifspring_afo`, `surgical_osteotomy_bi`, `surgical_epiphysiodesis_bi`, `surgical_polio_achileus_Achileus_lenthening_bi`, `surgical_percutaneous_achil_tenotomy_bi_cmosh`, `surgical_percutaneous_achil_tenotomy_uni_cdc`, `surgical_percutaneous_achil_tenotomy_bi_cdc`, `surgical_PMR_club_club_foot_bi`, `surgical_burn_little_release`, `other_physiotherapy_adult`, `other_physiotherapy_child`, `other_group_physiotherapy`, `other_nutritionalSupport`, `other_nutritionalAdvice`, `other_CMOSH_follow_up`, `other_microbus`, `other_Other_consultation_care`, `other_physiotherapy`, `other_X_Ray`, `other_making_dressing`, `other_make_short_plaster`, `other_make_long_plaster`, `other_making_plaster`, `socialLevelPercentage_4`, `socialLevelPercentage_3`, `socialLevelPercentage_2`, `socialLevelPercentage_1`, `socialLevelPercentage_0`) VALUES
(1, '0000-00-00 00:00:00', '2014-12-17 06:09:19', 'jehon', NULL, '2013-01-01', 200, 200, -1, 100, 150, 100, -1, 4200, 4950, 2420, 2420, 3200, 3200, 1600, 1600, 800, 2400, 2400, 1100, 1100, 1000, 1000, 820, 200, 150, 150, 150, 300, 800, 600, 1320, 1000, 390, 195, 7500, 5000, 5000, 150, 1500, 300, 1, 18000, 8000, 14000, 5000, 18000, 14000, 8000, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 200, 200, 1, 200, 120, 100, -1, -1, 200, 1, 0.7, 0.3, 0.1, -1),
(2, '0000-00-00 00:00:00', '2014-12-17 06:09:19', 'jehon', '2013-01-01', NULL, 100, 300, -1, -1, 150, 100, -1, 4500, 6670, 3500, 4400, 3200, 3200, 1600, 1600, 2200, 2750, 3000, -1, 1800, 1620, 1250, 1200, 600, 360, 200, 300, 600, 1200, 800, 1620, 1320, -1, 400, 7700, 1500, 5000, 350, 450, 300, 1, 20000, 10000, 15000, 5000, 15000, 20000, 5000, 1, 150, 100, 8800, 1800, 6600, 3500, 460, 2500, 3800, 3200, 1600, 1000, 25000, 15000, 18000, 6000, 2000, 2500, 18000, 10000, -1, -1, 100, 1000, 100, -1, -1, 1, 200, 150, 200, -1, -1, 400, 1, 0.7, 0.4, 0.2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `rendez_vous`
--

CREATE TABLE IF NOT EXISTS `rendez_vous` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `ExaminerName` varchar(127) DEFAULT NULL,
  `Center` varchar(24) DEFAULT NULL,
  `Nextappointment` date DEFAULT NULL,
  `NextCenter` varchar(24) DEFAULT NULL,
  `Brachialcircumferencecm` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ricket_consults`
--

CREATE TABLE IF NOT EXISTS `ricket_consults` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ricket_consults`
--

INSERT INTO `ricket_consults` (`id`, `created_at`, `updated_at`, `lastuser`, `patient_id`, `Date`, `ExaminerName`, `Center`, `Weightkg`, `Heightcm`, `CrossLeftT`, `RightLeg`, `Pain`, `Wristenlargement`, `Ribbeading`, `RightlegAngle`, `LeftlegAngle`, `CrossRightT`, `CrossRightF`, `IMICDistance`, `LeftLeg`, `CrossLeftF`, `Surgery`, `XRay`, `Brace`, `Nutrisupport`, `Brachialcircumferencecm`, `WalkingDifficulties`, `Comments`, `TreatmentEvaluation`, `TreatmentFinished`, `Nextappointment`, `NextCenter`, `conclusion_medical_calcium500`, `conclusion_medical_calcium1000`, `conclusion_medical_vitaminD`) VALUES
(1, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2003-05-11', NULL, NULL, 17, 114, NULL, 'Valgus', NULL, 0, 0, 6, 6, NULL, NULL, 1, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, '2015-04-28', 'Chakaria', 0, 0, 0),
(2, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2002-11-19', NULL, NULL, 16, 110, NULL, 'Valgus', NULL, 0, 0, 8, 12, NULL, NULL, 1, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(3, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2004-10-06', NULL, NULL, 18, 115, NULL, 'Valgus', NULL, 0, 0, 6, 6, NULL, NULL, 1, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(4, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2004-09-26', NULL, NULL, 19, 115, NULL, 'Valgus', NULL, 0, 0, 6, 6, NULL, NULL, 1, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(5, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2003-09-02', NULL, NULL, 14, 103, NULL, 'Varus', NULL, 1, 1, 2, 2, NULL, NULL, NULL, 'Varus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(6, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2003-08-05', NULL, NULL, 16, 106, NULL, 'Valgus', NULL, 1, 1, 6, 8, NULL, NULL, NULL, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(7, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2003-05-28', NULL, NULL, NULL, NULL, NULL, 'Valgus', NULL, 0, 0, 20, 20, NULL, NULL, NULL, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(8, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2003-01-11', NULL, NULL, 17, 108, NULL, 'Valgus', NULL, 0, 0, 4, 4, NULL, NULL, NULL, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0),
(9, '0000-00-00 00:00:00', '2015-02-04 17:57:04', 'transfer', 6, '2004-05-23', NULL, NULL, 18, 114, NULL, 'Valgus', NULL, 0, 0, 4, 4, NULL, NULL, NULL, 'Valgus', NULL, NULL, NULL, NULL, 0, NULL, NULL, '', NULL, NULL, NULL, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `value` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `created_at`, `updated_at`, `value`) VALUES
('structure_version', '0000-00-00 00:00:00', '2015-10-15 08:55:01', '46');

-- --------------------------------------------------------

--
-- Table structure for table `surgeries`
--

CREATE TABLE IF NOT EXISTS `surgeries` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `Date` date DEFAULT NULL,
  `ReportDiagnostic` varchar(100) DEFAULT NULL,
  `ReportSurgeon` varchar(100) DEFAULT NULL,
  `ReportSideR` tinyint(1) DEFAULT NULL,
  `ReportSideL` tinyint(1) DEFAULT NULL,
  `report_procedure` varchar(250) DEFAULT NULL,
  `FollowUpComplication` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sync_computers`
--

CREATE TABLE IF NOT EXISTS `sync_computers` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `user_list` varchar(500) NOT NULL,
  `computer_id` varchar(64) NOT NULL,
  `useragent` varchar(255) DEFAULT NULL,
  `cryptomedic_version` varchar(255) NOT NULL DEFAULT '0',
  `last_sync` varchar(100) DEFAULT NULL,
  `last_sync_final` tinyint(1) NOT NULL DEFAULT '0',
  `queue_size` int(16) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sync_computers`
--

INSERT INTO `sync_computers` (`id`, `created_at`, `updated_at`, `lastuser`, `user_list`, `computer_id`, `useragent`, `cryptomedic_version`, `last_sync`, `last_sync_final`, `queue_size`) VALUES
(13, '2015-11-14 10:02:57', '2015-11-14 10:07:03', NULL, ',jehon', 'KQeZXEAiklSUaMMY3loUxPPVRrQdZaEA', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0', '<?php echo getVersion(); ?>', '2015-10-15 04:29:50|2', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sync_keys`
--

CREATE TABLE IF NOT EXISTS `sync_keys` (
`id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `computer` int(10) unsigned NOT NULL,
  `key` varchar(1028) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(127) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `old_password` char(40) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `group` char(10) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `old_password`, `email`, `notes`, `group`, `created_at`, `updated_at`, `lastuser`, `last_login`, `remember_token`) VALUES
(1, 'thierry', 'Thierry Craviari', '$2y$10$1XkouAzPDXGY43uAM4IhR.5CJbKym6xTsiqxgoCW0rbvdMNdJCsx2', NULL, 'thierry.craviari@gmail.com', '', 'manager', '2011-10-18 04:24:37', '2015-08-24 11:16:20', 'thierry', '2015-08-24 11:16:20', ''),
(2, 'jehon', 'Jean Honlet', '$2y$10$Lg5g2xFUTCDdBtNWljWix.NSYBxDY2z3fyl95UKWJoahK8d5/g0Oi', NULL, 'marielineet.jean@gmail.com', '', 'admin', '2011-10-18 04:24:37', '2015-11-14 10:07:02', 'jehon', '2015-11-14 10:07:02', ''),
(3, 'murshed', 'Morshedul Alam', '$2y$10$dtk/wdKH2cIPn3/aPUtG5.5Xorqhg8FyblvmbS0a13mIIjZwZgFoW', NULL, 'bgdcox1@yahoo.com', '', 'cdc', '2011-10-18 04:24:37', '2015-08-23 07:43:19', 'murshed', '2015-08-23 07:43:19', ''),
(4, 'readonly', 'readonly', '53cea9a9492b3397c1f2cb91fec685fc63d232ed', '83998c0388c12fe57c1e75d4c50c904fe774a8ec', NULL, NULL, 'readonly', '2011-10-18 04:24:37', '2015-08-18 20:17:41', NULL, '2015-06-17 16:28:08', '');

-- --------------------------------------------------------

--
-- Structure for view `consults`
--
DROP TABLE IF EXISTS `consults`;

CREATE ALGORITHM=UNDEFINED DEFINER=`amd_chakaria`@`10.228.%` SQL SECURITY DEFINER VIEW `consults` AS (select 'club_foots' AS `source`,`club_foots`.`id` AS `id`,`club_foots`.`created_at` AS `created_at`,`club_foots`.`updated_at` AS `updated_at`,`club_foots`.`lastuser` AS `lastuser`,`club_foots`.`patient_id` AS `patient_id`,`club_foots`.`Date` AS `Date`,`club_foots`.`ExaminerName` AS `ExaminerName`,`club_foots`.`Center` AS `Center`,`club_foots`.`TreatmentEvaluation` AS `TreatmentEvaluation`,`club_foots`.`TreatmentFinished` AS `TreatmentFinished`,`club_foots`.`Nextappointment` AS `Nextappointment`,`club_foots`.`NextCenter` AS `NextCenter` from `club_foots`) union (select 'nonricket_consults' AS `source`,`nonricket_consults`.`id` AS `id`,`nonricket_consults`.`created_at` AS `created_at`,`nonricket_consults`.`updated_at` AS `updated_at`,`nonricket_consults`.`lastuser` AS `lastuser`,`nonricket_consults`.`patient_id` AS `patient_id`,`nonricket_consults`.`Date` AS `Date`,`nonricket_consults`.`ExaminerName` AS `ExaminerName`,`nonricket_consults`.`Center` AS `Center`,`nonricket_consults`.`TreatmentEvaluation` AS `TreatmentEvaluation`,`nonricket_consults`.`TreatmentFinished` AS `TreatmentFinished`,`nonricket_consults`.`Nextappointment` AS `Nextappointment`,`nonricket_consults`.`NextCenter` AS `NextCenter` from `nonricket_consults`) union (select 'ricket_consults' AS `source`,`ricket_consults`.`id` AS `id`,`ricket_consults`.`created_at` AS `created_at`,`ricket_consults`.`updated_at` AS `updated_at`,`ricket_consults`.`lastuser` AS `lastuser`,`ricket_consults`.`patient_id` AS `patient_id`,`ricket_consults`.`Date` AS `Date`,`ricket_consults`.`ExaminerName` AS `ExaminerName`,`ricket_consults`.`Center` AS `Center`,`ricket_consults`.`TreatmentEvaluation` AS `TreatmentEvaluation`,`ricket_consults`.`TreatmentFinished` AS `TreatmentFinished`,`ricket_consults`.`Nextappointment` AS `Nextappointment`,`ricket_consults`.`NextCenter` AS `NextCenter` from `ricket_consults`);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`), ADD KEY `price_id_fk` (`price_id`);

--
-- Indexes for table `bug_reporting`
--
ALTER TABLE `bug_reporting`
 ADD PRIMARY KEY (`id`), ADD KEY `url` (`url`(255),`session`,`username`);

--
-- Indexes for table `club_foots`
--
ALTER TABLE `club_foots`
 ADD PRIMARY KEY (`id`), ADD KEY `entity_name` (`patient_id`);

--
-- Indexes for table `deleteds`
--
ALTER TABLE `deleteds`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `patients_entrynumber` (`entryyear`,`entryorder`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
 ADD PRIMARY KEY (`id`), ADD KEY `entity_name` (`patient_id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
 ADD PRIMARY KEY (`id`), ADD KEY `entity_name` (`patient_id`);

--
-- Indexes for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `surgeries`
--
ALTER TABLE `surgeries`
 ADD PRIMARY KEY (`id`), ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `sync_computers`
--
ALTER TABLE `sync_computers`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `computer_id` (`computer_id`);

--
-- Indexes for table `sync_keys`
--
ALTER TABLE `sync_keys`
 ADD PRIMARY KEY (`id`);

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
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `bug_reporting`
--
ALTER TABLE `bug_reporting`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `club_foots`
--
ALTER TABLE `club_foots`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `deleteds`
--
ALTER TABLE `deleteds`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `surgeries`
--
ALTER TABLE `surgeries`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sync_computers`
--
ALTER TABLE `sync_computers`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `sync_keys`
--
ALTER TABLE `sync_keys`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `club_foots`
--
ALTER TABLE `club_foots`
ADD CONSTRAINT `club_foots_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nonricket_consults`
--
ALTER TABLE `nonricket_consults`
ADD CONSTRAINT `nonricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
ADD CONSTRAINT `rendez_vous_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ricket_consults`
--
ALTER TABLE `ricket_consults`
ADD CONSTRAINT `ricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `surgeries`
--
ALTER TABLE `surgeries`
ADD CONSTRAINT `surgeries_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
