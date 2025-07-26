// car-mart-backend/test-both-routes.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Testing both routes together' });
});

console.log('🧪 Testing vehicles + parts routes together...');

try {
  console.log('Loading vehicles...');
  app.use('/api/vehicles', require('./src/routes/vehicles'));
  console.log('✅ Vehicles routes loaded');
  
  console.log('Loading parts...');
  app.use('/api/parts', require('./src/routes/parts'));
  console.log('✅ Parts routes loaded');
  
  console.log('Starting server...');
  app.listen(5002, () => {
    console.log('✅ SUCCESS! Both routes work together');
    process.exit(0);
  });
  
} catch (error) {
  console.error('❌ ERROR when combining routes:', error.message);
  process.exit(1);
}