const express = require('express');
const router = express.Router();
const { VehicleService } = require('../services/database');

// GET /api/vehicles - Get all vehicles with filtering
router.get('/', async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice, make, fuelType, bodyType, transmission } = req.query;
    
    // Build filters object
    const filters = {};
    if (search) filters.search = search;
    if (location) filters.location = location;
    if (minPrice) filters.minPrice = parseInt(minPrice);
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    if (make) filters.make = make;
    if (fuelType) filters.fuelType = fuelType;
    if (bodyType) filters.bodyType = bodyType;
    if (transmission) filters.transmission = transmission;

    const vehicles = await VehicleService.getVehicles(filters);

    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles
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
    const vehicle = await VehicleService.getVehicleById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
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
    // For now, we'll return a placeholder
    // In the future, we'll add authentication middleware
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