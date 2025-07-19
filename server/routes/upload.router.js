const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Temporary local file storage
const upload = multer({ dest: 'uploads/' });

// Upload route (admin-only)
router.post('/', rejectUnauthenticated, upload.single('image'), async (req, res) => {
  // ✅ Only allow admin users
  if (!req.user?.is_admin) {
    return res.sendStatus(403); // Forbidden
  }

  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;

  try {
    // Upload to Cloudinary
    const cloudResult = await cloudinary.uploader.upload(filePath);

    // Save to database
    const query = `
      INSERT INTO user_uploads (user_id, image_url, public_id)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const result = await pool.query(query, [
      req.user.id,
      cloudResult.secure_url,
      cloudResult.public_id
    ]);

    // Clean up temp file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete temp file:', err);
      }
    });

    res.status(201).send({ message: 'Uploaded successfully', file: result.rows[0] });
  } catch (error) {
    console.error('Upload failed:', error);

    // Clean up temp file on error
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete temp file on error:', err);
      }
    });

    res.status(500).send({ error: 'Upload failed' });
  }
});

module.exports = router;
