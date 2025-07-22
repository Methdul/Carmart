const express = require('express');
const router = express.Router();
const { parts } = require('../data/mockData');

// GET /api/parts - Get all parts
router.get('/', (req, res) => {
  try {
    const { search, category, condition, brand } = req.query;
    
    let filteredParts = [...parts];
    
    if (search) {
      filteredParts = filteredParts.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      filteredParts = filteredParts.filter(p => p.category === category);
    }
    
    if (condition) {
      filteredParts = filteredParts.filter(p => p.condition === condition);
    }
    
    if (brand) {
      filteredParts = filteredParts.filter(p => 
        p.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      count: filteredParts.length,
      data: filteredParts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/parts/:id - Get single part
router.get('/:id', (req, res) => {
  try {
    const part = parts.find(p => p.id === req.params.id);
    
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
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;