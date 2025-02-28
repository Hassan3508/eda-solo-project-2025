const express = require('express');
const encryptLib = require('../modules/encryption'); 
const pool = require('../modules/pool'); 

const router = express.Router();

// fetch hours for office hours 
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM office_hours';
    try {
      const result = await pool.query(query);
      res.status(200).send(result.rows); 
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error fetching office hours' });
    }
});


module.exports = router;
