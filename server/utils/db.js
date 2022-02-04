const pg = require('pg');
const dotenv = require('dotenv');
const { Pool } = pg;

dotenv.config({ path: '../config.env' });

let poolConfig = {
  // host: process.env.DATABASE_HOST,
  // port: process.env.DATABASE_PORT,
  // database: process.env.DATABASE_NAME,
  // user: process.env.DATABASE_USER,
  host: 'localhost',
  port: 5432,
  database: 'friday',
  user: 'kingblessed',
  password: '',
};

const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectAuthotization: false },
    }
  : poolConfig;

const pool = new Pool(config);

module.exports = pool;
