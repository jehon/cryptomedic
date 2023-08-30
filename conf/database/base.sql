-- MySQL dump 10.13  Distrib 5.7.42, for Linux (x86_64)
--
-- Host: localhost    Database: cryptomedic
-- ------------------------------------------------------
-- Server version	5.7.42-log

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `examiner` varchar(127) DEFAULT NULL,
  `purpose` mediumtext,
  `date` date NOT NULL,
  `center` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entity_name` (`patient_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,NULL,NULL,'2015-04-28','Chakaria Disability Center'),(2,'1980-01-01 00:00:00','2015-02-19 13:52:16','Thierry',1,'Ershad',NULL,'2015-04-28',NULL),(3,'1980-01-01 00:00:00','2015-05-10 08:03:59','murshed',5,'Ershad',NULL,'2015-04-28','Ukhia'),(4,'1980-01-01 00:00:00','2015-05-10 08:02:40','murshed',5,'Ershad',NULL,'2015-01-10','Ukhia'),(5,'1980-01-01 00:00:00','2015-05-10 08:01:10','murshed',5,'Ershad',NULL,'2014-09-27','Ukhia'),(6,'1980-01-01 00:00:00','2015-05-10 04:29:15','murshed',5,'Ershad',NULL,'2014-05-31','Ukhia'),(7,'1980-01-01 00:00:00','2015-05-07 16:53:30','murshed',5,'Ershad',NULL,'2014-04-21','Ukhia'),(8,'1980-01-01 00:00:00','2015-05-07 16:49:28','murshed',5,'AMD doctor',NULL,'2014-03-21','Ukhia');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `sl_family_salary` int(11) DEFAULT NULL,
  `sl_number_of_household_members` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `price_id` int(10) unsigned NOT NULL DEFAULT '1',
  `center` varchar(40) DEFAULT NULL,
  `examiner` varchar(127) DEFAULT NULL,
  `total_real` int(11) NOT NULL DEFAULT '0',
  `social_level` int(10) unsigned DEFAULT NULL,
  `total_asked` int(10) unsigned DEFAULT NULL,
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
  `other_x-ray` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `other_other_consultation_care` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_night_child` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_BKAFO_night_-_plastic` int(11) NOT NULL DEFAULT '0',
  `workshop_BKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_KAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_knee_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_walking_child` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_night_child` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_walking_child` int(11) NOT NULL DEFAULT '0',
  `workshop_orthoshoes_with_bar_-_one_leg` int(11) NOT NULL DEFAULT '0',
  `workshop_orthoshoes_without_bar_-_one_leg` int(11) NOT NULL DEFAULT '0',
  `workshop_DB_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_compensation_sole` int(11) NOT NULL DEFAULT '0',
  `workshop_compensation_sole_1cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_2cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_3cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_4cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_5cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_arch_support` int(11) NOT NULL DEFAULT '0',
  `workshop_matetarsal_pade` int(11) NOT NULL DEFAULT '0',
  `workshop_supinator_corner` int(11) NOT NULL DEFAULT '0',
  `workshop_wirst_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_hand_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_finger_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_walker_with_wheel_-_folding` int(11) NOT NULL DEFAULT '0',
  `workshop_walker_with_wheel_-_non_folding` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_a_pair_-_local` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_-_stainless_steel` int(11) NOT NULL DEFAULT '0',
  `workshop_wheel_chair_-_folding` int(11) NOT NULL DEFAULT '0',
  `workshop_CP_chair_-_wooden` int(11) NOT NULL DEFAULT '0',
  `workshop_CP_standing_table_-_wooden` int(11) NOT NULL DEFAULT '0',
  `workshop_cervical_collar` int(11) NOT NULL DEFAULT '0',
  `workshop_abdominal_corset_belt` int(11) NOT NULL DEFAULT '0',
  `workshop_reparing` int(11) NOT NULL DEFAULT '0',
  `workshop_other_orthodevice` int(11) NOT NULL DEFAULT '0',
  `surgical_osteotomy` int(11) NOT NULL DEFAULT '0',
  `surgical_epiphysiodesis` int(11) NOT NULL DEFAULT '0',
  `surgical_polio_AL` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_AL_club_foot` int(11) NOT NULL DEFAULT '0',
  `surgical_PMR_club_foot` int(11) NOT NULL DEFAULT '0',
  `surgical_burn_release` int(11) NOT NULL DEFAULT '0',
  `surgical_pin_removal` int(11) NOT NULL DEFAULT '0',
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
  `workshop_BHKAFO_drop_lock_single_axis` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_alumenium_-_a_pair` int(11) NOT NULL DEFAULT '0',
  `workshop_wheel_chair_china` int(11) NOT NULL DEFAULT '0',
  `workshop_mailwalke_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_leg_truction` int(11) NOT NULL DEFAULT '0',
  `workshop_thoracic_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_thoracic_brace_and_scoliosis_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_samainto_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_fracture_brace_-_one_leg` int(11) NOT NULL DEFAULT '0',
  `workshop_smo` int(11) NOT NULL DEFAULT '0',
  `workshop_lifspring_afo` int(11) NOT NULL DEFAULT '0',
  `surgical_osteotomy_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_epiphysiodesis_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_polio_achileus_achileus_lenthening_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_bi_cmosh` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_uni_cdc` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_bi_cdc` int(11) NOT NULL DEFAULT '0',
  `surgical_PMR_club_club_foot_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_burn_little_release` int(11) NOT NULL DEFAULT '0',
  `other_other_plaster` int(11) NOT NULL DEFAULT '0',
  `other_other_dressing` int(11) NOT NULL DEFAULT '0',
  `consult_club_foot_follow_up` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_-_Drop_lock_single_axis_-_MI` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_BK_-_exoskeleton` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_AK_-_exoskeleton` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_BK_-_Endoskeleton_with_pylon_standard` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_AK_-_single_axis_standard` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_AK_-_polycentric_knee_joint` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_tr_radial_prosthesis_alimco` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_tr_radial_prosthesis_jaipur` int(11) NOT NULL DEFAULT '0',
  `workshop_wheel_chair_-_china_-_modified` int(11) NOT NULL DEFAULT '0',
  `workshop_white_can` int(11) NOT NULL DEFAULT '0',
  `workshop_hearing_aids` int(11) NOT NULL DEFAULT '0',
  `workshop_elbow_crutch` int(11) NOT NULL DEFAULT '0',
  `workshop_lifspring_BAFO` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_-_Articulated` int(11) NOT NULL DEFAULT '0',
  `workshop_extension_brace_-_AFO` int(11) NOT NULL DEFAULT '0',
  `workshop_other` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `price_id_fk` (`price_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,'2011-06-10 14:46:57','2014-12-29 19:57:33','Thierry',1,3000,7,'2011-06-09',1,NULL,'',22400,2,6720,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(2,'2014-02-28 15:11:38','2015-01-19 15:12:59','josiane',3,4500,9,'2014-01-14',2,'Chakaria Disability Center','Ershad',500,2,100,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(3,'2014-03-01 07:03:33','2015-01-19 15:12:59','josiane',4,7000,10,'2014-01-18',2,'Ukhia','Ershad',500,2,200,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(4,'2014-03-01 07:05:25','2015-01-19 15:12:59','josiane',5,5000,5,'2014-01-18',2,'Ukhia','Ershad',500,2,200,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(5,'2014-03-01 07:17:21','2015-01-19 15:12:59','josiane',2,20000,8,'2015-01-19',2,'Chakaria Disability Center','Ershad',500,4,500,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(6,'2014-03-02 07:44:13','2015-01-19 15:12:59','Thierry',3,4500,9,'2014-01-25',2,'Ukhia','Ershad',500,2,100,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(7,'2014-03-02 07:45:42','2015-01-19 15:12:59','josiane',5,5000,5,'2014-01-25',2,'Ukhia','Ershad',500,2,200,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(8,'2014-03-02 07:50:43','2016-01-03 16:15:35','jehon',4,7000,10,'2014-01-25',2,'Ukhia','Ershad',20500,2,8200,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(9,'2014-06-20 05:58:08','2015-01-19 15:12:59','josiane',5,5000,5,'2014-05-31',2,'Chakaria Disability Center','Ershad',100,2,40,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(10,'2014-06-21 08:44:48','2015-01-19 15:12:59','josiane',3,4500,9,'2014-05-25',2,'Moheshkhali','Rezaul',100,2,20,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(11,'2014-06-22 15:45:37','2015-01-19 15:12:59','josiane',3,4500,9,'2014-05-20',2,'Ramu','Ershad',500,2,100,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(12,'2014-06-25 05:20:49','2015-10-15 04:29:50','josiane',2,20000,8,'2014-05-20',2,'Chakaria Disability Center','Ershad',500,2,200,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(13,'2014-07-05 07:52:07','2015-01-19 15:12:59','josiane',2,20000,8,'2014-05-21',2,'Chakaria Disability Center','Hassan 1',3000,2,1200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `browser_features`
--

DROP TABLE IF EXISTS `browser_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `browser_features` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `browser_uuid` varchar(125) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `browser_name` varchar(125) NOT NULL,
  `browser_version` varchar(10) NOT NULL,
  `browser_full_name` varchar(125) NOT NULL,
  `browser_supported` varchar(10) NOT NULL,
  `os` varchar(127) NOT NULL DEFAULT '',
  `screen_width` int(11) NOT NULL,
  `screen_height` int(11) NOT NULL,
  `feat_test` int(11) DEFAULT NULL,
  `feat_fromentries` int(11) DEFAULT NULL,
  UNIQUE KEY `id` (`id`) USING BTREE,
  UNIQUE KEY `browser_uuid` (`browser_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `browser_features`
--

LOCK TABLES `browser_features` WRITE;
/*!40000 ALTER TABLE `browser_features` DISABLE KEYS */;
/*!40000 ALTER TABLE `browser_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `browser_login`
--

DROP TABLE IF EXISTS `browser_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `browser_login` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `browser_uuid` varchar(128) NOT NULL,
  `login` varchar(128) NOT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `browser_login` (`browser_uuid`,`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `browser_login`
--

LOCK TABLES `browser_login` WRITE;
/*!40000 ALTER TABLE `browser_login` DISABLE KEYS */;
/*!40000 ALTER TABLE `browser_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_feet`
--

DROP TABLE IF EXISTS `club_feet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club_feet` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `examiner` varchar(127) DEFAULT NULL,
  `center` varchar(40) DEFAULT NULL,
  `weight_kg` int(4) DEFAULT NULL,
  `height_cm` int(3) DEFAULT NULL,
  `pain_left` int(5) unsigned DEFAULT NULL,
  `pain_right` int(5) unsigned DEFAULT NULL,
  `walking_floor_contact_left` int(5) unsigned DEFAULT NULL,
  `walking_floor_contact_right` int(5) unsigned DEFAULT NULL,
  `walking_first_contact_left` int(5) unsigned DEFAULT NULL,
  `walking_first_contact_right` int(5) unsigned DEFAULT NULL,
  `jumping_one_leg_left` int(5) unsigned DEFAULT NULL,
  `jumping_one_leg_right` int(5) unsigned DEFAULT NULL,
  `run_left` int(5) unsigned DEFAULT NULL,
  `run_right` int(5) unsigned DEFAULT NULL,
  `adduction_angle_left` int(5) DEFAULT NULL,
  `adduction_angle_right` int(5) DEFAULT NULL,
  `hind_foot_angle_W_left` int(5) DEFAULT NULL,
  `hind_foot_angle_W_right` int(5) DEFAULT NULL,
  `dorsal_flexion_max_left` int(5) DEFAULT NULL,
  `dorsal_flexion_max_right` int(5) DEFAULT NULL,
  `plantar_flexion_max_left` int(5) unsigned DEFAULT NULL,
  `plantar_flexion_max_right` int(5) unsigned DEFAULT NULL,
  `muscular_inbalance_left` tinyint(1) unsigned DEFAULT NULL,
  `muscular_inbalance_right` tinyint(1) unsigned DEFAULT NULL,
  `curved_lateral_border_left` decimal(5,2) unsigned DEFAULT NULL,
  `curved_lateral_border_right` decimal(5,2) unsigned DEFAULT NULL,
  `medial_crease_left` decimal(5,2) unsigned DEFAULT NULL,
  `medial_crease_right` decimal(5,2) unsigned DEFAULT NULL,
  `talar_head_coverage_left` decimal(5,2) unsigned DEFAULT NULL,
  `talar_head_coverage_right` decimal(5,2) unsigned DEFAULT NULL,
  `posterior_crease_left` decimal(5,2) unsigned DEFAULT NULL,
  `posterior_crease_right` decimal(5,2) unsigned DEFAULT NULL,
  `rigid_equinus_left` decimal(5,2) unsigned DEFAULT NULL,
  `rigid_equinus_right` decimal(5,2) unsigned DEFAULT NULL,
  `empty_heel_left` decimal(5,2) unsigned DEFAULT NULL,
  `empty_heel_right` decimal(5,2) unsigned DEFAULT NULL,
  `x_Treatment` mediumtext,
  `comments` mediumtext,
  `suggested_for_surgery` tinyint(1) DEFAULT NULL,
  `treatment_evaluation` tinyint(1) DEFAULT NULL,
  `treatment_finished` tinyint(1) DEFAULT NULL,
  `brachial_circumference_cm` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entity_name` (`patient_id`),
  CONSTRAINT `club_feet_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_feet`
--

LOCK TABLES `club_feet` WRITE;
/*!40000 ALTER TABLE `club_feet` DISABLE KEYS */;
INSERT INTO `club_feet` VALUES (1,'1980-01-01 00:00:00','2015-05-10 08:03:59','murshed',5,'2015-01-10','Ershad','Ukhia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DB splint',NULL,0,NULL,NULL,NULL),(2,'1980-01-01 00:00:00','2015-05-10 08:02:40','murshed',5,'2014-09-27','Ershad','Ukhia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DB splint',NULL,0,NULL,NULL,NULL),(3,'1980-01-01 00:00:00','2015-05-10 08:01:10','murshed',5,'2014-06-21','Ershad','Ukhia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DB splint','Use no 10 db splint',0,NULL,NULL,NULL),(4,'1980-01-01 00:00:00','2015-05-10 04:29:15','murshed',5,'2014-04-21','Ershad','Chakaria Disability Center',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'DB splint','No 7 used',0,NULL,NULL,0),(5,'1980-01-01 00:00:00','2015-05-07 16:53:30','murshed',5,'2014-03-29','Ershad','Ukhia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'DB splint','No 7 given',0,NULL,NULL,NULL),(6,'1980-01-01 00:00:00','2015-05-07 16:49:28','murshed',5,'2014-03-01','AMD doctor','Chakaria Disability Center',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.50,0.00,0.50,0.00,1.00,'tenotomy','7th plaster done',0,NULL,NULL,0);
/*!40000 ALTER TABLE `club_feet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `consults`
--

DROP TABLE IF EXISTS `consults`;
/*!50001 DROP VIEW IF EXISTS `consults`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `consults` AS SELECT 
 1 AS `type`,
 1 AS `id`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `patient_id`,
 1 AS `date`,
 1 AS `examiner`,
 1 AS `center`,
 1 AS `weight_kg`,
 1 AS `height_cm`,
 1 AS `brachial_circumference_cm`,
 1 AS `treatment_evaluation`,
 1 AS `treatment_finished`,
 1 AS `comments`,
 1 AS `suggested_for_surgery`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `other_consults`
--

DROP TABLE IF EXISTS `other_consults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_consults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `examiner` varchar(127) DEFAULT NULL,
  `center` varchar(40) DEFAULT NULL,
  `weight_kg` int(4) DEFAULT NULL,
  `height_cm` int(3) DEFAULT NULL,
  `brachial_circumference_cm` int(3) DEFAULT NULL,
  `side` varchar(24) DEFAULT NULL,
  `joints_or_bones_affected` varchar(255) DEFAULT NULL,
  `deformity` varchar(255) DEFAULT NULL,
  `articulation_mobility` varchar(255) DEFAULT NULL,
  `muscle_strength` varchar(255) DEFAULT NULL,
  `pain` varchar(24) DEFAULT NULL,
  `walk` varchar(24) DEFAULT NULL,
  `xray` varchar(127) DEFAULT NULL,
  `performed` mediumtext,
  `not_performed` mediumtext,
  `x_Surgery66` varchar(24) DEFAULT NULL,
  `comments` mediumtext,
  `suggested_for_surgery` tinyint(1) DEFAULT NULL,
  `treatment_evaluation` tinyint(1) DEFAULT NULL,
  `treatment_finished` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `other_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_consults`
--

LOCK TABLES `other_consults` WRITE;
/*!40000 ALTER TABLE `other_consults` DISABLE KEYS */;
INSERT INTO `other_consults` VALUES (1,'1980-01-01 00:00:00','2015-02-19 13:52:16','Thierry',1,'2007-01-10','Ershad',NULL,29,134,0,NULL,'PBVE','','','','No',NULL,'',NULL,NULL,'Postero-medial release','',0,NULL,NULL);
/*!40000 ALTER TABLE `other_consults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `entry_year` int(4) unsigned NOT NULL,
  `entry_order` int(4) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `year_of_birth` varchar(7) DEFAULT NULL,
  `phone` varchar(127) DEFAULT NULL,
  `address_comments` mediumtext,
  `address_district` varchar(24) DEFAULT NULL,
  `address_upazilla` varchar(24) DEFAULT NULL,
  `address_union` varchar(24) DEFAULT NULL,
  `pathology` varchar(20) DEFAULT NULL,
  `comments` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `patients_entrynumber` (`entry_year`,`entry_order`),
  KEY `Name` (`name`),
  KEY `Pathology` (`pathology`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'2014-10-29 08:04:03','2014-12-31 12:47:09','Thierry',2000,1,'rezaul islam','Male','1998','','','Chittagong',NULL,NULL,'ClubFoot',''),(2,'2014-02-28 11:56:41','2014-12-31 12:47:09','josiane',2014,107,'RIFATH MOHAMED','Male','2002','','',NULL,NULL,NULL,'ClubFoot',''),(3,'2014-02-28 15:10:19','2014-12-31 12:47:09','josiane',2014,103,'OSMAN','Male','2009','','',NULL,NULL,NULL,'ClubFoot',''),(4,'2014-03-01 07:01:39','2014-12-31 12:47:09','josiane',2014,104,'RAHAMAN MOHAMED','Male','2007','','',NULL,NULL,NULL,'ClubFoot',''),(5,'2014-03-01 07:03:47','2015-05-07 16:26:38','murshed',2014,105,'MD Noman','Male','2013','1813247984','','Cox\'s Bazar','Ukhia','Jalia palong','ClubFoot','Right leg metatarsus varus.'),(6,'2014-10-28 07:13:29','2015-04-24 05:28:14','jehon',2001,1,'al abdul koium','','1995','','','','','','Other',''),(7,'2014-08-04 18:31:40','2014-08-04 18:31:40','transfer',2001,4,'mozahar ahamed',NULL,'1996',NULL,'',NULL,NULL,NULL,'Other',''),(8,'2021-04-23 15:26:16','2021-04-23 20:46:30','murshed',1991,299,'crud patient',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_user` varchar(50) DEFAULT NULL,
  `bill_id` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `examiner` varchar(127) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `comments` mediumtext,
  PRIMARY KEY (`id`),
  KEY `bill_id` (`bill_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'2017-02-01 20:04:17','2017-02-01 20:04:17','jehon',2,'2016-01-01','Ershad',10,'Advance'),(2,'2017-02-01 20:04:55','2017-02-01 20:04:55','jehon',2,'2016-01-01','Murshed',15,'Second payment'),(3,'2017-02-21 19:39:30','2017-02-24 17:17:24','Thierry',1,'2011-06-09','',1500,'automatically generated from previous system'),(4,'2017-02-21 19:39:30','2017-02-24 17:17:24','jehon',8,'2014-01-25','Ershad',7000,'automatically generated from previous system'),(5,'2017-02-21 19:39:30','2017-02-24 17:17:24','josiane',12,'2014-05-20','Ershad',300,'automatically generated from previous system'),(6,'2017-02-24 17:17:29',NULL,'murshed',5,'2014-05-20','Murshed',156,NULL),(7,'2017-02-24 17:17:29',NULL,'murshed',2,'2014-05-20','Murshed',113,NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pictures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `type` varchar(25) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `comments` mediumtext,
  PRIMARY KEY (`id`),
  KEY `entity_name` (`patient_id`),
  CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pictures`
--

LOCK TABLES `pictures` WRITE;
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
INSERT INTO `pictures` VALUES (1,'2014-06-01 14:51:42','2014-06-17 14:52:18','Thierry',3,'','98141_2014-06-01_16-51-42.JPG','2014-01-14',''),(2,'2014-11-06 14:32:45','2014-11-06 14:32:45','thierry',1,'','10_2014-11-06_15-32-45.JPG','2014-11-04',''),(3,'1980-01-01 00:00:00','2015-01-18 17:58:19','ershad',3,'','3288.JPG','2015-01-18',NULL),(4,'1980-01-01 00:00:00','2015-05-17 08:31:28','catherine',5,'','98146_2015-04-28_3952.jpg','2015-04-28','follow up 1y4m good compliance');
/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `consult_CDC_consultation_physio` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_Bengali_Doctor` int(11) NOT NULL DEFAULT '0',
  `consult_CDC_consultation_Doctor` int(11) NOT NULL DEFAULT '0',
  `consult_field_visit` int(11) NOT NULL DEFAULT '0',
  `consult_home_visit` int(11) NOT NULL DEFAULT '0',
  `medecine_medecine` int(11) NOT NULL DEFAULT '0',
  `medecine_calcium_30x500mg` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_night_child` int(11) NOT NULL DEFAULT '-1',
  `workshop_UHKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_BKAFO_night_-_plastic` int(11) NOT NULL DEFAULT '0',
  `workshop_BKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_KAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_UKAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_knee_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_BAFO_walking_child` int(11) NOT NULL DEFAULT '-1',
  `workshop_AFO_night` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_night_child` int(11) NOT NULL DEFAULT '-1',
  `workshop_AFO_walking` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_walking_child` int(11) NOT NULL DEFAULT '-1',
  `workshop_orthoshoes_with_bar_-_one_leg` int(11) NOT NULL DEFAULT '0',
  `workshop_orthoshoes_without_bar_-_one_leg` int(11) NOT NULL DEFAULT '0',
  `workshop_DB_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_compensation_sole` int(11) NOT NULL DEFAULT '0',
  `workshop_compensation_sole_1cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_2cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_3cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_4cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_compensation_sole_5cm` int(11) NOT NULL DEFAULT '-1',
  `workshop_arch_support` int(11) NOT NULL DEFAULT '0',
  `workshop_matetarsal_pade` int(11) NOT NULL DEFAULT '0',
  `workshop_supinator_corner` int(11) NOT NULL DEFAULT '0',
  `workshop_wirst_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_hand_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_finger_splint` int(11) NOT NULL DEFAULT '0',
  `workshop_walker_with_wheel_-_folding` int(11) NOT NULL DEFAULT '0',
  `workshop_walker_with_wheel_-_non_folding` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_a_pair_-_local` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_-_stainless_steel` int(11) NOT NULL DEFAULT '0',
  `workshop_wheel_chair_-_folding` int(11) NOT NULL DEFAULT '0',
  `workshop_CP_chair_-_wooden` int(11) NOT NULL DEFAULT '0',
  `workshop_CP_standing_table_-_wooden` int(11) NOT NULL DEFAULT '0',
  `workshop_cervical_collar` int(11) NOT NULL DEFAULT '0',
  `workshop_abdominal_corset_belt` int(11) NOT NULL DEFAULT '0',
  `workshop_reparing` int(11) NOT NULL DEFAULT '0',
  `workshop_other_orthodevice` int(11) NOT NULL DEFAULT '0',
  `surgical_osteotomy` int(11) NOT NULL DEFAULT '0',
  `surgical_epiphysiodesis` int(11) NOT NULL DEFAULT '0',
  `surgical_polio_AL` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_AL_club_foot` int(11) NOT NULL DEFAULT '0',
  `surgical_PMR_club_foot` int(11) NOT NULL DEFAULT '0',
  `surgical_burn_release` int(11) NOT NULL DEFAULT '0',
  `surgical_pin_removal` int(11) NOT NULL DEFAULT '0',
  `surgical_other_operation` int(11) NOT NULL DEFAULT '0',
  `consult_give_appointment` int(11) NOT NULL DEFAULT '0',
  `medecine_vitamineD` int(11) NOT NULL DEFAULT '0',
  `workshop_BHKAFO_drop_lock_single_axis` int(11) NOT NULL DEFAULT '0',
  `workshop_crutch_alumenium_-_a_pair` int(11) NOT NULL DEFAULT '0',
  `workshop_wheel_chair_china` int(11) NOT NULL DEFAULT '0',
  `workshop_mailwalke_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_leg_truction` int(11) NOT NULL DEFAULT '0',
  `workshop_thoracic_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_thoracic_brace_and_scoliosis_brace` int(11) NOT NULL DEFAULT '-1',
  `workshop_samainto_brace` int(11) NOT NULL DEFAULT '0',
  `workshop_fracture_brace_-_one_leg` int(11) NOT NULL DEFAULT '0',
  `workshop_smo` int(11) NOT NULL DEFAULT '0',
  `workshop_lifspring_afo` int(11) NOT NULL DEFAULT '0',
  `surgical_osteotomy_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_epiphysiodesis_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_polio_achileus_achileus_lenthening_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_bi_cmosh` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_uni_cdc` int(11) NOT NULL DEFAULT '0',
  `surgical_percutaneous_achil_tenotomy_bi_cdc` int(11) NOT NULL DEFAULT '0',
  `surgical_PMR_club_club_foot_bi` int(11) NOT NULL DEFAULT '0',
  `surgical_burn_little_release` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy_adult` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy_child` int(11) NOT NULL DEFAULT '0',
  `other_group_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `other_nutritionalSupport` int(11) NOT NULL DEFAULT '0',
  `other_nutritionalAdvice` int(11) NOT NULL DEFAULT '0',
  `other_CMOSH_follow_up` int(11) NOT NULL DEFAULT '0',
  `other_microbus` int(11) NOT NULL DEFAULT '0',
  `other_other_consultation_care` int(11) NOT NULL DEFAULT '0',
  `other_physiotherapy` int(11) NOT NULL DEFAULT '0',
  `other_x-ray` int(11) NOT NULL DEFAULT '0',
  `other_making_dressing` int(11) NOT NULL DEFAULT '0',
  `other_make_short_plaster` int(11) NOT NULL DEFAULT '0',
  `other_make_long_plaster` int(11) NOT NULL DEFAULT '0',
  `other_making_plaster` int(11) NOT NULL DEFAULT '0',
  `social_level_percentage_4` float NOT NULL DEFAULT '-1',
  `social_level_percentage_3` float NOT NULL DEFAULT '-1',
  `social_level_percentage_2` float NOT NULL DEFAULT '-1',
  `social_level_percentage_1` float NOT NULL DEFAULT '-1',
  `social_level_percentage_0` float NOT NULL DEFAULT '0',
  `other_other_plaster` int(11) NOT NULL DEFAULT '0',
  `other_other_dressing` int(11) NOT NULL DEFAULT '0',
  `consult_club_foot_follow_up` int(11) NOT NULL DEFAULT '0',
  `workshop_UHKAFO_-_Drop_lock_single_axis_-_MI` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_BK_-_exoskeleton` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_AK_-_exoskeleton` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_BK_-_Endoskeleton_with_pylon_standard` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_AK_-_single_axis_standard` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_limb_-_AK_-_polycentric_knee_joint` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_tr_radial_prosthesis_alimco` int(11) NOT NULL DEFAULT '0',
  `workshop_artificial_tr_radial_prosthesis_jaipur` int(11) NOT NULL DEFAULT '0',
  `workshop_wheel_chair_-_china_-_modified` int(11) NOT NULL DEFAULT '0',
  `workshop_white_can` int(11) NOT NULL DEFAULT '0',
  `workshop_hearing_aids` int(11) NOT NULL DEFAULT '0',
  `workshop_elbow_crutch` int(11) NOT NULL DEFAULT '0',
  `workshop_lifspring_BAFO` int(11) NOT NULL DEFAULT '0',
  `workshop_AFO_-_Articulated` int(11) NOT NULL DEFAULT '0',
  `workshop_extension_brace_-_AFO` int(11) NOT NULL DEFAULT '0',
  `workshop_other` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,'1980-01-01 00:00:00','2023-08-30 05:11:51','jehon',NULL,'2013-01-01',200,200,0,100,150,100,0,4200,4950,2420,-1,2420,3200,3200,1600,1600,800,2400,2400,-1,1100,-1,1100,-1,1000,1000,820,200,-1,-1,-1,-1,-1,150,150,150,300,800,600,1320,1000,390,195,7500,5000,5000,150,1500,300,1,18000,8000,14000,5000,18000,14000,8000,1,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,200,1,200,120,100,0,0,200,1,0.7,0.3,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(2,'1980-01-01 00:00:00','2023-08-30 05:11:51','jehon','2013-01-01','2016-01-03',100,300,0,0,150,100,0,4500,6670,3500,-1,4400,3200,3200,1600,1600,2200,2750,3000,-1,0,-1,1800,-1,1620,1250,1200,600,-1,-1,-1,-1,-1,360,200,300,600,1200,800,1620,1320,0,400,7700,1500,5000,350,450,300,1,20000,10000,15000,5000,15000,20000,5000,1,150,100,8800,1800,6600,3500,460,2500,-1,3800,3200,1600,1000,25000,15000,18000,6000,2000,2500,18000,10000,0,0,100,1000,100,0,0,1,200,150,200,0,0,400,1,0.7,0.4,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(3,'2016-01-03 16:13:36','2023-08-30 05:11:53','jehon','2016-01-03',NULL,100,300,0,0,150,100,0,4500,6670,3500,4850,4400,3200,3200,1600,1600,2200,2750,3000,6940,0,3485,1800,3485,1620,1250,1200,600,400,600,800,1000,1200,360,200,300,600,1200,800,1620,1320,0,400,7700,1500,5000,350,450,300,1,20000,10000,15000,5000,15000,20000,5000,1,150,100,8800,1800,6600,3500,460,-1,2500,3800,3200,1600,1000,25000,15000,18000,6000,2000,2500,18000,10000,0,0,100,1000,100,0,0,1,200,150,200,0,0,400,1,0.7,0.4,0.2,0,1,1,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ricket_consults`
--

DROP TABLE IF EXISTS `ricket_consults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ricket_consults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `examiner` varchar(127) DEFAULT NULL,
  `center` varchar(40) DEFAULT NULL,
  `weight_kg` int(4) DEFAULT NULL,
  `height_cm` int(3) DEFAULT NULL,
  `cross_left_T` varchar(255) DEFAULT NULL,
  `right_leg` varchar(24) DEFAULT NULL,
  `pain` varchar(24) DEFAULT NULL,
  `wrist_enlargement` int(5) DEFAULT NULL,
  `rib_heading` int(5) DEFAULT NULL,
  `right_leg_angle` int(11) DEFAULT NULL,
  `left_leg_angle` int(11) DEFAULT NULL,
  `cross_right_T` varchar(255) DEFAULT NULL,
  `cross_right_F` varchar(255) DEFAULT NULL,
  `IMIC_distance` varchar(64) DEFAULT NULL,
  `left_leg` varchar(24) DEFAULT NULL,
  `cross_left_F` varchar(255) DEFAULT NULL,
  `x_Surgery` varchar(24) DEFAULT NULL,
  `xray` varchar(127) DEFAULT NULL,
  `x_Brace` varchar(24) DEFAULT NULL,
  `x_Nutrisupport` tinyint(1) NOT NULL DEFAULT '0',
  `brachial_circumference_cm` int(3) DEFAULT NULL,
  `walking_difficulties` varchar(24) DEFAULT NULL,
  `comments` mediumtext,
  `suggested_for_surgery` tinyint(1) DEFAULT NULL,
  `treatment_evaluation` tinyint(1) DEFAULT NULL,
  `treatment_finished` tinyint(1) DEFAULT NULL,
  `x_conclusion_medical_calcium500` tinyint(1) NOT NULL DEFAULT '0',
  `x_conclusion_medical_calcium1000` tinyint(1) NOT NULL DEFAULT '0',
  `x_conclusion_medical_vitaminD` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `ricket_consults_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ricket_consults`
--

LOCK TABLES `ricket_consults` WRITE;
/*!40000 ALTER TABLE `ricket_consults` DISABLE KEYS */;
INSERT INTO `ricket_consults` VALUES (1,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2003-05-11',NULL,NULL,17,114,NULL,'Valgus',NULL,0,0,6,6,NULL,NULL,'1','Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(2,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2002-11-19',NULL,NULL,16,110,NULL,'Valgus',NULL,0,0,8,12,NULL,NULL,'1','Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(3,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2004-10-06',NULL,NULL,18,115,NULL,'Valgus',NULL,0,0,6,6,NULL,NULL,'1','Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(4,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2004-09-26',NULL,NULL,19,115,NULL,'Valgus',NULL,0,0,6,6,NULL,NULL,'1','Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(5,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2003-09-02',NULL,NULL,14,103,NULL,'Varus',NULL,1,1,2,2,NULL,NULL,NULL,'Varus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(6,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2003-08-05',NULL,NULL,16,106,NULL,'Valgus',NULL,1,1,6,8,NULL,NULL,NULL,'Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(7,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2003-05-28',NULL,NULL,NULL,NULL,NULL,'Valgus',NULL,0,0,20,20,NULL,NULL,NULL,'Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(8,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2003-01-11',NULL,NULL,17,108,NULL,'Valgus',NULL,0,0,4,4,NULL,NULL,NULL,'Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(9,'1980-01-01 00:00:00','2015-02-04 17:57:04','transfer',6,'2004-05-23',NULL,NULL,18,114,NULL,'Valgus',NULL,0,0,4,4,NULL,NULL,NULL,'Valgus',NULL,NULL,NULL,NULL,0,NULL,NULL,'',0,NULL,NULL,0,0,0),(13,'2014-06-02 07:19:09','2023-08-30 05:11:54','Thierry',1,'2014-01-04','AMD doctor','Chakaria Disability Center',37,110,'0','Varus','Moderate',0,0,30,5,'','','10','Varus','0','Osteotomy','',NULL,0,0,'Level 1','',1,NULL,NULL,0,1,0);
/*!40000 ALTER TABLE `ricket_consults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_stats`
--

DROP TABLE IF EXISTS `server_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_stats` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `device` varchar(25) NOT NULL,
  `key` varchar(50) NOT NULL,
  `params` varchar(100) DEFAULT '',
  `counter` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `record` (`key`,`params`,`device`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_stats`
--

LOCK TABLES `server_stats` WRITE;
/*!40000 ALTER TABLE `server_stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `server_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('structure_version','1980-01-01 00:00:00','2023-08-30 05:11:54',NULL,'123');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surgeries`
--

DROP TABLE IF EXISTS `surgeries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `surgeries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `report_diagnostic` varchar(100) DEFAULT NULL,
  `report_surgeon` varchar(100) DEFAULT NULL,
  `report_side_right` tinyint(1) DEFAULT NULL,
  `report_side_left` tinyint(1) DEFAULT NULL,
  `report_procedure` varchar(250) DEFAULT NULL,
  `follow_up_complication` mediumtext,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `surgeries_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surgeries`
--

LOCK TABLES `surgeries` WRITE;
/*!40000 ALTER TABLE `surgeries` DISABLE KEYS */;
INSERT INTO `surgeries` VALUES (5,'2020-09-02 07:20:43','2023-08-30 05:11:51','jehon',1,'2014-01-02','test','someone',NULL,NULL,NULL,'nothing');
/*!40000 ALTER TABLE `surgeries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `last_user` varchar(50) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(127) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `codage` varchar(16) DEFAULT NULL,
  `group` char(10) DEFAULT 'cdc',
  `in_examiner_list` tinyint(1) NOT NULL DEFAULT '0',
  `notes` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `group` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (101,'2011-10-18 04:24:37','2023-08-30 05:11:54','thierry','thierry','Thierry Craviari','$2y$10$dVJBP04XhHFpEmSV1.bYweYd0q4VpVhjbMTfebpja7arMGVpyHIMS','thierry.craviari@gmail.com','TCA','manager',1,'','2015-08-24 11:16:20',''),(102,'2011-10-18 04:24:37','2023-08-30 05:11:54','jehon','jehon','Jean Honlet','$2y$10$dVJBP04XhHFpEmSV1.bYweYd0q4VpVhjbMTfebpja7arMGVpyHIMS','marielineet.jean@gmail.com','JH','admin',0,'','2016-01-03 16:14:35',''),(103,'2011-10-18 04:24:37','2023-08-30 05:11:54','murshed','murshed','Morshedul Alam','$2y$10$dVJBP04XhHFpEmSV1.bYweYd0q4VpVhjbMTfebpja7arMGVpyHIMS','bgdcox1@yahoo.com','MUR','cdc',1,'','2015-12-03 17:35:27',''),(104,'2011-10-18 04:24:37','2023-08-30 05:11:54','readonly','readonly','readonly','$2y$10$dVJBP04XhHFpEmSV1.bYweYd0q4VpVhjbMTfebpja7arMGVpyHIMS',NULL,NULL,'readonly',0,NULL,'2015-12-03 17:35:16',''),(105,NULL,'2023-08-30 05:11:54','jehon','ershad','Ershad','$2y$10$dVJBP04XhHFpEmSV1.bYweYd0q4VpVhjbMTfebpja7arMGVpyHIMS',NULL,'Ers','cdc',1,NULL,NULL,NULL),(106,NULL,'2023-08-30 05:11:54','jehon','shetou','Shetou','$2y$10$dVJBP04XhHFpEmSV1.bYweYd0q4VpVhjbMTfebpja7arMGVpyHIMS',NULL,'She','cdc',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50013 DEFINER=`mysql_cryptomedic_username`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `consults` AS (select 'ricket_consult' AS `type`,`ricket_consults`.`id` AS `id`,`ricket_consults`.`created_at` AS `created_at`,`ricket_consults`.`updated_at` AS `updated_at`,`ricket_consults`.`patient_id` AS `patient_id`,`ricket_consults`.`date` AS `date`,`ricket_consults`.`examiner` AS `examiner`,`ricket_consults`.`center` AS `center`,`ricket_consults`.`weight_kg` AS `weight_kg`,`ricket_consults`.`height_cm` AS `height_cm`,`ricket_consults`.`brachial_circumference_cm` AS `brachial_circumference_cm`,`ricket_consults`.`treatment_evaluation` AS `treatment_evaluation`,`ricket_consults`.`treatment_finished` AS `treatment_finished`,`ricket_consults`.`comments` AS `comments`,`ricket_consults`.`suggested_for_surgery` AS `suggested_for_surgery` from `ricket_consults`) union (select 'club_foot' AS `type`,`club_feet`.`id` AS `id`,`club_feet`.`created_at` AS `created_at`,`club_feet`.`updated_at` AS `updated_at`,`club_feet`.`patient_id` AS `patient_id`,`club_feet`.`date` AS `date`,`club_feet`.`examiner` AS `examiner`,`club_feet`.`center` AS `center`,`club_feet`.`weight_kg` AS `weight_kg`,`club_feet`.`height_cm` AS `height_cm`,`club_feet`.`brachial_circumference_cm` AS `brachial_circumference_cm`,`club_feet`.`treatment_evaluation` AS `treatment_evaluation`,`club_feet`.`treatment_finished` AS `treatment_finished`,`club_feet`.`comments` AS `comments`,`club_feet`.`suggested_for_surgery` AS `suggested_for_surgery` from `club_feet`) union (select 'other_consult' AS `type`,`other_consults`.`id` AS `id`,`other_consults`.`created_at` AS `created_at`,`other_consults`.`updated_at` AS `updated_at`,`other_consults`.`patient_id` AS `patient_id`,`other_consults`.`date` AS `date`,`other_consults`.`examiner` AS `examiner`,`other_consults`.`center` AS `center`,`other_consults`.`weight_kg` AS `weight_kg`,`other_consults`.`height_cm` AS `height_cm`,`other_consults`.`brachial_circumference_cm` AS `brachial_circumference_cm`,`other_consults`.`treatment_evaluation` AS `treatment_evaluation`,`other_consults`.`treatment_finished` AS `treatment_finished`,`other_consults`.`comments` AS `comments`,`other_consults`.`suggested_for_surgery` AS `suggested_for_surgery` from `other_consults`) */;
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

-- Dump completed on 2023-08-30  5:14:51
