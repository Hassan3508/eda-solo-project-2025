const express = require('express');
const pool = require('../modules/pool'); 
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); 


// Customer creates a booking
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('req.body', req.body);
    //example: 1, 2025-02-27, 2, 'credit card', '2025-02-27'
  const { design_id, appointment_date, available_id, payment_method, payment_date } = req.body;

  const userId = req.user.id;

  const query = `
    INSERT INTO bookings (user_id, design_id, appointment_date, available_id, payment_method, payment_date)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;

  try {
    const result = await pool.query(query, [userId, design_id, appointment_date, available_id, payment_method, payment_date]);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error creating booking' });
  }
});

// Customer gets their bookings
router.get('/', rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT * FROM bookings WHERE user_id = $1';
  try {
    const result = await pool.query(query, [userId]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching bookings' });
  }
});

// Admin gets all bookings
router.get('/admin', rejectUnauthenticated, async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send({ error: 'Permission denied' });
  }

  const query = 'SELECT * FROM bookings';
  try {
    const result = await pool.query(query);
    res.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching all bookings' });
  }
});




module.exports = router;
