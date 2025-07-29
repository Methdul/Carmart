// car-mart-backend/src/middleware/auth.js
// CLEAN VERSION - No debug output

const jwt = require('jsonwebtoken');
const { UserService } = require('../services/database');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserService.getUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      accountType: user.account_type,
      isVerified: user.is_verified,
      firstName: user.first_name,
      lastName: user.last_name
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

    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

const requireBusinessAccount = (req, res, next) => {
  if (req.user.accountType !== 'business') {
    return res.status(403).json({
      success: false,
      message: 'Business account required for this action'
    });
  }
  next();
};

const requireVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Verified account required for this action'
    });
  }
  next();
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserService.getUserById(decoded.userId);
    
    if (user && user.is_active) {
      req.user = {
        id: user.id,
        email: user.email,
        accountType: user.account_type,
        isVerified: user.is_verified,
        firstName: user.first_name,
        lastName: user.last_name
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

const generateToken = (userId, expiresIn = '7d') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }
  
  return jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

const generateRefreshToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

module.exports = {
  authenticateToken,
  requireBusinessAccount,
  requireVerified,
  optionalAuth,
  generateToken,
  generateRefreshToken
};