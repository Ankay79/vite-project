export default function FloatingButton({ onClick, label = '+', title = 'Создать чат' }) {
    return (
        <button
            className="floating-btn"
            onClick={onClick}
            title={title}
            aria-label={title}
        >
            {label}
        </button>
    )
}
