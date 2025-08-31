import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 10,              
  idleTimeoutMillis: 0,  
});

export async function assertDbConnection() {
  const { rows } = await pool.query('SELECT NOW() AS now');
  console.log('DB OK @', rows[0].now);
}
