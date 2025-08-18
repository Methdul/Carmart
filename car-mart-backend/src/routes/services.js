// Replace your car-mart-backend/src/routes/services.js with this:

const express = require('express');
const router = express.Router();
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Direct Supabase connection
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// GET /api/services - Get all services (simplified for MVP)
router.get('/', optionalAuth, async (req, res) => {
  try {
    console.log('📋 Fetching all services...');
    
    // Simple query to get all active services
    const { data, error, count } = await supabase
      .from('services')
      .select(`
        *,
        users!services_user_id_fkey (
          first_name,
          last_name,
          phone,
          email,
          location
        )
      `, { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Database error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`✅ Found ${data.length} active services`);

    // Apply basic search filter if provided
    let filteredData = data;
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredData = data.filter(service => 
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.service_type.toLowerCase().includes(searchTerm)
      );
      console.log(`🔍 Search "${req.query.search}" found ${filteredData.length} results`);
    }

    // Apply location filter if provided
    if (req.query.location && req.query.location !== 'all') {
      filteredData = filteredData.filter(service => 
        service.location.toLowerCase().includes(req.query.location.toLowerCase())
      );
      console.log(`📍 Location filter "${req.query.location}" found ${filteredData.length} results`);
    }

    res.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      totalInDatabase: count,
      message: `Found ${filteredData.length} services`
    });

  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: error.message,
      debug: 'Check if SUPABASE_URL and SUPABASE_ANON_KEY are set correctly'
    });
  }
});

// GET /api/services/:id - Get single service by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    console.log(`🔍 Fetching service with ID: ${req.params.id}`);
    
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        users!services_user_id_fkey (
          first_name,
          last_name,
          phone,
          email,
          location,
          account_type
        )
      `)
      .eq('id', req.params.id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`✅ Found service: ${data.title}`);
    
    // Increment view count (optional)
    try {
      await supabase
        .from('services')
        .update({ 
          views_count: (data.views_count || 0) + 1 
        })
        .eq('id', req.params.id);
    } catch (viewError) {
      console.log('📊 Note: Could not increment view count:', viewError.message);
    }

    res.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('❌ Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error: error.message
    });
  }
});

// POST /api/services - Create new service (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🆕 Creating service for user: ${req.user.id}`);
    
    // Validate required fields
    const requiredFields = ['title', 'service_type', 'description', 'price', 'location'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Prepare service data
    const serviceData = {
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      service_type: req.body.service_type,
      price: parseFloat(req.body.price),
      price_type: req.body.price_type || 'fixed',
      location: req.body.location,
      duration: req.body.duration,
      features: req.body.features ? JSON.stringify(req.body.features) : '[]',
      home_service: req.body.home_service || false,
      pickup_dropoff: req.body.pickup_dropoff || false,
      emergency_service: req.body.emergency_service || false,
      online_booking: req.body.online_booking || false,
      is_active: true,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('services')
      .insert([serviceData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }

    console.log(`✅ Created service: ${data.title}`);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: data
    });

  } catch (error) {
    console.error('❌ Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
});

// Test endpoint to check database connection
router.get('/test/connection', async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from('services')
      .select('title, service_type, price, location', { count: 'exact' })
      .limit(3);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: 'Database connection working!',
      totalServices: count,
      sampleServices: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

module.exports = router;