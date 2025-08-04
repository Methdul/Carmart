// car-mart-backend/src/app.js
// ✅ CLEAN VERSION - All Issues Fixed

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

// Create uploads directory
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory:', uploadsDir);
} else {
  console.log('📁 Using existing uploads directory:', uploadsDir);
}

// ✅ MIDDLEWARE CONFIGURATION
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(uploadsDir));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path}`);
  next();
});

// ✅ BASIC ROUTES
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

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Car Mart API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
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

// ✅ API ROUTES - CLEAN ORGANIZATION
const routes = [
  { path: '/api/auth', file: './routes/auth', name: 'Auth' },
  { path: '/api/staff', file: './routes/staff', name: 'Staff' }, // ✅ ONLY ONE STAFF ROUTE
  { path: '/api/users', file: './routes/users', name: 'Users' },
  { path: '/api/vehicles', file: './routes/vehicles', name: 'Vehicles' },
  { path: '/api/parts', file: './routes/parts', name: 'Parts' },
  { path: '/api/services', file: './routes/services', name: 'Services' },
  { path: '/api/rentals', file: './routes/rentals', name: 'Rentals' }, // ✅ RENTALS ADDED
  { path: '/api/upload', file: './routes/upload', name: 'Upload' },
  { path: '/api/favorites', file: './routes/favorites', name: 'Favorites' },
  { path: '/api/search', file: './routes/search', name: 'Search' }
];

// Load all routes dynamically
routes.forEach(({ path, file, name }) => {
  try {
    app.use(path, require(file));
    console.log(`✅ ${name} routes loaded`);
  } catch (error) {
    console.log(`⚠️ ${name} routes not found - ${error.message}`);
  }
});

// ✅ ERROR HANDLING MIDDLEWARE
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

// ✅ 404 HANDLER
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: routes.map(route => route.path),
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// ✅ START SERVER
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
   API Health:   http://localhost:${PORT}/api/health
   Upload Info:  http://localhost:${PORT}/api/upload-info
   
🔗 Main Endpoints:
   Register:     POST http://localhost:${PORT}/api/auth/register
   Login:        POST http://localhost:${PORT}/api/auth/login
   Staff Login:  POST http://localhost:${PORT}/api/staff/login
   Vehicles:     GET  http://localhost:${PORT}/api/vehicles
   Parts:        GET  http://localhost:${PORT}/api/parts
   Services:     GET  http://localhost:${PORT}/api/services
   Rentals:      GET  http://localhost:${PORT}/api/rentals  ✅
   Upload:       POST http://localhost:${PORT}/api/upload/images

📊 Loaded Routes: ${routes.length}
🚀 =======================================
  `);
});

module.exports = app;