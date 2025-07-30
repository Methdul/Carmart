// car-mart-backend/src/routes/upload.js
// FIXED VERSION - Consistent paths and better error handling
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// FIXED: Use consistent path with app.js static serving
const uploadsDir = path.join(__dirname, '../../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Upload route: Created uploads directory at', uploadsDir);
} else {
  console.log('📁 Upload route: Using existing uploads directory at', uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('📁 Multer destination:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
    console.log('📝 Generated filename:', fileName);
    cb(null, fileName);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  console.log('🔍 Checking file type:', file.mimetype);
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    console.log('✅ File type accepted:', file.mimetype);
    cb(null, true);
  } else {
    console.log('❌ File type rejected:', file.mimetype);
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
  }
};

// Configure multer with file size limit (5MB per file)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 15 // Maximum 15 files
  }
});

// POST /api/upload/images - Upload multiple images
router.post('/images', authenticateToken, upload.array('images', 15), (req, res) => {
  try {
    console.log('📤 Upload request received');
    console.log('User:', req.user?.email || 'Unknown');
    console.log('Files received:', req.files?.length || 0);
    
    if (!req.files || req.files.length === 0) {
      console.log('❌ No files in request');
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
        debug: {
          filesReceived: req.files?.length || 0,
          uploadsDir: uploadsDir,
          uploadsDirExists: fs.existsSync(uploadsDir)
        }
      });
    }

    // Generate file URLs
    const fileUrls = req.files.map(file => {
      const fileData = {
        filename: file.filename,
        originalName: file.originalname,
        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype
      };
      
      console.log('✅ File saved:', file.filename, `(${file.size} bytes)`);
      return fileData;
    });

    res.json({
      success: true,
      message: `Successfully uploaded ${req.files.length} file(s)`,
      data: {
        files: fileUrls,
        count: req.files.length
      }
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading files',
      error: error.message,
      debug: {
        uploadsDir: uploadsDir,
        uploadsDirExists: fs.existsSync(uploadsDir)
      }
    });
  }
});

// POST /api/upload/single - Upload single image
router.post('/single', authenticateToken, upload.single('image'), (req, res) => {
  try {
    console.log('📤 Single upload request received');
    console.log('User:', req.user?.email || 'Unknown');
    
    if (!req.file) {
      console.log('❌ No file in request');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype
    };

    console.log('✅ Single file saved:', req.file.filename);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: fileUrl
    });

  } catch (error) {
    console.error('❌ Single upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

// DELETE /api/upload/:filename - Delete uploaded file
router.delete('/:filename', authenticateToken, (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    console.log('🗑️ Delete request for:', filename);
    console.log('File path:', filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('❌ File not found:', filePath);
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);
    console.log('✅ File deleted successfully:', filename);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
});

// GET /api/upload/info - Debug endpoint to check upload configuration
router.get('/info', (req, res) => {
  const uploadDirExists = fs.existsSync(uploadsDir);
  let files = [];
  let stats = null;
  
  if (uploadDirExists) {
    try {
      files = fs.readdirSync(uploadsDir);
      stats = fs.statSync(uploadsDir);
    } catch (error) {
      console.error('Error reading upload directory:', error);
    }
  }

  res.json({
    success: true,
    data: {
      uploadsDir: uploadsDir,
      uploadDirExists,
      filesCount: files.length,
      recentFiles: files.slice(-5), // Show last 5 files
      permissions: stats ? stats.mode.toString(8) : null,
      isWritable: uploadDirExists ? fs.constants.W_OK : false
    }
  });
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  console.error('🚨 Multer error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB per file.'
      });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 15 files.'
      });
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload.'
      });
    }
  }

  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  next(error);
});

module.exports = router;