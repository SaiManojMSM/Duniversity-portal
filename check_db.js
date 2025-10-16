// Check what's in the timetable database
const mysql = require('mysql2');

const timetableDB = mysql.createConnection({
  host: 'localhost',
  user: 'college_user',
  password: 'deereddy@123',
  database: 'timetable_db'
});

timetableDB.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  
  console.log('✅ Connected to timetable_db');
  
  // Check table structure
  timetableDB.query('DESCRIBE timetables', (err, results) => {
    if (err) {
      console.error('Error describing table:', err);
      return;
    }
    
    console.log('\n📊 Table Structure:');
    console.table(results);
    
    // Check data
    timetableDB.query('SELECT * FROM timetables', (err, results) => {
      if (err) {
        console.error('Error selecting data:', err);
        return;
      }
      
      console.log('\n📋 Current Data:');
      results.forEach((row, index) => {
        console.log(`\nRow ${index + 1}:`);
        console.log('ID:', row.id);
        console.log('Branch:', row.branch);
        console.log('Semester:', row.semester);
        console.log('JSON Data Type:', typeof row.timetable_json);
        console.log('JSON Data:', JSON.stringify(row.timetable_json, null, 2));
        console.log('Published At:', row.published_at);
      });
      
      timetableDB.end();
    });
  });
});
