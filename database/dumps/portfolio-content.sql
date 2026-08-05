-- Portfolio content dump for `personal_portfolio`.
--
-- Schema for every table, but data ONLY for the content tables that drive the
-- public page. `users`, `sessions`, `teams`, `contact_messages` and the
-- cache/queue tables are deliberately structure-only: this file is committed to
-- a public repository, so it must never carry password hashes, session
-- payloads or anyone's messages. Keep it that way when regenerating.
--
-- Note that database/seeders/PortfolioSeeder.php reproduces the same content
-- and is the friendlier way to bootstrap a fresh install. This dump exists as a
-- point-in-time snapshot, not as the primary fixture.
--
-- Regenerate (MYSQL_PWD avoids putting the password in the process list;
-- --skip-dump-date keeps re-dumps from churning the diff):
--
--   export MYSQL_PWD="$DB_PASSWORD"
--   ARGS="-h 127.0.0.1 -P 3306 -u $DB_USERNAME --skip-dump-date --no-tablespaces --single-transaction"
--   mysqldump $ARGS --no-data personal_portfolio > schema.sql
--   mysqldump $ARGS --no-create-info personal_portfolio \
--     migrations profiles skill_categories skills experiences projects \
--     educations certifications > data.sql
--   cat schema.sql data.sql >> this file
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: personal_portfolio
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institution` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `highlights` json NOT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `highlights` json NOT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `headline` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spoken_languages` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `avatar_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resume_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tech` json NOT NULL,
  `links` json NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skill_categories`
--

DROP TABLE IF EXISTS `skill_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `skill_category_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skills_skill_category_id_foreign` (`skill_category_id`),
  CONSTRAINT `skills_skill_category_id_foreign` FOREIGN KEY (`skill_category_id`) REFERENCES `skill_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team_invitations`
--

DROP TABLE IF EXISTS `team_invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_invitations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `team_id` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invited_by` bigint unsigned NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_invitations_code_unique` (`code`),
  KEY `team_invitations_team_id_foreign` (`team_id`),
  KEY `team_invitations_invited_by_foreign` (`invited_by`),
  CONSTRAINT `team_invitations_invited_by_foreign` FOREIGN KEY (`invited_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_invitations_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `team_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_members_team_id_user_id_unique` (`team_id`,`user_id`),
  KEY `team_members_user_id_foreign` (`user_id`),
  CONSTRAINT `team_members_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_personal` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teams_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `current_team_id` bigint unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_current_team_id_foreign` (`current_team_id`),
  CONSTRAINT `users_current_team_id_foreign` FOREIGN KEY (`current_team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: personal_portfolio
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_01_27_000001_create_teams_table',1),(5,'2026_01_27_000002_add_current_team_id_to_users_table',1),(6,'2026_08_05_000001_create_portfolio_tables',1),(7,'0001_01_01_000003_add_two_factor_columns_to_users_table',2),(8,'2026_08_05_000002_add_icon_class_to_certifications_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'MD. Sulaiman','Full-Stack Software Engineer — Web & Mobile · AI-Driven Development','Full-stack software engineer with seven years of experience delivering web and mobile products across Japan and Bangladesh. Ships production systems end to end with PHP/Laravel and native Android (Java), with more than a dozen apps live on Google Play and the App Store. At Senda Japan Ltd. (Autocraft Japan Ltd.), builds and maintains the group\'s in-house business platforms end to end and drives AI-driven development with Claude Code to deliver faster without compromising engineering quality.','smensulaiman007@gmail.com','+81-90-1973-5910','Koshigaya, Saitama, Japan','https://github.com/smensulaiman','https://www.linkedin.com/in/smensulaiman/','Bangladeshi','English, Bangla','1995-11-24','/solaimam-web.jpg',NULL,'2026-08-04 18:46:49','2026-08-04 22:19:17');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `skill_categories`
--

