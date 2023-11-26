-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: mydoctor
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `employeeID` int NOT NULL AUTO_INCREMENT,
  `fName` varchar(50) DEFAULT NULL,
  `mI` varchar(50) DEFAULT NULL,
  `lName` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `userPassword` varchar(50) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (15,'Muhammad Hammad','A','Asghar',19,'MALE','306-488-9750','SinghPura',NULL,NULL,1),(16,NULL,'J','Johna',23,'Male','987-654-0132','ABC',NULL,NULL,1),(17,'Joh','J','Abraham',32,'Male','987-654-0132','456 Elm Street','abc1','abc',1);
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nursetimeslotrecord`
--

DROP TABLE IF EXISTS `nursetimeslotrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nursetimeslotrecord` (
  `NurseTimeSlotRecordID` int NOT NULL AUTO_INCREMENT,
  `NurseID` int NOT NULL,
  `TimeslotID` int NOT NULL,
  PRIMARY KEY (`NurseTimeSlotRecordID`),
  KEY `NurseID` (`NurseID`),
  KEY `TimeslotID` (`TimeslotID`),
  CONSTRAINT `nursetimeslotrecord_ibfk_1` FOREIGN KEY (`NurseID`) REFERENCES `nurse` (`employeeID`),
  CONSTRAINT `nursetimeslotrecord_ibfk_2` FOREIGN KEY (`TimeslotID`) REFERENCES `timeslot` (`TimeslotID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nursetimeslotrecord`
--

LOCK TABLES `nursetimeslotrecord` WRITE;
/*!40000 ALTER TABLE `nursetimeslotrecord` DISABLE KEYS */;
INSERT INTO `nursetimeslotrecord` VALUES (37,15,1);
/*!40000 ALTER TABLE `nursetimeslotrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `SSN` varchar(11) NOT NULL,
  `fName` varchar(50) DEFAULT NULL,
  `mI` char(1) DEFAULT NULL,
  `lName` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `race` varchar(50) DEFAULT NULL,
  `occupationClass` varchar(50) DEFAULT NULL,
  `medicalHistory` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `eligibility` varchar(20) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `userPassword` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('111-11-1111','Alice','M','Johnson',28,'Female','Asian','Engineer','None','111-222-3333','123 Elm St','Eligible',NULL,NULL),('123-45-6780','John','D','Doe',30,'Male','Asian','Engineer','None','123-456-7890','123 Main St',NULL,'johndoe','password'),('123-45-6781','John','D','Doe',30,'Male','Asian','Engineer','None','123-456-7890','123 Main St',NULL,'johndoe','password'),('123-45-6788','John','D','Doe',30,'Male','Asian','Engineer','None','123-456-7890','123 Main St',NULL,'johndoe','password'),('123-45-6789','John','D','Doe',30,'Male','American','Engineer','None','123-456-7890','123 Main St',NULL,'johndoe','password'),('123-45-6791','John','D','Doe',30,'Male','Asian','Engineer','None','123-456-7890','123 Main St',NULL,'johndoe','password'),('222-22-2222','Bob','N','Smith',45,'Male','Caucasian','Teacher','High blood pressure','222-333-4444','456 Oak Ave','Eligible',NULL,NULL),('333-33-3333','Charlie','K','Williams',60,'Male','African American','Doctor','Diabetes','333-444-5555','789 Pine Rd','Eligible',NULL,NULL),('444-44-4444','Diana','L','Miller',35,'Female','Hispanic','Nurse','Asthma','444-555-6666','321 Maple Blvd','Eligible',NULL,NULL),('555-55-5555','Eva','J','Garcia',22,'Female','Hispanic','Student','None','555-666-7777','567 Birch Ln','Eligible',NULL,NULL),('666-66-6666','Frank','P','Brown',40,'Male','Caucasian','Lawyer','None','666-777-8888','890 Cedar St','Eligible',NULL,NULL),('777-77-7777','Grace','S','Lee',55,'Female','Asian','Business Owner','High cholesterol','777-888-9999','901 Pineapple Ave','Eligible',NULL,NULL),('888-88-8888','Henry','R','Clark',30,'Male','Caucasian','Artist','None','888-999-0000','234 Apple St','Eligible',NULL,NULL),('999-99-9999','Isabel','T','Young',50,'Female','African American','Chef','None','999-000-1111','345 Cherry Dr','Eligible',NULL,NULL);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patientschedule`
--

DROP TABLE IF EXISTS `patientschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patientschedule` (
  `ScheduleID` int NOT NULL AUTO_INCREMENT,
  `patientSSN` varchar(20) DEFAULT NULL,
  `VaccineID` int DEFAULT NULL,
  `TimeslotID` int DEFAULT NULL,
  `onHold` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ScheduleID`),
  UNIQUE KEY `unique_schedule_entry` (`patientSSN`,`VaccineID`,`TimeslotID`),
  KEY `VaccineID` (`VaccineID`),
  KEY `TimeslotID` (`TimeslotID`),
  CONSTRAINT `patientschedule_ibfk_1` FOREIGN KEY (`patientSSN`) REFERENCES `patient` (`SSN`),
  CONSTRAINT `patientschedule_ibfk_2` FOREIGN KEY (`VaccineID`) REFERENCES `vaccine` (`id`),
  CONSTRAINT `patientschedule_ibfk_3` FOREIGN KEY (`TimeslotID`) REFERENCES `timeslot` (`TimeslotID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patientschedule`
--

LOCK TABLES `patientschedule` WRITE;
/*!40000 ALTER TABLE `patientschedule` DISABLE KEYS */;
INSERT INTO `patientschedule` VALUES (1,'111-11-1111',3,14,1),(2,'111-11-1111',3,15,1),(9,'123-45-6780',1,17,1),(10,'123-45-6780',1,16,1);
/*!40000 ALTER TABLE `patientschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslot` (
  `TimeslotID` int NOT NULL AUTO_INCREMENT,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `MaxCapacity` int DEFAULT NULL,
  `NurseCount` int DEFAULT NULL,
  `VaccineID` int DEFAULT NULL,
  `round` int NOT NULL,
  `Active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`TimeslotID`),
  KEY `VaccineID` (`VaccineID`),
  CONSTRAINT `timeslot_ibfk_1` FOREIGN KEY (`VaccineID`) REFERENCES `vaccine` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslot`
--

LOCK TABLES `timeslot` WRITE;
/*!40000 ALTER TABLE `timeslot` DISABLE KEYS */;
INSERT INTO `timeslot` VALUES (1,'09:00:00','11:00:00','2023-12-01',1,0,1,0,1),(14,'08:00:00','10:00:00','2023-12-01',1,0,3,1,1),(15,'09:00:00','10:00:00','2023-12-01',1,0,3,2,1),(16,'04:50:00','05:50:00','2023-11-30',1,0,1,2,1),(17,'06:57:00','07:57:00','2023-12-08',1,0,1,1,1);
/*!40000 ALTER TABLE `timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine`
--

DROP TABLE IF EXISTS `vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `dose_Required` int NOT NULL,
  `timeFrame` int NOT NULL,
  `description` text,
  `Availability` tinyint(1) DEFAULT '1',
  `Active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine`
--

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;
INSERT INTO `vaccine` VALUES (1,'Vaccine1','Manufacturer1',2,30,'Description for Vaccine 1',1,1),(2,'Vaccine2','Manufacturer2',1,21,'Description for Vaccine 2',1,1),(3,'Vaccine3','Manufacturer3',2,28,'Description for Vaccine 3',1,0);
/*!40000 ALTER TABLE `vaccine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-27  3:05:59
