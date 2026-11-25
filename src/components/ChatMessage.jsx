import { useState, useRef, useCallback } from 'react'

function ChatMessage({ message }) {
  const { type } = message
  const isSystem = type === 'system'
  const isLocation = type === 'location'
  const isImage = type === 'image'
  const isVoice = type === 'voice'

  const [imageLoaded, setImageLoaded] = useState(false)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  const toggleVoice = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
      audio.onended = () => setIsPlaying(false)
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  if (isSystem) {
    return (
      <li className="chat-message system">
        <div className="message-content">
          <span className="system-text">{message.text}</span>
        </div>
      </li>
    );
  }

  return (
    <li className={`chat-message ${type ? type : ''}`}>
      <span className="message-author">{message.author}</span>
      <div className="message-content">
        {/* Геолокация */}
        {isLocation && message.data?.mapUrl && (
          <a
            href={message.data.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location-link"
          >
            📍 {message.text.replace('📍 [Геолокация]', '').replace('()','').trim()}
          </a>
        )}

        {/* Изображение */}
        {isImage && message.data?.data && (
          <div className="image-message">
            {!imageLoaded && <div className="image-loading" />}
            <img
              src={message.data.data}
              alt={message.data.fileName || 'Фото'}
              onLoad={() => setImageLoaded(true)}
              className="message-image"
            />
          </div>
        )}

        {/* Голосовое сообщение */}
        {isVoice && message.data?.url && (
          <div className="voice-message">
            <audio ref={audioRef} src={message.data.url} preload="metadata" />
            <button className="voice-play-btn" onClick={toggleVoice}>
              {isPlaying ? '⏸' : '▶️'}
            </button>
            <span className="voice-duration">{message.data.duration || message.text.replace('🎤', '').replace(/\([^)]*\)/, '').trim()}</span>
          </div>
        )}

        {/* Обычный текст */}
        {!isLocation && !isImage && !isVoice && (
          <span className="message-text">{message.text}</span>
        )}
      </div>
      {time && <span className="message-time">{time}</span>}
    </li>
  );
}

export default ChatMessage;
