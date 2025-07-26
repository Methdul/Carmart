// car-mart-backend/test-vehicles-only.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Testing vehicles routes only' });
});

console.log('🧪 Testing ONLY vehicles routes...');

try {
  app.use('/api/vehicles', require('./src/routes/vehicles'));
  console.log('✅ Vehicles routes loaded');
  
  app.listen(5000, () => {
    console.log('✅ SUCCESS! Vehicles routes work fine');
    process.exit(0);
  });
  
} catch (error) {
  console.error('❌ ERROR in vehicles routes:', error.message);
  process.exit(1);
}