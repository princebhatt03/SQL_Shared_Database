const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Create MySQL Connection Pool (Better Performance)
const pool = mysql.createPool({
  connectionLimit: 10, // Set max connections
  uri: process.env.DATABASE_URL, // Using Clever Cloud MySQL URI from .env
  waitForConnections: true,
  queueLimit: 0,
});

// Export the connection (with Promises)
const db = pool.promise(); // Converts to async/await compatible
module.exports = db;
