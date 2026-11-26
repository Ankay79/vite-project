import { Link } from 'react-router-dom'

const navItems = [
    { to: '/main', label: 'Главная' },
    { to: '/profile', label: 'Профиль' },
    { to: '/contacts', label: 'Контакты' },
    { to: '/chats', label: 'Чаты' },
    { to: '/yourschat', label: 'Ваш чат' },
    { to: '/generalchat', label: 'Общий чат' },
    { to: '/music', label: 'Музыка' },
    { to: '/notes', label: 'Заметки' },
    { to: '/mydocs', label: 'Документы' },
    { to: '/maps', label: 'Карты' },
]

export default function Header({ profile }) {
    return (
        <header>
            <div className="header-user">
                <span className="header-greeting">
                    Привет, {profile.firstName}! 👋
                </span>
            </div>
            <ul>
                {navItems.map((item) => (
                    <li key={item.to}>
                        <Link to={item.to}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </header>
    )
}
