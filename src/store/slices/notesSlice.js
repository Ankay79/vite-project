import { createSlice } from '@reduxjs/toolkit'

const NOTES_STORAGE_KEY = 'app-notes'

// Загрузка заметок из localStorage
const loadNotes = () => {
    try {
        const stored = localStorage.getItem(NOTES_STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: loadNotes(),
    reducers: {
        addNote: (state, action) => {
            state.unshift(action.payload)
        },
        updateNote: (state, action) => {
            const index = state.findIndex(note => note.id === action.payload.id)
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload }
            }
        },
        removeNote: (state, action) => {
            return state.filter(note => note.id !== action.payload)
        },
        clearNotes: () => {
            return []
        },
    },
})

// Синхронизация с localStorage
let previousNotes = loadNotes()
const syncNotes = (currentNotes) => {
    if (JSON.stringify(currentNotes) !== JSON.stringify(previousNotes)) {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(currentNotes))
        previousNotes = currentNotes
    }
}

import store from '../index'
store.subscribe(() => {
    syncNotes(store.getState().notes)
})

export const { addNote, updateNote, removeNote, clearNotes } = notesSlice.actions
export default notesSlice.reducer
