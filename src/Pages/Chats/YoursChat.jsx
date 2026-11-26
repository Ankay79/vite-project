import { useState, useEffect, useRef } from 'react'
import ChatList from '../../components/ChatList'
import ChatInput from '../../components/ChatInput'
import '../../App.css'

const STORAGE_KEY = 'simple-chat-messages'

const YoursChat = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const chatEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (text, author) => {
    const newMessage = {
      text,
      author,
      timestamp: Date.now(),
      type: 'user',
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleClear = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Чат</h1>
        <div className="header-right">
          <span className="message-count">{messages.length}</span>
          {messages.length > 0 && (
            <button className="clear-button" onClick={handleClear}>
              Очистить
            </button>
          )}
        </div>
      </header>
      <div className="chat-scroll">
        <ChatList messages={messages} />
      </div>
      <ChatInput onSend={handleSend} />
      <div ref={chatEndRef} />
    </div>
  )
}

export default YoursChat