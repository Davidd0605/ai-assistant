import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});