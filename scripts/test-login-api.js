const fetch = require('node-fetch');

const TEST_ACCOUNTS = [
  { email: 'admin@youspeak.com', password: '123456', role: 'ADMIN', name: 'Mister Youssef' },
  { email: 'teacher@youspeak.com', password: '123456', role: 'TEACHER', name: 'Sarah Ahmed' },
  { email: 'ahmed@student.com', password: '123456', role: 'STUDENT', name: 'Ahmed Ali' },
];

async function testLogin(account) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: account.email,
        password: account.password,
        redirect: false,
      }),
    });

    const result = await response.text();
    return {
      ...account,
      success: response.ok,
      status: response.status,
      response: result.substring(0, 100),
    };
  } catch (err) {
    return {
      ...account,
      success: false,
      error: err.message,
    };
  }
}

async function runTests() {
  console.log('🧪 Testing login for all user roles...\n');
  console.log('================================\n');

  for (const account of TEST_ACCOUNTS) {
    console.log(`Testing ${account.role} - ${account.name}`);
    console.log(`Email: ${account.email}`);
    
    const result = await testLogin(account);
    
    if (result.success) {
      console.log('✅ Login successful');
    } else {
      console.log('❌ Login failed');
      console.log('Error:', result.error || `HTTP ${result.status}`);
    }
    
    console.log('--------------------------------\n');
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('All tests completed!');
}

runTests();
