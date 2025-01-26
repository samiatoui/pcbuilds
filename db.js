import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
  user: 'unrg1l2viynxe',         // PostgreSQL username
  host: '35.209.32.159',         // Database server
  database: 'dbl6ryvt7abmwk',    // Database name
  password: '43d)1s1151h@',      // PostgreSQL password
  port: 5432,                    // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack));

// Export query function
export const query = (text, params) => pool.query(text, params);
export { pool };