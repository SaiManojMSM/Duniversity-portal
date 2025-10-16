const mysql = require('mysql2');

// Load env variables
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  GRIEVANCE_DB,
  LEAVE_DB,
  TIMETABLE_DB,
  EXAMS_DB,
  DB_PORT
} = process.env;

// Debug: log loaded env values (except passwords)
console.log('🔹 DB_HOST:', DB_HOST);
console.log('🔹 DB_USER:', DB_USER);
console.log('🔹 GRIEVANCE_DB:', GRIEVANCE_DB);
console.log('🔹 LEAVE_DB:', LEAVE_DB);
console.log('🔹 TIMETABLE_DB:', TIMETABLE_DB);
console.log('🔹 EXAMS_DB:', EXAMS_DB);
console.log('🔹 DB_PORT:', DB_PORT);

// Function to create a DB pool
function createPool(database) {
  return mysql.createPool({
    host: DB_HOST || 'mariadb',           // fallback to Docker Compose service name
    user: DB_USER || 'college_user',
    password: DB_PASSWORD || 'deereddy@123',
    database: database,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

// Grievance DB
const grievanceDB = createPool('grievance_db');
grievanceDB.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed (grievance_db):', err.message);
  } else {
    console.log('✅ Connected to MySQL database: grievance_db');
    connection.release();
  }
});

// Leave DB
const leaveDB = createPool('leave_db');
leaveDB.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed (leave_db):', err.message);
  } else {
    console.log('✅ Connected to MySQL database: leave_db');
    connection.release();
  }
});

// Timetable DB
const timetableDB = createPool('timetable_db');
timetableDB.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed (timetable_db):', err.message);
  } else {
    console.log('✅ Connected to MySQL database: timetable_db');
    connection.release();
  }
});

// Exams DB
const examsDB = createPool('exams_db');
examsDB.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed (exams_db):', err.message);
  } else {
    console.log('✅ Connected to MySQL database: exams_db');
    connection.release();
  }
});

module.exports = {
  grievanceDB,
  leaveDB,
  timetableDB,
  examsDB
};
