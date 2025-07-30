// car-mart-backend/src/routes/search.js
const express = require('express');
const router = express.Router();
const { VehicleService, PartService, ServiceService } = require('../services/database');

// GET /api/search - Global search across all categories
router.get('/', async (req, res) => {
  try {
    const { q, category, limit = 20 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    console.log(`🔍 Global search: "${q}" in category: ${category || 'all'}`);

    const results = {
      vehicles: [],
      parts: [],
      services: [],
      total: 0
    };

    const searchTerm = q.trim();
    const searchLimit = Math.min(parseInt(limit), 50); // Max 50 results

    try {
      // Search vehicles (if no specific category or category is vehicles)
      if (!category || category === 'vehicles') {
        const vehicles = await VehicleService.getVehicles({
          search: searchTerm,
          limit: searchLimit
        });
        results.vehicles = vehicles.slice(0, 10); // Limit to 10 per category
      }

      // Search parts (if no specific category or category is parts)  
      if (!category || category === 'parts') {
        const parts = await PartService.getParts({
          search: searchTerm,
          limit: searchLimit
        });
        results.parts = parts.slice(0, 10); // Limit to 10 per category
      }

      // Search services (if no specific category or category is services)
      if (!category || category === 'services') {
        const services = await ServiceService.getServices({
          search: searchTerm,
          limit: searchLimit
        });
        results.services = services.slice(0, 10); // Limit to 10 per category
      }

    } catch (searchError) {
      console.error('Search error:', searchError);
      // Continue with empty results rather than failing completely
    }

    // Calculate total results
    results.total = results.vehicles.length + results.parts.length + results.services.length;

    console.log(`🔍 Search results: ${results.total} items found`);

    res.json({
      success: true,
      data: results,
      query: searchTerm,
      category: category || 'all',
      total: results.total
    });

  } catch (error) {
    console.error('Global search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/search/suggestions - Search suggestions (autocomplete)
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }

    // For now, return simple suggestions - implement database logic later
    const suggestions = [
      `${q} vehicles`,
      `${q} parts`, 
      `${q} services`,
      `${q} Toyota`,
      `${q} BMW`
    ].slice(0, 5);

    res.json({
      success: true,
      data: suggestions
    });

  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suggestions'
    });
  }
});

module.exports = router;