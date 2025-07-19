const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

/**
 * GET /api/categories
 * Public - returns all categories
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.status(200).send(result.rows);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).send({ error: 'Failed to load categories' });
  }
});

/**
 * POST /api/categories
 * Protected - only admin users can add categories
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send({ error: 'Permission denied' });
  }

  const { name } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).send({ error: 'Failed to add category' });
  }
});

module.exports = router;
