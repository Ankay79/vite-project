import ChatMessage from './ChatMessage.jsx';

function ChatList({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="chat-empty">
        <p>Начните общение...</p>
      </div>
    );
  }

  return (
    <ul className="chat-list">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </ul>
  );
}

export default ChatList;
