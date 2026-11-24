import { useState, useEffect } from 'react'
import '../../App.css'

const USER_PROFILE_KEY = 'simple-chat-user-profile'

const Profile = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(USER_PROFILE_KEY)
            if (stored) {
                const profile = JSON.parse(stored)
                setFirstName(profile.firstName || '')
                setLastName(profile.lastName || '')
            }
        } catch {
            // ignore
        }
    }, [])

    const handleSave = (e) => {
        e.preventDefault()
        if (!firstName.trim() || !lastName.trim()) return

        const profile = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            updatedAt: Date.now(),
        }
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleClear = () => {
        localStorage.removeItem(USER_PROFILE_KEY)
        setFirstName('')
        setLastName('')
        setSaved(false)
    }

    return (
        <div className="page-content">
            <h1>Профиль</h1>
            <form className="profile-form" onSubmit={handleSave}>
                <div className="profile-field">
                    <label htmlFor="firstName">Имя</label>
                    <input
                        type="text"
                        id="firstName"
                        className="profile-input"
                        placeholder="Введите имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="profile-field">
                    <label htmlFor="lastName">Фамилия</label>
                    <input
                        type="text"
                        id="lastName"
                        className="profile-input"
                        placeholder="Введите фамилию"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="profile-avatar">
                    <div className="avatar-circle">?</div>
                </div>
                <div className="profile-actions">
                    <button type="submit" className="profile-save-btn">
                        {saved ? 'Сохранено!' : 'Сохранить'}
                    </button>
                    {firstName && lastName && (
                        <button type="button" className="profile-clear-btn" onClick={handleClear}>
                            Очистить
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Profile
