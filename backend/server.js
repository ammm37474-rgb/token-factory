require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { ethers } = require('ethers');

const app = express();

// تنظیمات Middleware
app.use(cors());
app.use(express.json());

// تنظیمات دیتابیس (استفاده از DATABASE_URL از محیط)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// اتصال به شبکه Polygon (استفاده از RPC از محیط)
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);

// تست اولیه اتصال
app.get('/', (req, res) => {
  res.send('Token Factory Backend is running successfully!');
});

// اینجا می‌توانید روت‌های دیگر (API) خود را اضافه کنید
// مثال: دریافت لیست توکن‌ها
app.get('/api/tokens', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tokens'); // فرض بر وجود جدول tokens
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- بخش حیاتی برای Runflare (پورت پویا و هاست 0.0.0.0) ---
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server successfully started and listening on port ${port}`);
});
