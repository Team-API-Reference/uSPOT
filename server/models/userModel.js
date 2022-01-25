const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DB_URI });

module.exports = {
  connect: async (uri) => {
    pool = new Pool({ connectionString: uri });
  },
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
  close: async () => {
    await pool.end();
  },
};