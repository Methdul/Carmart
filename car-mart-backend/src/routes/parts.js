// car-mart-backend/src/routes/parts.js
// Updated to use real database services

const express = require('express');
const router = express.Router();
const { PartService } = require('../services/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// GET /api/parts - Get all parts with filtering (public)
router.get('/', optionalAuth, async (req, res) => {
  try {
    console.log('📋 Fetching parts with filters:', req.query);
    
    // Extract and prepare filters
    const filters = {
      search: req.query.search || '',
      location: req.query.location || '',
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : null,
      category: req.query.category || '',
      brand: req.query.brand || '',
      condition: req.query.condition || ''
    };

    // Remove empty filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    console.log('🔍 Applied filters:', filters);

    // Get parts from database
    const parts = await PartService.getParts(filters);
    
    console.log(`✅ Found ${parts.length} parts`);

    res.json({
      success: true,
      data: parts,
      total: parts.length,
      filters: filters
    });

  } catch (error) {
    console.error('❌ Error fetching parts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parts',
      error: error.message
    });
  }
});

// GET /api/parts/:id - Get single part by ID (public)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    console.log(`🔧 Fetching part with ID: ${req.params.id}`);
    
    const part = await PartService.getPartById(req.params.id);
    
    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Part not found'
      });
    }

    console.log(`✅ Found part: ${part.title}`);
    
    res.json({
      success: true,
      data: part
    });

  } catch (error) {
    console.error('❌ Error fetching part:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch part',
      error: error.message
    });
  }
});

// POST /api/parts - Create new part (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🆕 Creating part for user: ${req.user.id}`);
    console.log('📝 Part data:', req.body);

    // Validate required fields
    const requiredFields = ['title', 'brand', 'category', 'condition', 'price', 'location'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate numeric fields
    if (isNaN(req.body.price)) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid number'
      });
    }

    // Prepare part data
    const partData = {
      title: req.body.title.trim(),
      brand: req.body.brand.trim(),
      category: req.body.category,
      condition: req.body.condition,
      price: parseFloat(req.body.price),
      location: req.body.location.trim(),
      description: req.body.description?.trim() || '',
      part_number: req.body.part_number?.trim() || null,
      warranty_period: req.body.warranty_period?.trim() || null,
      compatibility: req.body.compatibility || [],
      specifications: req.body.specifications || {},
      images: req.body.images || [],
      stock_quantity: req.body.stock_quantity ? parseInt(req.body.stock_quantity) : 1,
      minimum_order: req.body.minimum_order ? parseInt(req.body.minimum_order) : 1,
      is_oem: req.body.is_oem || false,
      is_featured: false // Only admins can set featured
    };

    // Create part in database
    const part = await PartService.createPart(partData, req.user.id);
    
    console.log(`✅ Created part: ${part.title} (ID: ${part.id})`);

    res.status(201).json({
      success: true,
      message: 'Part created successfully',
      data: part
    });

  } catch (error) {
    console.error('❌ Error creating part:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create part',
      error: error.message
    });
  }
});

// PUT /api/parts/:id - Update part (requires authentication + ownership)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`✏️ Updating part ${req.params.id} for user: ${req.user.id}`);

    // Prepare update data (only allow certain fields to be updated)
    const allowedFields = [
      'title', 'description', 'price', 'location', 'condition', 
      'stock_quantity', 'warranty_period', 'specifications', 'images'
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

    // Validate stock quantity if provided
    if (updateData.stock_quantity && isNaN(updateData.stock_quantity)) {
      return res.status(400).json({
        success: false,
        message: 'Stock quantity must be a valid number'
      });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString();

    // Update part in database (we'll need to add updatePart method to PartService)
    const { supabase } = require('../config/database');
    
    const { data, error } = await supabase
      .from('parts')
      .update(updateData)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update part: ${error.message}`);
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Part not found or you do not have permission to update it'
      });
    }
    
    console.log(`✅ Updated part: ${data.title}`);

    res.json({
      success: true,
      message: 'Part updated successfully',
      data: data
    });

  } catch (error) {
    console.error('❌ Error updating part:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update part',
      error: error.message
    });
  }
});

// DELETE /api/parts/:id - Delete part (requires authentication + ownership)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`🗑️ Deleting part ${req.params.id} for user: ${req.user.id}`);

    // Soft delete part (set is_active = false)
    const { supabase } = require('../config/database');
    
    const { data, error } = await supabase
      .from('parts')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to delete part: ${error.message}`);
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Part not found or you do not have permission to delete it'
      });
    }
    
    console.log(`✅ Deleted part: ${data.title}`);

    res.json({
      success: true,
      message: 'Part deleted successfully',
      data: data
    });

  } catch (error) {
    console.error('❌ Error deleting part:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete part',
      error: error.message
    });
  }
});

module.exports = router;