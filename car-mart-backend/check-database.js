// Create this file: car-mart-backend/check-database.js
// Run with: node check-database.js

const dotenv = require('dotenv');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 CHECKING DATABASE STATUS...\n');

  try {
    // 1. Check if tables exist
    console.log('1️⃣ CHECKING TABLES...');
    const tables = ['users', 'vehicles', 'parts', 'services', 'favorites'];
    
    for (const table of tables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ ${table} table: ERROR - ${error.message}`);
        } else {
          console.log(`✅ ${table} table: EXISTS (${count || 0} rows)`);
        }
      } catch (err) {
        console.log(`❌ ${table} table: ERROR - ${err.message}`);
      }
    }

    console.log('\n2️⃣ CHECKING USERS TABLE DATA...');
    try {
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, account_type, created_at')
        .limit(5);
      
      if (usersError) {
        console.log('❌ Users query error:', usersError.message);
      } else {
        console.log(`📊 Found ${users.length} users:`);
        users.forEach(user => {
          console.log(`   - ${user.email} (${user.first_name} ${user.last_name}) - ID: ${user.id}`);
        });
      }
    } catch (err) {
      console.log('❌ Users check failed:', err.message);
    }

    console.log('\n3️⃣ CHECKING VEHICLES TABLE DATA...');
    try {
      const { data: vehicles, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('id, title, make, model, year, price, user_id, is_active, created_at')
        .limit(10);
      
      if (vehiclesError) {
        console.log('❌ Vehicles query error:', vehiclesError.message);
      } else {
        console.log(`🚗 Found ${vehicles.length} vehicles:`);
        if (vehicles.length === 0) {
          console.log('   📝 No vehicles in database - this is why you get 500 error!');
        } else {
          vehicles.forEach(vehicle => {
            console.log(`   - ${vehicle.title} (${vehicle.make} ${vehicle.model}) - ID: ${vehicle.id}`);
            console.log(`     Price: $${vehicle.price}, Active: ${vehicle.is_active}, User: ${vehicle.user_id}`);
          });
        }
      }
    } catch (err) {
      console.log('❌ Vehicles check failed:', err.message);
    }

    console.log('\n4️⃣ CHECKING DATABASE FUNCTIONS...');
    try {
      // Try to call the increment function to see if it exists
      const { data, error } = await supabase
        .rpc('increment_vehicle_views', { vehicle_id: '00000000-0000-0000-0000-000000000000' });
      
      if (error) {
        if (error.message.includes('function increment_vehicle_views')) {
          console.log('❌ increment_vehicle_views function: MISSING - this causes 500 errors');
        } else {
          console.log('✅ increment_vehicle_views function: EXISTS (got expected error for fake UUID)');
        }
      } else {
        console.log('✅ increment_vehicle_views function: EXISTS');
      }
    } catch (err) {
      console.log('❌ Function check failed:', err.message);
    }

    console.log('\n5️⃣ TESTING VEHICLE BY ID QUERY...');
    // Test the exact query that's failing
    try {
      const { data: testVehicle, error: testError } = await supabase
        .from('vehicles')
        .select(`
          *,
          users!vehicles_user_id_fkey (
            first_name,
            last_name,
            phone,
            location,
            email
          )
        `)
        .eq('id', '1') // This is what's failing
        .eq('is_active', true)
        .single();
      
      if (testError) {
        console.log(`❌ Query for vehicle ID "1" failed: ${testError.message}`);
        console.log('💡 This is expected - "1" is not a valid UUID format');
      } else {
        console.log('✅ Query worked (unexpected)');
      }
    } catch (err) {
      console.log('❌ Test query failed:', err.message);
    }

    console.log('\n📋 SUMMARY:');
    console.log('================');
    
    // Summary checks
    const { data: vehicleCount } = await supabase
      .from('vehicles')
      .select('*', { count: 'exact', head: true });
    
    const { data: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    console.log(`👥 Users: ${userCount?.length || 0}`);
    console.log(`🚗 Vehicles: ${vehicleCount?.length || 0}`);
    
    if (vehicleCount?.length === 0) {
      console.log('\n🚨 PROBLEM IDENTIFIED:');
      console.log('   - Your vehicles table is empty');
      console.log('   - Frontend is trying to fetch vehicle ID "1"');
      console.log('   - No vehicle with ID "1" exists = 500 error');
    }

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  }
}

checkDatabase();