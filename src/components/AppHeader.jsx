import { useState } from 'react'

export default function AppHeader({ title = 'Чаты' }) {
    const [searchOpen, setSearchOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="app-header">
            <button
                className="burger-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Меню"
            >
                <span className="burger-line" />
                <span className="burger-line" />
                <span className="burger-line" />
            </button>

            <h1 className="app-title">{title}</h1>

            <button
                className="search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Поиск"
            >
                🔍
            </button>

            {searchOpen && (
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Поиск чатов..."
                        autoFocus
                    />
                </div>
            )}

            {menuOpen && (
                <nav className="burger-menu">
                    <a href="/main">Главная</a>
                    <a href="/profile">Профиль</a>
                    <a href="/contacts">Контакты</a>
                    <a href="/music">Музыка</a>
                    <a href="/mydocs">Документы</a>
                    <a href="/maps">Карты</a>
                </nav>
            )}
        </header>
    )
}
