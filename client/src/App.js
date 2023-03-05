import './App.css';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Message from './components/Message';
import MessageBoard from './components/MessageBoard';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [data, setData] = useState([])
  const [jwt, setJWT] = useState("")
  const [user, setUser] = useState({})
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    fetch("/api/data")
      .then(response => response.json())
      .then(json => setData(json))

  }, [])

  /*
  let showRegister = false;
  const showRegisterChange = () => {
    showRegister ? showRegister = false : showRegister = true;
  }
  */

  const handleLogout = () => {
    setJWT("");
    setUser({});
  }

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
            <Login setJWT={setJWT} setUser={setUser} jwt={jwt} setShowRegister{...setShowRegister} />
          ) : (
            <Register setShowRegister={setShowRegister} setJWT={setJWT} />
          )}
          <button onClick={() => setShowRegister(!showRegister)}>{showRegister ? "Already have an account?" : "Register instead"}</button>
        </>
      )}


      <h1>Page</h1>
      <table><tr><th>USER</th><th>CODE/COMMENT</th><th>DATE</th><th></th></tr>
        <tbody>
          {data.map((d) => (
            <Message key={d.id} data={d} />
          ))}
        </tbody>
      </table>
      <Routes>
        <Route path="/data/:id" element={<MessageBoard />}/>
      </Routes>
      

      </div>
    </Router>
  );
}

export default App;