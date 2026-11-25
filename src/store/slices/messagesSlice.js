import { createSlice } from '@reduxjs/toolkit'

const MESSAGES_STORAGE_KEY = 'simple-chat-messages'

// Загрузка сообщений из localStorage
const loadMessages = () => {
    try {
        const stored = localStorage.getItem(MESSAGES_STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState: loadMessages(),
    reducers: {
        addMessage: (state, action) => {
            state.push(action.payload)
        },
        clearMessages: () => {
            return []
        },
        removeMessage: (state, action) => {
            return state.filter(msg => msg.id !== action.payload)
        },
    },
})

// Синхронизация с localStorage
let previousMessages = loadMessages()
const syncMessages = (currentMessages) => {
    if (JSON.stringify(currentMessages) !== JSON.stringify(previousMessages)) {
        localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(currentMessages))
        previousMessages = currentMessages
    }
}

export const { addMessage, clearMessages, removeMessage } = messagesSlice.actions
export default messagesSlice.reducer

// Экспорт функции синхронизации для использования в index.js
export { syncMessages }
