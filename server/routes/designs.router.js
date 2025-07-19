const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// POST new design (admin only)
router.post('/', rejectUnauthenticated, async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send({ error: 'Permission denied' });
  }

  const { title, image_url, price, description } = req.body;

  const query = `
    INSERT INTO designs (title, image_url, price, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [title, image_url, price, description]);
    res.status(201).send({
      message: 'Design created successfully',
      design: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating design:', error);
    res.status(500).send({ error: 'Error creating design' });
  }
});

// GET all designs (public)
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM designs ORDER BY id DESC';
  try {
    const result = await pool.query(query);
    res.status(200).send(result.rows);
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).send({ error: 'Error fetching designs' });
  }
});

// PUT update price (admin only)
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send({ error: 'Permission denied' });
  }

  const { price } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE designs SET price = $1 WHERE id = $2 RETURNING *;
  `;

  try {
    const result = await pool.query(query, [price, id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'Design not found' });
    }

    res.status(200).send({
      message: 'Design updated',
      design: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating design:', error);
    res.status(500).send({ error: 'Error updating design' });
  }
});

// DELETE design (admin only)
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send({ error: 'Permission denied' });
  }

  const { id } = req.params;
  const query = 'DELETE FROM designs WHERE id = $1 RETURNING *;';

  try {
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'Design not found' });
    }

    res.status(200).send({
      message: 'Design deleted',
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error('Error deleting design:', error);
    res.status(500).send({ error: 'Error deleting design' });
  }
});

module.exports = router;
