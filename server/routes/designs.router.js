const express = require('express');
const encryptLib = require('../modules/encryption'); 
const pool = require('../modules/pool'); 
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); 

const router = express.Router();

// post designs only for admin
router.post('/', rejectUnauthenticated, async (req, res) => {
  
    const { title, image_url, price, description } = req.body;
  
    const query = `
      INSERT INTO designs (title, image_url, price, description) 
      VALUES ($1, $2, $3, $4) RETURNING *`;
  
    try {
      const result = await pool.query(query, [title, image_url, price, description]);
  
      // send the message and design 
      // res.status(201).send(result.rows[0]);  // Send back the newly created design it
      // same thing as below code except retaining message and name design
  
      res.status(201).send({
        message: 'Design created successfully',
        design: result.rows[0] 
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error creating design' });
    }
  });
  
// designs this for public
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM designs';
  try {
    const result = await pool.query(query);
    
    res.status(201).send(result.rows);  
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching designs' });
  }
});

//PUT route
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const query = `
  UPDATE "designs" SET "price" = $2 WHERE "id" = $1;
  `;
  pool.query(query, [req.params.id, req.body.price]) 
    .then(result => {
    
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error deleting design`, err);
      res.sendStatus(500);
    })
})

//Delete route
router.delete("/:id", rejectUnauthenticated, (req, res) => {
    const query = `
    DELETE 
  FROM "designs"
  WHERE "id" = $1;
    `;
    pool.query(query, [req.params.id]) 
      .then(result => {
      
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(`Error deleting design`, err);
        res.sendStatus(500);
      })
  })


module.exports = router;
