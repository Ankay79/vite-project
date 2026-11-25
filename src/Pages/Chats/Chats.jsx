import { Link } from 'react-router-dom'
import '../../App.css'

const Chats = () => {
    return (
        <div className="page-content">
            <h1>Чаты</h1>
            <Link to="/yourschat">
                <button className="openchat">Открыть текущие чаты</button>
            </Link>
            <section></section>
            <Link to="/genetalchat">
                <button className="opengeneralchat">Перейти в общий чат</button>
            </Link>
            <section></section>
            <Link to="/newchat">
                <button classname="createnewchat">Начать новый чат</button>
            </Link>
        </div>
    )
}

export default Chats