import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Nav from './components/Nav';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import Play from './components/Play';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import MatchForm from './components/MatchForm';
import Game from './components/Game';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://competitive-wordle-api.herokuapp.com/');

function App() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')) || '');
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
  const [inQueue, setInQueue] = useState(false);
  const [display, setDisplay] = useState(JSON.parse(sessionStorage.getItem('display')) || false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [id, setID] = useState('');
  const [inGame, setInGame] = useState(false);
  const [timer, setTimer] = useState();
  const [isCounting, setIsCounting] = useState(false);
  const [startCount, setStartCount] = useState(3);
  const [mode, setMode] = useState('');
  const [opponent, setOpponent] = useState(
    {
      id: '',
      displayName: '',
      rating: 0
    }
  );

  useEffect(() => {
    sessionStorage.setItem('token', JSON.stringify(token));

    if (token) {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      } 
      fetch(`https://competitive-wordle-api.herokuapp.com/api/profile`, options)
        .then(res => res.json())
        .then(json => {
          setUser(json.user);
        })
        .catch(err => console.log(err));
    }

    if (!token) {
      setUser({});
    }
  }, [token])

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user])

  useEffect(() => {
    let time;
    if (mode === 'normal') {
      // 5 minutes
      time = 5*60*1000;
    }
    if (mode === 'ranked') {
      // 2 minutes
      time = 2*60*1000
    }
    if (inGame) {
      let timerID = setTimeout(() => {
        socket.emit('stalemate', id, mode);
      }, time);
      setTimer(timerID);      
    }
    // eslint-disable-next-line
  }, [inGame, id, mode])

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
      socket.emit('turn off pairing listener', mode);
      setIsCancelled(true);
      setTimeout(() => {
        setDisplay(false);
        setIsCancelled(false);
      }, 2000);
      setID('');
    })

    socket.on('start match', (players) => {
      for (const player of players) {
        if (player.id !== user.id) {
          setOpponent(player);
        }
      }
      socket.emit('turn off pairing listener', mode);
      socket.emit('turn on player disconnected listener');
      setIsCounting(true);
      setTimeout(() => {
        setDisplay(false);
        setInGame(true);
        setIsCounting(false);
      }, 3000);
    })
    
    return () => {
      socket.off('error');
      socket.off('match found');
      socket.off('cancel match');
      socket.off('start match');
    };
  }, [mode, user])

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={
              <LogInForm setToken={setToken} />
            } 
          />
          <Route path='/signup' element={<SignUpForm />} />
          <Route 
            path='*'
            element={<Navigate to='/' replace />}
          />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Nav token={token} setToken={setToken} />
        <Routes>
          <Route 
            path='/' 
            exact 
            element={<Play 
                      token={token} 
                      socket={socket} 
                      inQueue={inQueue}
                      setInQueue={setInQueue} 
                      inGame={inGame}
                      id={id}
                      mode={mode}
                      setMode={setMode}
                    />}
          />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route 
            path='/profile' 
            element={
              <Profile 
                token={token} 
                user={user} 
                setUser={setUser} 
              />
            } 
          />
          <Route 
            path={`/match/:id`}
            element={
              <Game 
                inGame={inGame}
                setInGame={setInGame}
                socket={socket}
                id={id}
                setID={setID}
                timer={timer}
                user={user}
                setUser={setUser}
                opponent={opponent}
                setStartCount={setStartCount}
                mode={mode}
              />
            }
          />
        </Routes>
      </div>
      <MatchForm 
        display={display}
        setDisplay={setDisplay}
        id={id} 
        socket={socket} 
        isCounting={isCounting}
        startCount={startCount}
        setStartCount={setStartCount}
        isCancelled={isCancelled}
        mode={mode}
      />
    </Router>
  );
}

export default App;
