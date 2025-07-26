const express = require('express');
const router = express.Router();

// GET /api/search - Global search
router.get('/', (req, res) => {
  const { q, type } = req.query;
  
  res.json({ 
    success: true,
    message: 'Global search - To be implemented',
    query: q,
    type: type,
    data: {
      vehicles: [],
      parts: [],
      services: []
    }
  });
});

module.exports = router;