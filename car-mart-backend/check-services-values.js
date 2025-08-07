// check-rentals-values.js - Check what values are actually in your rentals table
const dotenv = require('dotenv');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRentalsValues() {
  try {
    console.log('🔍 Checking rentals values in database...\n');

    // Get all rentals with the fields we need for filtering
    const { data: rentals, error } = await supabase
      .from('rentals')
      .select('id, title, make, model, body_type, fuel_type, transmission, daily_rate, location, delivery_available, insurance_included, seats, doors')
      .eq('is_active', true)
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching rentals:', error.message);
      
      // Check if rentals table exists
      if (error.message.includes('relation "rentals" does not exist')) {
        console.log('🚨 RENTALS TABLE DOES NOT EXIST');
        console.log('💡 You need to create the rentals table first in your Supabase database.');
        console.log('📝 SQL to create rentals table:');
        console.log(`
CREATE TABLE rentals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    daily_rate DECIMAL(10,2) NOT NULL,
    weekly_rate DECIMAL(10,2),
    monthly_rate DECIMAL(10,2),
    location VARCHAR(100) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    body_type VARCHAR(50) NOT NULL,
    seats INTEGER,
    doors INTEGER,
    rental_type VARCHAR(50) DEFAULT 'daily' CHECK (rental_type IN ('hourly', 'daily', 'weekly', 'monthly')),
    minimum_days INTEGER DEFAULT 1,
    maximum_days INTEGER DEFAULT 30,
    delivery_available BOOLEAN DEFAULT false,
    pickup_available BOOLEAN DEFAULT false,
    insurance_included BOOLEAN DEFAULT false,
    security_deposit DECIMAL(10,2),
    mileage_limit INTEGER,
    images JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    terms_conditions TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    bookings_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
        `);
        return;
      }
      return;
    }

    if (!rentals || rentals.length === 0) {
      console.log('⚠️ No rentals found in database');
      console.log('💡 You need to add some sample rental data to test filtering');
      console.log('📝 Sample rental data you can insert:');
      console.log(`
INSERT INTO rentals (title, make, model, year, daily_rate, location, fuel_type, transmission, body_type, rental_type, user_id) 
VALUES 
('Honda Civic - Daily Rental', 'Honda', 'Civic', 2022, 5500, 'Colombo', 'Petrol', 'Automatic', 'Sedan', 'daily', '00000000-0000-0000-0000-000000000000'),
('Toyota Prius - Eco Rental', 'Toyota', 'Prius', 2023, 6500, 'Kandy', 'Hybrid', 'CVT', 'Sedan', 'daily', '00000000-0000-0000-0000-000000000000'),
('BMW X3 - Luxury SUV', 'BMW', 'X3', 2023, 12000, 'Colombo', 'Petrol', 'Automatic', 'SUV', 'daily', '00000000-0000-0000-0000-000000000000');
      `);
      return;
    }

    console.log(`✅ Found ${rentals.length} rentals in database\n`);

    // Show first few rentals as examples
    console.log('📋 SAMPLE RENTALS:');
    console.log('==================');
    rentals.slice(0, 3).forEach((rental, index) => {
      console.log(`${index + 1}. ${rental.title}`);
      console.log(`   Make: "${rental.make}"`);
      console.log(`   Body Type: "${rental.body_type}"`);
      console.log(`   Fuel: "${rental.fuel_type}"`);
      console.log(`   Transmission: "${rental.transmission}"`);
      console.log(`   Daily Rate: ₹${rental.daily_rate}`);
      console.log(`   Location: "${rental.location}"`);
      console.log(`   Delivery: ${rental.delivery_available}`);
      console.log(`   Insurance: ${rental.insurance_included}`);
      console.log('');
    });

    // Extract unique values for each filter field
    const uniqueMakes = [...new Set(rentals.map(r => r.make).filter(Boolean))].sort();
    const uniqueBodyTypes = [...new Set(rentals.map(r => r.body_type).filter(Boolean))].sort();
    const uniqueFuelTypes = [...new Set(rentals.map(r => r.fuel_type).filter(Boolean))].sort();
    const uniqueTransmissions = [...new Set(rentals.map(r => r.transmission).filter(Boolean))].sort();
    const uniqueLocations = [...new Set(rentals.map(r => r.location).filter(Boolean))].sort();
    
    // Get price range
    const rates = rentals.map(r => r.daily_rate).filter(r => r && !isNaN(r));
    const minRate = rates.length > 0 ? Math.min(...rates) : 0;
    const maxRate = rates.length > 0 ? Math.max(...rates) : 0;

    console.log('🎯 EXACT DATABASE VALUES FOR RENTAL FILTERS:');
    console.log('===========================================');
    console.log('MAKE values:', JSON.stringify(uniqueMakes, null, 2));
    console.log('BODY_TYPE values:', JSON.stringify(uniqueBodyTypes, null, 2));
    console.log('FUEL_TYPE values:', JSON.stringify(uniqueFuelTypes, null, 2));
    console.log('TRANSMISSION values:', JSON.stringify(uniqueTransmissions, null, 2));
    console.log('LOCATION values:', JSON.stringify(uniqueLocations, null, 2));
    console.log(`DAILY_RATE range: ₹${minRate} to ₹${maxRate}`);
    console.log('');

    console.log('🔧 FRONTEND RENTAL FILTER CONFIG UPDATES NEEDED:');
    console.log('===============================================');

    // Generate exact filter options code
    if (uniqueMakes.length > 0) {
      console.log('For MAKE filter options, use these values:');
      uniqueMakes.forEach(make => {
        console.log(`  { value: '${make}', label: '${make}', count: ${rentals.filter(r => r.make === make).length} },`);
      });
      console.log('');
    }

    if (uniqueBodyTypes.length > 0) {
      console.log('For BODY_TYPE filter options, use these values:');
      uniqueBodyTypes.forEach(bodyType => {
        console.log(`  { value: '${bodyType}', label: '${bodyType}', count: ${rentals.filter(r => r.body_type === bodyType).length} },`);
      });
      console.log('');
    }

    if (uniqueFuelTypes.length > 0) {
      console.log('For FUEL_TYPE filter options, use these values:');
      uniqueFuelTypes.forEach(fuelType => {
        console.log(`  { value: '${fuelType}', label: '${fuelType}', count: ${rentals.filter(r => r.fuel_type === fuelType).length} },`);
      });
      console.log('');
    }

    if (uniqueTransmissions.length > 0) {
      console.log('For TRANSMISSION filter options, use these values:');
      uniqueTransmissions.forEach(transmission => {
        console.log(`  { value: '${transmission}', label: '${transmission}', count: ${rentals.filter(r => r.transmission === transmission).length} },`);
      });
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the check
checkRentalsValues().then(() => {
  console.log('\n✅ Rentals database check complete!');
  console.log('Now you can update your frontend rental filter config with the exact values above.');
  process.exit(0);
});