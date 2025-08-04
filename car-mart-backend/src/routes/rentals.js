// car-mart-backend/src/routes/rentals.js
// Rentals API following your existing database pattern

const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/rentals - Get all rentals with filtering
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching rentals with filters:', req.query);

    const {
      search,
      location,
      minPrice,
      maxPrice,
      make,
      bodyType,
      fuelType,
      transmission,
      seats,
      rentalType,
      minDays,
      maxDays,
      deliveryAvailable,
      insuranceIncluded,
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build the query - same pattern as your vehicles route
    let query = supabase
      .from('rentals')
      .select(`
        *,
        users!rentals_user_id_fkey (
          first_name,
          last_name,
          phone,
          avatar_url,
          is_verified
        )
      `)
      .eq('is_active', true)
      .eq('is_available', true);

    // Apply filters - following your existing pattern
    const filters = {};

    if (search) {
      filters.search = search;
      query = query.or(`title.ilike.%${search}%,make.ilike.%${search}%,model.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (location) {
      filters.location = location;
      query = query.ilike('location', `%${location}%`);
    }

    if (minPrice) {
      filters.minPrice = parseFloat(minPrice);
      query = query.gte('daily_rate', parseFloat(minPrice));
    }

    if (maxPrice) {
      filters.maxPrice = parseFloat(maxPrice);
      query = query.lte('daily_rate', parseFloat(maxPrice));
    }

    if (make && make !== 'all') {
      filters.make = make;
      query = query.ilike('make', make);
    }

    if (bodyType && bodyType !== 'any') {
      filters.bodyType = bodyType;
      query = query.eq('body_type', bodyType);
    }

    if (fuelType && fuelType !== 'any') {
      filters.fuelType = fuelType;
      query = query.eq('fuel_type', fuelType);
    }

    if (transmission && transmission !== 'any') {
      filters.transmission = transmission;
      query = query.eq('transmission', transmission);
    }

    if (seats) {
      filters.seats = parseInt(seats);
      query = query.gte('seats', parseInt(seats));
    }

    if (rentalType && rentalType !== 'any') {
      filters.rentalType = rentalType;
      query = query.eq('rental_type', rentalType);
    }

    if (minDays) {
      filters.minDays = parseInt(minDays);
      query = query.lte('minimum_rental_days', parseInt(minDays));
    }

    if (maxDays) {
      filters.maxDays = parseInt(maxDays);
      query = query.gte('maximum_rental_days', parseInt(maxDays));
    }

    if (deliveryAvailable === 'true') {
      filters.deliveryAvailable = true;
      query = query.eq('delivery_available', true);
    }

    if (insuranceIncluded === 'true') {
      filters.insuranceIncluded = true;
      query = query.eq('insurance_included', true);
    }

    // Apply sorting - same pattern as your existing routes
    const validSortFields = ['created_at', 'daily_rate', 'average_rating', 'booking_count', 'views_count'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder === 'asc' ? { ascending: true } : { ascending: false };
    
    query = query.order(sortField, order);

    // Apply pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.range(offset, offset + parseInt(limit) - 1);

    console.log('🔍 Applied filters:', filters);

    const { data: rentals, error, count } = await query;

    if (error) {
      console.error('❌ Database error:', error);
      throw error;
    }

    console.log(`✅ Found ${rentals?.length || 0} rentals`);

    res.json({
      success: true,
      data: rentals || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil((count || 0) / parseInt(limit))
      },
      filters: filters
    });

  } catch (error) {
    console.error('❌ Error fetching rentals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rentals',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/rentals/:id - Get single rental by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📋 Fetching rental with ID: ${id}`);

    const { data: rental, error } = await supabase
      .from('rentals')
      .select(`
        *,
        users!rentals_user_id_fkey (
          id,
          first_name,
          last_name,
          phone,
          email,
          avatar_url,
          is_verified,
          member_since
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Rental not found'
        });
      }
      throw error;
    }

    // Increment view count using the function (same pattern as vehicles)
    await supabase.rpc('increment_rental_views', { rental_uuid: id });

    console.log('✅ Rental found and view count updated');

    res.json({
      success: true,
      data: rental
    });

  } catch (error) {
    console.error('❌ Error fetching rental:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/rentals - Create new rental (protected route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const rentalData = { ...req.body, user_id: userId };

    console.log('📝 Creating new rental for user:', userId);

    const { data: rental, error } = await supabase
      .from('rentals')
      .insert([rentalData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ Rental created successfully');

    res.status(201).json({
      success: true,
      message: 'Rental created successfully',
      data: rental
    });

  } catch (error) {
    console.error('❌ Error creating rental:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create rental',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/rentals/:id - Update rental (protected route)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = { ...req.body, updated_at: new Date().toISOString() };

    console.log(`📝 Updating rental ${id} for user:`, userId);

    // Check ownership (same pattern as your vehicles route)
    const { data: existingRental, error: fetchError } = await supabase
      .from('rentals')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingRental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }

    if (existingRental.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this rental'
      });
    }

    const { data: rental, error } = await supabase
      .from('rentals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ Rental updated successfully');

    res.json({
      success: true,
      message: 'Rental updated successfully',
      data: rental
    });

  } catch (error) {
    console.error('❌ Error updating rental:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update rental',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE /api/rentals/:id - Delete rental (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log(`🗑️ Deleting rental ${id} for user:`, userId);

    // Check ownership
    const { data: existingRental, error: fetchError } = await supabase
      .from('rentals')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingRental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }

    if (existingRental.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this rental'
      });
    }

    // Soft delete (same pattern as your existing routes)
    const { error } = await supabase
      .from('rentals')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw error;
    }

    console.log('✅ Rental deleted successfully');

    res.json({
      success: true,
      message: 'Rental deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting rental:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete rental',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/rentals/stats/overview - Get rental statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const { data: stats } = await supabase
      .from('rentals')
      .select('daily_rate, make, body_type, fuel_type, rental_type')
      .eq('is_active', true)
      .eq('is_available', true);

    const overview = {
      total: stats?.length || 0,
      averagePrice: stats?.length ? Math.round(stats.reduce((sum, r) => sum + parseFloat(r.daily_rate), 0) / stats.length) : 0,
      popularMakes: [...new Set(stats?.map(r => r.make))].slice(0, 5),
      bodyTypes: [...new Set(stats?.map(r => r.body_type))],
      fuelTypes: [...new Set(stats?.map(r => r.fuel_type))],
      rentalTypes: [...new Set(stats?.map(r => r.rental_type))]
    };

    res.json({
      success: true,
      data: overview
    });

  } catch (error) {
    console.error('❌ Error fetching rental stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental statistics'
    });
  }
});

module.exports = router;