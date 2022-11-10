import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import Play from './components/Play';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/');

function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  
  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));

    if (token) {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      } 
      fetch('http://localhost:5000/api/profile', options)
        .then(res => res.json())
        .then(json => {
          setUser(json.authData.user);
        })
        .catch(err => console.log(err));
      
    }

    if (!token) {
      setUser({});
    }
  }, [token])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  return (
    <Router>
      <div className="App">
        <Nav token={token} setToken={setToken} />
      </div>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route 
          path='/login' 
          element={<LogInForm setToken={setToken} />} 
        />
        <Route path='/play' element={<Play token={token} socket={socket} />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route 
          path='/profile' 
          element={<Profile token={token} user={user} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
