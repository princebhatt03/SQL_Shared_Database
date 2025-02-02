require('dotenv').config(); // Load environment variables

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import database connection
const db = require('./db/db');

// Import Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Test Database Connection Before Using Routes
db.execute('SELECT 1')
  .then(() => {
    console.log('✅ Database connected successfully.');
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
  });

// Use Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and Forward to Error Handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
