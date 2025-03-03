const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


const router = express.Router();

    router.get('/admin', rejectUnauthenticated, async (req, res) => { 
      if (!req.user.is_admin) {
        return res.sendStatus(403); 
      }
    
      try {
        //select all from table users
      //return result.rows
        // Select all from the table users
        const query = 'SELECT * FROM user'; 
        const result = await pool.query(query); 
        res.status(200).send(result.rows); 
      } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'Error fetching all users' }); 
      }
    });

// If the request came from an authenticated user, this route
// sends back an object containing that user's information.
// Otherwise, it sends back an empty object to indicate there
// is not an active session.
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

// Handles the logic for creating a new user. The one extra wrinkle here is
// that we hash the password before inserting it into the database.
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);
  const name = req.body.name;
  const phone = req.body.phone 

  const sqlText = `
    INSERT INTO "user"
      ("username", "password", "name", phone)
      VALUES
      ($1, $2, $3, $4);
  `;
  const sqlValues = [username, hashedPassword, name, phone];

  pool.query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.log('POST /api/user/register error: ', dbErr);
      res.sendStatus(500);
    });
});

// Handles the logic for logging in a user. When this route receives
// a request, it runs a middleware function that leverages the Passport
// library to instantiate a session if the request body's username and
// password are correct.
  // You can find this middleware function in /server/strategies/user.strategy.js.
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// Clear all server session information about this user:
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user.
  req.logout((err) => {
    if (err) { 
      return next(err); 
    }
    res.sendStatus(200);
  });
});


module.exports = router;
