// car-mart-backend/test-without-404.js
// Test everything EXCEPT the 404 handler
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 5004;

console.log('🧪 Testing without 404 handler...');

// All middleware except 404 handler
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// API Routes
app.use('/api/vehicles', require('./src/routes/vehicles'));
app.use('/api/parts', require('./src/routes/parts'));

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// DON'T add the 404 handler - test without it

console.log('🚀 Starting server WITHOUT 404 handler...');

app.listen(PORT, () => {
  console.log(`✅ SUCCESS! Server started on port ${PORT} WITHOUT 404 handler`);
  process.exit(0);
});