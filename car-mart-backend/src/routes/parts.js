const express = require('express');
const router = express.Router();
const { PartService } = require('../services/database');

// GET /api/parts - Get all parts with filtering
router.get('/', async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice, category, brand, condition } = req.query;
    
    // Build filters object
    const filters = {};
    if (search) filters.search = search;
    if (location) filters.location = location;
    if (minPrice) filters.minPrice = parseInt(minPrice);
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    if (category) filters.category = category;
    if (brand) filters.brand = brand;
    if (condition) filters.condition = condition;

    const parts = await PartService.getParts(filters);

    res.json({
      success: true,
      count: parts.length,
      data: parts
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
    const part = await PartService.getPartById(req.params.id);
    
    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Part not found'
      });
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
    // For now, we'll return a placeholder
    // In the future, we'll add authentication middleware
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