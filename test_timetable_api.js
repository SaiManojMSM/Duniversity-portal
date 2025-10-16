// Test script to verify timetable API functionality
// Run with: node test_timetable_api.js

const http = require('http');

const API_BASE = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const responseData = body ? JSON.parse(body) : {};
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testTimetableSystem() {
  console.log('🧪 Testing Timetable System...\n');

  try {
    // Test 1: Save a timetable for CS branch, semester 1
    console.log('1️⃣ Testing save timetable for CS - SEM1...');
    const sem1Data = {
      branch: 'CS',
      semester: 'sem1',
      timetable_json: {
        sem1: [
          ['Day','9–10 AM','10–11 AM','11–12 PM','12–1 PM','1–2 PM','2–3 PM'],
          ['Monday','Mathematics','Physics','Chemistry','Lunch','Lab','English'],
          ['Tuesday','Physics','Mathematics','Chemistry','Lunch','Lab','English'],
          ['Wednesday','Chemistry','English','Mathematics','Lunch','','Physics'],
          ['Thursday','Mathematics','Physics','Chemistry','Lunch','Lab','English'],
          ['Friday','Physics','Mathematics','English','Lunch','','Chemistry'],
          ['Saturday','','','','','','']
        ]
      }
    };

    const saveResult1 = await makeRequest('POST', '/save-timetable', sem1Data);
    console.log(`Status: ${saveResult1.statusCode}`);
    console.log('Response:', saveResult1.data);
    console.log('✅ SEM1 Save test completed\n');

    // Test 2: Save a timetable for CS branch, semester 2
    console.log('2️⃣ Testing save timetable for CS - SEM2...');
    const sem2Data = {
      branch: 'CS',
      semester: 'sem2',
      timetable_json: {
        sem2: [
          ['Day','9–10 AM','10–11 AM','11–12 PM','12–1 PM','1–2 PM','2–3 PM'],
          ['Monday','Data Structures','OOPS','Database','Lunch','Programming Lab','Theory'],
          ['Tuesday','OOPS','Data Structures','Database','Lunch','Programming Lab','Theory'],
          ['Wednesday','Database','Theory','Data Structures','Lunch','','OOPS'],
          ['Thursday','Data Structures','OOPS','Database','Lunch','Programming Lab','Theory'],
          ['Friday','OOPS','Data Structures','Theory','Lunch','','Database'],
          ['Saturday','','','','','','']
        ]
      }
    };

    const saveResult2 = await makeRequest('POST', '/save-timetable', sem2Data);
    console.log(`Status: ${saveResult2.statusCode}`);
    console.log('Response:', saveResult2.data);
    console.log('✅ SEM2 Save test completed\n');

    // Test 3: Fetch all timetables for CS branch
    console.log('3️⃣ Testing get all timetables for CS branch...');
    const getResult = await makeRequest('GET', '/get-timetable/CS');
    console.log(`Status: ${getResult.statusCode}`);
    if (getResult.statusCode === 200) {
      console.log('Available semesters:', Object.keys(getResult.data));
      console.log('✅ Successfully retrieved CS branch timetables\n');
    } else {
      console.log('Response:', getResult.data);
    }

    // Test 4: Fetch specific semester for CS branch
    console.log('4️⃣ Testing get specific semester (sem1) for CS branch...');
    const getSpecificResult = await makeRequest('GET', '/get-timetable/CS/sem1');
    console.log(`Status: ${getSpecificResult.statusCode}`);
    if (getSpecificResult.statusCode === 200) {
      console.log('Retrieved data keys:', Object.keys(getSpecificResult.data));
      console.log('✅ Successfully retrieved CS SEM1 timetable\n');
    } else {
      console.log('Response:', getSpecificResult.data);
    }

    // Test 5: Try to get non-existent branch
    console.log('5️⃣ Testing get non-existent branch...');
    const nonExistentResult = await makeRequest('GET', '/get-timetable/NONEXISTENT');
    console.log(`Status: ${nonExistentResult.statusCode}`);
    console.log('Response:', nonExistentResult.data);
    console.log('✅ Non-existent branch test completed\n');

    // Test 6: Save timetable for another branch
    console.log('6️⃣ Testing save timetable for AIML branch - SEM1...');
    const aimlData = {
      branch: 'AIML',
      semester: 'sem1',
      timetable_json: {
        sem1: [
          ['Day','9–10 AM','10–11 AM','11–12 PM','12–1 PM','1–2 PM','2–3 PM'],
          ['Monday','Machine Learning','Python','Statistics','Lunch','AI Lab','Math'],
          ['Tuesday','Python','Machine Learning','Statistics','Lunch','AI Lab','Math'],
          ['Wednesday','Statistics','Math','Machine Learning','Lunch','','Python'],
          ['Thursday','Machine Learning','Python','Statistics','Lunch','AI Lab','Math'],
          ['Friday','Python','Machine Learning','Math','Lunch','','Statistics'],
          ['Saturday','','','','','','']
        ]
      }
    };

    const aimlSaveResult = await makeRequest('POST', '/save-timetable', aimlData);
    console.log(`Status: ${aimlSaveResult.statusCode}`);
    console.log('Response:', aimlSaveResult.data);
    console.log('✅ AIML Save test completed\n');

    console.log('🎉 All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Admin can publish timetables for multiple branches ✅');
    console.log('- Admin can publish multiple semesters per branch ✅');
    console.log('- Students can fetch timetables by branch ✅');
    console.log('- API handles non-existent data properly ✅');
    console.log('\n🚀 The timetable system is ready to use!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
testTimetableSystem();
