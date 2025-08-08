import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.get('/clock-entries', async (req, res) => {
  const result = await pool.query('SELECT * FROM clock_entries');
  res.json(result.rows);
});

app.listen(5000, () => console.log('Server running on port 5000'));