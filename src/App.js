import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import Play from './components/Play';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import MatchForm from './components/MatchForm';
import Game from './components/Game';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/');

function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [inQueue, setInQueue] = useState(false);
  const [display, setDisplay] = useState(JSON.parse(localStorage.getItem('display')) || false);
  const [id, setID] = useState(JSON.parse(localStorage.getItem('id')) || '');
  const [inGame, setInGame] = useState(false);
  const [timer, setTimer] = useState();
  
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

  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(id));
  }, [id])

  useEffect(() => {
    if (inGame) {
      let timerID = setTimeout(() => {
        socket.emit('stalemate', id);
      }, 5*60*1000);
      setTimer(timerID);      
    }
  }, [inGame, id])

  useEffect(() => {
    socket.on('error', (err) => {
      console.log(err);
    })

    socket.on('match found', (id) => {
      setID(id);
      setDisplay(true);
      setInQueue(false);
    })

    socket.on('cancel match', () => {
      setDisplay(false);
      setID('');
    })

    socket.on('start match', (word) => {
      setDisplay(false);
      setInGame(true);
    })
    return () => {
      socket.off('error');
      socket.off('match found');
      socket.off('cancel match');
      socket.off('start match');
    };
  }, [])

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
          element={
            <LogInForm setToken={setToken} />
          } 
        />
        <Route 
          path='/play' 
          element={
            <Play 
              token={token} 
              socket={socket} 
              inQueue={inQueue}
              setInQueue={setInQueue} 
            />
          } 
        />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route 
          path='/profile' 
          element={<Profile token={token} user={user} />} 
        />
      </Routes>
      <MatchForm 
        display={display}
        setDisplay={setDisplay}
        id={id} 
        socket={socket} 
      />
      <Game 
        inGame={inGame}
        setInGame={setInGame}
        socket={socket}
        id={id}
        setID={setID}
        timer={timer}
      />
    </Router>
  );
}

export default App;
