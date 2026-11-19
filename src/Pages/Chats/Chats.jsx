import { Link } from 'react-router-dom'
import '../../App.css'

const Chats = () => {
    return (
        <div className="page-content">
            <h1>Чаты</h1>
            <Link to="/yourschat">
                <button className="openchat">Открыть текущие чаты</button>
            </Link>
        </div>
    )
}

export default Chats