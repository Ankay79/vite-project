import { createSlice } from '@reduxjs/toolkit'

const USER_PROFILE_KEY = 'simple-chat-user-profile'

// Загрузка профиля из localStorage
const loadProfile = () => {
    try {
        const stored = localStorage.getItem(USER_PROFILE_KEY)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch {
        // ignore
    }
    return null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: loadProfile(),
    reducers: {
        setProfile: (state, action) => {
            return {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                createdAt: action.payload.createdAt || Date.now(),
            }
        },
        updateProfile: (state, action) => {
            if (!state) return state
            return {
                ...state,
                ...action.payload,
            }
        },
        clearProfile: () => {
            return null
        },
    },
})

// Синхронизация с localStorage
let previousState = loadProfile()
const syncWithStorage = (currentState) => {
    if (JSON.stringify(currentState) !== JSON.stringify(previousState)) {
        if (currentState) {
            localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(currentState))
        } else {
            localStorage.removeItem(USER_PROFILE_KEY)
        }
        previousState = currentState
    }
}

export const { setProfile, updateProfile, clearProfile } = profileSlice.actions
export default profileSlice.reducer

export { syncWithStorage }
