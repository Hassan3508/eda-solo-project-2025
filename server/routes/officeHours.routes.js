const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// GET /api/office-hours
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM office_hours ORDER BY day_of_week::int, start_time';

  try {
    const result = await pool.query(query);

    // Optional: add readable day name
    const daysMap = {
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday'
    };

    const formatted = result.rows.map(hour => ({
      ...hour,
      day_name: daysMap[hour.day_of_week]
    }));

    res.status(200).send(formatted);
  } catch (error) {
    console.error('Error fetching office hours:', error);
    res.status(500).send({ error: 'Error fetching office hours' });
  }
});

module.exports = router;
