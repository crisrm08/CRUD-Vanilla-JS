import { config } from './env.js';
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  host: config.PG_HOST,
  port: config.PG_PORT,
  database: config.PG_DATABASE,
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  max: 10,              
  idleTimeoutMillis: 0,  
});

export async function assertDbConnection() {
  const { rows } = await pool.query('SELECT NOW() AS now');
  console.log('DB OK @', rows[0].now);
}
