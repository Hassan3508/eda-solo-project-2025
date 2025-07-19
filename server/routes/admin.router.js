const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET /api/admin/stats — Admin-only dashboard stats
router.get('/stats', rejectUnauthenticated, async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send({ error: 'Admin only' });
  }

  try {
    const userCount = await pool.query('SELECT COUNT(*) FROM "user";');
    const bookingCount = await pool.query('SELECT COUNT(*) FROM bookings;');
    const designCount = await pool.query('SELECT COUNT(*) FROM designs;');

    res.send({
      users: userCount.rows[0].count,
      bookings: bookingCount.rows[0].count,
      designs: designCount.rows[0].count,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

module.exports = router;
