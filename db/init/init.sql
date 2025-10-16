-- Create databases
CREATE DATABASE IF NOT EXISTS grievance_db;
CREATE DATABASE IF NOT EXISTS leave_db;
CREATE DATABASE IF NOT EXISTS timetable_db;
CREATE DATABASE IF NOT EXISTS exams_db;

-- Create user for backend if not exists
CREATE USER IF NOT EXISTS 'college_user'@'%' IDENTIFIED BY 'deereddy@123';

-- Grant privileges to user for all databases
GRANT ALL PRIVILEGES ON grievance_db.* TO 'college_user'@'%';
GRANT ALL PRIVILEGES ON leave_db.* TO 'college_user'@'%';
GRANT ALL PRIVILEGES ON timetable_db.* TO 'college_user'@'%';
GRANT ALL PRIVILEGES ON exams_db.* TO 'college_user'@'%';
FLUSH PRIVILEGES;

-- Create tables in grievance_db
USE grievance_db;
CREATE TABLE IF NOT EXISTS grievances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  student_email VARCHAR(100),
  grievance_text TEXT,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tables in leave_db
USE leave_db;
CREATE TABLE IF NOT EXISTS leave_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  roll_no VARCHAR(50),
  reason TEXT,
  from_date DATE,
  to_date DATE,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tables in timetable_db
USE timetable_db;
CREATE TABLE IF NOT EXISTS timetables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch VARCHAR(50) NOT NULL,
  semester VARCHAR(10) NOT NULL,
  timetable_json JSON NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_branch_sem (branch, semester)
);

-- Create tables in exams_db
USE exams_db;
CREATE TABLE IF NOT EXISTS exam_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch VARCHAR(50) NOT NULL,
  semester VARCHAR(10) NOT NULL DEFAULT 'all',
  exams_json JSON NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_branch (branch)
);