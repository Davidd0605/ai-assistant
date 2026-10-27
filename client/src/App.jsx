import Composer from './components/Composer/Composer.jsx';
import Header from './components/Header/Header.jsx';
import MessageList from './components/MessageList/MessageList.jsx';
import { useChat } from './hooks/useChat.js';

export default function App() {
  const { messages, loading, send } = useChat();

  return (
    <div className="app">
      <Header />
      <MessageList messages={messages} loading={loading} />
      <Composer onSend={send} disabled={loading} />
    </div>
  );
}
