const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002; // Different port to avoid conflicts

// Upload directory
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('📁 Saving file to:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const filename = 'test-' + Date.now() + '-' + file.originalname;
    console.log('📝 Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Test upload route (NO authentication needed)
app.post('/test-upload', upload.single('file'), (req, res) => {
  console.log('🧪 TEST: Upload request received');
  console.log('🧪 TEST: File received?', req.file ? 'YES ✅' : 'NO ❌');
  
  if (!req.file) {
    console.log('❌ No file in request');
    return res.json({ 
      success: false, 
      message: 'No file received',
      uploadDir: uploadsDir,
      dirExists: fs.existsSync(uploadsDir)
    });
  }
  
  console.log('✅ File saved successfully:', req.file.filename);
  
  res.json({
    success: true,
    message: 'Test upload successful!',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`
    }
  });
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Info endpoint
app.get('/info', (req, res) => {
  const files = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
  res.json({
    message: 'Test upload server info',
    uploadDir: uploadsDir,
    dirExists: fs.existsSync(uploadsDir),
    filesCount: files.length,
    files: files.slice(-5) // Show last 5 files
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🧪 =================================');
  console.log('🧪 SIMPLE UPLOAD TEST SERVER READY');
  console.log('🧪 =================================');
  console.log(`🧪 Server: http://localhost:${PORT}`);
  console.log(`📁 Upload Dir: ${uploadsDir}`);
  console.log(`📁 Dir Exists: ${fs.existsSync(uploadsDir) ? 'YES' : 'NO'}`);
  console.log('');
  console.log('🧪 Ready for testing!');
  console.log('');
});

