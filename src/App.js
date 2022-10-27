import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import AuthForm from './components/AuthForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/signup' element={<AuthForm type='Sign Up' />} />
        <Route path='/login' element={<AuthForm type='Log In' />} />
      </Routes>
    </Router>
  );
}

export default App;
