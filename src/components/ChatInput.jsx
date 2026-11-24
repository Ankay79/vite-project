import { useState, useEffect } from 'react'

const MAX_LENGTH = 1000
const USER_PROFILE_KEY = 'simple-chat-user-profile'

function ChatInput({ onSend }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY)
      if (stored) {
        const profile = JSON.parse(stored)
        const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')
        if (fullName) {
          setAuthor(fullName)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || !author.trim()) return
    onSend(text.trim(), author.trim())
    setText('')
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleTextChange = (e) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setText(e.target.value)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const isOverLimit = text.length >= MAX_LENGTH

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="author-input"
        placeholder="Ваше имя"
        value={author}
        onChange={handleAuthorChange}
        required
      />
      <div className="input-wrapper">
        <input
          type="text"
          className={`message-input ${isOverLimit ? 'over-limit' : ''}`}
          placeholder="Введите сообщение..."
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          maxLength={MAX_LENGTH}
          required
        />
        <button type="submit" className="send-button" aria-label="Отправить">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
      <span className={`char-count ${isOverLimit ? 'over-limit' : ''}`}>{text.length}/{MAX_LENGTH}</span>
    </form>
  );
}

export default ChatInput;
