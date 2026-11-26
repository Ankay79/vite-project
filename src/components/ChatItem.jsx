export default function ChatItem({ chat }) {
    const { id, name, lastMessage, time, avatar, unread, read } = chat

    return (
        <div className="chat-item">
            <div className="chat-avatar">
                <span className="avatar-letter">{avatar || name?.[0] || '?'}</span>
            </div>

            <div className="chat-content">
                <div className="chat-header-row">
                    <span className="chat-name">{name}</span>
                    <span className="chat-time">{time}</span>
                </div>

                <div className="chat-footer-row">
                    <span className="chat-last-message">{lastMessage}</span>
                    <div className="chat-status">
                        {unread > 0 && (
                            <span className="unread-badge">{unread}</span>
                        )}
                        {read && <span className="read-status">✓✓</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}
