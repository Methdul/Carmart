// car-mart-backend/src/routes/users.js
const express = require('express');
const router = express.Router();
const { UserService } = require('../services/database');
const { authenticateToken } = require('../middleware/auth');


// GET /api/users/profile - Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Use static method - no instance needed
    const user = await UserService.getUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/users/profile - Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Use static method instead of instance method
    const user = await UserService.getUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/users/:id - Get public user profile
router.get('/:id', async (req, res) => {
  try {
    const result = await userService.findById(req.params.id);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching user profile',
        error: result.error
      });
    }

    if (!result.data) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return only public fields
    const publicFields = {
      id: result.data.id,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      avatar_url: result.data.avatar_url,
      bio: result.data.bio,
      location: result.data.location,
      account_type: result.data.account_type,
      is_verified: result.data.is_verified,
      member_since: result.data.member_since
    };

    res.json({
      success: true,
      data: publicFields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST /api/users/convert-to-business - Convert personal account to business
router.post('/convert-to-business', authenticateToken, async (req, res) => {
  try {
    const {
      company_name,
      business_type,
      registration_number,
      tax_id,
      business_phone,
      business_email,
      business_address,
      plan_type = 'basic'
    } = req.body;

    // Validate required fields
    if (!company_name || !business_type) {
      return res.status(400).json({
        success: false,
        message: 'Company name and business type are required'
      });
    }

    // First, update user account type
    const userUpdateResult = await userService.update(req.user.id, {
      account_type: 'business'
    });

    if (!userUpdateResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Error updating user account type',
        error: userUpdateResult.error
      });
    }

    // Create business profile
    const { DatabaseService } = require('../services/database');
    const businessService = new DatabaseService('business_profiles');

    const businessData = {
      user_id: req.user.id,
      company_name,
      business_type,
      registration_number,
      tax_id,
      business_phone,
      business_email,
      business_address,
      plan_type
    };

    const businessResult = await businessService.create(businessData);

    if (!businessResult.success) {
      // Rollback user account type change
      await userService.update(req.user.id, { account_type: 'personal' });
      
      return res.status(500).json({
        success: false,
        message: 'Error creating business profile',
        error: businessResult.error
      });
    }

    res.json({
      success: true,
      message: 'Successfully converted to business account',
      data: {
        user: userUpdateResult.data,
        business_profile: businessResult.data
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/users/:id/listings - Get user's listings
router.get('/:id/listings', async (req, res) => {
  try {
    const { type = 'all', page = 1, limit = 10 } = req.query;
    const userId = req.params.id;
    
    const results = {};

    if (type === 'all' || type === 'vehicles') {
      const { VehicleService } = require('../services/database');
      const vehicleService = new VehicleService();
      const vehiclesResult = await vehicleService.findAll(
        { user_id: userId, is_active: true },
        { limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit) }
      );
      results.vehicles = vehiclesResult.success ? vehiclesResult.data : [];
    }

    if (type === 'all' || type === 'parts') {
      const { PartService } = require('../services/database');
      const partService = new PartService();
      const partsResult = await partService.findAll(
        { user_id: userId, is_active: true },
        { limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit) }
      );
      results.parts = partsResult.success ? partsResult.data : [];
    }

    if (type === 'all' || type === 'services') {
      const { ServiceProviderService } = require('../services/database');
      const serviceService = new ServiceProviderService();
      const servicesResult = await serviceService.findAll(
        { user_id: userId, is_active: true },
        { limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit) }
      );
      results.services = servicesResult.success ? servicesResult.data : [];
    }

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// DELETE /api/users/account - Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    // For now, just deactivate the account instead of hard delete
    const result = await userService.update(req.user.id, {
      is_active: false,
      email: `deleted_${Date.now()}_${req.user.email}` // Avoid email conflicts
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error deactivating account',
        error: result.error
      });
    }

    res.json({
      success: true,
      message: 'Account deactivated successfully'
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