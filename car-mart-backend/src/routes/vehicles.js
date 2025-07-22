const express = require('express');
const router = express.Router();
const { vehicles } = require('../data/mockData');

// GET /api/vehicles - Get all vehicles
router.get('/', (req, res) => {
  try {
    const { search, location, minPrice, maxPrice, make, fuelType } = req.query;
    
    let filteredVehicles = [...vehicles];
    
    // Apply filters
    if (search) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.make.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (location) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredVehicles = filteredVehicles.filter(v => v.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filteredVehicles = filteredVehicles.filter(v => v.price <= parseInt(maxPrice));
    }
    
    if (make) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.make.toLowerCase() === make.toLowerCase()
      );
    }
    
    if (fuelType) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.fuelType.toLowerCase() === fuelType.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      count: filteredVehicles.length,
      data: filteredVehicles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/vehicles/:id - Get single vehicle
router.get('/:id', (req, res) => {
  try {
    const vehicle = vehicles.find(v => v.id === req.params.id);
    
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
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST /api/vehicles - Create new vehicle (for later)
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Vehicle creation will be implemented with database'
  });
});

module.exports = router;