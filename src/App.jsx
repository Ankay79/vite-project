import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Main from './Pages/Main/Main'
import Chats from './Pages/Chats/Chats'
import Contacts from './Pages/Contacts/Contacts'
import Music from './Pages/Music/Music'
import YoursChat from './Pages/Chats/YoursChat'
import MyDocs from "./Pages/MyDocs/MyDocs";

function AppReactRouter() {
  return (
    <>
      <Router>
        <header>
          <ul>
            <li><Link to="/main">Главная</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/chats">Чаты</Link></li>
            <li><Link to="/music">Музыка</Link></li>
            <li><Link to="/yourschat">Ваш чат</Link></li>
             <li><Link to="/mydocs"></Link></li>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/music" element={<Music />} />
            <Route path="/yourschat" element={<YoursChat />} />
            <Route path="/mydocs" element={<MyDocs />}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default AppReactRouter