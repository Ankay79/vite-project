import { createSlice } from '@reduxjs/toolkit'

const MUSIC_FAVORITES_KEY = 'music-favorites'

// Загрузка избранного из localStorage
const loadFavorites = () => {
    try {
        const stored = localStorage.getItem(MUSIC_FAVORITES_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const musicSlice = createSlice({
    name: 'music',
    initialState: {
        favorites: loadFavorites(),
        currentTrack: null,
        isPlaying: false,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const trackId = action.payload
            const index = state.favorites.indexOf(trackId)
            if (index === -1) {
                state.favorites.push(trackId)
            } else {
                state.favorites.splice(index, 1)
            }
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload
        },
    },
})

// Синхронизация избранного с localStorage
let previousFavorites = loadFavorites()
const syncFavorites = (favorites) => {
    if (JSON.stringify(favorites) !== JSON.stringify(previousFavorites)) {
        localStorage.setItem(MUSIC_FAVORITES_KEY, JSON.stringify(favorites))
        previousFavorites = favorites
    }
}

export const { toggleFavorite, setCurrentTrack, setPlaying } = musicSlice.actions
export default musicSlice.reducer

export { syncFavorites }
