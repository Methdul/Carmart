// car-mart-backend/src/routes/vehicles.js
// Updated version with ratings included
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');

// GET /api/vehicles - Get all vehicles with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      location, 
      minPrice, 
      maxPrice, 
      make, 
      fuelType, 
      bodyType, 
      transmission,
      isActive = true 
    } = req.query;
    
    let query = supabase
      .from('vehicles')
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
        `title.ilike.%${search}%,description.ilike.%${search}%,make.ilike.%${search}%,model.ilike.%${search}%`
      );
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
    
    if (make && make !== 'all') {
      query = query.eq('make', make);
    }
    
    if (fuelType && fuelType !== 'all') {
      query = query.eq('fuel_type', fuelType);
    }
    
    if (bodyType && bodyType !== 'all') {
      query = query.eq('body_type', bodyType);
    }
    
    if (transmission && transmission !== 'all') {
      query = query.eq('transmission', transmission);
    }
    
    // Order by featured first, then by rating, then by creation date
    query = query.order('is_featured', { ascending: false })
                 .order('rating_average', { ascending: false })
                 .order('created_at', { ascending: false });

    const { data: vehicles, error } = await query;

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles || []
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/vehicles/:id - Get single vehicle
router.get('/:id', async (req, res) => {
  try {
    const { data: vehicle, error } = await supabase
      .from('vehicles')
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
          message: 'Vehicle not found'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST /api/vehicles - Create new vehicle (protected route)
router.post('/', async (req, res) => {
  try {
    // For now, return placeholder - will add authentication later
    res.json({
      success: true,
      message: 'Vehicle creation endpoint ready - authentication will be added next'
    });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;