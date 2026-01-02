const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs/promises');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Temporary local file storage + safety
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  }
});

router.post('/', rejectUnauthenticated, upload.single('image'), async (req, res) => {
  if (!req.user?.is_admin) return res.sendStatus(403);
  if (!req.file) return res.status(400).send({ error: 'No file uploaded' });

  const filePath = req.file.path;
  let cloudResult;

  try {
    cloudResult = await cloudinary.uploader.upload(filePath);

    const query = `
      INSERT INTO user_uploads (user_id, image_url, public_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const dbResult = await pool.query(query, [
      req.user.id,
      cloudResult.secure_url,
      cloudResult.public_id
    ]);

    return res.status(201).send({
      message: 'Uploaded successfully',
      file: dbResult.rows[0],
    });
  } catch (error) {
    console.error('Upload failed:', error);

    // If Cloudinary succeeded but DB failed, clean up Cloudinary
    if (cloudResult?.public_id) {
      try {
        await cloudinary.uploader.destroy(cloudResult.public_id);
      } catch (destroyErr) {
        console.error('Failed to delete Cloudinary image:', destroyErr);
      }
    }

    return res.status(500).send({ error: 'Upload failed' });
  } finally {
    // Always cleanup local temp file
    try {
      await fs.unlink(filePath);
    } catch (unlinkErr) {
      // file might already be gone; don’t crash
      console.error('Failed to delete temp file:', unlinkErr);
    }
  }
});

module.exports = router;
