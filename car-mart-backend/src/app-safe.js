// car-mart-backend/src/app-safe.js
// Create this file to test without database connection
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Mart API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Load routes one by one with error handling
console.log('🧪 Testing route loading...');

try {
  console.log('Loading auth routes...');
  app.use('/api/auth', require('./routes/auth'));
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
}

try {
  console.log('Loading vehicle routes...');
  app.use('/api/vehicles', require('./routes/vehicles'));
  console.log('✅ Vehicle routes loaded');
} catch (error) {
  console.error('❌ Error loading vehicle routes:', error.message);
}

try {
  console.log('Loading parts routes...');
  app.use('/api/parts', require('./routes/parts'));
  console.log('✅ Parts routes loaded');
} catch (error) {
  console.error('❌ Error loading parts routes:', error.message);
}

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server WITHOUT database connection test
console.log('🚀 Starting server without database connection...');

app.listen(PORT, () => {
  console.log(`
🚀 Car Mart API Server Started Successfully!
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📊 Database: NOT CONNECTED (for testing)
🕐 Started at: ${new Date().toISOString()}
  `);
});

module.exports = app;

