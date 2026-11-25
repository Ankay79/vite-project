import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, clearMessages } from '../../store/slices/messagesSlice'
import ChatList from '../../components/ChatList'
import ChatInput from '../../components/ChatInput'
import '../../App.css'

const YoursChat = () => {
    const messages = useSelector((state) => state.messages)
    const dispatch = useDispatch()
    const chatEndRef = useRef(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = (text, author) => {
        const newMessage = {
            id: Date.now(),
            text,
            author,
            timestamp: Date.now(),
            type: 'user',
        }
        dispatch(addMessage(newMessage))
    }

    const handleClear = () => {
        dispatch(clearMessages())
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
