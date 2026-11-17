import { useState, useEffect, useRef } from 'react';
import ChatList from './components/ChatList';
import ChatInput from './components/ChatInput';
import './App.css';

const STORAGE_KEY = 'simple-chat-messages';

function App() {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text, author) => {
    const newMessage = {
      text,
      author,
      timestamp: Date.now(),
      type: 'user',
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getCountWord = (count) => {
    const abs = Math.abs(count) % 100;
    const lastDigit = abs % 10;
    if (abs > 10 && abs < 20) return 'сообщений';
    if (lastDigit === 1) return 'сообщение';
    if (lastDigit >= 2 && lastDigit <= 4) return 'сообщения';
    return 'сообщений';
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Чат</h1>
        <div className="header-right">
          <span className="message-count">{messages.length} {getCountWord(messages.length)}</span>
          {messages.length > 0 && (
            <button className="clear-button" onClick={handleClear} aria-label="Очистить">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
            </svg>
            </button>
          )}
        </div>
      </header>
      <div className="chat-scroll">
        <ChatList messages={messages} />
        <div ref={chatEndRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
