// car-mart-backend/src/routes/parts.js
// Updated version with ratings included
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');

// GET /api/parts - Get all parts with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      location, 
      minPrice, 
      maxPrice, 
      category, 
      brand, 
      condition,
      isActive = true 
    } = req.query;
    
    let query = supabase
      .from('parts')
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
        `title.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%,category.ilike.%${search}%`
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
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    if (brand && brand !== 'all') {
      query = query.eq('brand', brand);
    }
    
    if (condition && condition !== 'all') {
      query = query.eq('condition', condition);
    }
    
    // Order by featured first, then by rating, then by creation date
    query = query.order('is_featured', { ascending: false })
                 .order('rating_average', { ascending: false })
                 .order('created_at', { ascending: false });

    const { data: parts, error } = await query;

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      count: parts.length,
      data: parts || []
    });
  } catch (error) {
    console.error('Error fetching parts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/parts/:id - Get single part
router.get('/:id', async (req, res) => {
  try {
    const { data: part, error } = await supabase
      .from('parts')
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
          message: 'Part not found'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      data: part
    });
  } catch (error) {
    console.error('Error fetching part:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST /api/parts - Create new part (protected route)
router.post('/', async (req, res) => {
  try {
    // For now, return placeholder - will add authentication later
    res.json({
      success: true,
      message: 'Part creation endpoint ready - authentication will be added next'
    });
  } catch (error) {
    console.error('Error creating part:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;