LOCK TABLES `skill_categories` WRITE;
/*!40000 ALTER TABLE `skill_categories` DISABLE KEYS */;
INSERT INTO `skill_categories` VALUES (1,'AI-Driven Development','bx bx-brain',0,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(2,'Languages','bx bx-code-alt',1,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(4,'Mobile','bx bx-mobile-alt',4,'2026-08-04 18:46:49','2026-08-04 20:04:39'),(5,'Databases','bx bx-data',5,'2026-08-04 18:46:49','2026-08-04 20:04:39'),(9,'Backend','bx bx-server',2,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(10,'Frontend','bx bx-layout',3,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(11,'Cloud & Infrastructure','bx bx-cloud',6,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(12,'Tools & Workflow','bx bx-wrench',8,'2026-08-04 20:04:39','2026-08-04 21:27:13'),(13,'Operating Systems','bx bx-desktop',7,'2026-08-04 21:27:13','2026-08-04 21:27:13');
/*!40000 ALTER TABLE `skill_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,1,'Claude Code (agentic coding)','bx bx-bot',0,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(3,1,'AI-assisted code review','bx bx-code-block',1,'2026-08-04 18:46:49','2026-08-04 20:04:39'),(5,2,'Java','bx bxl-java',0,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(6,2,'PHP','bx bxl-php',1,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(7,2,'JavaScript','bx bxl-javascript',2,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(8,2,'C#','bx bx-code-alt',3,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(15,4,'Native Android (Java)','bx bxl-android',0,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(16,4,'React Native','bx bxl-react',1,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(17,4,'Unity','bx bxl-unity',2,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(19,5,'MySQL','bx bx-data',0,'2026-08-04 18:46:49','2026-08-04 18:46:49'),(21,5,'Firebase','bx bxl-firebase',2,'2026-08-04 18:46:49','2026-08-04 22:38:28'),(22,5,'Room','bx bx-box',3,'2026-08-04 18:46:49','2026-08-04 22:38:28'),(23,5,'Realm','bx bx-cube',4,'2026-08-04 18:46:49','2026-08-04 22:38:28'),(34,1,'AI-assisted debugging','bx bx-bug',2,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(35,1,'AI-assisted documentation','bx bx-file',3,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(36,9,'Laravel','bx bx-layer',0,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(37,9,'Livewire','bx bx-bolt-circle',1,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(38,9,'Spring Boot','bx bxl-spring-boot',2,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(39,9,'REST APIs','bx bx-transfer-alt',4,'2026-08-04 20:04:39','2026-08-04 22:38:28'),(40,9,'MVC','bx bx-network-chart',5,'2026-08-04 20:04:39','2026-08-04 22:38:28'),(41,10,'Vue.js','bx bxl-vuejs',0,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(42,10,'React','bx bxl-react',1,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(43,10,'Tailwind CSS','bx bxl-tailwind-css',2,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(44,10,'Bootstrap','bx bxl-bootstrap',3,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(45,4,'MVVM','bx bx-sitemap',3,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(46,11,'AWS (EC2)','bx bxl-aws',0,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(47,11,'Laravel Cloud','bx bx-cloud',1,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(48,11,'Cloudflare','bx bx-shield',2,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(50,11,'Apache2','bx bx-server',3,'2026-08-04 20:04:39','2026-08-04 21:36:49'),(51,11,'Domain & DNS','bx bx-world',4,'2026-08-04 20:04:39','2026-08-04 21:36:49'),(52,12,'Git','bx bxl-git',0,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(53,12,'GitHub','bx bxl-github',1,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(54,12,'GitLab','bx bxl-gitlab',2,'2026-08-04 20:04:39','2026-08-04 20:04:39'),(55,12,'Slack','bx bxl-slack',4,'2026-08-04 20:04:39','2026-08-04 20:31:27'),(56,12,'Backlog','bx bx-task',5,'2026-08-04 20:04:39','2026-08-04 20:31:27'),(57,12,'Postman','bx bx-send',3,'2026-08-04 20:31:27','2026-08-04 20:31:27'),(58,13,'Linux','bx bxl-tux',0,'2026-08-04 21:27:13','2026-08-04 21:27:13'),(59,13,'Windows','bx bxl-windows',1,'2026-08-04 21:27:13','2026-08-04 21:27:13'),(60,13,'macOS','bx bxl-apple',2,'2026-08-04 21:27:13','2026-08-04 21:27:13'),(61,2,'Python','bx bxl-python',4,'2026-08-04 22:38:28','2026-08-04 22:38:28'),(62,9,'Node.js','bx bxl-nodejs',3,'2026-08-04 22:38:28','2026-08-04 22:38:28'),(63,5,'Redis','bx bx-memory-card',1,'2026-08-04 22:38:28','2026-08-04 22:38:28');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES (1,'Senda Japan Ltd.','Japan','Software Engineer (Web & Android)','In-house IT company of Autocraft Japan Ltd.','Dec 2022',NULL,'[\"Develop and maintain Auction Pro, an in-house car auction bidding platform built by Senda Japan for Autocraft Japan, serving ~400 users and 50,000+ vehicle lots per day across agent, sub-agent, customer, and bidder roles; migrated it from on-premises to AWS EC2 and optimized performance (PHP).\", \"Engineered AI-driven price prediction from vehicles\' historical auction records, cutting under-priced losing bids by ~30% and lifting agents\' win ratio; added personalized \\\"daily top cars\\\" recommendations and a live analytics dashboard.\", \"Built the Autocraft Japan e-commerce platform, merging the company\'s own stock with vendor inventory from Aucnet, Gonet and CHS through nightly cron sync — around 130,000 live listings — with Stripe checkout across multiple languages and currencies, serving millions of visits worldwide.\", \"Delivered a Yard Management System (Laravel, Livewire) for shipment tracking across yards and export vessels, and single-handedly built its companion native Android app, Senda Snap (Java) — task management, in-app chat, and auction-lot photo capture.\", \"Shipped, single-handedly, a vehicle parts inventory and POS system for Autocraft Japan\'s Samoa branch (Laravel, Livewire) — live and in daily use.\", \"Delivered a fashion inventory system for a client (PHP, Bootstrap, MySQL) and built Tohon QR, a native Android app that scans and decodes vehicle-registration QR codes and pushes data to an internal Autocraft system via REST API.\", \"Learned server setup here — installing and configuring Linux and Apache2 from scratch — then used it to shut down a sustained brute-force attack on the e-commerce site with Cloudflare, Apache security rules and rate limiting, plus a live dashboard tracking blocked IPs and user agents.\", \"Learned Laravel here, and it is now the framework behind most of the web systems above.\", \"Learned AI-assisted development here and now drive it across the team — using Claude Code for implementation, debugging, code review, and documentation.\", \"Administer AWS, databases, and hosting; maintain published iOS and Android apps; and coordinate an overseas development team.\"]',0,'2026-08-04 18:46:50','2026-08-04 22:19:17'),(2,'Suffix IT Limited','Dhaka, Bangladesh','Android Application Developer (Team Lead)',NULL,'Jan 2021','Sep 2022','[\"Led the mobile team across the company\'s Android products, owning architecture, code review, and Google Play releases across a wide range of devices and OS versions.\", \"Architected a field force management app from scratch and grew it to 2,000+ field users — employee tracking, attendance, payroll, leave, expense bills, push notifications, and custom reports.\", \"Spent a month embedded at AKG\'s head office in Chittagong gathering requirements directly from the business and running the pilot rollout.\", \"Field-tested across sales territories alongside area managers, sales officers, and sales representatives, turning first-hand end-user feedback into product changes before wider release.\", \"Built offline-first synchronisation so field staff kept working without connectivity, reconciling queued records on reconnect.\", \"Implemented continuous background GPS tracking tuned for battery life across full field shifts.\", \"Integrated fingerprint scanner and portable thermal printer SDKs for secure attendance capture and on-site receipt printing.\", \"Delivered attendance-to-payroll calculation with custom report generation and exports for client back offices.\", \"Worked closely with the backend team on API contracts, picking up Spring Boot and REST API development alongside the Android work.\"]',1,'2026-08-04 18:46:50','2026-08-04 21:38:51'),(3,'eTracker Solutions','Dhaka, Bangladesh','Junior Android Developer',NULL,'Jun 2019','Jan 2021','[\"Re-architected a sales force management and billing-automation Android app, improving performance and modernizing the UI.\", \"Implemented offline data archiving, batch data upload, and real-time chat, and integrated Retrofit for efficient REST API communication.\", \"Integrated third-party Android libraries and SDKs into production apps, including a payment gateway for an online pharmacy.\", \"Picked up Unity and C# here, going on to build and release cross-platform 3D medical reference apps for a Japanese client, collaborating with their team through Backlog.\", \"Built the collaboration fundamentals relied on ever since — a shared Git workflow with branching and code review, and REST API testing and debugging with Postman.\", \"Ran client field visits to validate real-world performance and resolved production and QA issues.\"]',2,'2026-08-04 18:46:50','2026-08-04 20:45:49');
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Auction Pro','Car auction bidding platform with AI price prediction and per-customer recommendations, serving ~400 users across 50,000+ vehicle lots per day. Built in-house at Senda Japan for Autocraft Japan.','Web Platform','[\"PHP\", \"MySQL\", \"AWS EC2\"]','[]',1,1,'2026-08-04 18:46:50','2026-08-04 22:19:56'),(2,'Yard Management System + Senda Snap','Vehicle shipment tracking across yards and export vessels, with a companion Android app for task management, in-app chat, and auction-lot photo capture.','Web Platform & Mobile','[\"Laravel\", \"Livewire\", \"Java\", \"Android\"]','[{\"url\": \"https://play.google.com/store/apps/details?id=com.sendajapan.sendasnap\", \"label\": \"Google Play\"}]',1,2,'2026-08-04 18:46:50','2026-08-04 22:05:17'),(3,'Vehicle Parts Management System','Parts inventory and point-of-sale system built single-handedly for Autocraft Japan\'s Samoa branch — live and in daily use.','Web Platform','[\"Laravel\", \"Livewire\", \"MySQL\"]','[]',1,3,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(4,'骨まる (Hone Maru)','3D bone anatomy reference app built with Unity for a Japanese client while at eTracker Solutions, working directly with their team through Backlog.','Mobile App','[\"Unity\", \"C#\"]','[{\"url\": \"https://apps.apple.com/jp/app/%E9%AA%A8%E3%81%BE%E3%82%8B/id1582121318\", \"label\": \"App Store\"}, {\"url\": \"https://www.roundflat.jp/products/jintai/bone/bone.html\", \"label\": \"Product page\"}]',1,4,'2026-08-04 18:46:50','2026-08-04 22:05:17'),(5,'Tohon QR','Native Android app that scans and decodes vehicle registration document QR codes and pushes the data to an internal system via REST API.','Mobile App','[\"Java\", \"Android\", \"REST API\"]','[]',0,5,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(6,'Fashion Item Inventory Management System','Inventory management system delivered for a fashion retail client. Internal system.','Web Platform','[\"PHP\", \"Bootstrap\", \"MySQL\"]','[]',0,6,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(7,'BONE: 骨折と脱臼','Bone Fracture & Dislocation in 3D — a medical reference app for studying fractures and dislocations, built with Unity for a Japanese client while at eTracker Solutions.','Mobile App','[\"Unity\", \"C#\"]','[{\"url\": \"https://www.roundflat.jp/products/jintai/fracture/\", \"label\": \"Product page\"}]',0,7,'2026-08-04 18:46:50','2026-08-04 22:05:17'),(8,'Hello Butcher','Online meat ordering app shipped to Google Play and the App Store.','Mobile App','[\"Java\", \"Android\"]','[]',0,8,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(9,'Sales Assistant','Sales force management system with separate applications for field users and the company back office.','Mobile App','[\"Java\", \"Android\", \"Retrofit\"]','[]',0,9,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(10,'Bangladesh Thai Aluminium Sales Force','Customized sales force deployment with dedicated user and admin applications.','Mobile App','[\"Java\", \"Android\"]','[]',0,10,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(11,'Tamim Group Field Force','Field force management deployment covering employee tracking, attendance, and reporting.','Mobile App','[\"Java\", \"Android\"]','[{\"url\": \"https://play.google.com/store/apps/details?id=com.ets.tamimgroup.admin\", \"label\": \"Admin app\"}]',0,11,'2026-08-04 18:46:50','2026-08-04 22:05:17'),(12,'Wellbeing Pharmacy','Online pharmacy app with an integrated payment gateway.','Mobile App','[\"Java\", \"Android\", \"Payment Gateway\"]','[]',0,12,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(13,'Somriddhi Club (Elite Paint)','Loyalty applications for paint dealers and painters, each with its own rewards workflow.','Mobile App','[\"Java\", \"Android\"]','[{\"url\": \"https://play.google.com/store/apps/details?id=com.ets.elitepaint.dealer\", \"label\": \"Dealer app\"}, {\"url\": \"https://play.google.com/store/apps/details?id=com.ets.elitepaint.painter\", \"label\": \"Painter app\"}]',0,13,'2026-08-04 18:46:50','2026-08-04 22:05:17'),(14,'FourB Notes','Note-taking app for Android with offline storage.','Mobile App','[\"Java\", \"Android\", \"Room\"]','[]',0,14,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(15,'Police Regulation of Bengal','Searchable law reference app covering the Police Regulation of Bengal.','Mobile App','[\"Java\", \"Android\"]','[]',0,15,'2026-08-04 18:46:50','2026-08-04 22:02:59'),(16,'Autocraft Japan','Used-car e-commerce platform selling Autocraft Japan\'s own stock alongside vendor inventory from Aucnet, Gonet and CHS, merged nightly by cron scripts into around 130,000 live listings. Multi-language and multi-currency with Stripe checkout, serving millions of visits worldwide. Hardened against a sustained brute-force attack with Cloudflare, Apache security rules and rate limiting, backed by a live dashboard of blocked IPs and user agents.','E-commerce Platform','[\"PHP\", \"MySQL\", \"Stripe\", \"Cloudflare\", \"Apache2\", \"Cron\"]','[{\"url\": \"https://www.autocraftjapan.com/\", \"label\": \"Website\"}]',1,0,'2026-08-04 18:46:50','2026-08-04 22:05:17'),(18,'PathLingo','JLPT vocabulary learning platform built in my own time — a Laravel admin and content backend serving a versioned REST API, plus a native Android client. Covers vocabulary, kanji with stroke order, and kana, with generated pronunciation audio, quizzes, and progress tracking. Gamified with coins, unlockable categories, and purchasable avatars. Token auth for mobile and session auth for the admin panel, with Google and Facebook sign-in, OTP, and a guest mode.','Web Platform & Mobile','[\"Laravel\", \"PHP\", \"Alpine.js\", \"Tailwind CSS\", \"Sanctum\", \"REST APIs\", \"Swagger\", \"Java\", \"Android\", \"MySQL\"]','[{\"url\": \"https://pathlingo.scholarlyapps.com/\", \"label\": \"Website\"}]',1,16,'2026-08-04 22:45:46','2026-08-04 22:45:46');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `educations`
--

LOCK TABLES `educations` WRITE;
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
INSERT INTO `educations` VALUES (1,'Northern University of Bangladesh','BSc in Computer Science & Engineering','2014','2018','[\"Champion, Programming Contest & Project Showcase — Northern University CSE Day (2017, 2018)\"]',0,'2026-08-04 18:46:50','2026-08-04 18:46:50');
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
INSERT INTO `certifications` VALUES (1,'Oracle Certified Associate (OCA), Java SE 8 Programmer','Oracle','bx bxl-java','2021',0,'2026-08-04 18:46:50','2026-08-04 20:21:24'),(2,'Java EE training','Leveraging ICT programme, Government of Bangladesh','bx bxl-java',NULL,1,'2026-08-04 18:46:50','2026-08-04 20:21:24');
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
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
