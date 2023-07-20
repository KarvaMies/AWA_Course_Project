import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ThreadList from './components/ThreadList';
// import MessageBoard from './components/MessageBoard';
import Login from './components/Login';
import Register from './components/Register';
import Thread from './components/Thread';
import NewThread from './components/NewThread';

function App() {
  const [data, setData] = useState([]);
  const [jwt, setJWT] = useState(localStorage.getItem('jwt') || '');
  const [user, setUser] = useState({});
  const [showRegister, setShowRegister] = useState(false);
  const [newThreadPressed, setNewThreadPressed] = useState(false);

  useEffect(() => {
    fetch("/threads/get")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json);
      });
  }, []);

  useEffect(() => {
    if (jwt) {
      const decodedToken = jwt.split('.')[1];
      const decodedUser = JSON.parse(atob(decodedToken));
      setUser(decodedUser);

    }
  }, [jwt]);

  const handleNewThread = (newThread) => {
    setData(prevData => {
      return [...prevData, newThread];
    });
  };

  const handleLogin = (token) => {
    setJWT(token);
    localStorage.setItem('jwt', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJWT("");
    setUser({});
  };

  return (
    <Router>
      <div className="App">
        {jwt ? (
          <>
            <h2>Welcome {user.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {!showRegister ? (
              <Login handleLogin={handleLogin} setShowRegister={setShowRegister} />
            ) : (
              <Register setShowRegister={setShowRegister} />
            )}
            <button onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? "Already have an account?" : "Register instead"}
            </button>
          </>
        )}


        <h1>Threads</h1>
        <table>
          <tbody>
            <tr>
              <th>CREATOR</th>
              <th>TITLE</th>
              <th>PUBLISHED</th>
              <th></th>
            </tr>
            {data.map((d) => (
              <ThreadList key={d._id} data={d} />
            ))}
          </tbody>
        </table>
        {jwt && !newThreadPressed ?
          <Link to="/threads/new">
            <button onClick={() => setNewThreadPressed(true)}>Create New Thread</button>
          </Link> : ""
        }
        <Routes>
          <Route path="/threads/:id/*" element={<Thread />}/>
          <Route
            path="/threads/new"
            element={
              <NewThread
                jwt={jwt}
                user={user}
                setData={setData}
                handleNewThread={handleNewThread}
                setNewThreadPressed={setNewThreadPressed}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


/* TODO:
  App.js ja Thread.js (->) sama rakenne, App.js threadeille, Thread.js kommenteille
  jostain syystä NewComment ei kuitenkaan renderää
  Selvitä syy ja korjaa, jotta painamalla 'New Comment' -nappia vastaavat tekstikenttä ilmestyy
  kuin painamalla 'Create New Thread' nappia eikä koko Thread vain katoaisi


  Routes -kohta rivillä 79 -> :
  1. mahdollistaa threadin katsomisen
  2. tuo uuden threadin luomista varten tekstikentät
  -- vastaava on Thread.js -componentissa oleva route rivillä 87
*/