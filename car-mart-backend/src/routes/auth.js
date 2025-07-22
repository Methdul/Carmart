const express = require('express');
const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  // Mock registration response
  res.json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: 'user123',
      name: req.body.firstName + ' ' + req.body.lastName,
      email: req.body.email
    },
    token: 'mock-jwt-token'
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  // Mock login response
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: 'user123',
      name: 'John Doe',
      email: req.body.email
    },
    token: 'mock-jwt-token'
  });
});

module.exports = router;