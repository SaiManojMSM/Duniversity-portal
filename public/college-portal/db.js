const mysql = require('mysql2');

const grievanceDB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'college_user',
  password: process.env.DB_PASSWORD || 'deereddy@123',
  database: 'grievance_db'
});

const leaveDB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'college_user',
  password: process.env.DB_PASSWORD || 'deereddy@123',
  database: 'leave_db'
});

const timetableDB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'college_user',
  password: process.env.DB_PASSWORD || 'deereddy@123',
  database: 'timetable_db'
});

const examsDB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'college_user',
  password: process.env.DB_PASSWORD || 'deereddy@123',
  database: 'exams_db'
});

module.exports = {
  grievanceDB,
  leaveDB,
  timetableDB,
  examsDB
};