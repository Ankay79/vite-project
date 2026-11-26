import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import Main from './Pages/Main/Main'
import Chats from './Pages/Chats/Chats'
import Contacts from './Pages/Contacts/Contacts'
import Music from './Pages/Music/Music'
import YoursChat from './Pages/Chats/YoursChat'
import MyDocs from './Pages/MyDocs/MyDocs'
import Profile from './Pages/Profile/Profile'
import Maps from './Pages/Maps/Maps'
import GeneralChat from './Pages/GeneralChat/GeneralChat'
import Notes from './Pages/Notes/Notes'
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen'
import { setProfile, clearProfile } from './store/slices/profileSlice'

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
