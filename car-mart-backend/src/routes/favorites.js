const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { FavoritesService } = require('../services/database');

// GET /api/favorites - Get user's favorites with details
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`📖 Fetching favorites for user: ${req.user.id}`);
    
    const favorites = await FavoritesService.getUserFavorites(req.user.id);
    const stats = await FavoritesService.getFavoritesStats(req.user.id);
    
    console.log(`✅ Found ${favorites.length} favorites for user ${req.user.id}`);
    
    res.json({
      success: true,
      data: favorites,
      stats: stats,
      total: favorites.length
    });

  } catch (error) {
    console.error('❌ Error fetching favorites:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites',
      error: error.message
    });
  }
});

// POST /api/favorites - Add item to favorites
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { itemType, itemId } = req.body;
    
    // Validate input
    if (!itemType || !itemId) {
      return res.status(400).json({
        success: false,
        message: 'Item type and item ID are required'
      });
    }

    if (!['vehicle', 'part', 'service'].includes(itemType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item type. Must be vehicle, part, or service'
      });
    }

    console.log(`❤️ Adding to favorites: ${itemType} ${itemId} for user ${req.user.id}`);
    
    const favorite = await FavoritesService.addFavorite(req.user.id, itemType, itemId);
    
    console.log(`✅ Added favorite: ${favorite.id}`);
    
    res.status(201).json({
      success: true,
      message: 'Added to favorites',
      data: favorite
    });

  } catch (error) {
    console.error('❌ Error adding favorite:', error);
    
    if (error.message.includes('already in favorites')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to add favorite',
      error: error.message
    });
  }
});

// DELETE /api/favorites/:itemType/:itemId - Remove from favorites
router.delete('/:itemType/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemType, itemId } = req.params;
    
    if (!['vehicle', 'part', 'service'].includes(itemType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item type. Must be vehicle, part, or service'
      });
    }

    console.log(`💔 Removing from favorites: ${itemType} ${itemId} for user ${req.user.id}`);
    
    const removed = await FavoritesService.removeFavorite(req.user.id, itemType, itemId);
    
    console.log(`✅ Removed favorite: ${removed.id}`);
    
    res.json({
      success: true,
      message: 'Removed from favorites',
      data: removed
    });

  } catch (error) {
    console.error('❌ Error removing favorite:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to remove favorite',
      error: error.message
    });
  }
});

module.exports = router;