-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
<<<<<<< Updated upstream
-- Generation Time: Apr 19, 2024 at 10:18 AM
=======
-- Generation Time: Apr 19, 2024 at 10:02 AM
>>>>>>> Stashed changes
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
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< Updated upstream
--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `description`) VALUES
(1, 'Programming', 'Programming-related courses'),
(2, 'Mathematics', 'Mathematics-related courses'),
(3, 'Languages', 'Language learning courses'),
(4, 'Science', 'Science-related courses'),
(5, 'Business', 'Business-related courses');

=======
>>>>>>> Stashed changes
-- --------------------------------------------------------

--
-- Table structure for table `coursematerials`
--

CREATE TABLE `coursematerials` (
  `material_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `material_type` enum('Lecture','Quiz','Assignment','Notes') NOT NULL,
  `material_title` varchar(255) NOT NULL,
  `material_content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< Updated upstream
--
-- Dumping data for table `coursematerials`
--

INSERT INTO `coursematerials` (`material_id`, `course_id`, `material_type`, `material_title`, `material_content`) VALUES
(1, 1, 'Lecture', 'Introduction to Python', 'Link to lecture video'),
(2, 2, 'Lecture', 'Limits and Continuity', 'Link to lecture video'),
(3, 3, 'Notes', 'Greetings and Introductions', 'PDF file with notes'),
(4, 4, 'Lecture', 'Newtonian Mechanics', 'Link to lecture video'),
(5, 5, 'Lecture', 'Introduction to Management', 'Link to lecture video');

=======
>>>>>>> Stashed changes
-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< Updated upstream
--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `category_id`, `instructor_id`, `price`, `description`) VALUES
(1, 'Introduction to Python', 1, 1, 49.99, 'Learn the basics of Python programming language'),
(2, 'Calculus I', 2, 2, 59.99, 'Fundamental concepts of calculus'),
(3, 'Spanish for Beginners', 3, 3, 29.99, 'Learn basic Spanish vocabulary and grammar'),
(4, 'Introduction to Physics', 4, 4, 39.99, 'Fundamental principles of physics'),
(5, 'Introduction to Business Management', 5, 5, 49.99, 'Basic concepts of business management');

=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `user_id`, `course_id`, `enrollment_date`, `completion_status`) VALUES
(1, 2, 1, '2024-04-19 08:10:52', 0),
(2, 3, 2, '2024-04-19 08:10:52', 0),
(3, 4, 3, '2024-04-19 08:10:52', 0),
(4, 5, 4, '2024-04-19 08:10:52', 0),
(5, 1, 5, '2024-04-19 08:10:52', 0);

=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `course_id`, `note_title`, `note_content`) VALUES
(1, 1, 'Python Cheat Sheet', 'A quick reference guide for Python syntax and functions'),
(2, 2, 'Limits and Continuity Summary', 'Summary of key concepts in limits and continuity'),
(3, 3, 'Greetings Vocabulary', 'Common Spanish greetings and expressions'),
(4, 4, 'Cell Structure Notes', 'Detailed notes on the structure and function of cell organelles'),
(5, 5, 'Business Fundamentals Overview', 'Overview of key topics covered in the course');

=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `course_id`, `quiz_title`, `questions`) VALUES
(1, 1, 'Python Basics Quiz', '{\"questions\": [{\"question\": \"What is a variable in Python?\", \"options\": [\"A constant value\", \"A reserved keyword\", \"A named storage location\"], \"correct_answer\": \"A named storage location\"}, {\"question\": \"What is the output of 2+2?\", \"options\": [\"3\", \"4\", \"5\"], \"correct_answer\": \"4\"}]}'),
(2, 1, 'Python Basics Quiz', '{\"questions\": [{\"question\": \"What is a variable in Python?\", \"options\": [\"A constant value\", \"A reserved keyword\", \"A named storage location\"], \"correct_answer\": \"A named storage location\"}, {\"question\": \"What is the output of 2+2?\", \"options\": [\"3\", \"4\", \"5\"], \"correct_answer\": \"4\"}]}');

=======
>>>>>>> Stashed changes
-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< Updated upstream
--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'User');

=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
--
-- Dumping data for table `usercourseprogress`
--

INSERT INTO `usercourseprogress` (`progress_id`, `user_id`, `course_id`, `progress_percentage`, `last_accessed_date`) VALUES
(1, 2, 1, 25.00, '2024-04-18 05:00:00'),
(2, 3, 2, 10.00, '2024-04-17 10:15:00'),
(3, 4, 3, 0.00, '2024-04-16 03:50:00'),
(4, 5, 4, 0.00, '2024-04-15 06:30:00'),
(5, 1, 5, 50.00, '2024-04-14 02:30:00');

=======
>>>>>>> Stashed changes
-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `user_role_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< Updated upstream
--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`user_role_id`, `user_id`, `role_id`) VALUES
(16, 1, 1),
(17, 2, 2),
(18, 3, 2),
(19, 4, 2),
(20, 5, 2);

=======
>>>>>>> Stashed changes
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Admin','User') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
<<<<<<< Updated upstream
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `role`) VALUES
(1, 'admin', 'adminpassword', 'admin@example.com', 'Admin'),
(2, 'user1', 'user1password', 'user1@example.com', 'User'),
(3, 'user2', 'user2password', 'user2@example.com', 'User'),
(4, 'user3', 'user3password', 'user3@example.com', 'User'),
(5, 'user4', 'user4password', 'user4@example.com', 'User');

--
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `coursematerials`
--
ALTER TABLE `coursematerials`
<<<<<<< Updated upstream
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
<<<<<<< Updated upstream
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
<<<<<<< Updated upstream
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
<<<<<<< Updated upstream
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
<<<<<<< Updated upstream
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
=======
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
<<<<<<< Updated upstream
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
=======
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `usercourseprogress`
--
ALTER TABLE `usercourseprogress`
<<<<<<< Updated upstream
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `userroles`
--
ALTER TABLE `userroles`
<<<<<<< Updated upstream
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
=======
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
<<<<<<< Updated upstream
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
=======
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> Stashed changes

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `coursematerials`
--
ALTER TABLE `coursematerials`
  ADD CONSTRAINT `coursematerials_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

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
