const dotenv = require('dotenv');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');

console.log('🧪 Testing Supabase connection...');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.log('Please add your Supabase credentials to .env file:');
  console.log('SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('SUPABASE_SERVICE_KEY=your-service-role-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('');
      console.log('This usually means:');
      console.log('1. You haven\'t run the database schema in Supabase SQL Editor yet');
      console.log('2. Your Supabase credentials are incorrect');
      console.log('3. The users table doesn\'t exist');
    } else {
      console.log('✅ Database connection successful!');
      console.log('✅ Users table exists and is accessible');
      console.log('✅ Database is ready for use!');
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

testConnection();