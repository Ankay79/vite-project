import { configureStore } from '@reduxjs/toolkit'
import messagesReducer, { syncMessages } from './slices/messagesSlice'
import profileReducer, { syncWithStorage } from './slices/profileSlice'
import notesReducer, { syncNotes } from './slices/notesSlice'
import musicReducer, { syncFavorites } from './slices/musicSlice'

const store = configureStore({
    reducer: {
        messages: messagesReducer,
        profile: profileReducer,
        notes: notesReducer,
        music: musicReducer,
    },
})

// Синхронизация с localStorage
store.subscribe(() => {
    syncMessages(store.getState().messages)
    syncWithStorage(store.getState().profile)
    syncNotes(store.getState().notes)
    syncFavorites(store.getState().music.favorites)
})

export default store
