const express = require('express');
const router = express.Router();
const { services } = require('../data/mockData');

// GET /api/services - Get all services
router.get('/', (req, res) => {
  try {
    const { search, serviceType, location, minPrice, maxPrice } = req.query;
    
    let filteredServices = [...services];
    
    // Apply filters similar to parts and vehicles
    if (search) {
      filteredServices = filteredServices.filter(service => 
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (serviceType && serviceType !== 'all') {
      filteredServices = filteredServices.filter(service => 
        service.serviceType === serviceType
      );
    }
    
    if (location) {
      filteredServices = filteredServices.filter(service => 
        service.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredServices = filteredServices.filter(service => 
        service.price >= parseInt(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredServices = filteredServices.filter(service => 
        service.price <= parseInt(maxPrice)
      );
    }
    
    res.json({
      success: true,
      count: filteredServices.length,
      data: filteredServices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/services/:id - Get single service
router.get('/:id', (req, res) => {
  try {
    const service = services.find(s => s.id === req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;