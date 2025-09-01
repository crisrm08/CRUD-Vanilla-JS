import { pool } from "../config/db.js";
import { Router } from "express";

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true });
});

router.get('/db/health', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT 1 AS ok');
    res.json({ ok: rows[0].ok === 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'db-fail' });
  }
});

export default router;
