// car-mart-backend/src/routes/rentals.js
// ✅ UPDATED - No Database Functions, All Logic in Backend

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

    // Build the query
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

    // Apply filters
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

    // Apply sorting
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

    // ✅ Process rental data (parse JSON fields, add computed properties)
    const processedRentals = rentals?.map(rental => {
      try {
        // Parse JSON fields safely
        const features = rental.features ? 
          (typeof rental.features === 'string' ? JSON.parse(rental.features) : rental.features) : [];
        
        const included_items = rental.included_items ? 
          (typeof rental.included_items === 'string' ? JSON.parse(rental.included_items) : rental.included_items) : [];
        
        const pickup_locations = rental.pickup_locations ? 
          (typeof rental.pickup_locations === 'string' ? JSON.parse(rental.pickup_locations) : rental.pickup_locations) : [];

        const images = rental.images ? 
          (typeof rental.images === 'string' ? JSON.parse(rental.images) : rental.images) : ['/api/placeholder/400/300'];

        return {
          ...rental,
          features,
          included_items,
          pickup_locations,
          images,
          // Computed properties
          is_available: new Date(rental.available_from) <= new Date() && 
                       (!rental.available_until || new Date(rental.available_until) >= new Date())
        };
      } catch (parseError) {
        console.error('❌ Error parsing rental data:', parseError);
        return {
          ...rental,
          features: [],
          included_items: [],
          pickup_locations: [],
          images: ['/api/placeholder/400/300']
        };
      }
    }) || [];

    console.log(`✅ Found ${processedRentals.length} rentals`);

    res.json({
      success: true,
      data: processedRentals,
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

    // ✅ INCREMENT VIEW COUNT IN BACKEND (NO DATABASE FUNCTION)
    try {
      const { error: updateError } = await supabase
        .from('rentals')
        .update({ 
          views_count: (rental.views_count || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        console.error('⚠️ Failed to update view count:', updateError);
        // Continue anyway - this is not critical
      } else {
        console.log('✅ View count updated');
      }
    } catch (updateError) {
      console.error('⚠️ View count update error:', updateError);
      // Continue anyway
    }

    // Process rental data
    const processedRental = {
      ...rental,
      features: rental.features ? 
        (typeof rental.features === 'string' ? JSON.parse(rental.features) : rental.features) : [],
      included_items: rental.included_items ? 
        (typeof rental.included_items === 'string' ? JSON.parse(rental.included_items) : rental.included_items) : [],
      pickup_locations: rental.pickup_locations ? 
        (typeof rental.pickup_locations === 'string' ? JSON.parse(rental.pickup_locations) : rental.pickup_locations) : [],
      images: rental.images ? 
        (typeof rental.images === 'string' ? JSON.parse(rental.images) : rental.images) : ['/api/placeholder/400/300'],
      views_count: (rental.views_count || 0) + 1 // Reflect the increment
    };

    console.log('✅ Rental found and view count updated');

    res.json({
      success: true,
      data: processedRental
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
    const rentalData = { 
      ...req.body, 
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      is_available: true,
      views_count: 0,
      favorites_count: 0,
      booking_count: 0
    };

    console.log('📝 Creating new rental for user:', userId);

    // Validate required fields
    const requiredFields = ['title', 'make', 'model', 'year', 'daily_rate', 'location', 'fuel_type', 'transmission', 'body_type'];
    const missingFields = requiredFields.filter(field => !rentalData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Ensure JSON fields are properly formatted
    if (rentalData.features && typeof rentalData.features !== 'string') {
      rentalData.features = JSON.stringify(rentalData.features);
    }
    if (rentalData.included_items && typeof rentalData.included_items !== 'string') {
      rentalData.included_items = JSON.stringify(rentalData.included_items);
    }
    if (rentalData.pickup_locations && typeof rentalData.pickup_locations !== 'string') {
      rentalData.pickup_locations = JSON.stringify(rentalData.pickup_locations);
    }
    if (rentalData.images && typeof rentalData.images !== 'string') {
      rentalData.images = JSON.stringify(rentalData.images);
    }

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
    const updateData = { 
      ...req.body, 
      updated_at: new Date().toISOString() 
    };

    console.log(`📝 Updating rental ${id} for user:`, userId);

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
        message: 'Not authorized to update this rental'
      });
    }

    // Ensure JSON fields are properly formatted
    if (updateData.features && typeof updateData.features !== 'string') {
      updateData.features = JSON.stringify(updateData.features);
    }
    if (updateData.included_items && typeof updateData.included_items !== 'string') {
      updateData.included_items = JSON.stringify(updateData.included_items);
    }
    if (updateData.pickup_locations && typeof updateData.pickup_locations !== 'string') {
      updateData.pickup_locations = JSON.stringify(updateData.pickup_locations);
    }
    if (updateData.images && typeof updateData.images !== 'string') {
      updateData.images = JSON.stringify(updateData.images);
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

    // Soft delete
    const { error } = await supabase
      .from('rentals')
      .update({ 
        is_active: false, 
        updated_at: new Date().toISOString() 
      })
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
    console.log('📊 Fetching rental statistics...');

    const { data: stats } = await supabase
      .from('rentals')
      .select('daily_rate, make, body_type, fuel_type, rental_type, booking_count, average_rating')
      .eq('is_active', true)
      .eq('is_available', true);

    if (!stats || stats.length === 0) {
      return res.json({
        success: true,
        data: {
          total: 0,
          averagePrice: 0,
          popularMakes: [],
          bodyTypes: [],
          fuelTypes: [],
          rentalTypes: [],
          totalBookings: 0,
          averageRating: 0
        }
      });
    }

    const overview = {
      total: stats.length,
      averagePrice: Math.round(stats.reduce((sum, r) => sum + parseFloat(r.daily_rate || 0), 0) / stats.length),
      popularMakes: [...new Set(stats.map(r => r.make))].slice(0, 5),
      bodyTypes: [...new Set(stats.map(r => r.body_type))],
      fuelTypes: [...new Set(stats.map(r => r.fuel_type))],
      rentalTypes: [...new Set(stats.map(r => r.rental_type))],
      totalBookings: stats.reduce((sum, r) => sum + (r.booking_count || 0), 0),
      averageRating: stats.length > 0 ? 
        (stats.reduce((sum, r) => sum + (r.average_rating || 0), 0) / stats.length).toFixed(1) : 0
    };

    console.log('✅ Rental statistics calculated');

    res.json({
      success: true,
      data: overview
    });

  } catch (error) {
    console.error('❌ Error fetching rental stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;