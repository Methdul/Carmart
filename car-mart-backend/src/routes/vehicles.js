// car-mart-backend/src/routes/vehicles.js
// Updated to use real database services

const express = require('express');
const router = express.Router();
const { VehicleService } = require('../services/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// GET /api/vehicles - Get all vehicles with filtering (public)
router.get('/', optionalAuth, async (req, res) => {
  try {
    console.log('📋 Fetching vehicles with filters:', req.query);
    
    // Extract and prepare filters
    const filters = {
      search: req.query.search || '',
      location: req.query.location || '',
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : null,
      make: req.query.make || '',
      fuelType: req.query.fuelType || '',
      bodyType: req.query.bodyType || '',
      transmission: req.query.transmission || '',
      yearFrom: req.query.yearFrom ? parseInt(req.query.yearFrom) : null,
      yearTo: req.query.yearTo ? parseInt(req.query.yearTo) : null
    };

    // Remove empty filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    console.log('🔍 Applied filters:', filters);

    // Get vehicles from database
    const vehicles = await VehicleService.getVehicles(filters);
    
    console.log(`✅ Found ${vehicles.length} vehicles`);

    res.json({
      success: true,
      data: vehicles,
      total: vehicles.length,
      filters: filters
    });

  } catch (error) {
    console.error('❌ Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles',
      error: error.message
    });
  }
});

// GET /api/vehicles/:id - Get single vehicle by ID (public)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    console.log(`🚗 Fetching vehicle with ID: ${req.params.id}`);
    
    const vehicle = await VehicleService.getVehicleById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    console.log(`✅ Found vehicle: ${vehicle.title}`);
    
    res.json({
      success: true,
      data: vehicle
    });

  } catch (error) {
    console.error('❌ Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle',
      error: error.message
    });
  }
});

// POST /api/vehicles - Create new vehicle (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🆕 Creating vehicle for user: ${req.user.id}`);
    console.log('📝 Vehicle data:', req.body);

    // Validate required fields
    const requiredFields = ['title', 'make', 'model', 'year', 'price', 'fuel_type', 'transmission', 'body_type', 'location'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate numeric fields
    if (isNaN(req.body.year) || isNaN(req.body.price)) {
      return res.status(400).json({
        success: false,
        message: 'Year and price must be valid numbers'
      });
    }

    // Prepare vehicle data
    const vehicleData = {
      title: req.body.title.trim(),
      make: req.body.make.trim(),
      model: req.body.model.trim(),
      year: parseInt(req.body.year),
      price: parseFloat(req.body.price),
      fuel_type: req.body.fuel_type,
      transmission: req.body.transmission,
      body_type: req.body.body_type,
      condition: req.body.condition || 'Used',
      location: req.body.location.trim(),
      description: req.body.description?.trim() || '',
      mileage: req.body.mileage ? parseInt(req.body.mileage) : null,
      color: req.body.color || null,
      seats: req.body.seats ? parseInt(req.body.seats) : null,
      doors: req.body.doors ? parseInt(req.body.doors) : null,
      engine_capacity: req.body.engine_capacity ? parseFloat(req.body.engine_capacity) : null,
      features: req.body.features || [],
      images: req.body.images || [],
      seller_notes: req.body.seller_notes?.trim() || null,
      health_score: req.body.health_score ? parseInt(req.body.health_score) : 0,
      is_featured: false // Only admins can set featured
    };

    // Create vehicle in database
    const vehicle = await VehicleService.createVehicle(vehicleData, req.user.id);
    
    console.log(`✅ Created vehicle: ${vehicle.title} (ID: ${vehicle.id})`);

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle
    });

  } catch (error) {
    console.error('❌ Error creating vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create vehicle',
      error: error.message
    });
  }
});

// PUT /api/vehicles/:id - Update vehicle (requires authentication + ownership)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`✏️ Updating vehicle ${req.params.id} for user: ${req.user.id}`);

    // Prepare update data (only allow certain fields to be updated)
    const allowedFields = [
      'title', 'description', 'price', 'location', 'condition', 
      'mileage', 'color', 'features', 'images', 'seller_notes'
    ];
    
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Validate price if provided
    if (updateData.price && isNaN(updateData.price)) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid number'
      });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    // Update vehicle in database
    const vehicle = await VehicleService.updateVehicle(req.params.id, updateData, req.user.id);
    
    console.log(`✅ Updated vehicle: ${vehicle.title}`);

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle
    });

  } catch (error) {
    console.error('❌ Error updating vehicle:', error);
    
    if (error.message.includes('Failed to update vehicle')) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found or you do not have permission to update it'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle',
      error: error.message
    });
  }
});

// DELETE /api/vehicles/:id - Delete vehicle (requires authentication + ownership)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`🗑️ Deleting vehicle ${req.params.id} for user: ${req.user.id}`);

    // Soft delete vehicle (set is_active = false)
    const vehicle = await VehicleService.deleteVehicle(req.params.id, req.user.id);
    
    console.log(`✅ Deleted vehicle: ${vehicle.title}`);

    res.json({
      success: true,
      message: 'Vehicle deleted successfully',
      data: vehicle
    });

  } catch (error) {
    console.error('❌ Error deleting vehicle:', error);
    
    if (error.message.includes('Failed to delete vehicle')) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found or you do not have permission to delete it'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete vehicle',
      error: error.message
    });
  }
});

module.exports = router;