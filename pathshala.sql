-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2024 at 09:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pathshala`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `assignment_title` varchar(255) NOT NULL,
  `instructions` text DEFAULT NULL,
  `submission_deadline` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `description`, `category_image`, `deletedAt`) VALUES
(1, 'Programming', 'Programming-related courses and too much fun to learn', '/images/courses/online/123.jpg', NULL),
(2, 'Mathematics', 'Mathematics-related courses', '/images/courses/online/o1.png', NULL),
(3, 'Languages', 'Language learning courses', '/images/courses/online/o1.png', NULL),
(4, 'Science', 'Science-related courses', '/images/courses/online/o1.png', NULL),
(5, 'Business', 'Business-related courses', '/images/courses/online/o1.png', NULL),
(6, 'Java', 'Introduction to Java', '/images/courses/online/o1.png', '2024-05-01 09:04:44'),
(8, 'ABC', 'sfbsk,', 'nklsnkcsnknd', '2024-05-01 11:46:22'),
(9, 'hjkj', 'jhjk', '1da9d86e641bce8cd2e79701ba3491a8.jpg', '2024-05-01 11:46:25'),
(10, 'nskN', 'Nnkn', '1da9d86e641bce8cd2e79701ba3491a8.jpg', '2024-05-01 17:48:26'),
(11, 'nbjmn', 'mnk,n', '1da9d86e641bce8cd2e79701ba3491a8.jpg', '2024-05-01 17:48:29'),
(12, 'gg', 'gg', '1da9d86e641bce8cd2e79701ba3491a8.jpg', '2024-05-01 17:48:32'),
(13, 'aa', 'aa', '90f24d55168862c23504c0f71bcdbcf6.jpg', '2024-05-01 17:48:34');

-- --------------------------------------------------------

--
-- Table structure for table `coursematerials`
--

CREATE TABLE `coursematerials` (
  `material_id` int(11) NOT NULL,
  `material_type` enum('Lecture','Quiz','Assignment','Notes') NOT NULL,
  `material_title` varchar(255) NOT NULL,
  `material_content` text DEFAULT NULL,
  `lecture_duration` time DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coursematerials`
--

