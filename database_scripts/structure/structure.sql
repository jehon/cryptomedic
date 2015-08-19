-- MySQL dump 10.13  Distrib 5.6.25, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: amd_chakaria
-- ------------------------------------------------------
-- Server version	5.6.25-0ubuntu0.15.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `amd_chakaria`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `amd_chakaria` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `amd_chakaria`;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `surgical_burn_little_release` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `price_id_fk` (`price_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23029 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bug_reporting`
--

DROP TABLE IF EXISTS `bug_reporting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bug_reporting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(256) NOT NULL,
  `session` varchar(128) DEFAULT NULL,
  `username` varchar(64) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `description` text,
  `browser_useragent` varchar(256) DEFAULT NULL,
  `browser_state` longtext,
  `browser_console` longtext,
  `screenshot` longblob,
  PRIMARY KEY (`id`),
  KEY `url` (`url`,`session`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `club_foots`
--

DROP TABLE IF EXISTS `club_foots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club_foots` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `Brachialcircumferencecm` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entity_name` (`patient_id`),
  CONSTRAINT `club_foots_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1516 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `consults`
--

DROP TABLE IF EXISTS `consults`;
/*!50001 DROP VIEW IF EXISTS `consults`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `consults` AS SELECT 
 1 AS `source`,
 1 AS `id`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `lastuser`,
 1 AS `patient_id`,
 1 AS `Date`,
 1 AS `ExaminerName`,
 1 AS `Center`,
 1 AS `TreatmentEvaluation`,
 1 AS `TreatmentFinished`,
 1 AS `Nextappointment`,
 1 AS `NextCenter`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `deleteds`
--

DROP TABLE IF EXISTS `deleteds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deleteds` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `patient_id` int(10) unsigned NOT NULL,
  `entity_type` varchar(20) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nonricket_consults`
--

DROP TABLE IF EXISTS `nonricket_consults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nonricket_consults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `NextCenter` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `nonricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2306 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `pathology_Congenital` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `patients_entrynumber` (`entryyear`,`entryorder`)
) ENGINE=InnoDB AUTO_INCREMENT=101169 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pictures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `OriginalName` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL DEFAULT '0000-00-00',
  `comment` mediumtext,
  PRIMARY KEY (`id`),
  KEY `entity_name` (`patient_id`),
  CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4003 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `socialLevelPercentage_0` float NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ricket_consults`
--

DROP TABLE IF EXISTS `ricket_consults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ricket_consults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `conclusion_medical_vitaminD` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `ricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9099 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `surgeries`
--

DROP TABLE IF EXISTS `surgeries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `surgeries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `FollowUpComplication` mediumtext,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `surgeries_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=556 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sync_computers`
--

DROP TABLE IF EXISTS `sync_computers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sync_computers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `lastuser` varchar(50) DEFAULT NULL,
  `user_list` varchar(500) NOT NULL,
  `computer_id` varchar(64) NOT NULL,
  `useragent` varchar(255) DEFAULT NULL,
  `cryptomedic_version` varchar(255) NOT NULL DEFAULT '0',
  `last_sync` varchar(100) DEFAULT NULL,
  `last_sync_final` tinyint(1) NOT NULL DEFAULT '0',
  `queue_size` int(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `computer_id` (`computer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sync_keys`
--

DROP TABLE IF EXISTS `sync_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sync_keys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `computer` int(10) unsigned NOT NULL,
  `key` varchar(1028) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `remember_token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `group` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Current Database: `amd_chakaria`
--

USE `amd_chakaria`;

--
-- Final view structure for view `consults`
--

/*!50001 DROP VIEW IF EXISTS `consults`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`amd_chakaria`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consults` AS (select 'club_foots' AS `source`,`club_foots`.`id` AS `id`,`club_foots`.`created_at` AS `created_at`,`club_foots`.`updated_at` AS `updated_at`,`club_foots`.`lastuser` AS `lastuser`,`club_foots`.`patient_id` AS `patient_id`,`club_foots`.`Date` AS `Date`,`club_foots`.`ExaminerName` AS `ExaminerName`,`club_foots`.`Center` AS `Center`,`club_foots`.`TreatmentEvaluation` AS `TreatmentEvaluation`,`club_foots`.`TreatmentFinished` AS `TreatmentFinished`,`club_foots`.`Nextappointment` AS `Nextappointment`,`club_foots`.`NextCenter` AS `NextCenter` from `club_foots`) union (select 'nonricket_consults' AS `source`,`nonricket_consults`.`id` AS `id`,`nonricket_consults`.`created_at` AS `created_at`,`nonricket_consults`.`updated_at` AS `updated_at`,`nonricket_consults`.`lastuser` AS `lastuser`,`nonricket_consults`.`patient_id` AS `patient_id`,`nonricket_consults`.`Date` AS `Date`,`nonricket_consults`.`ExaminerName` AS `ExaminerName`,`nonricket_consults`.`Center` AS `Center`,`nonricket_consults`.`TreatmentEvaluation` AS `TreatmentEvaluation`,`nonricket_consults`.`TreatmentFinished` AS `TreatmentFinished`,`nonricket_consults`.`Nextappointment` AS `Nextappointment`,`nonricket_consults`.`NextCenter` AS `NextCenter` from `nonricket_consults`) union (select 'ricket_consults' AS `source`,`ricket_consults`.`id` AS `id`,`ricket_consults`.`created_at` AS `created_at`,`ricket_consults`.`updated_at` AS `updated_at`,`ricket_consults`.`lastuser` AS `lastuser`,`ricket_consults`.`patient_id` AS `patient_id`,`ricket_consults`.`Date` AS `Date`,`ricket_consults`.`ExaminerName` AS `ExaminerName`,`ricket_consults`.`Center` AS `Center`,`ricket_consults`.`TreatmentEvaluation` AS `TreatmentEvaluation`,`ricket_consults`.`TreatmentFinished` AS `TreatmentFinished`,`ricket_consults`.`Nextappointment` AS `Nextappointment`,`ricket_consults`.`NextCenter` AS `NextCenter` from `ricket_consults`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
-- MySQL dump 10.13  Distrib 5.6.25, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: amd_chakaria
-- ------------------------------------------------------
-- Server version	5.6.25-0ubuntu0.15.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('structure_version','0000-00-00 00:00:00','2015-08-18 19:42:16','1000'),('version','0000-00-00 00:00:00','0000-00-00 00:00:00','2014-04-11 10:24:36');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
