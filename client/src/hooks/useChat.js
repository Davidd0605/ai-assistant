import { useState } from 'react';
import { sendChatMessage } from '../api/chat.js';

// Owns the conversation state and the request lifecycle
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send(text) {
    if (!text || loading) return;

    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const reply = await sendChatMessage(text);
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'error', content: err.message }]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send };
}
