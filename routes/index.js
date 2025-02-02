var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'User Registration' });
});

router.post('/register', function (req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required!');
  }

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error('Error saving data:', err);
        return res.status(500).send('Error registering user.');
      }
      res.send("User registered successfully! <a href='/register'>Go Back</a>");
    }
  );
});

module.exports = router;
