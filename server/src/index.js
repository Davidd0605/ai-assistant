import 'dotenv/config';
import express from 'express';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT ?? 3001;
const HOST = process.env.HOST ?? '127.0.0.1';

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const clientDist = path.resolve(import.meta.dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});