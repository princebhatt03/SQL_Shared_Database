var express = require('express');
var router = express.Router();
const db = require('../db/db'); // Import MySQL database connection

// Render Home Page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Render Registration Page
router.get('/register', function (req, res) {
  res.render('register', { title: 'User Registration' });
});

// Handle User Registration
router.post('/register', async function (req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required!');
  }

  try {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    await db.execute(query, [name, email, password]); // Use `db.execute()` for Promises
    res.send("User registered successfully! <a href='/register'>Go Back</a>");
  } catch (err) {
    console.error('❌ Error saving data:', err);
    res.status(500).send('Error registering user.');
  }
});

module.exports = router;
