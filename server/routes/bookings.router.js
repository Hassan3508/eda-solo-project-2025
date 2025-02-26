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



module.exports = router;
