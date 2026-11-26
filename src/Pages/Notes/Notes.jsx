import { useState, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNote, updateNote, removeNote } from '../../store/slices/notesSlice.js'
import '../../App.css'

const Notes = () => {
    const notes = useSelector((state) => state.notes)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [color, setColor] = useState('#4f46e5')

    // Статистика
    const stats = useMemo(() => ({
        total: notes.length,
        withTitle: notes.filter(n => n.title.trim()).length,
        withText: notes.filter(n => n.text.trim()).length
    }), [notes])

    // Фильтрация по поиску
    const filteredNotes = useMemo(() => {
        if (!searchQuery.trim()) return notes
        const q = searchQuery.toLowerCase()
        return notes.filter(n =>
            n.title.toLowerCase().includes(q) ||
            n.text.toLowerCase().includes(q)
        )
    }, [notes, searchQuery])

    // Создание/обновление заметки
    const handleSave = useCallback(() => {
        if (!title.trim() && !text.trim()) return

        if (editingId !== null) {
            dispatch(updateNote({
                id: editingId,
                title,
                text,
                color,
                updatedAt: Date.now()
            }))
            setEditingId(null)
        } else {
            const newNote = {
                id: Date.now(),
                title,
                text,
                color,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            dispatch(addNote(newNote))
        }
        setTitle('')
        setText('')
        setColor('#4f46e5')
    }, [title, text, color, editingId, dispatch])

    // Удаление заметки
    const handleDelete = useCallback((id) => {
        dispatch(removeNote(id))
        if (editingId === id) {
            setEditingId(null)
            setTitle('')
            setText('')
        }
    }, [editingId, dispatch])

    // Редактирование
    const handleEdit = useCallback((note) => {
        setEditingId(note.id)
        setTitle(note.title)
        setText(note.text)
        setColor(note.color)
    }, [])

    // Отмена редактирования
    const handleCancel = useCallback(() => {
        setEditingId(null)
        setTitle('')
        setText('')
        setColor('#4f46e5')
    }, [])

    // Форматирование даты
    const formatDate = useCallback((timestamp) => {
        return new Date(timestamp).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })
    }, [])

    // Цвета для заметок
    const colors = ['#4f46e5', '#059669', '#dc2626', '#d97706', '#7c3aed', '#0891b2']

    return (
        <div className="page-content notes-page">
            <h1>Заметки</h1>
            <h2>Ваши идеи и мысли</h2>

            {/* Статистика */}
            <div className="notes-stats">
                <div className="stat-item">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-text">всего</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.withTitle}</span>
                    <span className="stat-text">с заголовком</span>
                </div>
            </div>

            {/* Форма */}
            <div className="notes-form">
                <input
                    type="text"
                    className="notes-title-input"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="notes-text-input"
                    placeholder="Текст заметки..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                />
                <div className="notes-colors">
                    {colors.map(c => (
                        <button
                            key={c}
                            className={`color-dot ${color === c ? 'active' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
                <div className="notes-actions">
                    <button className="notes-save-btn" onClick={handleSave}>
                        {editingId !== null ? 'Обновить' : 'Сохранить'}
                    </button>
                    {editingId !== null && (
                        <button className="notes-cancel-btn" onClick={handleCancel}>
                            Отмена
                        </button>
                    )}
                </div>
            </div>

            {/* Поиск */}
            <input
                type="text"
                className="notes-search"
                placeholder="Поиск по заметкам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Список заметок */}
            <div className="notes-list">
                {filteredNotes.length === 0 ? (
                    <div className="notes-empty">
                        {notes.length === 0
                            ? 'Заметок пока нет'
                            : 'Ничего не найдено'
                        }
                    </div>
                ) : (
                    filteredNotes.map(note => (
                        <div
                            key={note.id}
                            className="note-card"
                            style={{ borderLeft: `4px solid ${note.color || '#4f46e5'}` }}
                        >
                            <div className="note-header">
                                {note.title && <h3 className="note-title">{note.title}</h3>}
                                <div className="note-menu">
                                    <button
                                        className="note-edit-btn"
                                        onClick={() => handleEdit(note)}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="note-delete-btn"
                                        onClick={() => handleDelete(note.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            {note.text && <p className="note-text">{note.text}</p>}
                            <span className="note-date">
                                {formatDate(note.updatedAt)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Notes
