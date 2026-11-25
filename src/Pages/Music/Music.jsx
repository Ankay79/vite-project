import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite, setCurrentTrack, setPlaying } from '../../store/slices/musicSlice'
import '../../App.css'

const tracks = [
    { id: 1, title: 'Рассвет', artist: 'Электроника', duration: '3:42', genre: 'Электроника' },
    { id: 2, title: 'Ночной город', artist: 'Синтвейв', duration: '4:15', genre: 'Синтвейв' },
    { id: 3, title: 'Дождь за окном', artist: 'Лоу-фай', duration: '2:58', genre: 'Лоу-фай' },
    { id: 4, title: 'Электрические сны', artist: 'Дрим-поп', duration: '5:01', genre: 'Дрим-поп' },
    { id: 5, title: 'Пульс мегаполиса', artist: 'Электро-фьюжн', duration: '3:33', genre: 'Электро' },
    { id: 6, title: 'Тишина между нот', artist: 'Амбиент', duration: '6:20', genre: 'Амбиент' },
    { id: 7, title: 'Полёт через галактику', artist: 'Космический эмбиент', duration: '4:47', genre: 'Амбиент' },
    { id: 8, title: 'Огни ночи', artist: 'Ретро-вейв', duration: '3:55', genre: 'Ретро-вейв' },
]

const Music = () => {
    const favorites = useSelector((state) => state.music.favorites)
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('all')
    const [expandedTrack, setExpandedTrack] = useState(null)

    // Уникальные жанры
    const genres = useMemo(() => {
        const unique = [...new Set(tracks.map(t => t.genre))]
        return ['all', ...unique]
    }, [])

    // Фильтрация
    const filteredTracks = useMemo(() => {
        const query = searchQuery.toLowerCase().trim()
        return tracks.filter(track => {
            const matchesSearch = !query ||
                track.title.toLowerCase().includes(query) ||
                track.artist.toLowerCase().includes(query)
            const matchesGenre = selectedGenre === 'all' || track.genre === selectedGenre
            return matchesSearch && matchesGenre
        })
    }, [searchQuery, selectedGenre])

    // Статистика
    const stats = useMemo(() => ({
        total: tracks.length,
        genres: new Set(tracks.map(t => t.genre)).size,
        favorites: favorites.length
    }), [favorites])

    const toggleFavorite = useCallback((id) => {
        dispatch(toggleFavorite(id))
    }, [dispatch])

    const toggleExpand = useCallback((id) => {
        setExpandedTrack(prev => prev === id ? null : id)
    }, [])

    return (
        <div className="page-content music-page">
            <h1>Музыка</h1>
            <h2>Что послушаем сегодня?</h2>

            {/* Статистика */}
            <div className="music-stats">
                <div className="stat-card">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Треков</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{stats.genres}</span>
                    <span className="stat-label">Жанров</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{stats.favorites}</span>
                    <span className="stat-label">Избранных</span>
                </div>
            </div>

            {/* Поиск и фильтры */}
            <div className="music-controls">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Поиск треков..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="genre-filters">
                    {genres.map(genre => (
                        <button
                            key={genre}
                            className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre === 'all' ? 'Все' : genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Список треков */}
            <div className="music-list">
                {filteredTracks.length === 0 ? (
                    <div className="music-empty">Ничего не найдено</div>
                ) : (
                    filteredTracks.map((track) => (
                        <div
                            key={track.id}
                            className={`track-item ${expandedTrack === track.id ? 'expanded' : ''}`}
                            onClick={() => toggleExpand(track.id)}
                        >
                            <div className="track-info">
                                <span className="track-title">{track.title}</span>
                                <span className="track-artist">{track.artist}</span>
                                <span className="track-genre">{track.genre}</span>
                            </div>
                            <div className="track-actions">
                                <button
                                    className={`favorite-btn ${favorites.includes(track.id) ? 'favorited' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleFavorite(track.id)
                                    }}
                                >
                                    {favorites.includes(track.id) ? '❤️' : '🤍'}
                                </button>
                                <span className="track-duration">{track.duration}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Music
