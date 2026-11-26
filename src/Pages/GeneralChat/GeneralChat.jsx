import { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, clearMessages } from '../../store/slices/messagesSlice.js'
import { fetchMessages, sendMessage, clearMessages as clearMessagesApi } from '../../services/chatService.js'
import ChatList from '../../components/ChatList'
import ChatInput from '../../components/ChatInput'
import '../../App.css'

const POLL_INTERVAL = 2000

const GeneralChat = () => {
    const messages = useSelector((state) => state.messages)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const chatEndRef = useRef(null)

    // Polling: fetch messages from backend
    const poll = useCallback(async () => {
        try {
            const data = await fetchMessages()
            // Загружаем сообщения в Redux
            dispatch(clearMessages())
            data.forEach(msg => dispatch(addMessage(msg)))
            setError(null)
        } catch {
            setError('Не удалось подключиться к серверу')
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    useEffect(() => {
        poll()
        const interval = setInterval(poll, POLL_INTERVAL)
        return () => clearInterval(interval)
    }, [poll])

    // Auto-scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async (text, author) => {
        try {
            const newMessage = await sendMessage({ author, text })
            dispatch(addMessage(newMessage))
        } catch {
            setError('Не удалось отправить сообщение')
        }
    }

    const handleClear = async () => {
        try {
            await clearMessagesApi()
            dispatch(clearMessages())
        } catch {
            setError('Не удалось очистить чат')
        }
    }

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>Общий чат</h1>
                <div className="header-right">
                    <span className="message-count">{messages.length}</span>
                    {messages.length > 0 && (
                        <button className="clear-button" onClick={handleClear}>
                            Очистить
                        </button>
                    )}
                </div>
            </header>

            {error && <div className="chat-error">{error}</div>}

            <div className="chat-scroll">
                {loading && messages.length === 0 ? (
                    <div className="chat-empty">Загрузка...</div>
                ) : (
                    <ChatList messages={messages} />
                )}
            </div>

            <ChatInput onSend={handleSend} />
            <div ref={chatEndRef} />
        </div>
    )
}

export default GeneralChat
