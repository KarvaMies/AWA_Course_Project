import './App.css';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DataItem from './components/DataItem';
import Data from './components/Data';
import Login from './components/Login';

function App() {

  const [data, setData] = useState([])
  const [jwt, setJWT] = useState("")
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/api/data") // jos ei toimi muuta tää //localhost yms yms
      .then(response => response.json())
      .then(json => setData(json))

  }, [])

  return (
    <Router>
    <div className="App">
      <h1>Page</h1>
      <h2>{jwt ? `Welcome ${user.username}!` : ""}</h2>
        <table><tr><td>ID</td><td>NAME</td></tr>
          <tbody>
            {data.map((d) => (
              <DataItem key={d.id} data={d} />
            ))}
          </tbody>
        </table>
        <Routes>
          <Route path="/data/:id" element={<Data />}/>
        </Routes>
        {!user?.id?.length > 0 &&
          <Login setJWT={setJWT} setUser={setUser} jwt={jwt} />
        }

      </div>
    </Router>
  );
}

export default App;
