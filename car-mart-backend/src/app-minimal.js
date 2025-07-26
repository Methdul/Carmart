// car-mart-backend/src/app-minimal.js
// Create this file to test step by step

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Mart API is running!',
    timestamp: new Date().toISOString()
  });
});

// Test 1: Start server without any routes or database
console.log('🧪 Testing basic server startup...');

app.listen(PORT, () => {
  console.log(`✅ Basic server started on port ${PORT}`);
  console.log('If you see this, the basic Express setup works fine.');
  console.log('Now we can test adding components one by one.');
});

module.exports = app;