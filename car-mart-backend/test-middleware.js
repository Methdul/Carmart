// car-mart-backend/test-middleware.js
// Add middleware piece by piece to find the culprit
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 5003;

console.log('🧪 Testing middleware step by step...');

// Step 1: Basic setup that we know works
app.use(express.json());

console.log('✅ Basic express.json() added');

// Step 2: Add URL encoding
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
console.log('✅ URL encoding added');

// Step 3: Add CORS - THIS MIGHT BE THE ISSUE
try {
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.com'] 
      : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  }));
  console.log('✅ CORS added');
} catch (error) {
  console.error('❌ ERROR adding CORS:', error.message);
  process.exit(1);
}

// Step 4: Add static file serving
try {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  console.log('✅ Static file serving added');
} catch (error) {
  console.error('❌ ERROR adding static files:', error.message);
  process.exit(1);
}

// Step 5: Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
console.log('✅ Logging middleware added');

// Step 6: Add basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Mart API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Step 7: Add your working routes
app.use('/api/vehicles', require('./src/routes/vehicles'));
app.use('/api/parts', require('./src/routes/parts'));
console.log('✅ Routes added');

// Step 8: Add error handling - THIS MIGHT BE THE ISSUE
try {
  app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  });
  console.log('✅ Error handler added');
} catch (error) {
  console.error('❌ ERROR adding error handler:', error.message);
  process.exit(1);
}

// Step 9: Add 404 handler - THIS IS LIKELY THE CULPRIT
try {
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`
    });
  });
  console.log('✅ 404 handler added');
} catch (error) {
  console.error('❌ ERROR adding 404 handler:', error.message);
  process.exit(1);
}

console.log('🚀 Starting server with all middleware...');

try {
  app.listen(PORT, () => {
    console.log(`✅ SUCCESS! Server started on port ${PORT}`);
    console.log('All middleware works together!');
    process.exit(0);
  });
} catch (error) {
  console.error('❌ ERROR starting server:', error.message);
  process.exit(1);
}