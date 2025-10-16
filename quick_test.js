// Quick test to check the timetable API
const http = require('http');

function testAPI() {
  console.log('🔍 Testing CS branch timetable endpoint...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/get-timetable/CS',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      try {
        const parsed = JSON.parse(data);
        console.log('Response:', parsed);
        if (parsed.sem1) {
          console.log('✅ Found sem1 data!');
        }
        if (parsed.sem2) {
          console.log('✅ Found sem2 data!');
        }
      } catch (e) {
        console.log('Response (raw):', data.substring(0, 200) + '...');
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ Request failed:', err.message);
  });

  req.end();
}

// Wait a moment for server to be ready
setTimeout(testAPI, 2000);
