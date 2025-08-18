// Create: car-mart-backend/simple-test.js
// Simple test that definitely works

const dotenv = require('dotenv');
dotenv.config();

console.log('🔍 SIMPLE BACKEND TEST...\n');

// Check environment variables first
console.log('📋 Environment Variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET ✅' : 'MISSING ❌');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'SET ✅' : 'MISSING ❌');
console.log('');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.log('❌ Missing environment variables!');
  console.log('Check your .env file in car-mart-backend folder');
  process.exit(1);
}

// Test Supabase connection
async function testSupabase() {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('🔌 Testing Supabase connection...');
    
    // Simple count query
    const { data, error, count } = await supabase
      .from('services')
      .select('*', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.log('❌ Supabase Error:', error.message);
      return false;
    }
    
    console.log('✅ Supabase Connected!');
    console.log(`📊 Services table: ${count || 0} total rows`);
    
    if (data && data.length > 0) {
      console.log(`📝 Sample service: ${data[0].title || 'No title'}`);
    }
    
    return true;
    
  } catch (err) {
    console.log('❌ Connection failed:', err.message);
    return false;
  }
}

// Test your Express server endpoints
async function testExpressEndpoints() {
  console.log('\n🚀 Testing Express API endpoints...');
  
  try {
    const response = await fetch('http://localhost:3001/api/services');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend API working!');
      console.log(`📊 API returned ${data.length || 0} services`);
      
      if (data.length > 0) {
        console.log(`📝 First service: ${data[0].title || 'No title'}`);
      }
    } else {
      console.log(`❌ API responded with status: ${response.status}`);
    }
    
  } catch (err) {
    console.log('❌ API call failed:', err.message);
    console.log('💡 Make sure your backend is running: npm run dev');
  }
}

// Run tests
(async () => {
  const supabaseWorking = await testSupabase();
  
  if (supabaseWorking) {
    await testExpressEndpoints();
  }
  
  console.log('\n🎯 SUMMARY:');
  console.log('Your backend setup is being tested...');
  console.log('If you see ✅ marks above, things are working!');
})();