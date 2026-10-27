import { useEffect, useRef } from 'react';
import EmptyState from './EmptyState.jsx';
import Message from './Message.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import './MessageList.css';

export default function MessageList({ messages, loading }) {
  const endRef = useRef(null);

  // Scroll to the newest message whenever the list changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <main className="messages">
      {messages.length === 0 && <EmptyState />}

      {messages.map((m, i) => (
        <Message key={i} role={m.role} content={m.content} />
      ))}

      {loading && <TypingIndicator />}
      <div ref={endRef} />
    </main>
  );
}
