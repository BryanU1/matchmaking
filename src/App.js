import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Routes>
        <Route path="/" exact element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
