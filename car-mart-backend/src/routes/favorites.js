// car-mart-backend/src/routes/favorites.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// GET /api/favorites - Get user's favorites
router.get('/', authenticateToken, async (req, res) => {
  try {
    // For now, return empty array - implement database logic later
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites'
    });
  }
});

// POST /api/favorites - Add to favorites
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { itemType, itemId } = req.body;
    
    console.log(`Adding to favorites: ${itemType} ${itemId} for user ${req.user.id}`);
    
    // For now, just return success - implement database logic later
    res.json({
      success: true,
      message: 'Added to favorites',
      data: { itemType, itemId }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add favorite'
    });
  }
});

// DELETE /api/favorites/:itemType/:itemId - Remove from favorites
router.delete('/:itemType/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemType, itemId } = req.params;
    
    console.log(`Removing from favorites: ${itemType} ${itemId} for user ${req.user.id}`);
    
    res.json({
      success: true,
      message: 'Removed from favorites',
      data: { itemType, itemId }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove favorite'
    });
  }
});

module.exports = router;