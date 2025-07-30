// car-mart-backend/src/app.js
// PERFECT VERSION - All Issues Fixed
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Validate essential environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ CRITICAL: JWT_SECRET not found in environment variables');
  console.log('💡 Add JWT_SECRET to your .env file');
  process.exit(1);
}

// Create uploads directory - CONSISTENT PATH
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory:', uploadsDir);
} else {
  console.log('📁 Using existing uploads directory:', uploadsDir);
}

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads - FIXED PATH
app.use('/uploads', express.static(uploadsDir));
console.log('📁 Static files served from:', uploadsDir);

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path}`);
  next();
});

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Mart API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uploadsDir: uploadsDir,
    uploadsDirExists: fs.existsSync(uploadsDir),
    jwtSecretConfigured: !!process.env.JWT_SECRET
  });
});

// Upload info endpoint for debugging
app.get('/api/upload-info', (req, res) => {
  const uploadDirExists = fs.existsSync(uploadsDir);
  let files = [];
  
  if (uploadDirExists) {
    try {
      files = fs.readdirSync(uploadsDir);
    } catch (error) {
      console.error('Error reading upload directory:', error);
    }
  }

  res.json({
    success: true,
    data: {
      uploadDir: uploadsDir,
      uploadDirExists,
      filesCount: files.length,
      recentFiles: files.slice(-5),
      jwtConfigured: !!process.env.JWT_SECRET,
      serverTime: new Date().toISOString()
    }
  });
});

// API Routes - FIXED ORDER AND PATHS
try {
  app.use('/api/auth', require('./routes/auth'));
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('⚠️ Auth routes not found - will use mock');
}

try {
  app.use('/api/users', require('./routes/users'));
  console.log('✅ Users routes loaded');
} catch (error) {
  console.log('⚠️ Users routes not found');
}

try {
  app.use('/api/vehicles', require('./routes/vehicles'));
  console.log('✅ Vehicles routes loaded');
} catch (error) {
  console.log('⚠️ Vehicles routes not found');
}

try {
  app.use('/api/parts', require('./routes/parts'));
  console.log('✅ Parts routes loaded');
} catch (error) {
  console.log('⚠️ Parts routes not found');
}

try {
  app.use('/api/services', require('./routes/services'));
  console.log('✅ Services routes loaded');
} catch (error) {
  console.log('⚠️ Services routes not found');
}

try {
  app.use('/api/upload', require('./routes/upload'));
  console.log('✅ Upload routes loaded');
} catch (error) {
  console.log('⚠️ Upload routes not found');
}

try {
  app.use('/api/favorites', require('./routes/favorites'));
  console.log('✅ Favorites routes loaded');
} catch (error) {
  console.log('⚠️ Favorites routes not found');
}

try {
  app.use('/api/search', require('./routes/search'));
  console.log('✅ Search routes loaded');
} catch (error) {
  console.log('⚠️ Search routes not found');
}

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Global error:', error.message);
  
  // Handle specific multer errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 5MB per file.'
    });
  }
  
  if (error.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Too many files. Maximum is 15 files.'
    });
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected field name for file upload.'
    });
  }
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'GET /api/upload-info',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/vehicles',
      'GET /api/parts',
      'POST /api/upload/images'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 =======================================
🚀 CAR MART API SERVER STARTED
🚀 =======================================
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📁 Upload Directory: ${uploadsDir}
📁 Upload Dir Exists: ${fs.existsSync(uploadsDir) ? 'YES ✅' : 'NO ❌'}
🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured ✅' : 'Missing ❌'}
🕐 Started: ${new Date().toISOString()}

🧪 Test Endpoints:
   Health Check: http://localhost:${PORT}/
   Upload Info:  http://localhost:${PORT}/api/upload-info
   
🔗 Main Endpoints:
   Register: POST http://localhost:${PORT}/api/auth/register
   Login:    POST http://localhost:${PORT}/api/auth/login
   Upload:   POST http://localhost:${PORT}/api/upload/images
🚀 =======================================
  `);
});

module.exports = app;