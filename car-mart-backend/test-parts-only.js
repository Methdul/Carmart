// car-mart-backend/test-parts-only.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Testing parts routes only' });
});

console.log('🧪 Testing ONLY parts routes...');

try {
  app.use('/api/parts', require('./src/routes/parts'));
  console.log('✅ Parts routes loaded');
  
  app.listen(5001, () => {
    console.log('✅ SUCCESS! Parts routes work fine');
    process.exit(0);
  });
  
} catch (error) {
  console.error('❌ ERROR in parts routes:', error.message);
  process.exit(1);
}