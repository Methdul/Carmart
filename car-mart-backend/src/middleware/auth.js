// car-mart-backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { UserService } = require('../services/database');

const userService = new UserService();

// Middleware to authenticate JWT tokens
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure they still exist and are active
    const userResult = await userService.findById(decoded.userId);
    
    if (!userResult.success || !userResult.data) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    if (!userResult.data.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Attach user info to request object
    req.user = {
      id: userResult.data.id,
      email: userResult.data.email,
      accountType: userResult.data.account_type,
      isVerified: userResult.data.is_verified
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

// Middleware to check if user is a business account
const requireBusinessAccount = (req, res, next) => {
  if (req.user.accountType !== 'business') {
    return res.status(403).json({
      success: false,
      message: 'Business account required for this action'
    });
  }
  next();
};

// Middleware to check if user is verified
const requireVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Verified account required for this action'
    });
  }
  next();
};

// Optional authentication - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userResult = await userService.findById(decoded.userId);
    
    if (userResult.success && userResult.data && userResult.data.is_active) {
      req.user = {
        id: userResult.data.id,
        email: userResult.data.email,
        accountType: userResult.data.account_type,
        isVerified: userResult.data.is_verified
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    req.user = null;
    next();
  }
};

// Middleware to check if user owns the resource
const checkOwnership = (resourceField = 'user_id') => {
  return (req, res, next) => {
    const resourceUserId = req.resource?.[resourceField] || req.params.userId || req.body.user_id;
    
    if (!resourceUserId || resourceUserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - you can only access your own resources'
      });
    }
    
    next();
  };
};

// Rate limiting helper (basic implementation)
const createRateLimit = (windowMs, max) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip + req.user?.id || req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    const userRequests = requests.get(key) || [];
    const validRequests = userRequests.filter(time => time > windowStart);

    if (validRequests.length >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }

    validRequests.push(now);
    requests.set(key, validRequests);
    next();
  };
};

// Generate JWT token
const generateToken = (userId, expiresIn = '7d') => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return { success: true, userId: decoded.userId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  authenticateToken,
  requireBusinessAccount,
  requireVerified,
  optionalAuth,
  checkOwnership,
  createRateLimit,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
};