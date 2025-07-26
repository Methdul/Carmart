// car-mart-backend/src/test-routes.js
// Test each route file individually
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Test server' });
});

console.log('🧪 Testing routes individually...');

// Test 1: Only vehicles routes
console.log('\n--- TEST 1: Vehicles routes only ---');
try {
  app.use('/api/vehicles', require('./routes/vehicles'));
  console.log('✅ Vehicles routes loaded');
  
  app.listen(PORT, () => {
    console.log('✅ Server started with vehicles routes - SUCCESS!');
    process.exit(0);
  });
  
  setTimeout(() => {
    console.log('❌ Server startup timed out - there might be an issue');
    process.exit(1);
  }, 3000);
  
} catch (error) {
  console.error('❌ Error with vehicles routes:', error.message);
  process.exit(1);
}