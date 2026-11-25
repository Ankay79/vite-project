import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './slices/messagesSlice'
import profileReducer from './slices/profileSlice'
import notesReducer from './slices/notesSlice'
import musicReducer from './slices/musicSlice'

const store = configureStore({
    reducer: {
        messages: messagesReducer,
        profile: profileReducer,
        notes: notesReducer,
        music: musicReducer,
    },
})

export default store
