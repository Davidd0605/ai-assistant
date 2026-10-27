import { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setReply('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setReply(data.reply ?? `Error: ${data.error}`);
    } catch (err) {
      setReply(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        style={{ width: '100%' }}
      />
      <button onClick={send} disabled={loading || !message.trim()}>
        {loading ? 'Thinking…' : 'Send'}
      </button>
      <p style={{ whiteSpace: 'pre-wrap' }}>{reply}</p>
    </div>
  );
}