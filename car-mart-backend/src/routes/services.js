// car-mart-backend/src/routes/services.js
// Complete services implementation

const express = require('express');
const router = express.Router();
const { ServiceService } = require('../services/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// GET /api/services - Get all services with filtering (public)
router.get('/', optionalAuth, async (req, res) => {
  try {
    console.log('📋 Fetching services with filters:', req.query);
    
    // Extract and prepare filters
    const filters = {
      search: req.query.search || '',
      location: req.query.location || '',
      serviceType: req.query.serviceType || '',
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : null
    };

    // Remove empty filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    console.log('🔍 Applied filters:', filters);

    // Get services from database
    const services = await ServiceService.getServices(filters);
    
    console.log(`✅ Found ${services.length} services`);

    res.json({
      success: true,
      data: services,
      total: services.length,
      filters: filters
    });

  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: error.message
    });
  }
});

// GET /api/services/:id - Get single service by ID (public)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    console.log(`🛠️ Fetching service with ID: ${req.params.id}`);
    
    const service = await ServiceService.getServiceById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    console.log(`✅ Found service: ${service.title}`);
    
    res.json({
      success: true,
      data: service
    });

  } catch (error) {
    console.error('❌ Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error: error.message
    });
  }
});

// POST /api/services - Create new service (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🆕 Creating service for user: ${req.user.id}`);
    console.log('📝 Service data:', req.body);

    // Validate required fields
    const requiredFields = ['title', 'service_type', 'description', 'price', 'location'];
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

    // Prepare service data
    const serviceData = {
      title: req.body.title.trim(),
      service_type: req.body.service_type,
      description: req.body.description.trim(),
      price: parseFloat(req.body.price),
      price_type: req.body.price_type || 'fixed',
      location: req.body.location.trim(),
      duration: req.body.duration?.trim() || null,
      emergency_service: req.body.emergency_service || false,
      online_booking: req.body.online_booking || false,
      home_service: req.body.home_service || false,
      pickup_dropoff: req.body.pickup_dropoff || false,
      warranty_period: req.body.warranty_period?.trim() || null,
      equipment_type: req.body.equipment_type?.trim() || null,
      service_areas: req.body.service_areas || [],
      features: req.body.features || [],
      requirements: req.body.requirements || [],
      images: req.body.images || [],
      availability: req.body.availability || {},
      payment_options: req.body.payment_options || [],
      languages: req.body.languages || [],
      certifications: req.body.certifications || [],
      is_featured: false // Only admins can set featured
    };

    // Create service in database
    const service = await ServiceService.createService(serviceData, req.user.id);
    
    console.log(`✅ Created service: ${service.title} (ID: ${service.id})`);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });

  } catch (error) {
    console.error('❌ Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
});

// PUT /api/services/:id - Update service (requires authentication + ownership)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`✏️ Updating service ${req.params.id} for user: ${req.user.id}`);

    // Prepare update data (only allow certain fields to be updated)
    const allowedFields = [
      'title', 'description', 'price', 'price_type', 'location', 'duration',
      'emergency_service', 'online_booking', 'home_service', 'pickup_dropoff',
      'warranty_period', 'service_areas', 'features', 'requirements', 'images',
      'availability', 'payment_options', 'languages', 'certifications'
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

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString();

    // Update service in database
    const { supabase } = require('../config/database');
    
    const { data, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update service: ${error.message}`);
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or you do not have permission to update it'
      });
    }
    
    console.log(`✅ Updated service: ${data.title}`);

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: data
    });

  } catch (error) {
    console.error('❌ Error updating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: error.message
    });
  }
});

// DELETE /api/services/:id - Delete service (requires authentication + ownership)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`🗑️ Deleting service ${req.params.id} for user: ${req.user.id}`);

    // Soft delete service (set is_active = false)
    const { supabase } = require('../config/database');
    
    const { data, error } = await supabase
      .from('services')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to delete service: ${error.message}`);
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or you do not have permission to delete it'
      });
    }
    
    console.log(`✅ Deleted service: ${data.title}`);

    res.json({
      success: true,
      message: 'Service deleted successfully',
      data: data
    });

  } catch (error) {
    console.error('❌ Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message
    });
  }
});

module.exports = router;