// car-mart-backend/src/routes/services.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');

// GET /api/services - Get all services with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      serviceType, 
      location, 
      minPrice, 
      maxPrice,
      isActive = true 
    } = req.query;
    
    let query = supabase
      .from('services')
      .select(`
        *,
        users (
          first_name,
          last_name,
          phone,
          location,
          is_verified
        )
      `)
      .eq('is_active', isActive);
    
    // Apply filters
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,service_type.ilike.%${search}%`
      );
    }
    
    if (serviceType && serviceType !== 'all') {
      query = query.eq('service_type', serviceType);
    }
    
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    
    if (minPrice) {
      query = query.gte('price', parseInt(minPrice));
    }
    
    if (maxPrice) {
      query = query.lte('price', parseInt(maxPrice));
    }
    
    // Order by featured first, then by creation date
    query = query.order('is_featured', { ascending: false })
                 .order('created_at', { ascending: false });

    const { data: services, error } = await query;

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      count: services.length,
      data: services || []
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/services/:id - Get single service
router.get('/:id', async (req, res) => {
  try {
    const { data: service, error } = await supabase
      .from('services')
      .select(`
        *,
        users (
          first_name,
          last_name,
          phone,
          location,
          is_verified,
          account_type
        )
      `)
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST /api/services - Create new service (protected route)
router.post('/', async (req, res) => {
  try {
    // For now, return placeholder - will add authentication later
    res.json({
      success: true,
      message: 'Service creation endpoint ready - authentication will be added next'
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;