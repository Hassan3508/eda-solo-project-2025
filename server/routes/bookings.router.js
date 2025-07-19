const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// Create a booking (with double-booking conflict prevention)
router.post('/', rejectUnauthenticated, async (req, res) => {
  const {
    design_id,
    appointment_date,
    available_id,
    payment_method,
    payment_date,
    requested_time
  } = req.body;

  const userId = req.user.id;

  try {
    // Check if this date and time slot is already booked
    const conflictCheck = await pool.query(`
      SELECT * FROM bookings
      WHERE appointment_date = $1
        AND available_id = $2
        AND booking_cancel = FALSE
    `, [appointment_date, available_id]);

    if (conflictCheck.rows.length > 0) {
      return res.status(409).send({
        message: 'This slot is already booked. Please choose another time.'
      });
    }

    // Insert the booking
    const insertQuery = `
      INSERT INTO bookings (
        user_id,
        design_id,
        appointment_date,
        available_id,
        payment_method,
        payment_date,
        requested_time,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *;
    `;

    const insertValues = [
      userId,
      design_id,
      appointment_date,
      available_id,
      payment_method,
      payment_date,
      requested_time || null
    ];

    const result = await pool.query(insertQuery, insertValues);

    res.status(201).send({
      message: 'Booking created successfully',
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send({ error: 'Booking creation failed' });
  }
});

module.exports = router;
