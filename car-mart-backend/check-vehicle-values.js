// check-vehicle-values.js - Check what values are actually in your vehicles table
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

async function checkVehicleValues() {
  try {
    console.log('🔍 Checking vehicle values in database...\n');

    // Get all vehicles with the fields we need for filtering
    const { data: vehicles, error } = await supabase
      .from('vehicles')
      .select('id, title, make, model, fuel_type, body_type, transmission, price, year, location')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching vehicles:', error.message);
      return;
    }

    if (!vehicles || vehicles.length === 0) {
      console.log('⚠️ No vehicles found in database');
      console.log('💡 You need to add some sample vehicle data to test filtering');
      return;
    }

    console.log(`✅ Found ${vehicles.length} vehicles in database\n`);

    // Show first few vehicles as examples
    console.log('📋 SAMPLE VEHICLES:');
    console.log('==================');
    vehicles.slice(0, 3).forEach((vehicle, index) => {
      console.log(`${index + 1}. ${vehicle.title}`);
      console.log(`   Make: "${vehicle.make}"`);
      console.log(`   Fuel: "${vehicle.fuel_type}"`);
      console.log(`   Body: "${vehicle.body_type}"`);
      console.log(`   Trans: "${vehicle.transmission}"`);
      console.log(`   Price: ${vehicle.price}`);
      console.log(`   Year: ${vehicle.year}`);
      console.log('');
    });

    // Extract unique values for each filter field
    const uniqueMakes = [...new Set(vehicles.map(v => v.make).filter(Boolean))].sort();
    const uniqueFuelTypes = [...new Set(vehicles.map(v => v.fuel_type).filter(Boolean))].sort();
    const uniqueBodyTypes = [...new Set(vehicles.map(v => v.body_type).filter(Boolean))].sort();
    const uniqueTransmissions = [...new Set(vehicles.map(v => v.transmission).filter(Boolean))].sort();
    
    // Get price range
    const prices = vehicles.map(v => v.price).filter(p => p && !isNaN(p));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    console.log('🎯 EXACT DATABASE VALUES FOR FILTERS:');
    console.log('=====================================');
    console.log('MAKE values:', JSON.stringify(uniqueMakes, null, 2));
    console.log('FUEL_TYPE values:', JSON.stringify(uniqueFuelTypes, null, 2));
    console.log('BODY_TYPE values:', JSON.stringify(uniqueBodyTypes, null, 2));
    console.log('TRANSMISSION values:', JSON.stringify(uniqueTransmissions, null, 2));
    console.log(`PRICE range: ${minPrice} to ${maxPrice}`);
    console.log('');

    console.log('🔧 FRONTEND FILTER CONFIG UPDATES NEEDED:');
    console.log('=========================================');

    // Generate exact filter options code
    if (uniqueMakes.length > 0) {
      console.log('For MAKE filter options, use these values:');
      uniqueMakes.forEach(make => {
        const slug = make.toLowerCase().replace(/\s+/g, '-');
        console.log(`  { value: '${make}', label: '${make}', count: ${vehicles.filter(v => v.make === make).length} },`);
      });
      console.log('');
    }

    if (uniqueFuelTypes.length > 0) {
      console.log('For FUEL_TYPE filter options, use these values:');
      uniqueFuelTypes.forEach(fuel => {
        console.log(`  { value: '${fuel}', label: '${fuel}', count: ${vehicles.filter(v => v.fuel_type === fuel).length} },`);
      });
      console.log('');
    }

    if (uniqueBodyTypes.length > 0) {
      console.log('For BODY_TYPE filter options, use these values:');
      uniqueBodyTypes.forEach(body => {
        console.log(`  { value: '${body}', label: '${body}', count: ${vehicles.filter(v => v.body_type === body).length} },`);
      });
      console.log('');
    }

    if (uniqueTransmissions.length > 0) {
      console.log('For TRANSMISSION filter options, use these values:');
      uniqueTransmissions.forEach(trans => {
        console.log(`  { value: '${trans}', label: '${trans}', count: ${vehicles.filter(v => v.transmission === trans).length} },`);
      });
      console.log('');
    }

    console.log('💡 RECOMMENDED PRICE FILTER RANGES:');
    console.log('===================================');
    if (minPrice && maxPrice) {
      const ranges = [
        { min: 0, max: 500000, label: 'Under ₹5L' },
        { min: 500000, max: 1000000, label: '₹5L - ₹10L' },
        { min: 1000000, max: 1500000, label: '₹10L - ₹15L' },
        { min: 1500000, max: 2000000, label: '₹15L - ₹20L' },
        { min: 2000000, max: 999999999, label: 'Above ₹20L' }
      ];

      ranges.forEach(range => {
        const count = vehicles.filter(v => v.price >= range.min && v.price < range.max).length;
        if (count > 0) {
          console.log(`  ${range.label}: ${count} vehicles`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the check
checkVehicleValues().then(() => {
  console.log('\n✅ Database check complete!');
  console.log('Now you can update your frontend filter config with the exact values above.');
  process.exit(0);
});