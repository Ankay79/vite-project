import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../store/slices/profileSlice.js'
import '../../App.css'

const WelcomeScreen = ({ onComplete }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        setError('')

        const trimmedFirst = firstName.trim()
        const trimmedLast = lastName.trim()

        if (!trimmedFirst || !trimmedLast) {
            setError('Пожалуйста, заполните оба поля')
            return
        }

        setIsSubmitting(true)

        const profile = {
            firstName: trimmedFirst,
            lastName: trimmedLast,
            createdAt: Date.now(),
        }

        dispatch(setProfile(profile))

        setTimeout(() => {
            onComplete(profile)
        }, 500)
    }, [firstName, lastName, dispatch, onComplete])

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }, [handleSubmit])

    return (
        <div className="welcome-screen">
            <div className="welcome-container">
                <div className="welcome-icon">
                    <div className="welcome-avatar">
                        <span className="avatar-letter">
                            {firstName ? firstName[0].toUpperCase() : '?'}
                        </span>
                    </div>
                </div>

                <h1 className="welcome-title">Добро пожаловать!</h1>
                <p className="welcome-subtitle">
                    Давайте познакомимся. Введите ваше имя и фамилию.
                </p>

                <form className="welcome-form" onSubmit={handleSubmit}>
                    <div className="welcome-field">
                        <label htmlFor="welcome-firstName" className="welcome-label">
                            Имя
                        </label>
                        <input
                            type="text"
                            id="welcome-firstName"
                            className={`welcome-input ${error && !firstName.trim() ? 'input-error' : ''}`}
                            placeholder="Введите имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="welcome-field">
                        <label htmlFor="welcome-lastName" className="welcome-label">
                            Фамилия
                        </label>
                        <input
                            type="text"
                            id="welcome-lastName"
                            className={`welcome-input ${error && !lastName.trim() ? 'input-error' : ''}`}
                            placeholder="Введите фамилию"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="family-name"
                            required
                        />
                    </div>

                    {error && (
                        <div className="welcome-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`welcome-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Сохранение...' : 'Начать'}
                    </button>
                </form>

                <div className="welcome-footer">
                    <p>Ваша информация сохраняется локально и не передаётся третьим лицам</p>
                </div>
            </div>
        </div>
    )
}

export default WelcomeScreen
