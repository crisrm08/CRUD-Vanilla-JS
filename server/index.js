import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool, assertDbConnection } from './db.js';

const app = express();
app.use(cors());            
app.use(express.json());    

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/db/health', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT 1 AS ok');
    res.json({ ok: rows[0].ok === 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'db-fail' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await assertDbConnection();
  console.log(`API listening on http://localhost:${PORT}`);
});
