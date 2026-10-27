import { useState } from 'react';
import './Composer.css';

export default function Composer({ onSend, disabled }) {
  const [input, setInput] = useState('');

  function submit() {
    const text = input.trim();
    if (!text || disabled) return;
    onSend(text);
    setInput('');
  }

  // Enter sends, Shift+Enter makes a new line
  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      className="composer"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Message the assistant…"
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        Send
      </button>
    </form>
  );
}
