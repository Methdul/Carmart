const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// POST /api/upload/images - Upload images
router.post('/images', authenticateToken, (req, res) => {
  res.json({ 
    success: true,
    message: 'Image upload - To be implemented',
    data: { urls: [] }
  });
});

module.exports = router;