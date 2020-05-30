const { Pool } = require('pg');

module.exports = new Pool({
  user: 'postgres',
  password: '9Km#47mK',
  host: 'localhost',
  port: 5432,
  database: 'gymmanager',
});
