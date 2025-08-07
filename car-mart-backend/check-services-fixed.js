// check-services-fixed.js - Check what values are actually in your SERVICES table
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

async function checkServicesValues() {
  try {
    console.log('🔍 Checking SERVICES values in database...\n');

    // Get all services with the fields we need for filtering
    const { data: services, error } = await supabase
      .from('services')
      .select('id, title, service_type, location, price, price_type, home_service, pickup_dropoff, emergency_service, online_booking, equipment_type, is_featured, is_active')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching services:', error.message);
      return;
    }

    if (!services || services.length === 0) {
      console.log('⚠️ No services found in database');
      console.log('💡 You need to add some sample service data to test filtering');
      console.log('📝 Sample service data you can insert:');
      console.log(`
INSERT INTO services (title, service_type, location, price, price_type, home_service, pickup_dropoff, emergency_service, user_id) 
VALUES 
('Expert Auto Repair Shop', 'Repair', 'Colombo', 5000, 'fixed', false, true, false, '00000000-0000-0000-0000-000000000000'),
('Premium Car Detailing', 'Maintenance', 'Kandy', 3000, 'fixed', true, false, false, '00000000-0000-0000-0000-000000000000'),
('24/7 Towing Service', 'Emergency', 'Galle', 8000, 'hourly', false, false, true, '00000000-0000-0000-0000-000000000000'),
('Mobile Mechanic Service', 'Repair', 'Colombo', 4000, 'hourly', true, false, true, '00000000-0000-0000-0000-000000000000');
      `);
      return;
    }

    console.log(`✅ Found ${services.length} services in database\n`);

    // Show first few services as examples
    console.log('📋 SAMPLE SERVICES:');
    console.log('==================');
    services.slice(0, 3).forEach((service, index) => {
      console.log(`${index + 1}. ${service.title}`);
      console.log(`   Type: "${service.service_type}"`);
      console.log(`   Location: "${service.location}"`);
      console.log(`   Price: ₹${service.price}`);
      console.log(`   Price Type: "${service.price_type}"`);
      console.log(`   Home Service: ${service.home_service}`);
      console.log(`   Pickup/Dropoff: ${service.pickup_dropoff}`);
      console.log(`   Emergency: ${service.emergency_service}`);
      console.log(`   Online Booking: ${service.online_booking}`);
      console.log('');
    });

    // Extract unique values for each filter field
    const uniqueServiceTypes = [...new Set(services.map(s => s.service_type).filter(Boolean))].sort();
    const uniqueLocations = [...new Set(services.map(s => s.location).filter(Boolean))].sort();
    const uniquePriceTypes = [...new Set(services.map(s => s.price_type).filter(Boolean))].sort();
    const uniqueEquipmentTypes = [...new Set(services.map(s => s.equipment_type).filter(Boolean))].sort();
    
    // Get price range
    const prices = services.map(s => s.price).filter(p => p && !isNaN(p));
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    // Count boolean filters
    const homeServiceCount = services.filter(s => s.home_service).length;
    const pickupDropoffCount = services.filter(s => s.pickup_dropoff).length;
    const emergencyCount = services.filter(s => s.emergency_service).length;
    const onlineBookingCount = services.filter(s => s.online_booking).length;

    console.log('🎯 EXACT DATABASE VALUES FOR SERVICE FILTERS:');
    console.log('============================================');
    console.log('SERVICE_TYPE values:', JSON.stringify(uniqueServiceTypes, null, 2));
    console.log('LOCATION values:', JSON.stringify(uniqueLocations, null, 2));
    console.log('PRICE_TYPE values:', JSON.stringify(uniquePriceTypes, null, 2));
    console.log('EQUIPMENT_TYPE values:', JSON.stringify(uniqueEquipmentTypes, null, 2));
    console.log(`PRICE range: ₹${minPrice} to ₹${maxPrice}`);
    console.log(`HOME_SERVICE: ${homeServiceCount} yes, ${services.length - homeServiceCount} no`);
    console.log(`PICKUP_DROPOFF: ${pickupDropoffCount} yes, ${services.length - pickupDropoffCount} no`);
    console.log(`EMERGENCY: ${emergencyCount} yes, ${services.length - emergencyCount} no`);
    console.log(`ONLINE_BOOKING: ${onlineBookingCount} yes, ${services.length - onlineBookingCount} no`);
    console.log('');

    console.log('🔧 FRONTEND SERVICE FILTER CONFIG UPDATES NEEDED:');
    console.log('================================================');

    // Generate exact filter options code
    if (uniqueServiceTypes.length > 0) {
      console.log('For SERVICE_TYPE filter options, use these values:');
      uniqueServiceTypes.forEach(serviceType => {
        console.log(`  { value: '${serviceType}', label: '${serviceType}', count: ${services.filter(s => s.service_type === serviceType).length} },`);
      });
      console.log('');
    }

    if (uniqueLocations.length > 0) {
      console.log('For LOCATION filter options, use these values:');
      uniqueLocations.forEach(location => {
        console.log(`  { value: '${location}', label: '${location}', count: ${services.filter(s => s.location === location).length} },`);
      });
      console.log('');
    }

    if (uniquePriceTypes.length > 0) {
      console.log('For PRICE_TYPE filter options, use these values:');
      uniquePriceTypes.forEach(priceType => {
        console.log(`  { value: '${priceType}', label: '${priceType}', count: ${services.filter(s => s.price_type === priceType).length} },`);
      });
      console.log('');
    }

    if (homeServiceCount > 0 || (services.length - homeServiceCount) > 0) {
      console.log('For HOME_SERVICE filter options, use these values:');
      if (homeServiceCount > 0) console.log(`  { value: 'true', label: 'Home Service Available', count: ${homeServiceCount} },`);
      if ((services.length - homeServiceCount) > 0) console.log(`  { value: 'false', label: 'Shop Only', count: ${services.length - homeServiceCount} },`);
      console.log('');
    }

    if (emergencyCount > 0 || (services.length - emergencyCount) > 0) {
      console.log('For EMERGENCY_SERVICE filter options, use these values:');
      if (emergencyCount > 0) console.log(`  { value: 'true', label: 'Emergency Service', count: ${emergencyCount} },`);
      if ((services.length - emergencyCount) > 0) console.log(`  { value: 'false', label: 'Regular Service', count: ${services.length - emergencyCount} },`);
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the check
checkServicesValues().then(() => {
  console.log('\n✅ Services database check complete!');
  console.log('Now you can update your frontend service filter config with the exact values above.');
  process.exit(0);
});