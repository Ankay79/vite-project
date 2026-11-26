import { Link } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import ChatItem from '../../components/ChatItem'
import FloatingButton from '../../components/FloatingButton'
import '../../App.css'

const sampleChats = [
    {
        id: 1,
        name: 'Алексей Иванов',
        lastMessage: 'Привет! Как дела?',
        time: '14:32',
        avatar: 'А',
        unread: 2,
        read: false,
    },
    {
        id: 2,
        name: 'Команда проекта',
        lastMessage: 'Дедлайн в пятницу',
        time: '13:15',
        avatar: 'К',
        unread: 0,
        read: true,
    },
    {
        id: 3,
        name: 'Мария Петрова',
        lastMessage: 'Отправила файлы',
        time: '12:45',
        avatar: 'М',
        unread: 1,
        read: true,
    },
    {
        id: 4,
        name: 'Общий чат',
        lastMessage: 'Встречаемся в 18:00',
        time: 'Вчера',
        avatar: 'О',
        unread: 0,
        read: true,
    },
    {
        id: 5,
        name: 'Дмитрий Сидоров',
        lastMessage: 'Спасибо!',
        time: 'Вчера',
        avatar: 'Д',
        unread: 0,
        read: true,
    },
]

const Chats = () => {
    const handleCreateChat = () => {
        console.log('Создать новый чат')
    }

    return (
        <div className="page-content chats-page">
            <AppHeader title="Чаты" />

            <div className="chats-list">
                {sampleChats.map((chat) => (
                    <Link key={chat.id} to="/yourschat" className="chat-link">
                        <ChatItem chat={chat} />
                    </Link>
                ))}
            </div>

            <FloatingButton
                onClick={handleCreateChat}
                label="+"
                title="Создать чат"
            />
        </div>
    )
}

export default Chats
