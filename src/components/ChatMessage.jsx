function ChatMessage({ message }) {
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <li className="chat-message system">
        <div className="message-content">
          <span className="system-text">{message.text}</span>
        </div>
      </li>
    );
  }

  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <li className="chat-message">
      <span className="message-author">{message.author}</span>
      <span className="message-text">{message.text}</span>
      {time && <span className="message-time">{time}</span>}
    </li>
  );
}

export default ChatMessage;
