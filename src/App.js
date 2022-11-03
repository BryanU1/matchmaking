import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import Play from './components/Play';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || '');

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token])

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
        <Route path='/play' element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
