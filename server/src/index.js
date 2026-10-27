import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { Ollama } from 'ollama'


const app = express();
const PORT = process.env.PORT ?? 3001;
const HOST = process.env.HOST ?? '127.0.0.1';
const ollama = new Ollama({ host: process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434' });
const MODEL = process.env.OLLAMA_MODEL ?? 'qwen3:4b';


app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    const response = await ollama.chat({
      model: MODEL,
      messages: [{ role: 'user', content: message }],
      think: false,
    });
    res.json({ reply: response.message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const clientDist = path.resolve(import.meta.dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});