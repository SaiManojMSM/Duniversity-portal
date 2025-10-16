-------greivances-----------

USE grievance_db;
DROP TABLE IF EXISTS grievances;

--  Create the grievances table
CREATE TABLE grievances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  student_email VARCHAR(100),
  grievance_text TEXT,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  View all entries in the grievances table
SELECT * FROM grievances;


---------Leave application -----


-- 1. Create the database
CREATE DATABASE IF NOT EXISTS leave_db;

-- 2. Use the database
USE leave_db;

-- 3. Drop the table if it exists
DROP TABLE IF EXISTS leave_requests;

-- 4. Create the leave_requests table
CREATE TABLE leave_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  roll_no VARCHAR(50),
  reason TEXT,
  from_date DATE,
  to_date DATE,
  status enum('pending', 'accepted', 'rejected') DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. View all entries in the leave_requests table
SELECT * FROM leave_requests;
DESCRIBE leave_requests;


-- 1. Create the timetable database
CREATE DATABASE IF NOT EXISTS timetable_db;

-- 2. Use the timetable database
USE timetable_db;

-- 3. Drop the table if it exists
DROP TABLE IF EXISTS timetables;

-- 4. Create the timetables table
CREATE TABLE timetables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch VARCHAR(50) NOT NULL,
  semester VARCHAR(10) NOT NULL,
  timetable_json JSON NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_branch_sem (branch, semester)
);

-- 5. View all entries in the timetables table
SELECT * FROM timetables;

