const express = require('express');
const encryptLib = require('../modules/encryption'); 
const pool = require('../modules/pool'); 
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); 

const router = express.Router();

// designs this for public
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM designs';
  try {
    const result = await pool.query(query);
    
    res.status(201).send(result.rows[0]);  
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching designs' });
  }
});

module.exports = router;