INSERT INTO `coursematerials` (`material_id`, `material_type`, `material_title`, `material_content`, `lecture_duration`, `createdAt`, `updatedAt`, `course_id`) VALUES
(1, 'Lecture', 'Introduction to Python', './video/video-1.mp4', '01:30:00', NULL, NULL, 1),
(2, 'Quiz', 'Python Quiz', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NULL, NULL, NULL, 1),
(3, 'Lecture', 'Calculus I', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '02:15:00', NULL, NULL, 2),
(4, 'Assignment', 'Calculus I Assignment 1', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', NULL, NULL, NULL, 2),
(5, 'Lecture', 'Spanish for Beginners', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '01:45:00', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `course_image` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `category_id`, `instructor_id`, `price`, `description`, `course_image`, `deletedAt`) VALUES
(1, 'Introduction to Python', 1, 1, 49.99, 'Learn the basics of Python programming language', './images/courses/online/o1.png', NULL),
(2, 'Calculus I', 2, 2, 59.99, 'Fundamental concepts of calculus', './images/courses/online/o1.png', NULL),
(3, 'Spanish for Beginners', 3, 3, 29.99, 'Learn basic Spanish vocabulary and grammar', './images/courses/online/o1.png', NULL),
(4, 'Introduction to Physics', 4, 4, 39.99, 'Fundamental principles of physics', './images/courses/online/o1.png', NULL),
(5, 'Introduction to Business Management', 5, 5, 49.99, 'Basic concepts of business management', './images/courses/online/o1.png', NULL),
(6, 'C++ intro', 3, 2, 50000.00, 'introduction to c++ with all functionality ', './images/courses/c9.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `enrollment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `completion_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `user_id`, `course_id`, `enrollment_date`, `completion_status`) VALUES
(1, 2, 1, '2024-04-19 08:10:52', 0),
(2, 3, 2, '2024-04-19 08:10:52', 0),
(3, 4, 3, '2024-04-19 08:10:52', 0),
(4, 5, 4, '2024-04-19 08:10:52', 0),
(5, 1, 5, '2024-04-19 08:10:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `note_title` varchar(255) NOT NULL,
  `note_content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `course_id`, `note_title`, `note_content`) VALUES
(1, 1, 'Python Cheat Sheet', 'A quick reference guide for Python syntax and functions'),
(2, 2, 'Limits and Continuity Summary', 'Summary of key concepts in limits and continuity'),
(3, 3, 'Greetings Vocabulary', 'Common Spanish greetings and expressions'),
(4, 4, 'Cell Structure Notes', 'Detailed notes on the structure and function of cell organelles'),
(5, 5, 'Business Fundamentals Overview', 'Overview of key topics covered in the course');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `quiz_title` varchar(255) NOT NULL,
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`questions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `course_id`, `quiz_title`, `questions`) VALUES
(1, 1, 'Python Basics Quiz', '{\"questions\": [{\"question\": \"What is a variable in Python?\", \"options\": [\"A constant value\", \"A reserved keyword\", \"A named storage location\"], \"correct_answer\": \"A named storage location\"}, {\"question\": \"What is the output of 2+2?\", \"options\": [\"3\", \"4\", \"5\"], \"correct_answer\": \"4\"}]}'),
(2, 1, 'Python Basics Quiz', '{\"questions\": [{\"question\": \"What is a variable in Python?\", \"options\": [\"A constant value\", \"A reserved keyword\", \"A named storage location\"], \"correct_answer\": \"A named storage location\"}, {\"question\": \"What is the output of 2+2?\", \"options\": [\"3\", \"4\", \"5\"], \"correct_answer\": \"4\"}]}');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `usercourseprogress`
--

CREATE TABLE `usercourseprogress` (
  `progress_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `progress_percentage` decimal(5,2) DEFAULT NULL,
  `last_accessed_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usercourseprogress`
--

INSERT INTO `usercourseprogress` (`progress_id`, `user_id`, `course_id`, `progress_percentage`, `last_accessed_date`) VALUES
(1, 2, 1, 25.00, '2024-04-18 05:00:00'),
(2, 3, 2, 10.00, '2024-04-17 10:15:00'),
(3, 4, 3, 0.00, '2024-04-16 03:50:00'),
(4, 5, 4, 0.00, '2024-04-15 06:30:00'),
(5, 1, 5, 50.00, '2024-04-14 02:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `user_role_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`user_role_id`, `user_id`, `role_id`) VALUES
(16, 1, 1),
(17, 2, 2),
(18, 3, 2),
(19, 4, 2),
(20, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Admin','User') NOT NULL DEFAULT 'User',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `role`, `createdAt`, `updatedAt`, `user_image`) VALUES
(1, 'admin', 'adminpassword', 'admin@example.com', 'Admin', NULL, NULL, './images/team/t3.webp'),
(2, 'user1', 'user1password', 'user1@example.com', 'User', NULL, NULL, './images/team/t2.webp'),
(3, 'user2', 'user2password', 'user2@example.com', 'User', NULL, NULL, './images/team/t7.webp'),
(4, 'user3', 'user3password', 'user3@example.com', 'User', NULL, NULL, './images/team/t5.webp'),
(5, 'user4', 'user4password', 'user4@example.com', 'User', NULL, NULL, './images/team/t1.webp'),
(6, 'Dhara', 'Abcd@123', 'dharakoriya9@gmail.com', 'Admin', '2024-05-03 09:40:21', '2024-05-03 09:40:21', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `coursematerials`
--
ALTER TABLE `coursematerials`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `usercourseprogress`
--
ALTER TABLE `usercourseprogress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `coursematerials`
--
ALTER TABLE `coursematerials`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usercourseprogress`
--
ALTER TABLE `usercourseprogress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `usercourseprogress`
--
ALTER TABLE `usercourseprogress`
  ADD CONSTRAINT `usercourseprogress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `usercourseprogress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `userroles`
--
ALTER TABLE `userroles`
  ADD CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
