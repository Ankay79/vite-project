import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header.jsx'
import Main from './Pages/Main/Main.jsx'
import Chats from './Pages/Chats/Chats.jsx'
import Contacts from './Pages/Contacts/Contacts.jsx'
import Music from './Pages/Music/Music.jsx'
import YoursChat from './Pages/Chats/YoursChat.jsx'
import MyDocs from './Pages/MyDocs/MyDocs.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import Maps from './Pages/Maps/Maps.jsx'
import GeneralChat from './Pages/GeneralChat/GeneralChat.jsx'
import Notes from './Pages/Notes/Notes.jsx'
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen.jsx'
import { setProfile, clearProfile } from './store/slices/profileSlice.js'

function AppReactRouter() {
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const handleWelcomeComplete = (newProfile) => {
        dispatch(setProfile(newProfile))
    }

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner" />
            </div>
        )
    }

    if (!profile) {
        return <WelcomeScreen onComplete={handleWelcomeComplete} />
    }

    return (
        <>
            <Router>
                <Header profile={profile} />
                <main>
                    <Routes>
                        <Route path="/main" element={<Main />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/chats" element={<Chats />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/yourschat" element={<YoursChat />} />
                        <Route path="/mydocs" element={<MyDocs />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/maps" element={<Maps />} />
                        <Route path="/generalchat" element={<GeneralChat />} />
                        <Route path="/notes" element={<Notes />} />
                    </Routes>
                </main>
            </Router>
        </>
    )
}

export default AppReactRouter
