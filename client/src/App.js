import './App.css';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ThreadList from './components/ThreadList';
import MessageBoard from './components/MessageBoard';
import Login from './components/Login';
import Register from './components/Register';
//import NewThread from './components/NewThread';
import Thread from './components/Thread';

function App() {

  const [data, setData] = useState([])
  const [jwt, setJWT] = useState("")
  const [user, setUser] = useState({})
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    fetch("/api/threads")
      .then(response => response.json())
      .then(json => setData(json))

  }, [])


  return (
    <Router>
    <div className="App">
      {jwt ? (
        <>
          <h2>Welcome {user.username}!</h2>
          <button onClick={() => {setJWT(""); setUser({})}}>Logout</button>
        </>
      ) : (
        <>
          {!showRegister ? (
            <Login setJWT={setJWT} setUser={setUser} jwt={jwt} setShowRegister={setShowRegister} />
          ) : (
            <Register setShowRegister={setShowRegister} setJWT={setJWT} />
          )}
          <button onClick={() => setShowRegister(!showRegister)}>{showRegister ? "Already have an account?" : "Register instead"}</button>
        </>
      )}


      <h1>Page</h1>
      <table>
      <tbody>
        <tr><th>THREAD ID</th><th>USER</th><th>TITLE</th><th>PUBLISHED</th><th></th></tr>
        {data.map((d) => (
          <ThreadList key={d._id} data={d} />
        ))}
        </tbody>
      </table>
      <Routes>
        <Route path="/thread/:id" element={<MessageBoard />}/>
      </Routes>
      <Thread />
      
      </div>
    </Router>
  );
}

export default App;