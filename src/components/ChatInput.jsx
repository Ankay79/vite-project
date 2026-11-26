import { useState, useEffect, useRef, useCallback } from 'react'

const MAX_LENGTH = 1000
const USER_PROFILE_KEY = 'simple-chat-user-profile'
const MAX_RECORDING_TIME = 60000 // 60 seconds

function ChatInput({ onSend }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const fileInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recordingStartRef = useRef(null)
  const recordingTimerRef = useRef(null)
  const audioChunksRef = useRef([])

  // Загрузка профиля
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY)
      if (stored) {
        const profile = JSON.parse(stored)
        const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')
        if (fullName) setAuthor(fullName)
      }
    } catch (err) {
      console.error('Failed to load user profile:', err)
    }
  }, [])

  // Запрос разрешений на уведомления
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Таймер записи
  useEffect(() => {
    if (isRecording) {
      recordingStartRef.current = Date.now()
      recordingTimerRef.current = setInterval(() => {
        const elapsed = Date.now() - recordingStartRef.current
        setRecordingTime(elapsed)
        if (elapsed >= MAX_RECORDING_TIME) {
          stopRecording()
        }
      }, 100)
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [isRecording])

  const formatRecordingTime = useCallback((ms) => {
    const totalSec = Math.floor(ms / 1000)
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  const sendNotification = useCallback((title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '🔔' })
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

  // Отправка геолокации
  const handleSendLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Геолокация не поддерживается')
      return
    }
    if (!author.trim()) {
      alert('Укажите ваше имя')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`
        onSend(
          `📍 [Геолокация](${mapUrl})`,
          author.trim(),
          { type: 'location', latitude, longitude, mapUrl }
        )
        setShowMenu(false)
      },
      (error) => {
        alert('Не удалось получить геолокацию')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [author, onSend])

  // Отправка изображения
  const handleImageSelect = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Выберите изображение')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5 МБ')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target.result)
      if (author.trim()) {
        onSend(file.name, author.trim(), {
          type: 'image',
          data: event.target.result,
          fileName: file.name
        })
        setImagePreview(null)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
    setShowMenu(false)
  }, [author, onSend])

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
    setShowMenu(false)
  }, [])

  // Запись голосового
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunksRef.current = []
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        const duration = formatRecordingTime(recordingTime)
        onSend(`🎤 Голосовое сообщение (${duration})`, author.trim(), {
          type: 'voice',
          url: audioUrl,
          blob: audioBlob,
          duration
        })
        stream.getTracks().forEach(track => track.stop())
        setRecordingTime(0)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setShowMenu(false)
    } catch {
      alert('Нет доступа к микрофону')
    }
  }, [author, onSend, formatRecordingTime, recordingTime])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }, [isRecording])

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

        {/* Кнопки действий */}
        <div className="input-actions">
          <button
            type="button"
            className="action-btn"
            onClick={handleSendLocation}
            title="Геолокация"
          >
            📍
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={triggerFileInput}
            title="Отправить фото"
          >
            📷
          </button>

          {/* Кнопка записи/остановки */}
          <button
            type="button"
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            title={isRecording ? 'Остановить запись' : 'Записать голосовое'}
          >
            {isRecording ? '⏹' : '🎤'}
          </button>

          <button type="submit" className="send-button" aria-label="Отправить">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Таймер записи */}
      {isRecording && (
        <div className="recording-indicator">
          <span className="recording-dot">●</span>
          <span>{formatRecordingTime(recordingTime)}</span>
        </div>
      )}

      {/* Превью изображения */}
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Превью" />
        </div>
      )}

      {/* Скрытый input для файлов */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={{ display: 'none' }}
      />

      <span className={`char-count ${isOverLimit ? 'over-limit' : ''}`}>{text.length}/{MAX_LENGTH}</span>
    </form>
  );
}

export default ChatInput;
