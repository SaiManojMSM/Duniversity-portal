-- Timetable Database Setup Script
-- Run this in MySQL Workbench to ensure proper database structure

-- 1. Use the correct database
USE timetable_db;

-- 2. Drop the table if it exists to start fresh
DROP TABLE IF EXISTS timetables;

-- 3. Create the timetables table with correct structure
CREATE TABLE timetables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch VARCHAR(50) NOT NULL,
  semester VARCHAR(10) NOT NULL DEFAULT 'all',
  timetable_json JSON NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_branch_sem (branch, semester)
);

-- 4. Verify the table structure
DESCRIBE timetables;

-- 5. View all entries in the timetables table (should be empty initially)
SELECT * FROM timetables;

-- 6. Optional: Insert sample data for testing (uncomment if needed)
/*
INSERT INTO timetables (branch, semester, timetable_json) VALUES 
(
  'CS', 
  'all',
  JSON_OBJECT(
    'sem1', JSON_ARRAY(
      JSON_ARRAY('Day','9–10 AM','10–11 AM','11–12 PM','12–1 PM','1–2 PM','2–3 PM'),
      JSON_ARRAY('Monday','Math','Physics','','Lunch','Lab',''),
      JSON_ARRAY('Tuesday','Physics','Math','','Lunch','Lab',''),
      JSON_ARRAY('Wednesday','Chemistry','','','Lunch','',''),
      JSON_ARRAY('Thursday','Math','Physics','','Lunch','Lab',''),
      JSON_ARRAY('Friday','Physics','Math','','Lunch','',''),
      JSON_ARRAY('Saturday','','','','','','')
    ),
    'sem2', JSON_ARRAY(
      JSON_ARRAY('Day','9–10 AM','10–11 AM','11–12 PM','12–1 PM','1–2 PM','2–3 PM'),
      JSON_ARRAY('Monday','Data Structures','OOPS','','Lunch','Lab',''),
      JSON_ARRAY('Tuesday','OOPS','Data Structures','','Lunch','Lab',''),
      JSON_ARRAY('Wednesday','Database','','','Lunch','',''),
      JSON_ARRAY('Thursday','Data Structures','OOPS','','Lunch','Lab',''),
      JSON_ARRAY('Friday','OOPS','Data Structures','','Lunch','',''),
      JSON_ARRAY('Saturday','','','','','','')
    )
  )
);
*/

SHOW TABLE STATUS WHERE Name = 'timetables';
